const express = require('express');
const { getPrivacyPolicy } = require('../../controllers/admin/privacypolicy');
const router = express.Router();

router.get("/privacy", getPrivacyPolicy);
module.exports = router;