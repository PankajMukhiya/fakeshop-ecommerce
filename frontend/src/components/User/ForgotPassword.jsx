import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotUserPassword, clearErrors } from "../../actions/userAction";
import { Loader,  MetaData } from "../../components";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const alert = useAlert();
  const [email, setEmail] = useState("");

  //   useefect
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  // forgotPasswordSubmit function
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotUserPassword(myForm));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <MetaData title={"Forgot Password"} />
          <div
            id="loginSignUpContainer"
            className="container-fluid mt-3 p-3 d-flex justify-content-center align-items-center "
          >
            <div id="loginSignUpBox" className="border border-2 rounded p-4">
              <div id="login_signUp_toggle" className="p-3">
                <div className="d-flex flex-column justify-content-evenly align-items-center">
                  <h3 className="login_ text-center ">Forgot Password</h3>
                  <hr className="hrTag" />
                </div>
              </div>
              {/* forgot password  */}
              <form
                id="loginFormId"
                className=""
                onSubmit={forgotPasswordSubmit}
              >
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* button */}
                  <div className="mt-2 d-flex justify-content-center align-items-center">
                    <input
                      className=" signInBtn btn btn-danger  w-75  "
                      type="submit"
                      value="Send"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
