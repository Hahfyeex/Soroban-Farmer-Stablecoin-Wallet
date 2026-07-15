export function asyncHandler(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

export function notFoundHandler(_req, res) {
  res.status(404).json({ error: 'Not found' });
}

export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  if (status >= 500) {
    console.error(err);
  }
  res.status(status).json({
    error: status >= 500 ? 'Internal server error' : err.message,
  });
}
