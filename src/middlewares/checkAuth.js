var jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

const checkAuth = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      req.user = jwt.verify(req.headers.authorization, "Secret");
      next()
    } catch (err) {
      return next(new AppError('Invalid or expired token', 401));
    }
  } else {
    throw new AppError("Access Token is required", 400)
  }
};

module.exports = checkAuth;
