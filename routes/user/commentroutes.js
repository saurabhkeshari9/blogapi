const express = require('express');
const { addComment, getCommentsByPost, updateComment, deleteComment } = require('../../controllers/user/commentcontoller');
const authMiddleware = require('../../middleware/authmiddleware');
const { commentSchema } = require('../../validation/user/commentvalidation');
const validate = require('../../middleware/validate');
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
 *         postId: 5f8d0d55b54764421b7156c1
 *         userId: 5f8d0d55b54764421b7156c2
 *         content: This is a comment
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comments managing API
 */

/**
 * @swagger
 * /api/usercomments/add:
 *   post:
 *     summary: Add a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The comment was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
router.post('/add', authMiddleware, validate(commentSchema), addComment);

/**
 * @swagger
 * /api/usercomments/post/{postId}:
 *   get:
 *     summary: Get comments by post ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
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
router.get('/post/:postId', authMiddleware, getCommentsByPost);

/**
 * @swagger
 * /api/usercomments/update/{commentId}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The comment was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Comment not found
 *       500:
 *         description: Some server error
 */
router.put('/update/:commentId', authMiddleware, validate(commentSchema), updateComment);

/**
 * @swagger
 * /api/usercomments/delete/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
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
router.delete('/delete/:commentId', authMiddleware, deleteComment);

module.exports = router;