import React, { useEffect, useState } from "react";
import CategoryIcon from "@material-ui/icons/Category";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";
const UpdateProduct = () => {
  const { error, product } = useSelector((state) => state.productDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.productReducer
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();
  // STATE
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  //   const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [changeCategoryTitle, setChangeCategoryTitle] = useState(
    "Open this to select Category"
  );
  // SET NEW IMG USESTATE
  //   const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewNewImages, setPreviewNewImages] = useState([]);

  // USEEFECT
  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setStock(product.stock);
      setCategory(product.category);
      setNewImages(product.images);
      setPreviewNewImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.success(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated Successfully...");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [error, alert, dispatch, updateError, isUpdated, navigate, product, id]);

  // CHANGE HANDLER
  const imgInpChangeHandler = async (e) => {
    const files = e.target.files;

    // defining image url and public id
    setNewImages([]);
    setPreviewNewImages([]);
    setImagePreview([]);

    // making img link of all the selected img one by one using for loop
    for (let i = 0; i < files.length; i++) {
      let fileitem = files[i];
      // console.log(fileitem);
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
          setNewImages((oldImg) => [
            ...oldImg,
            {
              public_id: data.public_id,
              url: data.secure_url,
            },
          ]);
          setPreviewNewImages((oldImg) => [
            ...oldImg,
            {
              public_id: data.public_id,
              url: data.secure_url,
            },
          ]);
        })
        .catch((err) => console.log(err));
    }
  };

//   console.log(newImages)
  // SUBMIT HANDLER
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(name, price, category, description, stock, images);
    dispatch(
      updateProduct(id, name, price, category, description, stock, newImages)
    );
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

  return (
    <>
      <div className="dashBoardContainer container-fluid  p-2 ">
        <div className="row ">
          <div className="col-7 m-auto mt-2 border shadow-lg p-3">
            <form
              className=" d-flex flex-column justify-content-center align-items-center gap-3"
              onSubmit={updateProductSubmitHandler}
              encType="multipart/form-data"
            >
              <h2 className="text-center text-body my-2 border-bottom border-3 w-50">
                Update Product
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

              {/* PRODUCT PREVIEW OLD IMAGES */}
              <div
                className="col m-auto d-flex justify-content-center align-items-center"
                style={{ overflow: "auto" }}
              >
                {imagePreview.map((image, index) => {
                  return (
                    <img
                      key={index}
                      src={image.url}
                      alt="previewImg"
                      className="mx-2 "
                      style={{ width: "8vmax" }}
                    />
                  );
                })}
              </div>

              {/* PRODUCT PREVIEW NEW IMAGES */}
              <div
                className="col-7 m-auto d-flex justify-content-center align-items-center"
                style={{ overflow: "auto" }}
              >
                {previewNewImages.map((image, index) => {
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
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
