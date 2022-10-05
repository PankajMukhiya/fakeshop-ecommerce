import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../actions/userAction";
import { useAlert } from "react-alert";
const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const dashboard = () => {
    navigate("/admin/dashboard");
  };
  const orders = () => {
    navigate("/orders");
  };
  const profile = () => {
    navigate("/account");
  };
  const myCart = () => {
    navigate("/cart");
  };
  const logout = () => {
    dispatch(logoutUser());
    alert.success("Log Out Successfully...");
    console.log("logout successfully done....");
  };
  return (
    <>
      <div className="d-flex justify-content-end align-items-center float-end ">
        <div
          className="fixed-top d-flex justify-content-center align-items-center ms-3 "
          style={{
            width: "5rem",
            height: "5rem",
            marginTop: "3.5rem",
            // border: "4px solid tomato",
            // borderRadius: "50%",
            cursor: "pointer"
          }}
        >
          <img
            src={user.avatar.url}
            style={{
              width: "6rem",
              height: "5rem",
              borderRadius: "50%",
              border: "4px solid tomato"
             
            }}
            data-bs-target="#offcanvasRight"
            data-bs-toggle="offcanvas"
            className=""
            alt="profile defaul img p-1"
          />
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
              Profile
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="nav flex-column">
              {/*  dashbord*/}
              {user.role === "admin" ? (
                <li
                  className="nav-item btn btn-success my-3 "
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={dashboard}
                >
                  Dashboard
                </li>
              ) : (
                ""
              )}
              {/* order */}
              <li
                className="nav-item btn btn-primary my-3 "
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={orders}
              >
                My Orders
              </li>
              {/* profile */}
              <li
                className="nav-item btn btn-info my-3 text-white "
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={profile}
              >
                Profile
              </li>
              {/* My Cart */}
              <li
                className="nav-item btn btn-warning my-3 text-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={myCart}
              >
                My Cart
                <span
                  className={`ms-1 ${
                    cartItems.length > 0 ? "text-danger" : "text-white"
                  }`}
                >
                  <i className="fa-solid fa-cart-shopping"></i>(
                  {cartItems.length})
                </span>
              </li>
              {/* logout */}
              <li
                className="nav-item btn  btn-danger my-3 "
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={logout}
              >
                Log Out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOptions;
