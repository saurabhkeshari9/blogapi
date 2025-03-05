const Joi = require('joi');


const privacySchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()});

    module.exports = { privacySchema };