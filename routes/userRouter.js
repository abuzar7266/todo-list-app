var express = require("express");
var userRouter = express.Router();
const bodyParser = require("body-parser");
var User = require("../models/userSchema");
var passport = require("passport");
var authenticate = require("../auth");

userRouter.use(bodyParser.json());
userRouter.get("/", authenticate.verifyUser, (req, res, next) => {
  User.find({})
    .then(
      (users) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});
userRouter.delete("/:id", authenticate.verifyUser, (req, res, next) => {
  User.findByIdAndRemove({ _id: req.user._id })
    .then(
      () => {
        res.statusCode = 200;
        res.send("Profile has been deleted successfully");
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});
userRouter.post("/signup", (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      }
    }
  );
});
/* POST login. */
userRouter.post(
  "/login",
  passport.authenticate("local"),
  function (req, res, next) {
    const { user } = req;
    const token = authenticate.getToken({ _id: req.user._id });
    return res.json({ user, token });
  }
);

module.exports = userRouter;
