var express = require("express");
var userRouter = express.Router();
const bodyParser = require("body-parser");
var passport = require("passport");
const userController = require("../controllers/userController");

userRouter.use(bodyParser.json());

userRouter.post("/signup", userController.signup);
userRouter.post("/login", passport.authenticate("local"), userController.login);

module.exports = userRouter;

// End of File
