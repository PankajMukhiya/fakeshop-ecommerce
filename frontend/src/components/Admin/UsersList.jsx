import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import Loader from "../layout/Loader/Loader";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstant";
const UsersList = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector(
    (state) => state.allUsersReducer
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.updateProfile
  );

  const alert = useAlert();
  const navigate = useNavigate();

  // DELETE ORDER ON CLICK
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert.success("User Deleted Successfully...");
      dispatch({ type: DELETE_USER_RESET });
      navigate("/admin/users");
    }

    dispatch(getAllUsers());
  }, [dispatch, error, alert, deleteError, isDeleted, navigate]);

  const columns = [
    {
      field: "id",
      headerName: "User Id",
      width: 350,
      flex: 2,
    },
    {
      field: "email",
      headerName: "Email",
      width: 350,
      flex: 1.5,
    },
    {
      field: "name",
      headerName: "Name",
      type: "text",
      width: 350,
      flex: 0.8,
    },
    {
      field: "role",
      headerName: "Role",
      type: "Number",
      width: 150,
      flex: 1,
      align: "center",
      cellClassName: (cellValue) => {
        return cellValue.getValue(cellValue.id, "role") === "admin"
          ? "text-success fs-5"
          : "text-dark";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: Number,
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      align: "right",
      renderCell: (cellValue) => {
        return (
          <>
            <NavLink
              className="nav-link"
              to={`/admin/user/${cellValue.getValue(cellValue.id, "id")}`}
            >
              <EditIcon className="fs-3 text-success proudctList_action_link" />
            </NavLink>
            <button
              className="btn"
              onClick={() =>
                deleteUserHandler(cellValue.getValue(cellValue.id, "id"))
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
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        name: item.name,
        role: item.role,
      });
    });
  return (
    <>
      <MetaData title={"All Users - Admin"} />
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
                <h2 className="text-center text-body my-2">Users List</h2>
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

export default UsersList;
