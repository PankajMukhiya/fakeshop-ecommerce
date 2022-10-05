import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import store from "./store";
import {
  Error,
  Footer,
  Header,
  Home,
  Login,
  ProductDetails,
  Products,
  SignUp,
  UserOptions,
  UpdateProfile,
  Profile,
  UpdatePassword,
  ForgotPassword,
  ResetPassword,
  Cart,
  Shipping,
  ConfirmOrder,
  Payment,
  OrderSuccess,
  MyOrders,
  ProtectedRoute,
  OrderDetails,
  Dashboard,
  ProductList,
  UpdateProduct,
  OrderList,
  ProcessOrder,
  UsersList,
  UpdateUser,
  ProductReviews,
  About,
  Contact,
  // NewProduct,
} from "./components";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NewProductCreate from "./components/Admin/NewProductCreate";
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  // recieving stripe api key
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getSripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());

    getSripeApiKey();
  }, []);
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute
            exact
            path="/process/payment"
            isAuthenticated={isAuthenticated}
          >
            <Payment />
          </ProtectedRoute>
        </Elements>
      )} */}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<SignUp />} />
        <Route exact path="/Contact" element={<Contact />} />
        <Route exact path="/About" element={<About />} />
        {/* forgot password not needed of isAuthenticated  */}
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />

        <Route path="*" element={<Error />} />

        {/* ________________________ PROTECTED ROUTE ________________________ */}
        {/*  profile */}
        <Route
          exact
          path="/account"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        {/* update profile  */}
        <Route
          exact
          path="/me/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        {/* update password  */}
        <Route
          exact
          path="/password/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        {/* shipping  */}
        <Route
          exact
          path="/shipping"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Shipping />
            </ProtectedRoute>
          }
        />
        {/* confir Order  */}
        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        {/* confirm Order  wrapping this route in Element */}
        {/* {stripeApiKey && ( */}
        <Route
          exact
          path="/process/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Payment />
              </ProtectedRoute>
            </Elements>
          }
        />
        {/* <Route
          exact
          path="/process/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          }
        /> */}
        {/* order success */}
        <Route
          exact
          path="/success"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        {/* my orders */}
        <Route
          exact
          path="/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        {/* order details */}
        <Route
          exact
          path="/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        {/* ADMIN DASHBORD */}
        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdimin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* ADMIN PRODUCTS LIST */}
        <Route
          exact
          path="/admin/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdimin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />
        {/* ADMIN NEW PRODUCTS CREATE  */}
        <Route
          exact
          path="/admin/product/new"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdimin={true}>
              <NewProductCreate />
            </ProtectedRoute>
          }
        />
        {/* ADMIN  update  PRODUCTS   */}
        <Route
          exact
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdimin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        {/* ADMIN  ORDERS  LIST   */}
        <Route
          exact
          path="/admin/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdimin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />
        {/* ADMIN  ORDERS  UPDATE   */}
        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdimin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        {/* ADMIN  USERS  LIST   */}
        <Route
          exact
          path="/admin/users"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdimin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        {/* ADMIN  UPDATE  USER   */}
        <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdimin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        {/* ADMIN  PRODUCT   REVIEWS   */}
        <Route
          exact
          path="/admin/reviews"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdimin={true}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />
        {/* ________________________  ________________________ */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
