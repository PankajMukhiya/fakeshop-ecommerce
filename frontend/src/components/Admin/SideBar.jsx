import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";
import GroupsIcon from "@material-ui/icons/Group";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import PostAddIcon from "@material-ui/icons/PostAdd";
const SideBar = () => {
  return (
    <>
      <div className="col-10 col-md-3 mx-auto d-flex flex-column justify-content-lg-start align-items-lg-start align-items-center border-2  border-end border-bottom mt-3">
        {/* home page */}
        <NavLink
          className="sidebarBrandLink navbar-brand text-center text-warning fs-1 mt-3 "
          to="/"
        >
          FAKESHOP
        </NavLink>
        {/* dashboard */}
        <NavLink
          className="sidebarBrandLink navbar-brand "
          to="/admin/dashboard"
        >
          <p className="text-body">
            <DashboardIcon className="mx-2 fs-1 text-dark" />
            Dashboard
          </p>
        </NavLink>
        {/*  products*/}
        <div className="btn-group sidebarBrandLink">
          <button
            className="btn dropdown-toggle navbar-brand border-0"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <ImportExportIcon className="mx-2 fs-1 text-dark" />
            Products
          </button>
          <ul className="dropdown-menu">
              <NavLink
                className="sidebarBrandLink navbar-brand "
                to="/admin/products"
              >
                <p className="text-body ">
                  <PostAddIcon className="mx-1 fs-5 text-dark" />
                  All
                </p>
              </NavLink>
            <NavLink className="navbar-brand " to="/admin/product/new">
              <p className="text-body ">
                <AddIcon className="mx-1 fs-5 text-dark" /> Create
              </p>
            </NavLink>
          </ul>
        </div>
        {/* orders */}
        <NavLink className="sidebarBrandLink navbar-brand " to="/admin/orders">
          <p className="text-body">
            <ListAltIcon className="mx-2 fs-1 text-dark" />
            Orders
          </p>
        </NavLink>
        {/* users */}
        <NavLink className=" sidebarBrandLink navbar-brand " to="/admin/users">
          <p className="text-body">
            <GroupsIcon className="mx-2 fs-1 text-dark" />
            Users
          </p>
        </NavLink>
        {/* reviews */}
        <NavLink className="sidebarBrandLink navbar-brand " to="/admin/reviews">
          <p className="text-body">
            <RateReviewIcon className="mx-2 fs-1 text-dark" />
            Reviews
          </p>
        </NavLink>
      </div>
    </>
  );
};

export default SideBar;

// bug in this file when click on any navlink:  TypeError: Cannot convert object to primitive value
