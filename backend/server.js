const app = require("./app");
const dbConnection = require("./database/dbConnection");
const cloudinary = require("cloudinary");
// Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("...Shutting down the Server due to uncaught Promise Exception");
  process.exit(1);
});
//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config.env" });
}

//port
const port = process.env.PORT || 5555;
//database connection after the config
dbConnection();

// CLOUDINARY SETUP
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// SERVER LISTEN
const serverOn = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// unhandle promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("...Shutting down the Server due to unhandled Promise Rejection");
  serverOn.close(() => {
    process.exit(1);
  });
});
