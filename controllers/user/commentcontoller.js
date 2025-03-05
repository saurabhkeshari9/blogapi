const Comment = require("../../models/comment");
const Post = require("../../models/post");
const mongoose = require("mongoose");

exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    
    if (!postId || !content) {
      return res.status(400).json({ statusCode:400,message: "Post ID and content are required" });
    }

    const user = req.userAuth;

    const newComment = new Comment({postId, userId: user.id, content,});

    await newComment.save();
    return res.status(200).json({ statusCode:200, message: "Comment added successfully", comment: newComment });
  } catch (err) {
    return res.status(500).json({ statusCode:500, message: err.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    let { limit = 10, lastId } = req.query;
    limit = parseInt(limit, 10);

    // Build match filter
    const filter = { 
      postId: new mongoose.Types.ObjectId(postId), 
      isDeleted: false 
    };
    
    // Add cursor condition if lastId is provided
    if (lastId) {
      filter._id = { $lt: new mongoose.Types.ObjectId(lastId) };
    }

    const comments = await Comment.aggregate([
      {
        $match: filter
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $sort: { _id: -1 } // Sort by _id in descending order
      },
      {
        $limit: limit
      },
      {
        $group: {
          _id: "$postId",
          postId: { $first: "$postId" },
          userId: { $first: "$user._id" },
          comments: {
            $push: {
              id: "$_id",
              comment: "$content",
              commentedBy: "$user.name"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          postId: 1,
          userId: 1,
          comments: 1
        }
      }
    ]);

    // Get the next cursor from the last comment
    const nextCursor = comments.length && comments[0].comments.length 
      ? comments[0].comments[comments[0].comments.length - 1].id 
      : null;
      if (!comments.length) {
        return res.status(400).json({ statusCode: 400, message: "No comments found or all are deleted" });
      }

    return res.status(200).json({ 
      statusCode: 200, 
      message: "Comments List", 
      data: comments,
      nextCursor
    });
  } catch (err) {
    return res.status(500).json({ 
      statusCode: 500, 
      message: err.message 
    });
  }
};


exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.userAuth.id;

    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, userId, isDeleted: false },
      { content },
      { new: true }
    );

    if (!comment) return res.status(400).json({ statusCode: 400, message: "Comment not found or not authorized" });

    return res.status(200).json({ statusCode: 200, message: "Comment updated successfully", data: comment });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.userAuth.id;

    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, userId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!comment) return res.status(400).json({ statusCode: 400, message: "Comment not found or not authorized" });

    return res.status(200).json({ statusCode: 200, message: "Comment deleted successfully" });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};