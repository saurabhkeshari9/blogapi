const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    mobile: Joi.string().min(10).max(10).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required(),
    mobile: Joi.string().min(10).max(10),
});

const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});


module.exports = { registerSchema, loginSchema, postSchema };