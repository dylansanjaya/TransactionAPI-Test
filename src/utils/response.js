export const successResponse = (res, message, code = 200, status = 0, data = null) => {
  return res.status(code).json({
    status: status,
    message,
    data
  });
  };

export const errorResponse = (res, message, code = 500, status = 102, data = null) => {
  return res.status(code).json({
    status: status,
    message,
    data
  });
};