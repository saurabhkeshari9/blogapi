const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required()});

const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});
    module.exports = { loginSchema, postSchema };