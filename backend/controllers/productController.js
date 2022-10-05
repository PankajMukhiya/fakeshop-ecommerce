const ProductModel = require("../models/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsycError = require("../middleware/catchAsycError");
const Apifeateures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// create a products : admin route :  "/product/new"
exports.createProduct = catchAsycError(async (req, res, next) => {
  //this is the id where as created by that id (admin)
  // console.log(req.body);
  req.body.user = req.user.id;
  
  const newProduct = await ProductModel.create(req.body);
  res.status(201).json({
    success: true,
    newProduct,
  });
  console.log("New Product Created...");
});

//Get  All product "/products"
exports.getAllProducts = catchAsycError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await ProductModel.countDocuments();
  const apiFeatures = new Apifeateures(ProductModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  // let products = await apiFeatures.query; //doing this becoz aplying price filter if product is less then pagination also show which is problem
  // let filteredProductsCount = products.length;
  //  await apiFeatures.pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
  console.log("products Fetched...");
});

{
  //  using without catchAsycError and ErrorHander
  // async (req, res) => {
  // try {
  //   const products = await ProductModel.find();
  //   res.status(200).json({
  //     success: true,
  //     products,
  //   });
  //   console.log("Fetched All Products");
  // } catch (error) {
  //   console.log(`ERROR in getProducts:--> ${error}`);
  // }
  // };
}

//Get single Product Details "/product/:id"

exports.getProductDetails = catchAsycError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) {
    console.log("(in getProductDetails) Product Not Found !");
    return next(new ErrorHander("Product Not Found !", 500));
  } else {
    res.status(200).json({
      success: true,
      product,
    });
    console.log("Fetched Single Product");
  }
});

//Get  All product  for admin "/admin/products"
exports.getAdminProducts = catchAsycError(async (req, res, next) => {
  const products = await ProductModel.find();
  res.status(200).json({
    success: true,
    products,
  });
  console.log("products Fetched by admin...");
});

// Update Product --- admin  : "/product/:id"
exports.updateProduct = catchAsycError(async (req, res, next) => {
  const product_id = req.params.id;
  const { newImages } = req.body;
  let product = await ProductModel.findById(product_id);
  if (!product) {
    console.log("(in updateProduct) Product not found !");
    return next(new ErrorHander("Product not found !", 500));
  } else {
    if (newImages !== undefined) {
      // DELETING PRODUCT IMAGES FROM CLOUDINARY
      for (let i = 0; i < product.images.length; i++) {
        const result = product.images[i].public_id;
        await cloudinary.v2.uploader.destroy(result);
      }
    }

    product = await ProductModel.findByIdAndUpdate(product_id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    console.log("Product Updated...");
  }
  res.status(200).json({
    success: true,
    Message: "Product Updated...",
    product,
  });
});

//Delete Product --admin : "/product/:id"
exports.deleteProuduct = catchAsycError(async (req, res, next) => {
  const product_id = req.params.id;
  let product = await ProductModel.findById(product_id);
  if (!product) {
    console.log("(in deleteProduct) Product Not Found !");
    return next(new ErrorHander("Product Not Found !", 500));
  } else {
    // DELETING PRODUCT IMAGES FROM CLOUDINARY
    for (let i = 0; i < product.images.length; i++) {
      const result = product.images[i].public_id;
      await cloudinary.v2.uploader.destroy(result);
    }

    await product.remove();
    console.log("Product Delete Successfully...");
    res.status(200).json({
      success: true,
      Message: "Product Delete Successfully...",
    });
  }
});

// CREATE NEW REVIEW OR UPDATE REVIEW
exports.createProductReview = catchAsycError(async (req, res, next) => {
  const { rating, comment, id: productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await ProductModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        // checking the user already revied or what?
        (rev.rating = rating), (rev.comment = comment); // if reviewed then change the rating and comment
      }
      console.log("Review is Updated Successfully...");
    });
  } else {
    product.reviews.push(review);
    //and also increase the num of reviews
    product.numOfReviews = product.reviews.length;
    // and also make over all ratings or average rating
  }
  let total = 0; //adding all rating in a variable
  product.reviews.forEach((rev) => {
    total += rev.rating;
  });
  product.ratings = total / product.reviews.length; // avg ratings or overall ratings
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Review is Added Successfully...",
  });
});

// GET ALL REVIEW OF SINGLE PRODUCT
exports.getProductReviews = catchAsycError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander("Product not Found !", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// DELETE PRODUCT REVIEW
exports.deleteReview = catchAsycError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHander("Product not Found !", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId.toString()
  );

  let total = 0; //adding all rating in a variable total means that sum of user individual give rating not
  // and ratings means that is avg rating of that product

  reviews.forEach((rev) => {
    total += rev.rating;
  });

  // const ratings = total / reviews.length; //update avg ratings
  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = total / reviews.length;
  }
  const numOfReviews = reviews.length; //update num of review made by users

  // and last update the product
  await ProductModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    message: "Review Deleted Successfull...",
  });
});

//example
// exports.example = catchAsycError(async (req, res, next) => {
//   return;
// });

// Delete All Product -admin : "/products"
// exports.deleteAllProuducts = catchAsycError( async (req, res) => {
//   try {
//     const products = await ProductModel.find();
//     console.log(products);
//     if (!products) {
//       console.log("Product Not Found !");
//       return res.status(500).json({
//         success: false,
//         Message: "Product Not Found !",
//       });
//     } else {
//       await products.remveAll();
//       console.log("All Product Delete Successfully...");
//       res.status(200).json({
//         success: false,
//         Message: "All Product Delete Successfully...",
//       });
//     }
//   } catch (error) {
//     console.log(`ERROR in deleteAllProducts:--> ${error}`);
//   }
// });

///
