import React from "react";
import CheckCircle from '@material-ui/icons/CheckCircle'
import { NavLink } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <>
      <div className="empty_cart_container container-fluid  d-flex flex-column justify-content-center align-items-center">
        <div className="empty_cart_row row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <CheckCircle className="empty_cart_icon text-success" />
            <h2 className="my-2 text-center">Your Order has been Placed Successfully...</h2>
            <NavLink
              to="/orders"
              className="nav-link btn btn-success rounded-pill text-white w-50 my-2"
            >
              View Your Orders
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
