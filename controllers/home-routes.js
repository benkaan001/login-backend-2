const router = require("express").Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.render("homepage");
});

module.exports = router;
