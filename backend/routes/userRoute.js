const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

//Register a user : "/register"
router.route("/register").post(registerUser);

//Login User
router.route("/login").post(loginUser);

//user forgot password
router.route("/password/forgot").post(forgotPassword);

//User Details
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//Update PASSWORD whose are login
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
//Update Profiles whose are login
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//Logout User
router.route("/logout").get(logoutUser);

// GET ALL USERS : ADMIN ONLY
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

// GET SINGLE USER,  //UPDATE USER ROLE,  //DELETE USER   : ADMIN ONLY
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

//UPDATE USER ROLE : ADMIN ONLY

// router exports
module.exports = router;
