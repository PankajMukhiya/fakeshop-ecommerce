import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { images } from "../../assets";
import { Loader } from "../../components";
import { MetaData } from "../../components";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import {
  clearErrors,
  loadUser,
  updateUserProfile,
} from "../../actions/userAction";
const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [avatar, setAvatar] = useState();
  // const [avatarPreview, setAvatarPreview] = useState(images.Profile);
  // eslint-disable-next-line
  useEffect(() => {
    //user
    if (user) {
      setName(user.name);
      setEmail(user.email);
      // setAvatarPreview(user.avatar.url);
    }
    //error alert
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    //isUpdated
    if (isUpdated) {
      alert.success("Profile Updated Successfully...");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, user, navigate]);

  //user register data change
  // const registerDataChange = (e) => {
  // if (e.target.name === "avatar") {
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setAvatarPreview(reader.result);
  //       setAvatar(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // } else {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // }
  // };

  //user register data submit

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    //all form data store in this variable
    // const myForm = new FormData();
    // myForm.set("name", name);
    // myForm.set("email", email);
    // myForm.set("avatar", avatar);
    console.log(name, email);
    // dispatch(updateUserProfile(name, email, Avatar));
    dispatch(updateUserProfile(name, email));
    console.log("update func clicked");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}: Update Profile `} />
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
              {/* SIGNUP  */}
              <form
                id="registerFormId"
                className=""
                onSubmit={updateProfileSubmit}
                encType="multipart/form-data"
              >
                <div id="signUpRow" className="row py-4 ">
                  {/* Name input */}
                  <div className="col-10 m-auto d-flex mb-2">
                    <label htmlFor="" className="form-label me-4 ">
                      <i className="fa-solid fa-user fs-2"></i>
                    </label>
                    <input
                      className="form-control"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {/* Email input */}
                  <div className="col-10 m-auto d-flex">
                    <label htmlFor="" className="form-label me-4 ">
                      <i className="fa-solid fa-envelope fs-2"></i>
                    </label>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {/* Image input */}
                  <div className="col-10 mx-auto d-flex mt-2">
                    <img
                      src={images.Profile}
                      alt="avatar preview "
                      style={{ width: "3vmax" }}
                    />
                    <input
                      className="form-control"
                      name="avatar"
                      type="file"
                      // value={avatar}
                      accept="image/*"
                      // onChange={(e) => setAvatar(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 d-flex justify-content-center align-items-center">
                    <input
                      className=" signInBtn btn btn-danger  w-75  "
                      type="submit"
                      value="Update"
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

export default UpdateProfile;
