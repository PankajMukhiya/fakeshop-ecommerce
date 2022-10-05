import React, { useState, useEffect } from "react";
import "./loginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { images } from "../../assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  //alert
  const alert = useAlert();

  // register state data
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(images.Profile);

  //useEffect
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, alert, error, navigate, isAuthenticated]);

  //user register data submit
  const registerSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, avatar);
    dispatch(register(name, email, password, avatar));

    console.log("Register Form Submited");
  };

  // user data change
  const registerDataChange = async (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      // making images link
      const imgLinksData = new FormData();
      imgLinksData.append("file", file);
      imgLinksData.append("upload_preset", "avatarImage");
      imgLinksData.append("cloud_name", "dkdvjpnfz");

      await fetch("  https://api.cloudinary.com/v1_1/dkdvjpnfz/image/upload", {
        method: "post",
        body: imgLinksData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          //   console.log(data);
          setAvatarPreview(data.secure_url);
          setAvatar({
            public_id: data.public_id,
            url: data.secure_url,
          });
          alert.success("Avatar Previewed");
        })
        .catch((err) => console.log(err));
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
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
              <div className="p-3">
                <div className="d-flex flex-column justify-content-evenly align-items-center">
                  <h3 className="register_ text-center ">REGISTER</h3>
                  <hr className="hrTag" />
                </div>
              </div>
              {/* SIGNUP  */}
              <form id="registerFormId" encType="multipart/form-data">
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
                      value={user.name}
                      onChange={registerDataChange}
                      required
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
                      value={user.email}
                      onChange={registerDataChange}
                      required
                    />
                  </div>
                  {/* Password input */}
                  <div className="col-10 m-auto d-flex mt-2">
                    <label htmlFor="" className="form-label me-4">
                      <i className="fa-solid fa-lock fs-2"></i>
                    </label>
                    <input
                      className="form-control"
                      name="password"
                      type="password"
                      placeholder="Your Password"
                      value={user.password}
                      onChange={registerDataChange}
                      required
                    />
                  </div>
                  {/* Image input */}
                  <div className="col-10 mx-auto d-flex mt-2">
                    <img
                      className="rounded-circle"
                      src={avatarPreview}
                      alt="avatar preview "
                      style={{ width: "4vmax" }}
                    />
                    <input
                      className="form-control mx-2"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      multiple={false}
                      onChange={registerDataChange}
                      required
                    />
                  </div>

                  <div className="mt-4 d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-danger w-75"
                      onClick={registerSubmit}
                    >
                      Register
                    </button>
                  </div>
                  <NavLink
                    id="loginPageLink"
                    className="nav-link text-end mt-2 text-secondary "
                    to="/login"
                  >
                    I'm Already Registered{" "}
                    <span className="text-info ms-2">LogIn</span>
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SignUp;
