const Joi = require("joi");

const superAdminSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of {#limit}",
    "any.required": "Name is required",
  }),
  adminId: Joi.string().min(3).max(30).required().messages({
    "string.base": "Id should be a type of text",
    "string.empty": "Id cannot be empty",
    "string.min": "Id should have a minimum length of {#limit}",
    "any.required": "Id is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  pwd: Joi.string()
    .pattern(new RegExp("(?=.*[0-9])"))
    .min(6)
    .required()
    .messages({
      "string.pattern.base": "Password should contain atleast 1 number",
      "string.min": "Password should have a minimum length of {#limit}",
      "any.required": "Password is required",
    }),
});

const mailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
}).unknown(true);

const otpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  otp: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.length": "OTP must be exactly 4 digits long",
      "string.pattern.base": "OTP must contain only numeric characters",
      "any.required": "OTP is required",
    }),
});

const rootAdminSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please provide a valid email address.",
  }),
  role: Joi.string().valid("ROOT_ADMIN").required().messages({
    "any.only": "Role must be ROOT_ADMIN.",
    "string.empty": "Role is required.",
  }),
  acl: Joi.array()
    .items(
      Joi.string().messages({
        "string.base": "Each permission must be a string.",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "ACL must contain at least one permission.",
      "array.base": "ACL must be an array of permissions.",
    }),
});

module.exports = {
  superAdminSchema,
  mailSchema,
  otpSchema,
  rootAdminSchema,
};
