import React, { useEffect } from "react";
import "./home.css";
import MouseIcon from "@material-ui/icons/Mouse";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loadding, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      // return alert.error(error);
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);
  // const scrollDown = (x, y) => {
  //   window.scrollBy(x, y);
  //   console.log("clicked")
  // };
  return (
    <>
      {loadding ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"FAKESHOP"} />
          {/* first container */}
          <div
            id="container"
            className="container-fluid  d-flex flex-column justify-content-center align-items-center   "
          >
            <p className="fs-4">Wellcome to FAKESHOP</p>
            <h1 className="">Finding Amazing Products Below</h1>
            <button
              // onClick={scrollDown(0, 500)}
              className="btn fs-1 mt-5 border border-3 btn-light text-dark rounded-pill"
            >
              Scroll <MouseIcon />
            </button>
          </div>
          <h2 className="text-black-50 mt-5 text-center text-decoration-underline">
            Featured Products
          </h2>
          {/* Second container */}
          <div className="container-fluid">
            <div className="row">
              {products && //it means that if product then do map func of products
                products.map((product) => {
                  return <ProductCard product={product} key={product._id} />;
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
