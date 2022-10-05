import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors, resetUserPassword } from "../../actions/userAction";
import { Loader, MetaData } from "../../components";
const ResetPassword = () => {
  const { loading, error, success } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   useeffect
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password Reset Successfully...");
      navigate("/login");
    }
  }, [dispatch, error, alert, success, navigate]);

  //   resetPasswordSubmit
  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetUserPassword(token, myForm));
    console.log(token)
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Change Password `} />
          {/* i am not changing any className or id of these htnm tag becoz all id and classname working which is in loginSignUp.css  */}
          <div
            id="loginSignUpContainer"
            className="container-fluid mt-3 p-3 d-flex justify-content-center align-items-center "
          >
            <div id="loginSignUpBox" className="border border-2 rounded p-4">
              <div className="p-3">
                <div className="d-flex flex-column justify-content-evenly align-items-center">
                  <h3 className="register_ text-center ">Reset Password</h3>
                  <hr className="hrTag text-primary" />
                </div>
              </div>
              {/* update password  */}
              <form
                id="registerFormId"
                className=""
                onSubmit={resetPasswordSubmit}
                encType="multipart/form-data"
              >
                <div id="signUpRow" className="row py-4 ">
                  {/*new Password input */}
                  <div className="col-10 m-auto d-flex my-2">
                    <label htmlFor="" className="form-label me-4">
                      <i className="fa-solid fa-unlock-keyhole fs-2"></i>
                    </label>
                    <input
                      className="form-control  border-0 border-bottom"
                      name="newPassword"
                      type="password"
                      placeholder="Enter New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  {/*conform Password input */}
                  <div className="col-10 m-auto d-flex my-2">
                    <label htmlFor="" className="form-label me-4">
                      <i className="fa-solid fa-lock fs-2"></i>
                    </label>
                    <input
                      className="form-control  border-0 border-bottom"
                      name="confirmPassword"
                      type="password"
                      placeholder="Enter Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 d-flex justify-content-center align-items-center">
                    <input
                      className=" signInBtn btn btn-danger  w-75  "
                      type="submit"
                      value="Reset Password"
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

export default ResetPassword;
