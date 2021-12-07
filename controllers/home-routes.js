const router = require("express").Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.send("Welcome home!");
});

module.exports = router;
