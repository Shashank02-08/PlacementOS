const Joi = require("joi");

const createInternshipSchema = Joi.object({

    title: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),

    description: Joi.string()
        .trim()
        .min(20)
        .required(),

    location: Joi.string()
        .trim()
        .required(),

    type: Joi.string()
        .valid("Remote", "Onsite", "Hybrid")
        .required(),

    duration: Joi.string()
        .trim()
        .required(),

    stipend: Joi.number()
        .min(0)
        .required(),

    skillsRequired: Joi.array()
        .items(Joi.string().trim())
        .min(1)
        .required(),

    openings: Joi.number()
        .integer()
        .min(1)
        .required(),

    applicationDeadline: Joi.date()
        .greater("now")
        .required()

});

module.exports = {
    createInternshipSchema
};