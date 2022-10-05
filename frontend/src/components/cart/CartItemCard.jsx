import React from "react";
import { NavLink } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <>
      <div className="cartItemCol col-3 mt-2 ms-0 me-2 d-flex justify-content-start align-items-center">
        {/* <div className="col-5 mx-auto"> */}
        <img
          src={item.image}
          alt="productCartImage"
          className="cartItemCartImg rounded-3"
        />
        {/* </div> */}
        {/* <div className="col-4 mx-auto"> */}
        <div className="d-flex  flex-column justify-content-start align-items-center ms-1">
          <NavLink
            className="cartItemCardLink nav-link text-nowrap btn btn-outline-primary text-dark border-0 "
            to={`/product/${item.productId}`}
          >
            {item.name}
          </NavLink>
          <p className="mt-1 border p-3 pb-1">{`Price: ₹${item.price}/-`} </p>
          <p
            className="btn btn-outline-danger"
            onClick={() => deleteCartItems(item.productId)}
          >
            Remove
          </p>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
