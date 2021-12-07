const router = require("express").Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.send("Welcome home!");
});

router.get("/login", (req, res) => {
  res.send("<h1>login</h1>");
});

router.get("/signup", (req, res) => {
  res.send("<h1>Signup Here</h1>");
});

module.exports = router;
