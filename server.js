const connectDB = require("./db/connect");
require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`🌍----->Server is running on port ${PORT}----->🌍`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
