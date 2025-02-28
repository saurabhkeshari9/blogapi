const Post = require("../../models/post");

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newData = new Post({ title, content, image, isDeleted: false  });
        await newData.save();

        return res.status(200).json({
            statusCode: 200,
            message: "Post added successfully",
            data: newData,
        });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const totalPosts = await Post.countDocuments({ isDeleted: false }); 
        console.log("Total posts found:", totalPosts);
        const posts = await Post.find({ isDeleted: false })
            .sort({ createdAt: -1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);

        return res.status(200).json({
            statusCode: 200,
            message: "Posts List",
            currentPage: pageNum,
            totalPages: Math.ceil(totalPosts / limitNum),
            totalPosts,
            data: posts,
        });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, error: err.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, isDeleted: false }); 
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
