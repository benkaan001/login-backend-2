const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { forwardAuthenticated } = require(".././middleware/auth");

// user login page
router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
});

router.get("/signup", forwardAuthenticated, (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // check if all required fields are filled out
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "All fields must be filled out!" });
  }

  // check if passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match!" });
  }

  // check password length

  if (password.length <= 6) {
    errors.push({ msg: "Password must have minimum 6 characters!" });
  }
  // validation fails
  if (errors.length > 0) {
    res.render("signup", { errors, name, email, password, password2 });
  } else {
    //validation passes

    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "This email is already registered!" });
        res.render("signup", { errors, name, email, password, password2 });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // hash password

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hash
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered! Please login!"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are now logged out");
  res.redirect("/users/login");
});

module.exports = router;
