const Joi = require("joi");

const superAdminSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username should be a type of text",
    "string.empty": "Username cannot be empty",
    "string.min": "Username should have a minimum length of {#limit}",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  pwd: Joi.string().min(6).required().messages({
    "string.min": "Password should have a minimum length of {#limit}",
    "any.required": "Password is required",
  }),
});

module.exports = {
  superAdminSchema,
};
