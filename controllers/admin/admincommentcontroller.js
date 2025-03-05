const Comment = require("../../models/comment");
const Post = require("../../models/post");
// Get all comments
exports.getAllComments = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const skip = (page - 1) * limit;

    const postsWithComments = await Post.aggregate([
      // Match non-deleted posts
      {
        $match: { isDeleted: false }
      },
      // Join with users collection for post creator
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      // Join with comments collection
      {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { 
                  $and: [
                    { $eq: ["$postId", "$$postId"] },
                    { $eq: ["$isDeleted", false] }
                  ]
                }
              }
            }
          ],
          as: "comments"
        }
      },
      // Filter posts that have comments
      {
        $match: { "comments": { $ne: [] } }
      },
      { $unwind: "$comments" },
      // Join with users collection for comment creator
      {
        $lookup: {
          from: "users",
          localField: "comments.userId",
          foreignField: "_id",
          as: "commentUser"
        }
      },
      { $unwind: "$commentUser" },
      // Group posts with their comments
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          content: { $first: "$content" },
          createdBy: { $first: "$user.name" },
          email: { $first: "$user.email" },
          createdAt: { $first: "$createdAt" },
          comments: {
            $push: {
              id: "$comments._id",
              comment: "$comments.content",
              commentedBy: "$commentUser.name",
              createdAt: "$comments.createdAt"
            }
          }
        }
      },
      // Project needed fields
      {
        $project: {
          title: 1,
          content: 1,
          createdBy: 1,
          email: 1,
          createdAt: 1,
          comments: 1
        }
      },
      // Sort by creation date
      { $sort: { createdAt: -1 } },
      // Pagination
      { $skip: skip },
      { $limit: limit }
    ]);

    // Get total count for pagination
    const totalPosts = await Post.countDocuments({ 
      isDeleted: false,
      _id: { $in: await Comment.distinct('postId', { isDeleted: false }) }
    });

    // Calculate pagination info
    const totalPages = Math.ceil(totalPosts / limit);
    //const nextPage = page < totalPages ? page + 1 : null;
    //const prevPage = page > 1 ? page - 1 : null;

    if (!postsWithComments.length) {
      return res.status(404).json({
        statusCode: 404,
        message: "No posts with comments found"
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Posts with Comments retrieved successfully",
      data: postsWithComments,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts
      }
    });

  } catch (err) {
    console.error("Error fetching posts with comments:", err);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to retrieve data",
      error: err.message
    });
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