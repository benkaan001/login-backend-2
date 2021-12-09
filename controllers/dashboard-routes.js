const router = require("express").Router();
const {ensureAuthenticated} = require('../middleware/auth')

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
