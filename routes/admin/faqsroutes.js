const express = require('express');
const { getAllFAQs, createFAQ, updateFAQ, deleteFAQ } = require('../../controllers/admin/faqscontroller');
const isAdmin = require('../../middleware/isAdmin');
const validate = require('../../middleware/validate');
const { faqsSchema } = require('../../validation/admin/adminfaqsvalidation');
const router = express.Router();


router.get('/getfaqs', isAdmin, getAllFAQs);
router.post('/createfaqs', isAdmin, validate(faqsSchema), createFAQ);
router.put('/updatefaqs/:faqId', isAdmin, validate(faqsSchema), updateFAQ);
router.delete('/deletefaqs/:faqId', isAdmin, deleteFAQ);

module.exports = router;