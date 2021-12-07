//db connection
const connectDB = require("./db/connect");
require("dotenv").config();

const express = require("express");
const app = express();

const session = require("express-session");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const routes = require("./controllers");

// Express body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express session
app.use(
  session({
    secret: "no secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(routes);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// template engine
app.use(expressLayouts);
app.set("view-engine", "ejs");

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
