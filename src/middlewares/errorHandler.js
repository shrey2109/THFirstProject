const errorHandler = (err, req, res) => {
  const errStatus = err.statusCode || 400;
  const errMsg = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
};

export default errorHandler;
