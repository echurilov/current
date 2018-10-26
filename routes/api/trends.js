const express = require("express");
const router = express.Router();
const googleTrends = require("google-trends-api-es");
const googleTrends2 = require("google-trends-api");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the google trends route" })
);

router.get("/", (req, res) => {
  return googleTrends
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

router.get("/related/:searchQuery", (req, res) => {
  return googleTrends2
    .relatedTopics({keyword: req.params.searchQuery})
    .then(function (results) {
      res.json({
        relatedQueries: JSON.parse(results)
      });
    })
    .catch(function (err) {
      console.error("Oh no there was an error", err);
    });
});


// googleTrends.relatedQueries({keyword: string, startTime: Date, endTime: Date, geo: string}, cbFunc)

module.exports = router;
