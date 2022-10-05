import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import Loader from "../layout/Loader/Loader";
const OrderList = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector(
    (state) => state.allOrdersReducer
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.OrderReducer
  );

  const alert = useAlert();
  const navigate = useNavigate();

  // DELETE ORDER ON CLICK
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  //useEfect
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order is Deleted Successfully...");
      dispatch({ type: DELETE_ORDER_RESET });
      navigate("/admin/orders");
      
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, alert, isDeleted, navigate]);

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
      field: "totalPrice",
      headerName: "Total Price",
      type: "Number",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: Number,
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <>
            <NavLink
              className="nav-link"
              to={`/admin/order/${cellValue.getValue(cellValue.id, "id")}`}
            >
              <EditIcon className="fs-3 text-success proudctList_action_link" />
            </NavLink>
            <button
              className="btn"
              onClick={() =>
                deleteOrderHandler(cellValue.getValue(cellValue.id, "id"))
              }
            >
              <DeleteIcon className=" fs-2 text-danger proudctList_action_link" />
            </button>
          </>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        totalPrice: item.totalPrice,
      });
    });
  return (
    <>
      <MetaData title={"All Orders - Admin"} />
      <div className="dashBoardContainer container-fluid  p-2 ">
        <div className="row ">
          {/* side bar col which is inside the sidebar */}
          <SideBar />

          {/* productslist col */}
          <div className="col-12 col-md-9 mx-auto mt-2">
            {loading ? (
              <Loader />
            ) : (
              <>
                <h2 className="text-center text-body my-2">Orders List</h2>
                {/*  */}
                <div className="col-12 ">
                  <DataGrid
                    columns={columns}
                    rows={rows}
                    // pageSize={10}
                    autoHeight
                    className="productList_DataGrid "
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
