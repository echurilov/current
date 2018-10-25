const express = require("express");
const router = express.Router();
const googleTrendsEs = require("google-trends-api-es");
const googleTrends = require("google-trends-api");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the google trends route" })
);

router.get("/", (req, res) => {
  return googleTrendsEs
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
  return googleTrends
    .relatedTopics({keyword: req.params.searchQuery})
    .then(function (results) {
      console.log(JSON.parse(results));
      // console.log(Object.keys(results));

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
