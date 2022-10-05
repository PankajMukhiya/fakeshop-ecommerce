import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import ReactRating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  createNewReview,
  getProductDetails,
} from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./productDetails.css";
import ReviewCard from "./ReviewCard";
import { addItemsToCart } from "../../actions/cartAction";
import StarIcon from "@material-ui/icons/Star";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  styled,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  //access id using useParams
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  // console.log(product)
  const { success, error: reviewError } = useSelector(
    (state) => state.newReviewReducer
  );

  // React Rating OPTIONS
  const options = {
    className: "reactStar",
    initialRating: product.ratings,
    readOnly: true,
    emptySymbol: <StarIcon className="text-secondary fs-1" />,
    fullSymbol: <StarIcon className="text-warning fs-1" />,
  };
  // material ui Rating style
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ffc107",
    },
    "& .MuiRating-iconHover": {
      color: "#ff9607f7",
    },
  });

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);
  // eslint-disable-next-line
  const [hover, setHover] = React.useState(-1);
  const [comment, setComment] = useState("");
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    let qty = quantity + 1;
    setQuantity(qty);
  };

  const decreseQuantity = () => {
    if (1 >= quantity) return;
    let qty = quantity - 1;
    setQuantity(qty);
  };
  // addToCartHandler
  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = (e) => {
    open ? setOpen(false) : setOpen(true);
  };

  // submitReviewHandler
  const submitReviewHandler = () => {
    dispatch(createNewReview(rating, comment, id));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Added Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id)); //in frontend use req.params.id instead of match.params.id
  }, [dispatch, id, error, alert, success, reviewError]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${product.name} -- FakeShop`} />
          <div className="container-fluid ">
            <div className="row productDetailsRow mx-auto ">
              {/* right col or img carousel */}
              <div
                id="leftCol"
                className="col-10 mx-auto col-sm-5 col-md-4 mt-3"
              >
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {product.images &&
                      product.images.map((items, index) => {
                        return (
                          <div className="carousel-item active " key={index}>
                            <img
                              src={items.url}
                              className="card-img-top rounded rounded-5 d-block w-100 "
                              alt={`${index}+1 slide`}
                            />
                          </div>
                        );
                      })}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              {/* right col details of product */}
              <div
                id="rightCol"
                className="col-10 mx-auto col-sm-5 col-md-4 mt-3"
              >
                <div className="">
                  <div className="">
                    <h5 className="fs-3"> {product.name} </h5>
                    <h6 className="text-muted ">Product # {product._id}</h6>
                    <hr />
                    <div className="d-flex justify-content-start align-items-center">
                      <ReactRating {...options} readonly={true} />
                      <span className="text-body ms-2 fs-4 text-muted">
                        ( {product.numOfReviews} Reviews)
                      </span>
                    </div>
                    <hr />
                    <h5 className="fs-2 ms-1">{`₹${product.price}`}</h5>
                    <div className="d-flex  mt-2 align-items-center">
                      <span
                        className="btn btn-outline-secondary "
                        onClick={decreseQuantity}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </span>
                      <span className="btn bg-white ">{quantity} </span>
                      <span
                        className="btn btn-outline-success"
                        onClick={increaseQuantity}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </span>
                      <button
                        className="btn btn-danger rounded-pill mx-3"
                        disabled={product.stock < 1 ? true : false}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <hr />
                    <h5 className="fs-4">
                      Status:
                      <span
                        className={
                          product.stock > 1 ? "text-success" : "text-danger"
                        }
                      >
                        {product.stock > 1 ? " InStock" : " Out Of Stock"}
                      </span>
                    </h5>
                    <hr />
                    <h5 className="fs-4">Description :</h5>
                    <h6 className="text-muted ">{product.description}</h6>
                    <button
                      className="btn btn-danger rounded-pill mt-5 mb-2 btn-outline-success text-white"
                      onClick={submitReviewToggle}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="mb-5 mt-3" />
          <h2 className="text-center my-3 text-decoration-underline">
            Reviews
          </h2>
          {/* DIALOG BOX  */}
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle className="text-center fs-1 ">
              Submit Review
            </DialogTitle>
            <DialogContent className="submitDialogContent d-flex flex-column justify-content-center align-items-cente">
              <StyledRating
                size="large"
                name="rating"
                value={rating}
                onChange={(e, newRating) => {
                  setRating(e.target.value);
                  // console.log(e.target.value);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                icon={
                  <StarIcon fontSize="inherit" className="fs-1 text-warning " />
                }
                emptyIcon={
                  <StarIcon
                    fontSize="inherit"
                    className="fs-1 text-secondary"
                  />
                }
              />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-control mt-2"
                placeholder="Leave Your Comment"
                id="exampleFormControlTextarea1"
                rows="5"
                cols="50"
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={submitReviewToggle}>
                Cancel
              </Button>
              <Button color="primary" onClick={submitReviewHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className=" container-fluid ">
              <div className="row d-flex flex-nowrap overflow-auto">
                {product.reviews &&
                  product.reviews.map((review, i) => (
                    <ReviewCard review={review} key={i} />
                  ))}
              </div>
            </div>
          ) : (
            <h4 className="text-center text-muted">No Reviews Yet</h4>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
