import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_ERRORS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/productConstant";

//GET ALL PRODUCT ACTIONS
export const getProducts =
  (keyword = "", currentPage = 1, price = [0, 200000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//ADMIN GET ALL PRODUCTS
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");
    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// ADMIN UPDATE PRODUCT
export const updateProduct =
  (id, name, price, category, description, stock, newImages) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PRODUCT_REQUEST,
      });
      // console.log(name, price, category, description, stock, images);
      const config = {
        Headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        { name, price, category, description, stock, newImages },
        config
      );
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// ADMIN CTREATE PRODUCT
export const createProduct =
  (name, price, category, description, stock, images) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_PRODUCT_REQUEST,
      });
      const config = {
        Headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
        { name, price, category, description, stock, images },
        config
      );
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
      console.log("Created Product");
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// ADMIN DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//GET SINGLE PRODUCT ACTONS
export const getProductDetails = (id) => async (dispatch) => {
  // console.log(id)
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// create new review ACTONS
export const createNewReview = (rating, comment, id) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_REVIEW_REQUEST,
    });

    const config = {
      Headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(
      `/api/v1/review`,
      { rating, comment, id },
      config
    );
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//GET A PRODUCT OF ALL REVIEWS
export const getAllReviews = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_REVIEW_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/reviews?productId=${productId}`);
    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE REVIEW OF A PRODUCT
export const deleteReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_REVIEW_REQUEST,
    });

    const { data } = await axios.delete(
      `/api/v1/reviews?productId=${productId}&reviewId=${reviewId}`
    );
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  }); //making error : null
};
