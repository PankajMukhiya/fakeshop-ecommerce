import {
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_RESET,
} from "../constants/orderConstant";

//create order
export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    //request
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    //success
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    //fail
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // clear errors
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//get my orders
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    //request
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      };

    //success
    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    //fail
    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // clear errors
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// ALL ORDERS : ADMIN
export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    //request
    case ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    //success
    case ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    //fail
    case ALL_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // clear errors
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//  ORDER-> (DELETE OR UPDATE) : ADMIN
export const OrderReducer = (state = {}, action) => {
  switch (action.type) {
    //request
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    //success
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    //fail
    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //reset
    case UPDATE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };
    case DELETE_ORDER_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    // clear errors
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//get my order details
export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    //request
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    //success
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    //fail
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // clear errors
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
