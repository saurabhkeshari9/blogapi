const Comment = require("../../models/comment");

// Get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ isDeleted: false }).populate("userId", "name email").populate("postId", "title");
    return res.status(200).json({ statusCode: 200, message: "Comments List", data: comments });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};


// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!comment) return res.status(400).json({ statusCode: 400, message: "Comment not found" });

    return res.status(200).json({ statusCode: 200, message: "Comment deleted successfully" });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, message: err.message });
  }
};