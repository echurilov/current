const express = require("express");
const router = express.Router();
const googleTrends = require("google-trends-api-es");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the google trends route" })
);

router.get("/", (req, res) => {
  googleTrends
    .hotTrends("US")
    .then(function (results) {
      res.json({
        trends: results
      });
    })
    .catch(function (err) {
      console.error("Oh no there was an error", err);
    });
});

module.exports = router;