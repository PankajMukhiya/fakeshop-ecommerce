import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import CategoryIcon from "@material-ui/icons/Category";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, createProduct } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";
// import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
// import Loader from "../layout/Loader/Loader";
const NewProductCreate = () => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.newProductReducer);
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
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const imgInpChangeHandler = async (e) => {
    const files = e.target.files;

    // defining image url and public id

    setImages([]);
    setImagePreview([]);

    // making img link of all the selected img one by one using for loop
    for (let i = 0; i < files.length; i++) {
      let fileitem = files[i];

      // make link using cloudinary
      const productImageLinks = new FormData();
      productImageLinks.append("file", fileitem);
      productImageLinks.append("upload_preset", "productsImage");
      productImageLinks.append("cloud_name", "dkdvjpnfz");
      await fetch("  https://api.cloudinary.com/v1_1/dkdvjpnfz/image/upload", {
        method: "post",
        body: productImageLinks,
      })
        .then((resp) => resp.json())
        .then((data) => {
          // console.log(data.secure_url);

          //making obj of id and link
          // let obj = {
          //   public_id: data.public_id,
          //   url: data.secure_url,
          // };
          // console.log(obj);

          setImages((oldImg) => [
            ...oldImg,
            {
              public_id: data.public_id,
              url: data.secure_url,
            },
          ]);
          setImagePreview((oldImg) => [
            ...oldImg,
            {
              public_id: data.public_id,
              url: data.secure_url,
            },
          ]);

          console.log("Uploading Images to cloudinary");
        })
        .catch((err) => console.log(err));
    }
  };
  console.log("Uploaded Images to cloudinary");
  // console.log(images);

  // // making images link
  // const imgLinksData = new FormData();
  // imgLinksData.append("file", images);
  // imgLinksData.append("upload_preset", "productsImage");
  // imgLinksData.append("cloud_name", "dkdvjpnfz");

  // fetch("  https://api.cloudinary.com/v1_1/dkdvjpnfz/image/upload", {
  //   method: "post",
  //   body: imgLinksData,
  // })
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     // setImagesUrl(data.url);
  //     console.log(data);
  //   })
  //   .catch((err) => console.log(err));

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(name, price, category, description, stock, images);
    dispatch(createProduct(name, price, category, description, stock, images));
    
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
    // <>
    //   <MetaData title="Create Product - Admin" />

    //   {loading ? (
    //     <Loader />
    //   ) : (
    //     {/*  */}
    //   )}
    // </>

    <>
      <div className="dashBoardContainer container-fluid  p-2 ">
        <div className="row ">
          {/* side bar col which is inside the sidebar */}
          <SideBar />
          {/* productslist col */}
          <div className="col-10 col-md-8 mt-2 border shadow-lg p-3">
            <form
              className=" d-flex flex-column justify-content-center align-items-center gap-3"
              onSubmit={createProductSubmitHandler}
              encType="multipart/form-data"
            >
              <h2 className="text-center text-body my-2 border-bottom border-3 w-50">
                Create Product
              </h2>

              {/* PRODUCT NAME */}
              <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 border-bottom">
                <SpellcheckIcon className="fs-2 text-body mx-3" />
                <input
                  className=" border-0 outline-0 w-75 fs-4"
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ outline: "none" }}
                />
              </div>

              {/* PRODUCT PEICE */}
              <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 border-bottom">
                <AttachMoneyIcon className="fs-2 text-body mx-3" />
                <input
                  className=" border-0 outline-0 w-75 fs-4"
                  type="number"
                  placeholder="Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ outline: "none" }}
                />
              </div>

              {/* PRODUCT DESCRIPTONS */}
              <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 border-bottom">
                <DescriptionIcon className="fs-2 text-body mx-3" />
                <textarea
                  className=" border-0 outline-0 w-75 fs-4"
                  type="text"
                  id="exampleFormControlTextarea1"
                  rows={1}
                  cols={1}
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{ outline: "none" }}
                />
              </div>

              {/* PRODUCT CATEGORY */}
              <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 border-bottom">
                <CategoryIcon className="fs-2 text-body mx-3" />
                <select
                  className="border-0 outline-0 w-75 fs-4"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setChangeCategoryTitle(e.target.value);
                  }}
                  required
                  style={{ outline: "none" }}
                >
                  <option>{changeCategoryTitle}</option>"
                  {categories &&
                    categories.map((categoryItem) => {
                      return <option key={categoryItem}>{categoryItem}</option>;
                    })}
                </select>
              </div>

              {/* PRODUCT STOCK */}
              <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 border-bottom">
                <StorageIcon className="fs-2 text-body mx-3" />
                <input
                  className=" border-0 outline-0 w-75 fs-4"
                  type="number"
                  placeholder="Product Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                  style={{ outline: "none" }}
                />
              </div>

              {/* PRODUCT IMAGES */}
              <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 border-bottom">
                <input
                  className=" border-0 outline-0 w-75 fs-4"
                  type="file"
                  multiple
                  onChange={imgInpChangeHandler}
                  name="productImage"
                  style={{ outline: "none" }}
                />
              </div>

              {/* PRODUCT PREVIEW IMAGES */}
              <div
                className="col-7 m-auto d-flex justify-content-center align-items-center"
                style={{ overflow: "auto" }}
              >
                {imagePreview.map((image, index) => {
                  return (
                    <img
                      key={index}
                      src={image.url}
                      alt="previewImg"
                      className="mx-2"
                      style={{ width: "8vmax" }}
                    />
                  );
                })}
              </div>

              {/* BUTTON */}
              <div className="col-7 m-auto d-flex justify-content-center align-items-center mb-2 ">
                <input
                  className="  btn btn-danger w-50 "
                  type="submit"
                  value="Create"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProductCreate;
