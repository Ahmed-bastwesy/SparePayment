const Joi = require('joi');
const AppError = require('../utils/appError');

const promoSchema = Joi.object({
  promoId: Joi.string().required().messages({
    'any.required': 'Promo id is required',
    'string.empty': 'Promo id is not allowed to be empty',
  }),
  name: Joi.string().min(3).required().messages({
    'string.empty': 'Product name is not allowed to be empty',
    'any.required': 'Product name is required',
    'string.min': 'Product name must be at least 3 characters',
  }),
  percentage: Joi.number().min(0).strict().required().messages({
    'number.base': 'Percentage must be a number',
    'number.min': 'Percentage must be a positive number',
    'any.required': 'Percentage is required',
  }),
});

const validateProduct = (req, res, next) => {
  if(!req.body) throw new AppError('Promo id is required' ,400)
  const { error } = promoSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message ,400)
  }
  next();
};

module.exports = validateProduct;
