const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsycError = require("./catchAsycError");


exports.isAuthenticatedUser = catchAsycError(async (req, res, next) => {
  const { token } = req.cookies; //when login user token stored in cookie
  //   console.log(token);
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
    //after the access the token then verify the token
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await UserModel.findById(decodedData.id);
  next();
});

//creating this function to check admin or not whose perform create, delete , update the products
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed ot access this resource`,
          403
        )
      ); 
    }
    next();
    // console.log("Product fetched by admin")

  };
};
