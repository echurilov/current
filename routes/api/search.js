const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("./keys");

router.get("/:searchQuery", (req, res) => {
  const processedQuery = req.params.searchQuery.split(" ").join("+");
  debugger;
  const imgurCallback = () => {
    return axios({
      method: "get",
      url: `https://api.imgur.com/3/gallery/search?q=${processedQuery}`,
      headers: { Authorization: `Client-ID ${keys.imgurId}` }
    })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return err;
      });
  };

  const giphyCallback = () => {
    return axios({
      method: "get",
      url: `https://api.giphy.com/v1/gifs/search?api_key=${
        keys.giphyId
      }&q=${processedQuery}`
    })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return err;
      });
  };

  Promise.all([imgurCallback(), giphyCallback()])
    .then(function(value) {
      const allTheData = {};
      allTheData["imgur"] = value[0].data.slice(0, 10);
      allTheData["giphy"] = value[1].data.slice(0, 10);
      console.log(allTheData);
      return allTheData;
    })
    .catch(err => {
      console.log("search didnt work");
      return;
    });
});

module.exports = router;
