const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  user_id: {
    type: integer,
    required: true
  },
  query: {
    type: String,
    required: true
  }
  // API_id: {
  //   type: Integer,
  //   required: true
  // },
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
});

module.exports = User = mongoose.model("users", UserSchema);
