const Joi = require('joi');
const AppError = require('../utils/appError');

const cartSchema = Joi.object({
  productId: Joi.string().required().messages({
    'any.required': 'Product id is required',
    'string.empty': 'Product id is not allowed to be empty',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),
});

const validateCart = (req, res, next) => {
  if(!req.body) throw new AppError('Product id is required' ,400)
  const { error } = cartSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message ,400)
  }
  next();
};

module.exports = validateCart;
