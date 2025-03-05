const Post = require("../../models/post");
const { ObjectId } = require("mongodb");

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newData = new Post({ title, content, image , createdBy: req.admin.id });
        await newData.save();
        return res.status(200).json({ statusCode: 200, message: "Post added successfully", data: newData });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
      let { limit = 10, lastId } = req.query;
            limit = parseInt(limit, 10);
        
            const filter = { isDeleted: false, createdBy: new ObjectId(req.admin.id) };
            
            if (lastId) {
              filter._id = { $lt: ObjectId(lastId) };
            }
        
            const posts = await Post.find(filter)
              .sort({ _id: -1 }) // ✅ Latest first
              .limit(limit);
        
            const nextCursor = posts.length ? posts[posts.length - 1]._id : null;

            if(!posts.length) {
                return res.status(400).json({statusCode: 400, message: "No Posts found"})};
                console.log(filter)
             
            return res.status(200).json({
              statusCode: 200,
              message: "My Posts List",
              nextCursor,
              data: posts
            });
          
          } catch (err) {
            return res.status(500).json({
              statusCode: 500,
              error: err.message
            });
          }
  };

exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(400).json({ statusCode: 400, message: 'Post not found' });

        return res.status(200).json({ statusCode: 200, message: "Post By Id", data: post });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, error: err.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const updatedData = await Post.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { title, content, image },
            { new: true }
        );

        if (!updatedData) return res.status(404).json({ statusCode: 400, message: 'Post not found' });

        return res.status(200).json({ statusCode: 200, message: "Post updated successfully", data: updatedData });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const deletedData = await Post.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );
        console.log("Deleted Data:", deletedData);
        if (!deletedData) return res.status(400).json({ statusCode: 400, message: 'Post not found' });

        return res.status(200).json({ statusCode: 200, message: "Post deleted successfully" });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};