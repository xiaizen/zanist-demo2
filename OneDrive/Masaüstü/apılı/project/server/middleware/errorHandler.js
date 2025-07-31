const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    status: 500,
    message: 'Internal Server Error'
  };

  // Supabase errors
  if (err.code) {
    switch (err.code) {
      case '23505': // Unique violation
        error = {
          status: 409,
          message: 'Resource already exists'
        };
        break;
      case '23503': // Foreign key violation
        error = {
          status: 400,
          message: 'Invalid reference to related resource'
        };
        break;
      case '42501': // Insufficient privilege
        error = {
          status: 403,
          message: 'Insufficient permissions'
        };
        break;
    }
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error = {
      status: 400,
      message: 'Validation failed',
      details: err.details
    };
  }

  // Custom application errors
  if (err.status) {
    error = {
      status: err.status,
      message: err.message
    };
  }

  res.status(error.status).json({
    error: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    ...(error.details && { details: error.details })
  });
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  errorHandler,
  asyncHandler
};