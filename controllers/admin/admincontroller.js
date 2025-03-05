const Admin = require("../../models/adminmodel");
const User = require("../../models/user");
const Post = require("../../models/post");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Admin Login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select("name email password isActive").lean();
    console.log(admin)
    if (!admin || !admin.isActive) {
      return res.status(400).json({ statusCode: 400, message: "Admin is not active or does not exist" });
    }

    if (!(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ statusCode: 400, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    delete admin.password;

    return res.status(200).json({
      statusCode: 200,
      message: "Admin login successful",
      data: {...admin, token} ,
    });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    if (!users) {
      return res.status(400).json({ statusCode: 400, message: "No User Data Retrieved" });
    }
    return res.status(200).json({ statusCode: 200, message: "Users data retrieved successfully", data: users });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ statusCode: 400, message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    return res.status(200).json({
      statusCode: 200,
      message: user.isBlocked ? "User blocked successfully" : "User unblocked successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

exports.getAllUserPosts = async (req, res) => {
  try {
    let { limit = 10, lastId, page = 1 } = req.query;
      limit = parseInt(limit, 10);
      page = parseInt(page, 10);
  
      const filter = { isDeleted: false };
      if (lastId) filter._id = { $lt: new mongoose.Types.ObjectId(lastId) };

    const result = await Post.aggregate([
      { $match: filter }, // Get only non-deleted posts
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "user"
        }
      },
      
       { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } }, 
       {
        $group: {
          _id: "$user._id",
          email: { $first: "$user.email" },
          name: { $first: "$user.name" },
          posts: {
            $push: {
              id: "$_id",
              title: "$title",
              content: "$content",
              image: "$image",
              createdAt: "$createdAt"
            }
          }
        }
      },
      { $project: { _id: 0, email: 1, name: 1, posts: 1 } },
      { $sort: { "posts.createdAt": -1 } }, // Sort by creation date
      { $limit: limit }
    ]);

    const nextCursor = result.length ? result[result.length - 1].posts[result[result.length - 1].posts.length - 1].id : null;
    if (!result) {
      return res.status(400).json({ statusCode: 400, message: "No posts found or all are deleted" });
    }
    res.status(200).json({ statusCode: 200, message: "All User Posts List", data: result, nextCursor, currentPage: page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: "Internal Server Error", error });
  }
};


exports.updateUserPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const postId = req.params.id;

    const post = await Post.findOneAndUpdate(
      { _id: postId, isDeleted: false },
      { title, content, image },
      { new: true }
    );

    if (!post) {
      return res.status(400).json({ statusCode: 400, message: "Post not found" });
    }

    return res.status(200).json({ statusCode: 200, message: "Post updated successfully", data: post });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

exports.deleteUserPost = async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!deletedPost) {
      return res.status(400).json({ statusCode: 400, message: "Post not found" });
    }

    return res.status(200).json({ statusCode: 200, message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};