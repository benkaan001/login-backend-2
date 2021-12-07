function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Please log in first!");
  res.redirect("/users/login");
}

function forwardAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
}

module.exports = { ensureAuthenticated, forwardAuthenticated };
