import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import "./loginSignUp.css";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  //alert
  const alert = useAlert();
  //login state data
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const redirect = location.search
  //   ? location.search.split("?next=")[1]
  //   : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, alert, error, navigate, isAuthenticated]);

  // Login submit form handler
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    console.log("Login Form Submited");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            id="loginSignUpContainer"
            className="container-fluid mt-3 p-3 d-flex justify-content-center align-items-center "
          >
            <div id="loginSignUpBox" className="border border-2 rounded p-4">
              <div id="login_signUp_toggle" className="p-3">
                <div className="d-flex flex-column justify-content-evenly align-items-center">
                  <h3 className="login_ text-center ">LOGIN</h3>
                  <hr className="hrTag" />
                </div>
              </div>
              {/* LOGIN  */}
              <form id="loginFormId" className="" onSubmit={loginSubmit}>
                <div id="loginRow" className="row py-4 ">
                  {/* Email input */}
                  <div className="col-10 m-auto d-flex mb-2">
                    <label htmlFor="" className="form-label me-4 ">
                      <i className="fa-solid fa-envelope fs-2"></i>
                    </label>
                    <input
                      className="form-control border-0 border-bottom"
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                  {/* Password input */}
                  <div className="col-10 m-auto d-flex mt-2">
                    <label htmlFor="" className="form-label me-4">
                      <i className="fa-solid fa-lock fs-2"></i>
                    </label>
                    <input
                      className="form-control  border-0 border-bottom"
                      name="password"
                      type="password"
                      placeholder="Your Password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>
                  <NavLink
                    id="forgetPasswordLink"
                    className="nav-link text-end mt-3 text-decoration-underline text-secondary "
                    to="/password/forgot"
                  >
                    Forget Password ?
                  </NavLink>
                  <div className="mt-2 d-flex justify-content-center align-items-center">
                    <input
                      className=" signInBtn btn btn-danger  w-75  "
                      type="submit"
                      value="Login"
                    />
                  </div>
                </div>
                <NavLink
                  id="registerPageLink"
                  className="nav-link text-center mt-3 text-decoration-underline text-secondary "
                  to="/register"
                >
                  Don't have an account?
                  <span className="text-primary ms-2">Sign In</span>
                </NavLink>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
