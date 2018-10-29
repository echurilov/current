const express = require("express");

const Bookmark = require('../../models/Bookmark');
const validateBookmark = require('../../validations/bookmark');
const passport = require("passport");

const router = express.Router();

// TEST
router.get("/test", (req, res) => res.json({ msg: "This is the bookmarks route" }));

// INDEX
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
    (async () => {
      user = req.user._id
      Bookmark.find({ user_id: user }).then(bookmarks => {
        if (bookmarks) {
          res.json(bookmarks);
        } else {
          errors = { id: "No bookmarks" };
          return res.status(400).json(errors);
        };
      })
    })()
      .catch(errors => res.status(400).json(errors))
  }
);

// CREATE
router.post("/", passport.authenticate("jwt", { session: false }), function (req, res) {
    
    const { errors, isValid } = validateBookmark(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Bookmark.findOne({ user_id: req.body.user_id, query: req.body.query }).then(dupBookmark => {
      if (dupBookmark) {
        errors.query = "You already saved this bookmark";
        return res.status(400).json(errors);
      } else {
        bookmark = req.body;
        const newBookmark = new Bookmark(bookmark);
        newBookmark.save().then(() =>
          res.json({
            success: true,
            bookmark: newBookmark
          })
        );
      }
    });
  });

// SHOW
router.get("/:bookmarkId", passport.authenticate("jwt", { session: false }), function (req, res) {
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

// UPDATE
router.patch("/:bookmarkId", passport.authenticate("jwt", { session: false }), function (req, res) {
  const { bookmarkId } = req.params;
  if (!bookmarkId) {
    return res.json({ success: false, error: "No bookmark id provided" });
  }

  Bookmark.findOne({ _id: bookmarkId }).then(bookmark => {
    if (bookmark) {
      Bookmark.updateOne({ _id: bookmarkId }, { $set: req.body }).then(
        () => res.json({ bookmark })
      );
    } else {
      errors = { id: "Bookmark does not exist" };
      return res.status(400).json(errors);
    }
  });
});

// DESTROY
router.delete("/:bookmarkId", passport.authenticate("jwt", { session: false }), function (req, res) {
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
