// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 400;
  const errMsg = err.message || "Something went wrong";
  return res.status(errStatus).json({
    data:"",
    error: errMsg,
  });
};

export default errorHandler;
