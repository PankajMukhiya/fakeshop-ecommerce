import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

//options
const options = {
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
  offset: "650px",
  timeout: 5000,
};
ReactDOM.render(
  <>
    <div className="container-fluid">
    <Provider store={store}>
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </BrowserRouter>
    </Provider>
    </div>
  </>,
  document.getElementById("root")
);
