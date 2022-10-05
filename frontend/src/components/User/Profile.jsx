import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { Loader } from "../../components";
const Profile = () => {
  const { user, isAuthenticated, laoding } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  // console.log(user.avatar.url)
  return (
    <>
      {laoding ? (
        <Loader />
      ) : (
        <>
          <MetaData title={user.name} />
          <div
            id="profileContainer"
            className="container-fluid d-flex flex-column flex-md-row justify-content-center align-items-center"
          >
            {/* avatar section */}
            <div id="avatarDiv" className="row p-4">
              <div className="col-11 mx-auto">
                <h1 className="text-center">My Profile</h1>
                <hr className="text-primary" />
                <div className="col-8 col-sm-8 col-md-10  col-lg-10 col-xl-10 col-xxl-10 mx-auto">
                  <img
                    className="card-img rounded-circle my-2"
                    src={user.avatar.url}
                    // src={images.Profile}
                    alt="avatarImage"
                    style={{width: "15rem",height: "15rem" }}
                  />
                </div>
                <NavLink
                  to="/me/update"
                  className="nav-link text-center btn btn-outline-success text-info rounded-pill"
                >
                  Edidt Profile
                </NavLink>
              </div>
              {/* <img src={user.avatar.url} alt="avatarImage" /> */}
            </div>
            {/* info section */}
            <div id="infoDiv" className="row p-4 ">
              <div className="col-10 mx-auto my-2 d-flex flex-column justify-content-center align-items-center">
                <h2 className="">Full Name :</h2>
                <h6 className="fs-5">{user.name}</h6>
              </div>
              <div className="col-10 mx-auto my-2 d-flex flex-column justify-content-center align-items-center">
                <h2 className="">Email :</h2>
                <h6 className="fs-5">{user.email}</h6>
              </div>
              <div className="col-10 mx-auto my-2 d-flex flex-column justify-content-center align-items-center">
                <h2 className="">Joined On :</h2>
                <h6 className="fs-5">{String(user.createdAt).substr(0, 10)}</h6>
              </div>
              <div className="col-10 mx-auto my-2 d-flex flex-column justify-content-center align-items-center">
                <NavLink
                  to="/orders"
                  className="nav-link btn btn-outline-info text-dark rounded-pill my-2"
                >
                  My Orders
                </NavLink>
                <NavLink
                  to="/password/update"
                  className="nav-link btn btn-outline-warning text-dark rounded-pill my-2"
                >
                  Change Password
                </NavLink>
              </div>
            </div>
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
