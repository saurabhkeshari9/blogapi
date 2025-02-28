const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../../controllers/admin/adminpostcontroller');
const authMiddleware = require('../../middleware/authmiddleware');
const validate = require('../../middleware/validate');
const upload = require('../../middleware/multer');
const { postSchema } = require('../../validation/admin/adminvalidation');
const adminmiddleware = require('../../middleware/adminmiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         image:
 *           type: string
 *           description: The image URL of the post
 *       example:
 *         id: d5fE_asz
 *         title: My First Post
 *         content: This is the content of my first post
 *         image: /uploads/image.jpg
 */

/**
 * @swagger
 * tags:
 *   name: AdminPosts
 *   description: The admin posts managing API
 */

/**
 * @swagger
 * /api/adminposts/create:
 *   post:
 *     summary: Create a new post
 *     tags: [AdminPosts]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
router.post('/create', authMiddleware, adminmiddleware, upload.single('image'), validate(postSchema), createPost);

/**
 * @swagger
 * /api/adminposts/getall:
 *   get:
 *     summary: Get all posts
 *     tags: [AdminPosts]
 *     responses:
 *       200:
 *         description: The list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Some server error
 */
router.get('/getall', authMiddleware, adminmiddleware, getAllPosts);

/**
 * @swagger
 * /api/adminposts/getbyid/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [AdminPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: The post data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Post not found
 *       500:
 *         description: Some server error
 */
router.get('/getbyid/:id', authMiddleware, adminmiddleware, getPostById);

/**
 * @swagger
 * /api/adminposts/update/{id}:
 *   put:
 *     summary: Update a post
 *     tags: [AdminPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Post not found
 *       500:
 *         description: Some server error
 */
router.put('/update/:id', authMiddleware, adminmiddleware, upload.single('image'), validate(postSchema), updatePost);

/**
 * @swagger
 * /api/adminposts/delete/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [AdminPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post ID
 *     responses:
 *       200:
 *         description: The post was successfully deleted
 *       400:
 *         description: Post not found
 *       500:
 *         description: Some server error
 */
router.delete('/delete/:id', authMiddleware, adminmiddleware, deletePost);

module.exports = router;