const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //for password hashing
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config.env" });
}
//user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    minlength: [4, "Name should have more than 4 characters "],
    maxlength: [30, "Name should have more than 30 characters "],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: [true, "Email is already Exist...!"],
    validate: [validator.isEmail, "Please Enter the Valid Email Address"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [8, "Password should be greater than 8 characters "],
    // select: false,
  },

  avatar: {
    // type: String,
    // required: true,
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//user password hasshing before saving in database
userSchema.pre("save", async function (next) {
  //here not using arrow function becoz of the this keyword not supported in arrow func
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// compare password ween login
userSchema.methods.comparePassword = function (userEnterPassword) {
  return bcrypt.compare(userEnterPassword, this.password);
};

//Generating Reset Password Token : methods
userSchema.methods.getResetPasswordToken = function () {
  //Generating token
  const resetToken = crypto.randomBytes(20).toLocaleString("hex");

  //hashing and adding resetPasswordToken to UserSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //also added the resetPasswordExpire
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //means : 15min
  return resetToken;
};

//user Model and export
const UserModel = new mongoose.model("User", userSchema);
module.exports = UserModel;
