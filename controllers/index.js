const router = require("express").Router();

// add home routes
const homeRoutes = require("./home-routes.js");
router.use("/", homeRoutes);

// // add dashboard routes
// const dashboardRoutes = require("./dashboard-routes.js");
// router.use("/dashboard", dashboardRoutes);

module.exports = router;
