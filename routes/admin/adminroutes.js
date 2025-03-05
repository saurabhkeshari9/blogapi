const express = require('express');
const { loginAdmin, getAllUsers, blockUser, getAllUserPosts, updateUserPost, deleteUserPost } = require('../../controllers/admin/admincontroller');
const isAdmin = require('../../middleware/isAdmin');
const validate = require('../../middleware/validate');
const upload = require('../../middleware/multer');
const { postSchema, loginSchema } = require('../../validation/admin/adminvalidation');
const router = express.Router();


router.post('/login', validate(loginSchema),loginAdmin);
router.get('/users', isAdmin,getAllUsers);
router.put("/block/:id", isAdmin, blockUser);
router.get("/posts", isAdmin, getAllUserPosts);
router.put("/posts/:id", isAdmin,upload.single('image'), validate(postSchema), updateUserPost);
router.delete("/posts/:id", isAdmin, deleteUserPost);

module.exports = router;