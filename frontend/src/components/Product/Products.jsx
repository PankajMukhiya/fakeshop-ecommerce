import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@material-ui/core/";
import MetaData from "../layout/MetaData";

//categories
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Camera",
  "Attrie",
  "SmartPhones",
  "Electronics",
  "Cloths",
  "Mens Cloths",
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams;
  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);
    // console.log(products)

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [changeCategoryTitle, setChangeCategoryTitle] = useState(
    "Open this to select Category"
  );
  const [ratings, setRatings] = useState(0);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  // slider marks
  const marks = [
    {
      value: 0,
      label: "₹0",
    },
    {
      value: 200000,
      label: "₹200000",
    },
  ];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, alert, error, keyword, currentPage, price, category, ratings]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Products -- FakeShop"} />
          <h3 className="text-center my-4 text-decoration-underline">
            Products
          </h3>
          {/* FILTER-BOX */}
          <div className="filterBox container ">
            <div className="row">
              {/* PRICE FILTER */}
              <div className="col-10 col-md-4 mx-auto">
                <Typography className="text-start">Price</Typography>
                <Slider
                  getAriaLabel={() => "Price range"}
                  value={price}
                  onChange={priceHandler}
                  min={0}
                  max={200000}
                  step={1000}
                  marks={marks}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                />
              </div>
              {/* CATEGORIES FILTER */}
              <div className="col-5 col-md-4 mx-auto d-flex flex-column justify-content-center align-items-center">
                <Typography>Categories</Typography>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {changeCategoryTitle}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {categories.map((categoryItems) => {
                      return (
                        <li
                          key={categoryItems}
                          onClick={() => {
                            setCategory(categoryItems);
                            setChangeCategoryTitle(categoryItems);
                          }}
                          className="dropdown-item"
                        >
                          {categoryItems}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* RATINGS FILTER */}
              <div className="col-5 col-md-4 mx-auto">
                <fieldset>
                  <Typography component="legend">Ratings Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5}
                    marks
                  />
                </fieldset>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center  align-items-center p-2">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>

          {resultPerPage < productsCount && (
            <div className="mt-5 pagination justify-content-center">
              <Pagination // _____in this pagination dependency i used bootstrap class and its work properly in this pagination component
                activePage={currentPage}
                totalItemsCount={productsCount}
                itemsCountPerPage={resultPerPage}
                onChange={setCurrentPageNo}
                nextPageText="next"
                prevPageText="prev"
                firstPageText="1st"
                lastPageText="last"
                itemClass="page-item "
                linkClass="page-link"
                activeClass="active"
                activeLinkClass="active"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
