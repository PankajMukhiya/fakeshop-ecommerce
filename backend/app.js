const express = require("express");
const app = express();
const path = require("path");
//dotenv
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");
const errorMiddleware = require("./middleware/error");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(fileUpload({ useTempFiles: true }));
// app.use(fileUpload());
// app.use(cors());

// route imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");

//AND USE THE ALL ROUTER
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

// SEND STATIC PATH WHEN THE DEPLOY THE PROJECT
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// middlerware for error
app.use(errorMiddleware);

module.exports = app;
