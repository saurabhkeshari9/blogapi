const Joi = require('joi');


const faqsSchema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required()});

    module.exports = { faqsSchema };