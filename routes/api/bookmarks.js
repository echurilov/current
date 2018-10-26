const express = require("express");

const Bookmark = require('../../models/Bookmark');
const validateBookmark = require('../../validations/bookmark');

const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "This is the bookmarks route" }));

router.get("/", (req, res) => {
  (async () => {
    number = req.body.count || 30;
    Bookmark.find({ qty: { $lt: number } }).then(bookmarks => {
      if (bookmarks) {
        res.json(bookmarks);
      } else {
        errors = { id: "No bookmarks" };
        return res.status(400).json(errors);
      };
    })
  })()
    .catch(errors => {
          res.status(400).json(errors);
        }
      )
});

router.post("/", (req, res) => {
  (async () => {
    console.log('CREATING BOOKMARK!!!!GUUGHI', req.body);

    const { errors, isValid } = validateBookmark(req.body);
    console.log('BOOKMARK', req.body);

    if (!isValid) {
      console.log('ERRORSinvalid',errors);
      return res.status(400).json(errors);
    }

    Bookmark.findOne({ user_id: req.body.user_id, query: req.body.query }).then(dupBookmark => {
      if (dupBookmark) {
        // throw { query: "Bookmark already exists" };
        errors.query = "You already saved this bookmark";
        return res.status(400).json(errors);
      } else {
        const newBookmark = new Bookmark(bookmark);
        newBookmark.save()
        .then( ()=> res.json({
          success:true,
          bookmark:newBookmark
        }))
          .catch(err => console.log('ERR2', err));
      }
    });
  })
    // .catch(errors => {
    //   console.log('ERRORS',errors);
    //   console.log('heyyyy',errors);
    //   res.status(400).json(errors);
    // })
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
      Bookmark.updateOne({ _id: bookmarkId }, { $set: req.body }).then(
        () => res.json({ bookmark })
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
