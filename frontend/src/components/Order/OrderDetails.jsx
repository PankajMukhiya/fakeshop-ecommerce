import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearErrors, getOrderDetails } from "../../actions/orderAction";
import { Loader, MetaData } from "../../components";
import "./Order.css";
const OrderDetails = () => {
  const { error, loading, order } = useSelector(
    (state) => state.orderDetailsReducer
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, alert, id]);

  return (
    <>
      <MetaData title={`Order Details`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="container orderDetailsContainer">
          <h6 className="text-danger text-nowrap text-center mt-3 fs-5">
            Order #{order._id}
          </h6>
          <hr />
          <div className="row">
            {/* order shipping info */}
            <div className="col-8 mx-auto mb-3">
              <h2>Shipping Info</h2>
              <hr />
              <div className="d-flex ">
                <h4 className="">Name:</h4>
                <span className="mx-3 ">
                  {order.userId && order.userId.name}
                </span>
              </div>
              <div className=" d-flex  ">
                <h4 className="">Phone:</h4>
                <span className="mx-3">
                  {order.shippingInfo && order.shippingInfo.phoneNo}
                </span>
              </div>
              <div className=" d-flex  ">
                <h4 className="">Address:</h4>
                <span className="mx-3">
                  {order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode},${order.shippingInfo.countrt},`}
                </span>
              </div>
            </div>
            <hr />
            {/* order payment info */}
            <div className="col-8  mx-auto mb-3">
              <h2>Payments Info</h2>
              <hr />
              <div className=" d-flex  ">
                <h4 className="">Amount:</h4>
                <span className="mx-3">
                  {order.totalPrice && `₹${order.totalPrice}/-`}
                </span>
              </div>
              <div className=" d-flex  ">
                <h4
                  className={
                    order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "text-success "
                      : "text-danger "
                  }
                >
                  {order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "Paid"
                    : "Not Paid"}
                </h4>
              </div>
            </div>
            <hr />
            {/* order status info */}
            <div className="col-8 mx-auto mb-3">
              <h2>Order Status</h2>
              <hr />
              <div className=" d-flex  ">
                <h4
                  className={
                    order.orderStatus && order.orderStatus === "Delivered"
                      ? "text-success "
                      : "text-danger"
                  }
                >
                  {order.paymentInfo && order.orderStatus}
                </h4>
              </div>
            </div>
            <hr />
            {/* order items  */}
            <h2>Order Items</h2>

            {order.orderItems &&
              order.orderItems.map((item) => {
                return (
                  <div
                    className="col-10 d-flex justify-content-between align-items-center mb-3"
                    key={item._id}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        className=" cartItemCartImg rounded-3"
                        src={item.image}
                        alt="productImg"
                        style={{ width: "5rem" }}
                      />
                      <NavLink
                        className="nav-link text-body btn btn-outline-info ms-2"
                        to={`/product/${item.productId}`}
                      >
                        {item.name}
                      </NavLink>
                    </div>
                    <div className=" mx-5">
                      <span className="text-center">
                        {item.quantity} X ₹{item.price}/- =
                        <b>₹{item.price * item.quantity}/- </b>
                      </span>
                    </div>
                  </div>
                );
              })}
            <hr />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
