const Joi = require('joi');
const AppError = require('../utils/appError');

const productSchema = Joi.object({
  productId: Joi.string().required().messages({
    'any.required': 'Product id is required',
    'string.empty': 'Product id is not allowed to be empty',
  }),
  name: Joi.string().min(3).required().messages({
    'string.empty': 'Product name is not allowed to be empty',
    'any.required': 'Product name is required',
    'string.min': 'Product name must be at least 3 characters',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),
  price: Joi.number().precision(4).min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price must be a positive number',
    'any.required': 'Price is required',
  }),
});

const validateProduct = (req, res, next) => {
  if(!req.body) throw new AppError('Product id is required' ,400)
  const { error } = productSchema.validate(req.body);
  if (error) {
    throw new AppError(error.message || error.details[0].message ,400)
  }
  next();
};

module.exports = validateProduct;
