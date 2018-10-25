const express = require("express");

const Bookmark = require('../../models/Bookmark');
const validateBookmark = require('../../validations/bookmark');

const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "This is the bookmarks route" }));

router.post("/", (req, res) => {
  (async () => {
    let bookmark = validateBookmark(req.body);
    return Bookmark.findOne(bookmark).then(dupBookmark => {
      if (dupBookmark) {
        throw { query: "Bookmark already exists" };
      } else {
        const newBookmark = new Bookmark(bookmark);
        newBookmark.save()
        .then( ()=> res.json({
          success:true,
          bookmark:newBookmark
        }));
      }
    });
  })()
    .catch(errors => res.status(400).json(errors))
});

router.get("/:bookmarkId", (req, res) => {
  const { bookmarkId } = req.params;
  if (!bookmarkId) {
    return res.json({ success: false, error: "No bookmark id provided" });
  }

  Bookmark.findOne({ _id: bookmarkId }).then(bookmark => {
    if (bookmark) {
      res.json(bookmark);
    } else {
      errors = {id: "Bookmark does not exist"};
      return res.status(400).json(errors);
    }
  });
});

// router.patch("/:bookmarkId", (req, res) => {
//   (async () => {
//     return Bookmark.findOneAndUpdate({ _id: bookmarkId }, { $set: req.body} )
//   })().catch(errors => res.status(400).json(errors));
// });

router.patch("/:bookmarkId", (req, res) => {
  const { bookmarkId } = req.params;
  if (!bookmarkId) {
    return res.json({ success: false, error: "No bookmark id provided" });
  }

  Bookmark.findOne({ _id: bookmarkId }).then(bookmark => {
    if (bookmark) {
      Bookmark.update({ _id: bookmarkId }, { $set: req.body }).then(() =>
        res.json({ bookmark })
      );
    } else {
      errors = { id: "Bookmark does not exist" };
      return res.status(400).json(errors);
    }
  });
});

router.delete("/:bookmarkId", (req, res) => {
  const { bookmarkId } = req.params;
  if (!bookmarkId) {
    return res.json({ success: false, error: "No bookmark id provided" });
  }

  Bookmark.findOne({ _id: bookmarkId }).then(bookmark => {
    if (bookmark) {
      Bookmark.deleteOne({ _id: bookmarkId })
        .then(() => res.json({bookmark}));
    } else {
      errors = { id: "Bookmark does not exist" };
      return res.status(400).json(errors);
    }
  });
});

module.exports = router;