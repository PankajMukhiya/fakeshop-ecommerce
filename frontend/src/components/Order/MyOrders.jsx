import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MetaData, Loader } from "../../components";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { NavLink } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";
import "./Order.css";
const MyOrders = () => {
  //
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading, error, orders } = useSelector(
    (state) => state.myOrdersReducer
  );
  console.log(orders);
  const alert = useAlert();

  //datagrid columns same mongoose schema model
  const columns = [
    {
      field: "id",
      headerName: "Order Id",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      cellClassName: (cellValue) => {
        return cellValue.getValue(cellValue.id, "status") === "Delivered"
          ? "text-success"
          : "text-danger";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "Number",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "Number",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      type: "Number",
      width: 200,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <NavLink
            className="nav-link"
            to={`/order/${cellValue.getValue(cellValue.id, "id")}`}
          >
            <LaunchIcon className="fs-3 text-dark" />
          </NavLink>
        );
      },
    },
  ];
  const row = [];

  // orders
  orders &&
    orders.forEach((items, index) => {
      row.push({
        itemsQty: items.orderItems.length,
        id: items._id,
        // id: items.orderItems.productId,
        status: items.orderStatus,
        amount: `₹${items.totalPrice}/-`,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title={`${user.name}: Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div
          style={{}}
          className=" dataGridContainer container-fluid mt-5
           "
        >
          <div className="row " style={{}}>
            <div className="">
              <Typography className="text-center p-2 fs-3 login_">
                {user.name}'s Orders
              </Typography>
            </div>
            <DataGrid
              className="data-grird"
              columns={columns}
              rows={row}
              pageSize={10}
              autoHeight
              disableSelectionOnClick
            />
          </div>
        </div>
      )}
    </>
  );
};
export default MyOrders;
