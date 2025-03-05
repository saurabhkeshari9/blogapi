const express = require('express');
const { addComment, getCommentsByPost, updateComment, deleteComment } = require('../../controllers/user/commentcontoller');
const isUser = require('../../middleware/isUser');
const { commentSchema } = require('../../validation/user/commentvalidation');
const validate = require('../../middleware/validate');
const router = express.Router();


router.post('/add', isUser, validate(commentSchema), addComment);
router.get('/post/:postId', isUser, getCommentsByPost);
router.put('/update/:commentId', isUser, validate(commentSchema), updateComment);
router.delete('/delete/:commentId', isUser, deleteComment);
module.exports = router;