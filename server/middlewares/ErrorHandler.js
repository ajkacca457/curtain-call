import ErrorResponse from "../utils/ErrorHandle.js";


const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `The show ${error.value} is invalid. It is not the right Id.`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = "The show already exists. Avoid duplication of the same show";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(item => item.message);
    error = new ErrorResponse(message, 400);
  }

  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: error.message || "Server error",
  });
};


export default errorHandler;