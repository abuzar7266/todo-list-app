var User = require("../models/userSchema");
var authenticate = require("../auth");
function signup(req, res) {
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
}
function login(req, res) {
  const { user } = req;
  const token = authenticate.getToken({ _id: req.user._id });
  return res.json({ user, token });
}

async function fetchCredential (jwt_payload, done){
  await User.findOne({ _id: jwt_payload._id })
    .then((res) => {
      if (res) return done(null, res);
      else return done(null, false);
    })
    .catch((err) => {
      return done(err, false);
    });
}
module.exports = {
  signup,
  login,
  fetchCredential
};

// End of File
