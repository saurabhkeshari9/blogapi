const express = require("express");
const { createPost, getAllPosts, getPostById, updatePost, deletePost, getAllMyPosts } = require("../../controllers/user/postcontroller");
const isUser = require('../../middleware/isUser');
const { postSchema } = require('../../validation/user/validation');
const validate = require('../../middleware/validate');
const upload = require("../../middleware/multer");
const router = express.Router();


router.post("/create", isUser, upload.single("image"), validate(postSchema), createPost);
router.get("/getall", isUser, getAllPosts);
router.get("/getallmy", isUser, getAllMyPosts);
router.get("/getbyid/:id", isUser, getPostById);
router.put("/update/:id", isUser, upload.single("image"), validate(postSchema), updatePost);
router.delete("/delete/:id", isUser, deletePost);

module.exports = router;