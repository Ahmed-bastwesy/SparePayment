const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
  
    res.status(statusCode).json({
      error: err.message || 'Internal Server Error',
      status: statusCode
    });
  };
  
  module.exports = errorHandler;
  