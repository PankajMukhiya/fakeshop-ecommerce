import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { MetaData } from "../../components";
import CheckOutSteps from "./CheckOutSteps";
const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cartReducer);

  //subtotal price count
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  //   shipping charge
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  // tax
  const tax = subtotal * 0.18;
  //total price
  const totalPrice = subtotal + shippingCharges + tax;
  //   user address
  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country} `;
  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment"); 
  };
  return (
    <>
      <MetaData title={"FakeShop: Confirm Order"} />
      <CheckOutSteps activeStep={1} />
      {/* MAIN CONTAINER */}
      <div className="container-fluid ">
        {/* SHIPPING INFO  */}
        <div className="row my-3">
          {/* user Info */}
          <div className="col-12 col-md-8 my-1 d-flex flex-column border-end  p-4  ">
            <h3 className="text-center">Shipping Info</h3>
            <div
              className="grossTotalBorderTop col-12 rounded-3 mb-3"
              style={{ height: "2px" }}
            ></div>
            <div className="d-flex ">
              <h4 className="">Name:</h4>
              <span className="mx-3 ">{user.name}</span>
            </div>
            <div className=" d-flex  ">
              <h4 className="">Phone:</h4>
              <span className="mx-3">{shippingInfo.phoneNo}</span>
            </div>
            <div className=" d-flex  ">
              <h4 className="">Address:</h4>
              <span className="mx-3">{address}</span>
            </div>
            <div
              className="grossTotalBorderTop col-12 rounded-3 m-3"
              style={{ height: "2px" }}
            ></div>

            {/* carts Items */}
            <h3 className="text-center">Your Cart Items</h3>
            <div
              className="grossTotalBorderTop col-12 rounded-3 m-3"
              style={{ height: "2px" }}
            ></div>
            {cartItems &&
              cartItems.map((item) => {
                return (
                  <div className="" key={item.productId}>
                    <div
                      className="col-12 my-1 d-flex justify-content-center align-items-center"
                      key={item.productId}
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
                    <div
                      className="grossTotalBorderTop col-12 rounded-3 mb-3"
                      style={{ height: "1px", backgroundColor: "darkgray" }}
                    ></div>
                  </div>
                );
              })}
          </div>
          {/* ORDER SUMMARY  */}
          <div className="col-12 col-md-4 mx-auto my-1  border-start p-4 d-flex justify-content-center align-items-center ">
            <div className="">
              <h3 className="text-center">Order Summerry</h3>
              <div
                className="grossTotalBorderTop col-12 rounded-3 mb-3"
                style={{ height: "2px" }}
              ></div>
              <div className="d-flex ">
                <h4 className="">SubTotal:</h4>
                <span className=" fs-5 mx-3">₹{subtotal}/-</span>
              </div>
              <div className="d-flex ">
                <h4 className="">Shipping Charges:</h4>
                <span className=" fs-5 mx-3">₹{shippingCharges}/-</span>
              </div>
              <div className="d-flex ">
                <h4 className="">GST:</h4>
                <span className=" fs-5 mx-3">₹{tax}/-</span>
              </div>
              <div className="d-flex ">
                <h4 className="">Total:</h4>
                <span className=" fs-5 mx-3">₹{totalPrice}/-</span>
              </div>
              {/* button */}
              <div className="mt-4 d-flex justify-content-center align-items-center ">
                <input
                  className=" signInBtn btn btn-danger btn-outline-success text-white w-75 p-2 "
                  type="submit"
                  value="Proceed to Payment"
                  onClick={proceedToPayment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
