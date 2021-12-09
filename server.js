//db connection
const connectDB = require("./db/connect");
require("dotenv").config();

const express = require("express");
const app = express();

const session = require("express-session");
// const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const routes = require("./controllers");

const flash = require("connect-flash");

const passportConfig = require("././middleware/passport")(passport);

// express session
app.use(
  session({
    secret: "no secret",
    resave: false,
    saveUninitialized: true,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Express body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

//global variables
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash("success_msg");
//   res.locals.error_msg = req.flash("error_msg");
//   res.locals.error = req.flash("error");
//   next();
// });

// template engine
app.use(expressLayouts);
app.set("view engine", "ejs");

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
