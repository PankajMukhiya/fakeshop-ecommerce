import React from "react";
import StarIcon from "@material-ui/icons/Star";
import ReactRating from "react-rating";
import { images } from "../../assets";

const ReviewCard = ({ review }) => {
  return (
    <>
      <div className="col-10 col-md-6 col-lg-4 mx-2 gy-3 d-flex flex-column justify-content-center align-items-center border border-2 p-3 ">
        <img src={images.Profile} alt="user" style={{ width: "10vmax" }} />
        <p className="mb-0 fs-3">{review.name} </p>
        {/* <ReactStars {...options} /> */}
        <ReactRating
          initialRating={review.rating}
          readonly={true}
          emptySymbol={<StarIcon className="text-secondary fs-1" />}
          fullSymbol={<StarIcon className="text-warning fs-1" />}
        />
        <p className="mt-2 fs-5">{review.comment} </p>
      </div>
    </>
  );
};

export default ReviewCard;
