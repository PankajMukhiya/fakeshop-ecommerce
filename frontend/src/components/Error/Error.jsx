import React from "react";
import { NavLink } from "react-router-dom";
const Error = () => {
  return (
    <>
      <div className="container ">
        <div
          id="erro_row_ps-relative"
          className="row position-relative d-flex justify-content-center align-items-center"
          style={{ height: "65vh" }}
        >
          {/* 404 div */}
          <div
            id="absolute_div_with_opacity"
            className=" position-absolute col-10 mx-auto d-flex justify-content-center align-items-center"
            style={{ opacity: "0.25" }}
          >
            <span className="text-success text-center"style={{fontSize: "15rem"}} >404</span>
          </div>
          {/* error info div with home button */}
          <div
            id="zIndex_div"
            className="col-10 mx-auto "
            style={{ zIndex: "9", marginTop:"9rem" }}
          >
            <h1 className="text-danger text-center">
              WE ARE SORRY, THIS PAGE NOT FOUND !
            </h1>
            <h5 className="text-warning text-center">
              The Page You Are Looking For Might Have Been Removed had Its Name
              Changed OR Is Temporarily Unavailable.
            </h5>
            <button
              className="btn btn-light btn-outline-success w-100 rounded-pill mt-5 "
              type="button"
            >
              <NavLink
                className="nav-link text-dark  text-capitalize fs-5 "
                aria-current="page"
                to="/"
              >
                Back To Homepage
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  )
};

export default Error;
