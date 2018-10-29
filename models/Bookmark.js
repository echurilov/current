const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  user_id: {
    type: Schema.ObjectId,
    required: true
  },
  query: {
    type: String,
    required: true
  }
});

module.exports = Bookmark = mongoose.model("bookmarks", BookmarkSchema);
