import React from "react";
import { images } from "../../../assets";

const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-dark text-light mt-4 pt-3">
        <div id="left_div" className="row d-flex ">
          <div className="col-10 mx-auto col-sm-4  d-flex flex-column justify-content-center align-items-center ">
            <h3 className=" text-nowrap">Download Our App</h3>
            <p className="">Download App for Android and IOS Mobile Phone</p>
            <div className="d-flex flex-row flex-md-column w-75 justify-content-center  align-items-center">
              <img
                className="footerImg card-img btn w-75"
                src={images.Playstore}
                alt="playstore"
              />
              <img
                className="footerImg card-img  btn w-75 "
                src={images.Appstore}
                alt="appstore"
              />
            </div>
          </div>
          <div
            id="center_div"
            className="col-6 mx-auto col-sm-4 d-flex flex-column justify-content-center align-items-center "
          >
            <h1 className="col-6 text-warning fs-1">FAKESHOP.</h1>
            <p className="text-wrap text-light ">High Quality is Our First Priority</p>
            <p className="text-light ">Coppyrights 2022 ⓒ Fakeshop</p>
          </div>
          <div
            id="riht_div"
            className="col-6 mx-auto col-sm-4 d-flex flex-column justify-content-center align-items-center "
          >
            <h1 className="text-decoration-underline">Follow Us</h1>
            <a
              className="socialMedaiLink nav-link  text-light rounded-3  "
              href="http://instagram.com/fakeshop"
            >
              Instagram
            </a>
            <a
              className="socialMedaiLink nav-link text-light rounded-3"
              href="http://youtube.com/fakeshop"
            >
              YoutTube
            </a>
            <a
              className="socialMedaiLink nav-link text-light  rounded-3 "
              href="http://facebook.com/fakeshop"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
