//
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
} from "../constants/productConstant";

//ALL PRODUCTS
export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    //request
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };

    //success
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
        // filteredProductsCount: action.payload.filteredProductsCount,
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };

    //fail
    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// ADMIN CREATE PRODUCT
export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    // request
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    //success
    case NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };

    // fail
    case NEW_PRODUCT_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      };

    //reset
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };

    //clear errors
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//  PRODUCT
export const productReducer = (state = {}, action) => {
  switch (action.type) {
    // request
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    //success
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    // fail
    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    //reset
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    //clear errors
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
//SINGLE PRODUCT DETAILS
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload.product,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// create new review
export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    // request
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    //success
    case NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    // fail
    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        ...state,
        error: action.payload,
      };

    //reset
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };

    //clear errors
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// PRODUCT ALL REVIEWS
export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// DELETE REVIEW REDUCER
export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    // request
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    //success
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    // fail
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //reset
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    //clear errors
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
