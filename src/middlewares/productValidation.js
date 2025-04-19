const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.empty': 'Product name is required',
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
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateProduct;
