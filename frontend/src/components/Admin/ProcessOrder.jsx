import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { NavLink, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import AccountTreeIon from "@material-ui/icons/AccountTree";
const ProcessOrder = () => {
  const dispatch = useDispatch();
  const { error, loading, order } = useSelector(
    (state) => state.orderDetailsReducer
  );
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.OrderReducer
  );
  const { id } = useParams();
  const alert = useAlert();

  const [status, setStatus] = useState("");
  // const { shippingInfo, cartItems } = useSelector((state) => state.cartReducer);
  //useEfect

  // UPDATE ORDER SUBMIT HANDLER (in this update order status)
  const orderStatusSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrder(id, status));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order is Updated Successfully...");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, updateError, alert, isUpdated, id]);

  return (
    <>
      <MetaData title={"Update Orders - Admin"} />
      <div className="dashBoardContainer container-fluid  p-2 ">
        <div className="row ">
          {/* side bar col which is inside the sidebar */}
          <SideBar />

          {/* productslist col */}
          <div className="col-md-8 col-12 col-md-9 mx-auto mt-2 ">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="row">
                  <div className="col-10 col-md-7 m-auto border-end border-bottom">
                    <div className="col-12  my-1 d-flex flex-column   p-4  ">
                      <h3 className="">Shipping Info</h3>
                      <div
                        className="grossTotalBorderTop  rounded-3 mb-3"
                        style={{ height: "2px" }}
                      ></div>
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
                      <hr />
                    </div>
                    {/* order payment info */}
                    <div className="col-12  mx-auto">
                      <h2 className="">Payments Info</h2>
                      <div
                        className="grossTotalBorderTop  rounded-3 mb-3"
                        style={{ height: "2px" }}
                      ></div>
                      <div className=" d-flex  ">
                        <h4 className="">Total Amount:</h4>
                        <span className="mx-3 fs-4">
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
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "Paid"
                            : "Not Paid"}
                        </h4>
                      </div>
                    </div>
                    <hr />
                    {/* order status info */}
                    <div className="col-12 mx-auto ">
                      <h2 className="">Order Status</h2>
                      <div
                        className="grossTotalBorderTop  rounded-3 mb-3"
                        style={{ height: "2px" }}
                      ></div>
                      <div className=" d-flex   ">
                        <h4
                          className={
                            order.orderStatus &&
                            order.orderStatus === "Delivered"
                              ? "text-success "
                              : "text-danger"
                          }
                        >
                          {order.paymentInfo && order.orderStatus}
                        </h4>
                      </div>
                    </div>
                    <hr />
                    <div className=" col-12 mx-auto ">
                      {/* order items  */}
                      <h2>Order Items</h2>
                      <div
                        className="grossTotalBorderTop  rounded-3 mb-3"
                        style={{ height: "2px" }}
                      ></div>
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
                                  to={`/product/${item.id}`}
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
                    </div>
                    <hr />
                  </div>
                  <div
                    className="col"
                    style={{
                      display:
                        order.orderStatus === "Delivered" ? "none" : "block",
                    }}
                  >
                    <form
                      className=" d-flex flex-column justify-content-center align-items-center gap-3"
                      onSubmit={orderStatusSubmitHandler}
                      encType="multipart/form-data"
                    >
                      <h2 className="text-center text-body my-2 border-bottom border-3 w-50">
                        Update Orders
                      </h2>
                      {/* ORDER STATUS CATEGORY  */}
                      <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 border-bottom">
                        {/* <CategoryIcon className="fs-2 text-body mx-3" /> */}
                        <AccountTreeIon className="fs-2 text-body mx-3" />
                        <select
                          className="border-0 outline-0 fs-5"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                          style={{ outline: "none" }}
                        >
                          <option>Choose Category</option>"
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}
                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                      </div>
                      {/* BUTTON */}
                      <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 ">
                        <input
                          className="  btn btn-danger w-50 "
                          type="submit"
                          value="Update"
                          disabled={
                            loading
                              ? true
                              : false || status === ""
                              ? true
                              : false
                          }
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
