const Joi = require('joi');
const AppError = require('../utils/appError');

// Define schema
const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address'
  }),
  password: Joi.string().min(5).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 5 characters long'
  })
});


const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message ,400)
    }
    next();
  };
  
  module.exports = validateUser;
