const express = require("express");

const Bookmark = require('../../models/Bookmark');
const validateNewBookmark = require('../../validations/bookmark');

const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "This is the bookmarks route" }));

router.post("/create", (req, res) => {
  const { errors, isValid } = validateNewBookmark(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Bookmark.findOne({ user_id: req.bookmark.user_id, query: req.body.query }).then(bookmark => {
    if (bookmark) {
      errors.query = "Bookmark already exists";
      return res.status(400).json(errors);
    } else {
      const newBookmark = new Bookmark({
        user_id: req.bookmark.user_id,
        query: req.bookmark.query
      });
    }
  });
});

router.get("/:bookmarkId", (req, res) => {
  const { errors, isValid } = validateNewBookmark(req.body);

  const { bookmarkId } = req.params;
  if (!bookmarkId) {
    return res.json({ success: false, error: "No bookmark id provided" });
  }

  Bookmark.findOne({ id: bookmarkId }).then(bookmark => {
    if (bookmark) {
      res.json({
        id: req.bookmark.id,
        user_id: req.bookmark.user_id,
        title: req.bookmark.title,
        query: req.bookmark.query,
        msg: "Success"
      });
    } else {
      errors.id = "Bookmark does not exist";
      return res.status(400).json(errors);
    }
  });
});

module.exports = router;