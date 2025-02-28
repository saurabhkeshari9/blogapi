const express = require('express');
const { loginAdmin, getAllUsers, blockUser, getAllUserPosts, updateUserPost, deleteUserPost } = require('../../controllers/admin/admincontroller');
const authMiddleware = require('../../middleware/authmiddleware');
const validate = require('../../middleware/validate');
const upload = require('../../middleware/multer');
const { postSchema, loginSchema } = require('../../validation/admin/adminvalidation');
const adminmiddleware = require('../../middleware/adminmiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the admin
 *         email:
 *           type: string
 *           description: The email of the admin
 *         password:
 *           type: string
 *           description: The password of the admin
 *       example:
 *         id: d5fE_asz
 *         email: admin@example.com
 *         password: admin12345
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - mobile
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the admin
 *         email:
 *           type: string
 *           description: The email of the admin
 *         password:
 *           type: string
 *           description: The password of the admin
 *         mobile:
 *           type: string
 *           description: The mobile number of the admin
 *       example:
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: password123
 *         mobile: 1234567890
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: The admin managing API
 */

/**
 * @swagger
 * /api/adminauth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Some server error
 */
router.post('/login', validate(loginSchema),loginAdmin);

/**
 * @swagger
 * /api/adminauth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.get('/users', authMiddleware, adminmiddleware, getAllUsers);

/**
 * @swagger
 * /api/adminauth/block/{id}:
 *   put:
 *     summary: Block or unblock a user
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User blocked or unblocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
router.put("/block/:id", authMiddleware, adminmiddleware, blockUser);

/**
 * @swagger
 * /api/adminauth/posts:
 *   get:
 *     summary: Get all user posts
 *     tags: [Admin]
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
router.get("/posts", authMiddleware,adminmiddleware, getAllUserPosts);

/**
 * @swagger
 * /api/adminauth/posts/{id}:
 *   put:
 *     summary: Update a user post
 *     tags: [Admin]
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
router.put("/posts/:id", authMiddleware, adminmiddleware,upload.single('image'), validate(postSchema), updateUserPost);

/**
 * @swagger
 * /api/adminauth/posts/{id}:
 *   delete:
 *     summary: Delete a user post
 *     tags: [Admin]
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
router.delete("/posts/:id", authMiddleware, adminmiddleware, deleteUserPost);

module.exports = router;