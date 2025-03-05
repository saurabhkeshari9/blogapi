const express = require('express');
const { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } = require('../../controllers/admin/faqscontroller');
const isAdmin = require('../../middleware/isAdmin');
const validate = require('../../middleware/validate');
const { faqsSchema } = require('../../validation/admin/adminfaqsvalidation');
const router = express.Router();


router.get('/faqs', isAdmin, getAllFAQs);
router.post('/faqs', isAdmin, validate(faqsSchema), createFAQ);
router.put('/faqs/:faqId', isAdmin, validate(faqsSchema), updateFAQ);
router.delete('/faqs/:faqId', isAdmin, deleteFAQ);

module.exports = router;