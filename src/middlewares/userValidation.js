const Joi = require('joi');
const AppError = require('../utils/appError');

// Define schema
const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email is not allowed to be empty',
    'string.email': 'Email must be a valid email address'
  }),
  password: Joi.string().min(5).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is not allowed to be empty',
    'string.min': 'Password must be at least 5 characters long'
  })
});


const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw new AppError(error.message || error.details[0].message ,400)
    }
    next();
  };
  
  module.exports = validateUser;
