const express = require('express');
const { createPrivacyPolicy,updatePrivacyPolicy,deletePrivacyPolicy,getPrivacyPolicy } = require('../../controllers/admin/privacypolicy');
const isAdmin = require('../../middleware/isAdmin');
const validate = require('../../middleware/validate');
const { privacySchema } = require('../../validation/admin/adminprivacypolicyvalidation');
const router = express.Router();


router.post("/createprivacy",isAdmin,validate(privacySchema),createPrivacyPolicy);
router.put("/updateprivacy/:id", isAdmin, validate(privacySchema),updatePrivacyPolicy);
router.get("/getprivacy", isAdmin, getPrivacyPolicy);
router.delete("/deleteprivacy/:id", isAdmin, deletePrivacyPolicy);

module.exports = router;