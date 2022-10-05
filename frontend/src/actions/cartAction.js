import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      productId: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  //saved in localstorage
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

//remove from cart
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  //saved in localstorage
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

//save shipping info
export const shippingInfoAction = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  //saved in localstorage
  localStorage.setItem("shippingInfo", JSON.stringify(data));
  // localStorage.setItem(
  //   "cartItems",
  //   JSON.stringify(getState().cartReducer.cartItems)
  // );
};
