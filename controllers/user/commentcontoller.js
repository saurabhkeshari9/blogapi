const Comment = require("../../models/comment");
const Post = require("../../models/post");

exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    
    if (!postId || !content) {
      return res.status(400).json({ statusCode:400,message: "Post ID and content are required" });
    }

    const user = req.user;

    const newComment = new Comment({
      postId,
      userId: user._id,
      content,
    });

    await newComment.save();
    return res.status(200).json({ statusCode:200, message: "Comment added successfully", comment: newComment });
  } catch (err) {
    return res.status(500).json({ statusCode:500, message: err.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId, isDeleted: false }).populate("userId", "name email");

    return res.status(200).json({ statusCode: 200, message: "Comments List", data: comments });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

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
    const userId = req.user._id;

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