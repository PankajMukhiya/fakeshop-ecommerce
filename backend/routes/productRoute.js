const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProuduct,
  getProductDetails,
  // deleteAllProuducts,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// ADMIN ONLY: ""/admin/product/id" || CREATE PRODUCTS
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// ADMIN ONLY: ""/admikn/products" || get PRODUCTS
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

// ADMIN ONLY: ""/admin/product/id" || UPDATE, DELETE PRODUCT
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProuduct);

//GET ALL PRODUCTS DETAILS : LOGGED USER OR LOGGED OUT USER
// router.get("/products", getAllProducts)
router.route("/products").get(getAllProducts);
// .delete(deleteAllProuducts)
//GET PRODUCT DETAILS : LOGIN USER
router.route("/product/:id").get(getProductDetails);

//REVIEW PRODUCTS
router.route("/review").put(isAuthenticatedUser, createProductReview);

//PRODUCT REVIEWS || DELETE REVIEW
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
