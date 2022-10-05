import React from "react";
import { Link } from "react-router-dom";
import ReactRating from "react-rating";
import StarIcon from "@material-ui/icons/Star";

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="col-6 col-md-4 col-lg-3 mx-auto gy-5  ">
        <Link
          className="productCard card text-decoration-none  p-2"
          to={`/product/${product._id}`}
        >
          <img
            className="card-img-top "
            src={product.images[0].url}
            alt={product.name}
          />
          <p className="text-dark fs-3 ms-1 mt-0 pt-0">{product.name}</p>
          <div className="text-danger d-flex justify-content-start align-items-center ">
            <ReactRating
              initialRating={product.ratings}
              readonly={true}
              emptySymbol={<StarIcon className="text-secondary fs-3  " />}
              fullSymbol={<StarIcon className="text-warning fs-3" />}
            />
            <span className="text-body ms-2">
              ({product.numOfReviews} Reviews)
            </span>
          </div>

          <span className="text-danger fs-4 ms-1">{`₹${product.price}`}</span>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
