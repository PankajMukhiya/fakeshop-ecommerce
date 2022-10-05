import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StarIcon from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import Loader from "../layout/Loader/Loader";
import { DataGrid } from "@material-ui/data-grid";
import {
  clearErrors,
  getAllReviews,
  deleteReview,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstant";
const ProductReviews = () => {
  const { loading, error, reviews } = useSelector(
    (state) => state.productReviewsReducer
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.reviewReducer
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");

  // USEEFECT
  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product Review Deleted Successfully...");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [error, alert, dispatch, deleteError, isDeleted, navigate, productId]);

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
  };
  const searchReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const columns = [
    {
      field: "id",
      headerName: "Review Id",
      width: 250,
    },
    {
      field: "user",
      headerName: "User",
      width: 170,
      //   cellClassName: "fs-5"
    },
    {
      field: "comment",
      headerName: "Comment",
      width: 400,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "Number",
      width: 100,
      align: "center",
      cellClassName: (cellValue) => {
        return cellValue.getValue(cellValue.id, "rating") >= 3
          ? "text-success fs-4"
          : "text-danger fs-4";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: Number,
      minWidth: 150,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <>
            <button
              className="btn"
              onClick={() =>
                deleteReviewHandler(cellValue.getValue(cellValue.id, "id"))
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
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.name,
        comment: item.comment,
        rating: item.rating,
      });
    });
  return (
    <>
      <MetaData title={"All Reviews - Admin"} />
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
                {/* SEARCHING REVIEWS */}
                <div className="col-10 m-auto">
                  <form
                    className=" d-flex flex-column justify-content-center align-items-center gap-3"
                    onSubmit={searchReviewSubmit}
                    encType="multipart/form-data"
                  >
                    <h2 className="text-center text-body my-2 border-bottom border-3 w-50">
                      All Reviews
                    </h2>
                    {/*  SEARCH  REVIEW  */}
                    <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 border-bottom">
                      <StarIcon className="fs-1 text-warning mx-3" />
                      <input
                        className=" fs-4 border-0"
                        type="search"
                        placeholder="Enter Product Id"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        style={{ outline: "none" }}
                      />
                    </div>
                    {/* BUTTON */}
                    <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 ">
                      <input
                        className="  btn btn-danger w-50 "
                        type="submit"
                        value="Search"
                        disabled={
                          loading
                            ? true
                            : false || productId.length !== 24
                            ? true
                            : false
                        }
                      />
                    </div>
                  </form>
                </div>

                <div
                  className="grossTotalBorderTop  rounded-3 my-5 "
                  style={{ height: "2px" }}
                ></div>
                {/* SHOWING SEARCHING REAVIEW */}
                <div className="col-12 mt-3">
                  {reviews && reviews.length > 0 ? (
                    <DataGrid
                      columns={columns}
                      rows={rows}
                      // pageSize={10}
                      autoHeight
                      className="productList_DataGrid "
                    />
                  ) : (
                    <h3 className="text-center text-muted my-2  ">
                      No Reviews Found !
                    </h3>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
