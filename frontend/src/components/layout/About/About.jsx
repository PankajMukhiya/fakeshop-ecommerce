import React from "react";
import MetaData from "../MetaData";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import "./about.css"
const About = () => {
  return (
    <>
      <MetaData title={"FakeShop - About Us"} />
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
        <div className="row" style={{ height: "53.5555vh" }}>
          <div className="col-12 m-auto ">
            <h2 className="text-center mb-5 text-decoration-underline ">
              About Us
            </h2>
            <p className="text-center">
              This is the About Page of Fake Shop e-Commerce website.
            </p>
          </div>
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h2 className="mb-5 text-decoration-underline ">
              Our Social Media Handle
            </h2>
            <div className="">
              <a href="https://www.instagram.com/fakeshop" target="blank" className="btn btn-outline-secondary  mx-2 mx-lg-3" >
                <InstagramIcon className="text-danger fs-1 " />
              </a>
              <a href="https://www.facebook.com/fakeshop" target="blank" className="btn btn-outline-secondary mx-2 mx-lg-3">
                <FacebookIcon className="text-primary fs-1" />
              </a>
              <a href="https://www.twitter.com/fakeshop" target="blank" className="btn btn-outline-secondary mx-2 mx-lg-3">
                <TwitterIcon className="text-info fs-1" />
              </a>
              <a href="https://www.youtube.com/channel/fakeshop" target="blank" className="btn btn-outline-secondary mx-2 mx-lg-3">
                <YouTubeIcon className="text-danger fs-1" />
              </a>
              <a href="https://www.linkedin.com/fakeshop" target="blank" className="btn btn-outline-secondary mx-2 mx-lg-3">
                <LinkedInIcon className="text-primary fs-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
