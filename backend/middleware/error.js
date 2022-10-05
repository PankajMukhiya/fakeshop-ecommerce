const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //CASTERROR
  if (err.name === "CastError") {
    const message = `Resource Not Found !. INVALID: ${err.path} `;
    err = new ErrorHandler(message, 400);
  }

  //MONGOOSE DUPLICATE KEY ERROR
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(
      err.keyValue
    )} Entered ! , So Please Enter Unique Value...`;
    err = new ErrorHandler(message, 400);
  }
  //WRONNG JWT ERROR
  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is Invalid... , Please Try Again...";
    err = new ErrorHandler(message, 400);
  }

  //JWT EXPIRE ERROR
  if (err.name === "TokenExpiredError") {
    const message = "Json Web Token is Expired ! , Please Try Again...";
    err = new ErrorHandler(message, 400);
  }

  //sent these err message if above condition is matched
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
  console.log(err.message);
  // console.log(err);
};
