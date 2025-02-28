const express = require('express');
const { getAllFAQs } = require('../../controllers/admin/faqscontroller');
const router = express.Router();
const authMiddleware = require('../../middleware/authmiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     FAQ:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the FAQ
 *         question:
 *           type: string
 *           description: The question of the FAQ
 *         answer:
 *           type: string
 *           description: The answer of the FAQ
 *       example:
 *         id: d5fE_asz
 *         question: What is this API?
 *         answer: This is a blog post API
 */

/**
 * @swagger
 * tags:
 *   name: FAQs
 *   description: The FAQs managing API
 */

/**
 * @swagger
 * /api/userfaqs/faqs:
 *   get:
 *     summary: Get all FAQs
 *     tags: [FAQs]
 *     responses:
 *       200:
 *         description: The list of FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FAQ'
 *       500:
 *         description: Some server error
 */
router.get('/faqs', authMiddleware, getAllFAQs);

module.exports = router;