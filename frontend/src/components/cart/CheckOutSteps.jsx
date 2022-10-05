import React from "react";
import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./checkOutSteps.css"; //neccessary added this css file in this class name which is bydefault
const CheckOutSteps = ({ activeStep }) => {
  //shippin steps
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon className="fs-1 text-danger" />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon className="fs-1 text-danger" />,
    },
    {
      label: <Typography>Payment</Typography>, 
      icon: <AccountBalanceIcon className="fs-1 text-danger" />,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => {
          return (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                icon={item.icon}
                style={{
                  color: activeStep >= index ? "#ff6347" : "#000000",
                }}
              >
                {item.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
};

export default CheckOutSteps;
