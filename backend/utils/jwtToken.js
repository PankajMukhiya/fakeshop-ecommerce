// this function is made becoz of the repeated the same code when the token generated and sending the respose

//create token and saving in cookie
// for config.env file
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config.env" });
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
