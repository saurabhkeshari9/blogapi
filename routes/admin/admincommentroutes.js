const express = require('express');
const { getAllComments, deleteComment } = require('../../controllers/admin/admincommentcontroller');
const isAdmin = require('../../middleware/isAdmin');
const router = express.Router();



router.get('/comments', isAdmin, getAllComments);
router.delete('/comments/:commentId', isAdmin, deleteComment);

module.exports = router;