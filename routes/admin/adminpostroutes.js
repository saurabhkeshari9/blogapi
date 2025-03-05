const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../../controllers/admin/adminpostcontroller');
const isAdmin = require('../../middleware/isAdmin');
const validate = require('../../middleware/validate');
const upload = require('../../middleware/multer');
const { postSchema } = require('../../validation/admin/adminvalidation');
const router = express.Router();


router.post('/create', isAdmin, upload.single('image'), validate(postSchema), createPost);
router.get('/getall', isAdmin, getAllPosts);
router.get('/getbyid/:id', isAdmin, getPostById);
router.put('/update/:id', isAdmin, upload.single('image'), validate(postSchema), updatePost);
router.delete('/delete/:id', isAdmin, deletePost);

module.exports = router;