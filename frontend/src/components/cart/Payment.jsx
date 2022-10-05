import React, { useEffect, useRef } from "react";
import { MetaData } from "../../components";
import CheckOutSteps from "./CheckOutSteps";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction";

//
const Payment = () => {
  //
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.user);

  const { error } = useSelector((state) => state.newOrderReducer);
  const alert = useAlert();
  const paymentBtn = useRef(null);
  const navigate = useNavigate();

  // orderInfo save in sessionStorage
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  //payment data
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  //order : which is sent when the payment will be succeeded
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingCharges: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  // paymentSubmitHandler
  const paymentSubmitHandler = async (e) => {
    e.preventDefault();
    paymentBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/payment", paymentData, config);
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        paymentBtn.current.disabled = false;
        alert.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };
        dispatch(createOrder(order));
        navigate("/success");
      } else {
        alert.error("There is some issue while processing payment");
      }
    } catch (error) {
      paymentBtn.current.disabled = false;
      //   alert.error(error.message);
      alert.error(error.response.data.message);
    }
  };

  //useeffect
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData titile={"Payment"} />
      <CheckOutSteps activeStep={2} />

      {/* i am using the classname of login or signup component class  */}
      <div
        id="loginSignUpContainer"
        className="container-fluid mt-3 p-3 d-flex justify-content-center align-items-center "
      >
        <div id="loginSignUpBox" className="border border-2 rounded p-4">
          <div id="login_signUp_toggle" className="p-3">
            <div className="d-flex flex-column justify-content-evenly align-items-center">
              <h3 className="login_ text-center ">Card Info</h3>
              <hr className="hrTag" />
            </div>
          </div>
          {/*   */}
          <form id="loginFormId" className="" onSubmit={paymentSubmitHandler}>
            <div id="loginRow" className="row py-4 ">
              {/* credit card number */}
              <div className="col-10 m-auto d-flex mb-2">
                <label htmlFor="" className="form-label me-4 ">
                  <CreditCardIcon className="fs-2 text-body" />
                </label>
                <CardNumberElement className="form-control border-0 border-bottom" />
              </div>

              {/* credit card expiry*/}
              <div className="col-10 m-auto d-flex mb-2">
                <label htmlFor="" className="form-label me-4 ">
                  <EventIcon className="fs-2 text-body" />
                </label>
                <CardExpiryElement className="form-control border-0 border-bottom" />
              </div>
              {/*  vpn key */}
              <div className="col-10 m-auto d-flex mb-2">
                <label htmlFor="" className="form-label me-4 ">
                  <VpnKeyIcon className="fs-2 text-body" />
                </label>
                <CardCvcElement className="form-control border-0 border-bottom" />
              </div>

              <div className="mt-2 d-flex justify-content-center align-items-center">
                <input
                  className=" signInBtn btn btn-danger  w-75  "
                  type="submit"
                  value={`Pay  - ₹${orderInfo && orderInfo.totalPrice}/-`}
                  ref={paymentBtn}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;

// card no. for test payment : 4242424242424242
