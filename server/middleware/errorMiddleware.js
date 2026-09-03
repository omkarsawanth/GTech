/**
 * Central error handler — must be the last app.use() in server.js
 */
export const errorHandler = (err, req, res, next) => {
  console.error('[GTech API Error]', err.message || err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      // Never expose raw stack traces to the client, but deliver the actionable userMessage
      message: err.userMessage || err.message || 'An internal server error occurred. Please try again.',
    },
  });
};

/**
 * 404 handler — mount BEFORE errorHandler, AFTER all routes
 */
export const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.statusCode = 404;
  err.code = 'NOT_FOUND';
  err.userMessage = `The requested endpoint does not exist.`;
  next(err);
};
