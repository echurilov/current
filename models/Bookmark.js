const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  user_id: {
    type: Number,
    required: true
  },
  query: {
    type: String,
    required: true
  }
  // API_id: {
  //   type: Number,
  //   required: true
  // },
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
});

module.exports = Bookmark = mongoose.model("bookmarks", BookmarkSchema);
