const express = require("express");
const router = express.Router();
// const googleTrends = require("google-trends-api-es");
const googleTrends2 = require("google-trends-api");
const axios = require("axios");
var parseString = require("xml2js").parseString;

router.get("/test", (req, res) =>
  res.json({ msg: "This is the google trends route" })
);

router.get("/", (req, res) => {
  // return googleTrends
  //   .hotTrends("US")
  //   .then(function (results) {
  //     res.json({
  //       trends: results
  //     });
  //   })
  //   .catch(function (err) {
  //     console.error("Oh no there was an error", err);
  //   });
  return axios({
    method: "get",
    url: `https://trends.google.com/trends/trendingsearches/daily/rss?geo=US`,
  })
    .then(res => {
      let items = [];
      parseString(res.data, function (err, result) {
        items = result.rss.channel[0].item;
      });  

      let trends = [];
      items.forEach((item) => {
        trends.push(item.title[0]);
      });

      console.log(trends);
      return res.json({trends: trends});
    })
    .catch(err => {
      return err;
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

module.exports = router;
