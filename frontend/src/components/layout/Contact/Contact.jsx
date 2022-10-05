import React from "react";
import MetaData from "../MetaData";

const Contact = () => {
  return (
    <>
      <MetaData title={"FakeShop - Contact Us"} />
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mt-5 text-decoration-underline ">Contact Us</h2>
        <div className="row" style={{ height: "40.8vh" }}>
          <div className="col-12 m-auto ">
            <a className=" " href="mailto:lovekumar7666@gmail.com">
              <button className="btn fs-1 btn-outline-success ">
                Contact: lovekumar7666@gmail.com
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
