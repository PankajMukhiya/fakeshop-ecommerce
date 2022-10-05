import React, { useEffect, useState } from "react";
import { MetaData } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { shippingInfoAction } from "../../actions/cartAction";
import { Country, State } from "country-state-city";
import PublicIcon from "@material-ui/icons/Public";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PinDrop from "@material-ui/icons/PinDrop";
import CallIcon from "@material-ui/icons/Call";
import HomeIcon from "@material-ui/icons/Home";
import ApartmentIcon from "@material-ui/icons/Apartment";
import CheckOutSteps from "./CheckOutSteps";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  //   address info state
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  useEffect(() => {}, []);

  // shippingSubmit
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length > 10 || phoneNo.length < 10) {
      alert.error("Phone Number should be 10 digit");
    } else {
      dispatch(
        shippingInfoAction({ address, city, state, country, phoneNo, pinCode })
      );
      navigate("/order/confirm");
    }
  };
  return (
    <>
      <MetaData title={"FakeShop: Shipping Details"} />
      <CheckOutSteps activeStep={0} />
      <>
        <div
          id="loginSignUpContainer"
          className="container-fluid mt-3 p-3  d-flex justify-content-center align-items-center "
        >
          <div
            id="loginSignUpBox"
            className="border border-2 rounded p-4 "
            style={{ height: "70vh" }}
          >
            <div className="p-3">
              <div className="d-flex flex-column justify-content-evenly align-items-center">
                <h3 className="register_ text-center ">Shipping Details</h3>
                <hr className="hrTag" />
              </div>
            </div>
            {/* SIGNUP  */}
            <form
              id="registerFormId"
              className=""
              onSubmit={shippingSubmit}
              encType="multipart/form-data"
            >
              <div id="signUpRow" className="row py-4 ">
                {/* address input */}
                <div className="col-10 m-auto d-flex mb-2">
                  <label htmlFor="" className="form-label me-4 ">
                    <HomeIcon className="fs-2 text-body" />
                  </label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    placeholder="Enter Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                {/* city input */}
                <div className="col-10 m-auto d-flex mb-2">
                  <label htmlFor="" className="form-label me-4 ">
                    <LocationCityIcon className="fs-2 text-body" />
                  </label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    placeholder="Enter Your City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                {/* pincode input */}
                <div className="col-10 m-auto d-flex mb-2">
                  <label htmlFor="" className="form-label me-4 ">
                    <PinDrop className="fs-2 text-body" />
                  </label>
                  <input
                    className="form-control"
                    name="name"
                    type="number"
                    placeholder="Enter Your Pin Code"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    required
                  />
                </div>
                {/* phoneNo input */}
                <div className="col-10 m-auto d-flex mb-2">
                  <label htmlFor="" className="form-label me-4 ">
                    <CallIcon className="fs-2 text-body" />
                  </label>
                  <input
                    className="form-control"
                    name="name"
                    type="number"
                    placeholder="Enter Your Phone number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                    size="10"
                  />
                </div>
                {/* country select */}
                <div className="col-10 m-auto d-flex mb-2">
                  <label htmlFor="" className="form-label me-4 ">
                    <PublicIcon className="fs-2 text-body" />
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option>Open this select Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => {
                        return (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                {/* state select */}
                <div className="col-10 m-auto d-flex mb-2">
                  <label htmlFor="" className="form-label me-4 ">
                    <ApartmentIcon className="fs-2 text-body" />
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option>Open this select State</option>
                    {country &&
                      State.getStatesOfCountry(country).map((item) => {
                        return (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                {/* button */}
                <div className="mt-4 d-flex justify-content-center align-items-center">
                  <input
                    className=" signInBtn btn btn-danger text-white btn-outline-success w-75 "
                    type="submit"
                    value="Continue"
                    disabled={state ? false : true}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default Shipping;
