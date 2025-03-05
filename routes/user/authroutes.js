const express = require('express');
const { register, login } = require('../../controllers/user/authcontroller');
const router = express.Router();
const { loginSchema, registerSchema } = require('../../validation/user/validation');
const validate = require('../../middleware/validate');


router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;