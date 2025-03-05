const express = require('express');
const { getAllFAQs } = require('../../controllers/admin/faqscontroller');
const router = express.Router();


router.get('/faqs', getAllFAQs);

module.exports = router;