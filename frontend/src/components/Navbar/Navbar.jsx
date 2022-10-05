import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [menuBar, setMenuBar] = useState(true);
  //for serching products code
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };
  return (
    <>
      <nav className="navbar  p-0 navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-warning fs-3 ms-lg-5" to="/">
            FAKESHOP
          </NavLink>
          <button
            className="navbar-toggler  "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setMenuBar(!menuBar)}
          >
            {menuBar ? (
              <span className="navbar-toggler-icon"></span>
            ) : (
              <button
                type="button "
                className="btn-close"
                aria-label="Close"
              ></button>
            )}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* PRODUCTS SEARCH BOX HERE  */}
            <form className="d-flex" onSubmit={searchSubmitHandler}>
              <input
                className="form-control me-2 font-monospace"
                placeholder="Search a Product..."
                type="text"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-5">
              <li className="nav-item">
                <NavLink
                  className="nav-link  text-capitalize fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              {["products", "about", "contact"].map((navItems) => {
                return (
                  <li className="nav-item" key={navItems}>
                    <NavLink
                      className="nav-link text-capitalize fs-5"
                      to={`/${navItems}`}
                    >
                      {navItems}
                    </NavLink>
                  </li>
                );
              })}
              <li className="nav-item">
                <NavLink className="nav-link fs-4 " to={`/cart`}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fs-4 me-3 " to={`/login`}>
                  <i className="fa-solid fa-user-large"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
