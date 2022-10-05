import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";
export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      //checking in lacalStoraage data present or wot
      const existItem = state.cartItems.find(
        (i) => i.productId === item.productId
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.productId === existItem.productId ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    // remove from cart
    case REMOVE_CART_ITEM:
      const removeItemId = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (i) => i.productId !== removeItemId
          // (i) => i.productId !== action.payload.productId
        ),
      };

    // save cart info
    case SAVE_SHIPPING_INFO:
      const shippingInfo = action.payload;
      return {
        ...state,
        shippingInfo: shippingInfo,
      };
    default:
      return state;
  }
};
