import React, { useEffect } from "react";
import SideBar from "./SideBar";
import "./dashBoard.css";
import { NavLink } from "react-router-dom";
import { Chart as ChartJs, registerables } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { MetaData } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
ChartJs.register(...registerables);
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrdersReducer);
  const { users } = useSelector((state) => state.allUsersReducer);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  //lineState
  const lineState = {
    labels: ["Initial Amount", "Earned Amount"],
    datasets: [
      {
        label: ["TOTAL AMOUNT"],
        data: [0, totalAmount],
        backgroundColor: "tomato",
        hoverBackgroundColor: "rgb(75,92,49)",
      },
    ],
  };

  //doughtnulState
  const doughtnulState = {
    labels: ["Out Of Stock", "InStock"],
    datasets: [
      {
        data: [outOfStock, products.length - outOfStock],
        backgroundColor: ["red", "green"],
      },
    ],
  };

  return (
    <>
      <MetaData title={"Dashboard - Admin"} />
      <div className="dashBoardContainer container-fluid  p-2 ">
        {/*  */}
        <div className="row ">
          {/* side bar col which is inside the sidebar */}
          <SideBar />
          {/* dashboard col */}
          <div className="col-12 col-md-9 mx-auto mt-2">
            <h2 className="text-center text-body my-2">Dashboard</h2>
            {/* total amount */}
            <div className="col-10 mx-auto bg-primary rounded-3 text-white">
              <p className="text-center fs-5 mb-0 pb-0 pt-2">Total Amount</p>
              <p className="text-center fs-5 mt-0 pt-0 pb-2 ">₹{totalAmount}/-</p>
            </div>
            {/*  */}
            <div className="col-12 d-flex flex-column flex-md-row g justify-content-center align-items-center gap-4">
              {/* product */}
              <div className="col-3 DashboardCol3  rounded-circle position-relative ">
                <NavLink
                  className="DashboardNavlink dashboardBrandLink text-white nav-link bg-success rounded-circle position-absolute d-flex flex-column justify-content-center align-items-center"
                  to="/admin/products"
                >
                  <span className="text-center fs-2">Product</span>
                  <span className="text-center fs-2 m">
                    {products && products.length}
                  </span>
                </NavLink>
              </div>
              {/* ORDERS */}
              <div className="col-3 DashboardCol3 rounded-circle position-relative ">
                <NavLink
                  className="DashboardNavlink dashboardBrandLink text-white nav-link bg-warning rounded-circle position-absolute d-flex flex-column justify-content-center align-items-center"
                  to="/admin/orders"
                >
                  <span className="text-center fs-2">Orders</span>
                  <span className="text-center fs-2 m">
                    {orders && orders.length}
                  </span>
                </NavLink>
              </div>
              {/* USERS  */}
              <div className="col-3 DashboardCol3 rounded-circle position-relative ">
                <NavLink
                  className=" DashboardNavlink dashboardBrandLink text-white nav-link bg-primary rounded-circle position-absolute d-flex flex-column justify-content-center align-items-center"
                  to="/admin/users"
                >
                  <span className="text-center fs-2">Users</span>
                  <span className="text-center fs-2 m">
                    {users && users.length}
                  </span>
                </NavLink>
              </div>
            </div>
            {/* chart  */}
            {/* Line chart */}
            <div className="col-10 mx-auto chartCol mt-5">
              <Line data={lineState} />
            </div>
            {/* DoughtNut chart */}
            <div className="col-8 mx-auto chartCol mt-5">
              <Doughnut data={doughtnulState} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
