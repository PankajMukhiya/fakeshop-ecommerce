import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { MetaData } from "../../components";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import {
  clearErrors,
  loadUser,
  updateUserPassword,
} from "../../actions/userAction";
const UpdatePassword = () => {
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    //error alert
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    //isUpdated
    if (isUpdated) {
      alert.success("Password Updated Successfully...");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    //all form data store in this variable
    // const myForm = new FormData();
    // myForm.set("oldPassword", oldPassword);
    // myForm.set("newPassword", newPassword);
    // myForm.set("confirmPassword", confirmPassword);
    dispatch(updateUserPassword(oldPassword, newPassword, confirmPassword));
    console.log("Update password Form Submited");
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
                  <h3 className="register_ text-center ">Update Profile</h3>
                  <hr className="hrTag text-primary" />
                </div>
              </div>
              {/* update password  */}
              <form
                id="registerFormId"
                className=""
                onSubmit={updatePasswordSubmit}
                encType="multipart/form-data"
              >
                <div id="signUpRow" className="row py-4 ">
                  {/*old Password input */}
                  <div className="col-10 m-auto d-flex my-2">
                    <label htmlFor="" className="form-label me-4">
                      <i className="fa-solid fa-key fs-2"></i>
                    </label>
                    <input
                      className="form-control  border-0 border-bottom"
                      name="oldPassword"
                      type="password"
                      placeholder="Your Old Password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  {/*new Password input */}
                  <div className="col-10 m-auto d-flex my-2">
                    <label htmlFor="" className="form-label me-4">
                      <i className="fa-solid fa-unlock-keyhole fs-2"></i>
                    </label>
                    <input
                      className="form-control  border-0 border-bottom"
                      name="newPassword"
                      type="password"
                      placeholder="Your New Password"
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
                      placeholder="Your Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="mt-4 d-flex justify-content-center align-items-center">
                    <input
                      className=" signInBtn btn btn-danger  w-75  "
                      type="submit"
                      value="Change Password"
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

export default UpdatePassword;
