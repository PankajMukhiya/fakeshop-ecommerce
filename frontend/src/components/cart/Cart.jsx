import React from "react";
import "./cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { NavLink, useNavigate } from "react-router-dom";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { MetaData, Loader } from "../../components";
import { useAlert } from "react-alert";
const Cart = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  // cart quantity function
  const increaseQuantity = (id, quantity, stock) => {
    let newQnty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQnty));
  };
  const decreseQuantity = (id, quantity) => {
    let newQnty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQnty));
  };

  //remove from cart function
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  // checkOutHandler
  const checkOutHandler = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      alert.error("Please Login Befor Order...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    // navigate("/login?next=shipping");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"FakeShop : Cart"} />
          {cartItems.length === 0 ? (
            <div className="empty_cart_container container-fluid  d-flex flex-column justify-content-center align-items-center">
              <div className="empty_cart_row row">
                <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                  <RemoveShoppingCartIcon className="empty_cart_icon text-danger" />
                  <h2 className="my-2">No Product in Your Cart</h2>
                  <NavLink
                    to="/products"
                    className="nav-link btn btn-success rounded-pill text-white w-50 my-2"
                  >
                    View Products
                  </NavLink>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* cartContainer */}
              <div className="cartContainer container-fluid  pt-0 ">
                {/* cartHeader row */}
                <div className="cartHeaderROw row  p-3 rounded-3 text-white ">
                  <div className="col-4 d-flex justify-content-start align-items-center ">
                    <h3 className="fs-6">Product</h3>
                  </div>
                  <div className="col-4 d-flex justify-content-center align-items-center">
                    <h3 className="fs-6">Quantity</h3>
                  </div>
                  <div className="col-4 d-flex justify-content-end align-items-center">
                    <h3 className="fs-6">Subtotal</h3>
                  </div>
                </div>
                {/* cartItem row */}
                {cartItems &&
                  cartItems.map((item) => {
                    const { productId, quantity, stock, price } = item;
                    return (
                      <div className="cartItemRow row " key={productId}>
                        {/* cartItemCard */}
                        <CartItemCard
                          item={item}
                          deleteCartItems={deleteCartItems}
                        />
                        {/* cartQuantity col increase or decrease */}
                        <div className="col-3 mt-2 d-flex justify-content-end align-items-center ms-5">
                          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                            <span
                              className="btn btn-outline-secondary "
                              onClick={() =>
                                decreseQuantity(productId, quantity, stock)
                              }
                            >
                              <i className="fa-solid fa-minus fs-6"></i>
                            </span>
                            <span className="btn bg-white ">{quantity} </span>
                            <span
                              className="btn btn-outline-success"
                              onClick={() =>
                                increaseQuantity(productId, quantity, stock)
                              }
                            >
                              <i className="fa-solid fa-plus fs-6"></i>
                            </span>
                          </div>
                        </div>
                        <div className="col-3 mx-auto mt-2 d-flex justify-content-end align-items-center">
                          <p className="fs-4">{`₹${price * quantity}/-`}</p>
                        </div>
                        {/* subtotat col */}
                        <div className="grossTotalBorderTop col-12 rounded-3"></div>
                      </div>
                    );
                  })}
                {/* cartGrossTotal row */}
                <div className="cartGrossTotalRow row my-1">
                  <div className="grossTotalBorderTop col-12 rounded-3"></div>
                  <div className="col-4 mt-2 d-flex justify-content-start align-items-center ">
                    {/* <h4 className="">Gross Total</h4> */}
                  </div>
                  <div className="col-4 mt-2 d-flex justify-content-start align-items-center ">
                    <h4 className="">Gross Total</h4>
                  </div>
                  <div className="col-4 mt-2 d-flex justify-content-end align-items-center ">
                    <h4 className="">{`₹${cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}/-`}</h4>
                  </div>
                  <div className="col-10 mt-2 mx-auto d-flex justify-content-center align-items-center">
                    <button
                      className=" grossTotalBtn btn btn-success border-0 w-50 fs-4"
                      onClick={checkOutHandler}
                    >
                      Check Out
                    </button>
                  </div>
                  <div className="grossTotalBorderTop col-12 rounded-3 mt-2"></div>
                  <div className="grossTotalBorderTop col-12 rounded-3 mt-1"></div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
