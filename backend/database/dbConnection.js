const mongoose = require("mongoose");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config.env" });
}

const dbUri = process.env.DB_URI;
const dbConnection = async () => {
  try {
    // console.log("came here");
    const res = await mongoose.connect(dbUri);
    // console.log("also came here")
    console.log(
      `Database Connection Successfully with : ${res.connection.host}`
    );
  } catch (error) {
    console.log(`ERROR in dbConnection:--> ${error}`);
  }
};

module.exports = dbConnection;


