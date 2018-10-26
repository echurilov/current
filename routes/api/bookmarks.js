const express = require("express");

const Bookmark = require('../../models/Bookmark');
const validateBookmark = require('../../validations/bookmark');
const passport = require("passport");

const router = express.Router();

// TEST
router.get("/test", (req, res) => res.json({ msg: "This is the bookmarks route" }));

// INDEX
router.get('/', passport.authenticate('jwt', { session: false }),
  function (req, res) {
    (async () => {
      user = req.user.id || req.query.user_id;
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
router.post("/", (req, res) => {
  // console.log('CREATING BOOKMARK!!!!GUUGHI', req.body);
  // (async () => {
    
    // console.log('IN ASYNC ACTION', req.body);
    const { errors, isValid } = validateBookmark(req.body);
    // console.log('BOOKMARK', req.body);

    if (!isValid) {
      // console.log('ERRORSinvalid',errors);
      return res.status(400).json(errors);
    }

    Bookmark.findOne({ user_id: req.body.user_id, query: req.body.query }).then(dupBookmark => {
      if (dupBookmark) {
        // throw { query: "Bookmark already exists" };
        errors.query = "You already saved this bookmark";
        return res.status(400).json(errors);
      } else {
        bookmark = req.body;
        const newBookmark = new Bookmark(bookmark);
        newBookmark.save()
        .then( ()=> res.json({
          success: true,
          bookmark: newBookmark
        }))
          .catch(err => console.log('ERR2', err));
      }
    })
  // })
    .catch(errors => {
      console.log('ERRORS',errors);
      console.log('heyyyy',errors);
      res.status(400).json(errors);
    })
});

// SHOW
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

// UPDATE
router.patch("/:bookmarkId", (req, res) => {
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
