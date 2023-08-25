var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
  firstName: {
    type: String,
    default: "Anonymous",
  },
  lastName: {
    type: String,
    default: "User",
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
