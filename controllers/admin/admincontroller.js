const Admin = require("../../models/adminmodel");
const User = require("../../models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Admin Login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ statusCode: 400, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const adminData = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      token,
    };

    return res.status(200).json({
      statusCode: 200,
      message: "Admin login successful",
      data: adminData,
    });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(400).json({ statusCode: 400, message: "Access denied! Admins only." });
    }

    const users = await User.find({}).select("-password");
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

const Post = require("../../models/post");

exports.getAllUserPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const totalPosts = await Post.countDocuments({ isDeleted: false });
    const posts = await Post.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    return res.status(200).json({
      statusCode: 200,
      message: "All User Posts List",
      currentPage: pageNum,
      totalPages: Math.ceil(totalPosts / limitNum),
      totalPosts,
      data: posts,
    });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, error: err.message });
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