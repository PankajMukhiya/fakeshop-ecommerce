import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import CategoryIcon from '@material-ui/icons/Category';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, createProduct } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";
// import { images } from "../../assets";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";

const NewProduct = () => {
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector(
    (state) => state.newProductReducer
  );
  const alert = useAlert();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [changeCategoryTitle, setChangeCategoryTitle] = useState(
    "Open this to select Category"
  );
  const [stock, setStock] = useState("");
  //for images
  let fileObj = [];
  let fileArray = [];
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const createProductImageChange = (e) => {
    // const files = Array.from(e.target.files);
    // console.log(files);
    // setImages([]);
    // setImagePreview([]);

    // files.forEach((file) => {
    //   const reader = new FileReader();
    //   console.log(reader);
    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setImagePreview((oldImg) => [...oldImg, reader.result]);
    //       setImages((oldImg) => [...oldImg, reader.result]);
    //     }
    //     reader.readAsDataURL(file);
    //     console.log(reader);
    //   };
    // });

    ///
    fileObj.push(e.target.files);
    setImages([]);
    setImagePreview([]);

    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setImagePreview((oldImg) => [...oldImg, fileArray]);
    setImages((oldImg) => [...oldImg, fileArray]);
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("name", name);

    //for images
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product Created Successfully...");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [error, alert, dispatch, success, navigate]);

  return (
    <>
      <MetaData title={"Create Product - Admin"} />
      <div className="dashBoardContainer container-fluid  p-2 ">
        <div className="row ">
          {/* side bar col which is inside the sidebar */}
          <SideBar />
          {/* productslist col */}
          <div className="col-10 col-md-8 mx-auto mt-2 border shadow-lg p-3 ">
            <h2 className="text-center text-body my-2">Create Product</h2>
            <div
              className="col-9 mx-auto "
              style={{ backgroundColor: "tomato", height: "2x" }}
            ></div>
            {/*  */}
            <div
              className="col-12 d-flex justify-content-center align-items-center "
              s
            >
              <form
                id="registerFormId"
                className=""
                onSubmit={createProductSubmitHandler}
                encType="multipart/form-data"
              >
                <div id="" className="row py-4  ">
                  {/* PRODUCT  NAME*/}
                  <div className="col-7 m-auto d-flex mb-2">
                    <label htmlFor="" className="form-label me-4 ">
                      <SpellcheckIcon className="fs-2" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  {/* PRODUCT PRICE */}
                  <div className="col-7 m-auto d-flex mb-2">
                    <label htmlFor="" className="form-label me-4 ">
                      <AttachMoneyIcon className="fs-2" />
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Product Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  {/* PRODUCT DESCRIPTION */}
                  <div className="col-7 m-auto d-flex mb-2">
                    <label htmlFor="" className="form-label me-4 ">
                      <DescriptionIcon className="fs-2" />
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={2}
                      cols={1}
                      placeholder="Product Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  {/* PRODUCT CATEGORY */}
                  <div className="col-7 m-auto d-flex mb-2">
                    <label htmlFor="" className="form-label me-4 ">
                      <CategoryIcon className="fs-2" />
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setChangeCategoryTitle(e.target.value);
                      }}
                      required
                    >
                      <option>{changeCategoryTitle}</option>"
                      {categories &&
                        categories.map((categoryItem) => {
                          return (
                            <option key={categoryItem}>{categoryItem}</option>
                          );
                        })}
                    </select>
                  </div>
                  {/* PRODUCT stock */}
                  <div className="col-7 m-auto d-flex mb-2">
                    <label htmlFor="" className="form-label me-4 ">
                      <StorageIcon className="fs-2" />
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Product Stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>
                  {/* PRODUCT IMAGE */}
                  <div
                    className="col-7 m-auto d-flex mb-2"
                    id="createProductFormFile"
                  >
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      // accept=".jpeg, .png, .jpg"
                      multiple
                      className="form-control"
                      onChange={createProductImageChange}
                    />
                    {/* <FileBase64
                      className="form-control"
                      type="file"
                      multiple={true}
                      onChange={createProductImageChange}
                      onDone={({ base64 }) => {
                        setImagePreview([base64]);
                        setImages([base64]);
                      }}
                    /> */}
                  </div>
                  {/* PRODUCT IMAGE PREVIEW  */}
                  <div
                    className="col-7 m-auto d-flex mb-2"
                    id="createProductImageFile"
                    style={{ overflow: "auto" }}
                  >
                    {imagePreview.map((image, index) => {
                      return (
                        <img
                          key={index}
                          src={image}
                          alt="previewImg"
                          className="m-1"
                          style={{ width: "8vmax" }}
                        />
                      );
                    })}
                  </div>

                  {/*  */}
                  <div className="mt-4 d-flex justify-content-center align-items-center">
                    <input
                      className=" signInBtn btn btn-danger w-25 "
                      disabled={loading ? true : false}
                      type="submit"
                      value="Create"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;


