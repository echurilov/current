const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("./keys");

router.get("/:searchQuery", (req, res) => {
  const processedQuery = req.params.searchQuery.split(" ").join("+");

  console.log('WE MADE IT INTO THE BACKEND SEARCH!!!')
  const giphyCallback = () => {
    return axios({
      method: "get",
      url: `https://api.giphy.com/v1/gifs/search?api_key=${
        keys.giphyId
      }&q=${processedQuery}`
    })
      .then(result => {
        return result.data;
      })
      .catch(err => {
        return err;
      });
  };

  Promise.all([giphyCallback()])
    .then(function(value) {
      const allTheData = {};
      // allTheData["imgur"] = value[0].data.slice(0, 10);
      allTheData["giphy"] = value[0].data.slice(0, 10);
      console.log(allTheData);
      res.json({
        giphy: value[0].data.slice(0,10)
      })
    })
    .catch(err => {
      console.log("search didnt work");
      return;
    });
});

module.exports = router;
