const express = require('express');
const { getAllComments, deleteComment } = require('../../controllers/admin/admincommentcontroller');
const authMiddleware = require('../../middleware/authmiddleware');
const adminmiddleware = require('../../middleware/adminmiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - postId
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         postId:
 *           type: string
 *           description: The ID of the post the comment belongs to
 *         userId:
 *           type: string
 *           description: The ID of the user who made the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *       example:
 *         id: d5fE_asz
 *         postId: 5f8d0d55b54764421b7156c1
 *         userId: 5f8d0d55b54764421b7156c2
 *         content: This is a comment
 */

/**
 * @swagger
 * tags:
 *   name: AdminComments
 *   description: The admin comments managing API
 */

/**
 * @swagger
 * /api/admincomments/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [AdminComments]
 *     responses:
 *       200:
 *         description: The list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 */
router.get('/comments', authMiddleware, adminmiddleware, getAllComments);

/**
 * @swagger
 * /api/admincomments/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [AdminComments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: The comment was successfully deleted
 *       400:
 *         description: Comment not found
 *       500:
 *         description: Some server error
 */
router.delete('/comments/:commentId', authMiddleware, adminmiddleware, deleteComment);

module.exports = router;