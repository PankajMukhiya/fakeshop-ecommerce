const UserModel = require("../models/userModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsycError = require("../middleware/catchAsycError");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");
// create or Register a new User
exports.registerUser = catchAsycError(async (req, res, next) => {
  //adding cloudinary
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });
  // console.log(req.body);
  const { name, email, password, avatar } = req.body;
  const user = await UserModel.create({
    name,
    email,
    password,
    avatar,
    // avatar: {
    // public_id: "myCloud.public_id",
    // url: "myCloud.secure_url",
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // },
    // avatar: "myCloud.secure_url"
  });
  //genetating token when a user registered
  sendToken(user, 201, res);

  /*above is better way
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
    user,
  });
  */
  //aesehi
  if (user) {
    console.log("Register a new User Successfully...");
  }
});

//Login User
{
  /*
exports.loginUser = catchAsycError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given email and password both
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email and Password", 400));
  }
  //Checking  user exist or not.......
  // const user = await UserModel.findOne({ email }).select("+password");
  const user = await UserModel.findOne({ email });
  //if user not exist
  if (!user) {
    return next(new ErrorHander("You have entered Invalid Emial ", 401));
  }

  //if user exist then match the password wiht the database password and then make user login
  const isPasswordMatched = user.comparePassword(password); //passing parameter of user entered password which is checking password matched
  if (!isPasswordMatched) {
    return next(new ErrorHander("You have entered Invalid Password", 401));
  }

  //if also password matched then login and generate token
  //genetating token when a user login
  sendToken(user, 200, res);
  //  above is better way to do
  // const token = user.getJWTToken();
  // res.status(200).json({
  //   success: true,
  //   token,
  // });
});
*/
}
// Login User another way
exports.loginUser = catchAsycError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander("please enter email or password", 400));
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new ErrorHander("invalid email", 400));
  } else {
    const passwordMatching = await bcrypt.compare(password, user.password);
    if (!passwordMatching) {
      return next(new ErrorHander("invalid password", 400));
    } else {
      sendToken(user, 200, res);
      console.log("login successfully");
    }
  }
});

//Logout User

exports.logoutUser = catchAsycError(async (req, res, next) => {
  // if (!req.params.cookes) {
  //   return next(
  //     new ErrorHander("token not present so kindly make login and then logout ")
  //   );
  // } else {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: "true",
    message: "Logged Out Successfully",
  });
  console.log("Logged Out Successfully");
  // }
});

//forgotPassword
exports.forgotPassword = catchAsycError(async (req, res, next) => {
  // const { email } = req.body;
  // const user = await UserModel.findOne(req.body.email);
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("User Not Found !", 404));
  }
  //then get or generate reset password token
  const resetToken = user.getResetPasswordToken();
  //here the restPasswordToken and resetPasswordExpire are added not save so save the user
  await user.save({ validateBeforeSave: false });

  //now  send the email to user in which have rest password link , message , ...
  // creating forgot link where user reset the password

  // const resetPasswordUrl = `http://localhost/api/v1/password/reset/${resetToken}`;
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password reset Token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it.`;

  try {
    //sending the email here sendEmail function is
    await sendEmail({
      // these are the agrumaents
      email: user.email,
      subject: `FakeShop Password Recovery`,
      message,
    });
  } catch (error) {
    //if any error accured the above the resetPasswordToken and expire are save so undefine that value
    user.resetPasswordToken = undefined;
    user.resetPasswordeExpire = undefined;
    // and then save the user
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
  //
});

//User Details
exports.getUserDetails = catchAsycError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);

  res.status(200).json({
    message: "True",
    user,
  });
});

//change or Update Password
exports.updatePassword = catchAsycError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  // console.log(user);
  //here user entered oldPassword, newPassword, and  confirmPassword in req.body
  const { oldPassword, newPassword, confirmPassword } = req.body;
 
  const isPasswordMatched = await user.comparePassword(oldPassword);

  // bcrypt.compare(oldPassword, user.password, function (err, isMatch) {
  //   if (err) {
  //     return next(new ErrorHander("Old Password is Incorrect", 400));
  //   }
  //   if (isMatch) {
  //     return isMatch;
  //   }
  // });

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old Password is Incorrect", 400));
  }
  if (newPassword !== confirmPassword) {
    return next(new ErrorHander("Confirm Password doesn't Matched", 400));
  }
  //and now update the password
  user.password = confirmPassword;
  // and now save the user
  await user.save();
  sendToken(user, 200, res);
  // res.status(200).json({
  //   success: true,
  //   message: "Password Updateed Successfully...",
  // });
});

//UDATE PROFILES like neme, avatar, email except password
exports.updateProfile = catchAsycError(async (req, res, next) => {
  //creating an object which is passing to findBYIdAandUpdate
  // const { name, email } = req.body;
  // console.log(name, email);
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  console.log(user);
  res.status(200).json({
    success: true,
    message: "Updateed Successfully...",
  });
});

// GET ALL USERS : ADMIN ONLY
exports.getAllUsers = catchAsycError(async (req, res, next) => {
  const users = await UserModel.find();
  if (!users) {
    return next(new ErrorHander("Internal Server Error Accured...", 500));
  }
  res.status(200).json({
    success: true,
    users,
  });
});
// GET SINGLE USER : ADMIN ONLY
exports.getSingleUser = catchAsycError(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHander(`User does not exist with id : ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//UPDATE USER ROLE : ADMIN ONLY
exports.updateUserRole = catchAsycError(async (req, res, next) => {
  //creating an object which is passing to findBYIdAandUpdate
  const newUserDataWithRole = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role, //added role here
  };
  console.log(req.params);
  // use req.body.id instead of req.params.id  becoz the user id fetch from body not in parmas
  // let user = await UserModel.findById()
  // await UserModel.findByIdAndUpdate(req.params.id, newUserDataWithRole, {
  await UserModel.findByIdAndUpdate(req.body.id, newUserDataWithRole, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Role Updateed Successfully...",
  });
});

//DELETE USER : ADMIN ONLY
exports.deleteUser = catchAsycError(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with id: ${req.params.id} `),
      400
    );
  }
  // removing user image from cloudinary  and then remove user
  const imageId = user.avatar.public_id;
  if (imageId) {
    await cloudinary.v2.uploader.destroy(imageId);
  }

  //if user exist then remve that user
  await user.remove();

  res.status(200).json({
    success: true,
    message: "Deleted Successfully...",
  });
});
