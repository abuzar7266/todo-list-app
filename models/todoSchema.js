var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var TodoSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
  completedTime: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Todo", TodoSchema);

// End of File

