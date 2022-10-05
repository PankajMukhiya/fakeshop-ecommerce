import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { MetaData, Loader } from "../../components";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "../../actions/productAction";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";
const ProductList = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.productReducer
  );

  const navigate = useNavigate();
  const alert = useAlert();

  // DELETE PRODUCT ON CLICK
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("Product is Deleted Successfully...");
      dispatch({ type: DELETE_PRODUCT_RESET });
      navigate("/admin/dashboard");
    }

    dispatch(getAdminProducts());
  }, [dispatch, error, deleteError, alert, isDeleted, navigate]);

  // DATA GRID COLUMNS AND ROW
  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 300,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Product Name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: Number,
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: Number,
      minWidth: 150,
      flex: 0.5,
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
              to={`/admin/product/${cellValue.getValue(cellValue.id, "id")}`}
            >
              <EditIcon className="fs-3 text-success proudctList_action_link" />
            </NavLink>
            <button
              className="btn"
              onClick={() =>
                deleteProductHandler(cellValue.getValue(cellValue.id, "id"))
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
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      });
    });

  return (
    <>
      <MetaData title={"Products List - Admin"} />
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
                <h2 className="text-center text-body my-2">Products List</h2>
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

export default ProductList;
