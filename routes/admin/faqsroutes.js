const express = require('express');
const { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } = require('../../controllers/admin/faqscontroller');
const authMiddleware = require('../../middleware/authmiddleware');
const validate = require('../../middleware/validate');
const { faqsSchema } = require('../../validation/admin/adminfaqsvalidation');
const adminmiddleware = require('../../middleware/adminmiddleware');
const router = express.Router();

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
 *         question:
 *           type: string
 *           description: The question of the FAQ
 *         answer:
 *           type: string
 *           description: The answer of the FAQ
 *       example:
 *         question: What is this API?
 *         answer: This is a blog post API
 */

/**
 * @swagger
 * tags:
 *   name: AdminFAQs
 *   description: The admin FAQs managing API
 */

/**
 * @swagger
 * /api/adminfaqs/faqs:
 *   get:
 *     summary: Get all FAQs
 *     tags: [AdminFAQs]
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
router.get('/faqs', authMiddleware, adminmiddleware, getAllFAQs);

/**
 * @swagger
 * /api/adminfaqs/faqs:
 *   post:
 *     summary: Create a new FAQ
 *     tags: [AdminFAQs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQ'
 *     responses:
 *       200:
 *         description: The FAQ was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FAQ'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */
router.post('/faqs', authMiddleware, adminmiddleware, validate(faqsSchema), createFAQ);

/**
 * @swagger
 * /api/adminfaqs/faqs/{faqId}:
 *   put:
 *     summary: Update an FAQ
 *     tags: [AdminFAQs]
 *     parameters:
 *       - in: path
 *         name: faqId
 *         schema:
 *           type: string
 *         required: true
 *         description: The FAQ ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQ'
 *     responses:
 *       200:
 *         description: The FAQ was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FAQ'
 *       400:
 *         description: FAQ not found
 *       500:
 *         description: Some server error
 */
router.put('/faqs/:faqId', authMiddleware, adminmiddleware, validate(faqsSchema), updateFAQ);

/**
 * @swagger
 * /api/adminfaqs/faqs/{faqId}:
 *   delete:
 *     summary: Delete an FAQ
 *     tags: [AdminFAQs]
 *     parameters:
 *       - in: path
 *         name: faqId
 *         schema:
 *           type: string
 *         required: true
 *         description: The FAQ ID
 *     responses:
 *       200:
 *         description: The FAQ was successfully deleted
 *       400:
 *         description: FAQ not found
 *       500:
 *         description: Some server error
 */
router.delete('/faqs/:faqId', authMiddleware,adminmiddleware, deleteFAQ);

module.exports = router;