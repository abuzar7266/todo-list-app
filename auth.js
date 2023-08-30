var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken"); // used to create, sign, and verify token
const userController = require("./controllers/userController");
const User = require('./models/userSchema');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "ahsdjhasdhagsjdgajsdgjhagsdjhgasdhgajhsgdjhagsdhgasd";


exports.getToken = function (user) {
  return jwt.sign(user, process.env.SESSION_SECRET, { expiresIn: 3600 });
};

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, userController.fetchCredential)
);
exports.verifyUser = passport.authenticate("jwt", { session: false });

// End of File
