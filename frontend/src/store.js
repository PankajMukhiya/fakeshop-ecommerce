import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  updateProfileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  OrderReducer,
} from "./reducers/orderReducer";

//ALL REDUCER
// import {
//   productsReducer,
//   productDetailsReducer,
//   userReducer,
//   updateProfileReducer,
//   forgotPasswordReducer,
//   cartReducer,
//   newOrderReducer,
// } from "./reducers";

//root reducer
const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  updateProfile: updateProfileReducer,
  forgotPassword: forgotPasswordReducer,
  cartReducer: cartReducer,
  newOrderReducer: newOrderReducer,
  myOrdersReducer: myOrdersReducer,
  orderDetailsReducer: orderDetailsReducer,
  newReviewReducer: newReviewReducer,
  newProductReducer: newProductReducer,
  productReducer: productReducer,
  allOrdersReducer: allOrdersReducer,
  OrderReducer: OrderReducer,
  allUsersReducer: allUsersReducer,
  userDetailsReducer: userDetailsReducer,
  productReviewsReducer: productReviewsReducer,
  reviewReducer: reviewReducer,
});

//initialState
const cartfromlocalstorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const shippingInfoFromLocalStorage = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : [];
let initialState = {
  cartReducer: {
    cartItems: cartfromlocalstorage,
    shippingInfo: shippingInfoFromLocalStorage,
  },
};
// if (localStorage.getItem("cartItems")) {
//   let initialStateData = initialState.cartReducer.cartItems;
//   let dataFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
//   initialStateData.push(dataFromLocalStorage);
//   console.log(dataFromLocalStorage[0]);
//   console.log(dataFromLocalStorage);
// }

//middleWare
const middleWare = [thunk];

// store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
