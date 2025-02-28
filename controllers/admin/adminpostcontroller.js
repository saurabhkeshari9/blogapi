const Post = require("../../models/post");

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newData = new Post({ title, content, image });
        await newData.save();
        const postData = {
            id: newData._id,
            title: newData.title,
            content: newData.content,
            image: newData.image,
        };
        return res.status(200).json({ statusCode: 200, message: "Post added successfully", data: postData });
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
        const postId = req.params.id;

        const postToUpdate = await Post.findById(postId);
        if (!postToUpdate) return res.status(400).json({ statusCode: 400, message: 'Post not found' });

        const updatedData = await Post.findByIdAndUpdate(postId, { title, content, image }, { new: true });
        return res.status(200).json({ statusCode: 200, message: "Post updated successfully", data: updatedData });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const postToDelete = await Post.findById(postId);
        if (!postToDelete) return res.status(400).json({ statusCode: 400, message: 'Post not found' });

        await Post.findByIdAndUpdate(postId, { isDeleted: true }, { new: true });
        return res.status(200).json({ statusCode: 200, message: "Post deleted successfully" });
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
    }
};