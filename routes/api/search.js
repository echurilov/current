const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("../../config/keys");
const NewsAPI = require("newsapi");
const news = new NewsAPI(keys.newsId);
const youtubeSearch = require("youtube-api-v3-search");

//https://stackoverflow.com/questions/16686640/function-to-get-yesterdays-date-in-javascript-in-format-dd-mm-yyyy
let today = new Date();
let yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const dd = yesterday.getDate();
const mm = yesterday.getMonth() + 1; //January is 0!
const yyyy = yesterday.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
yesterday = yyyy + "-" + mm + "-" + dd;

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

  const newsCallback = () => {

    return news.v2
      .everything({
        q: processedQuery,
        language: "en",
        sortBy: "relevancy",
        from: yesterday
      })
      .then(res => {
        return { data: res.articles };
      })
      .catch(err => {
        return err;
      });
  };

  const youtubeCallback = () => {
    const options = {
      q: processedQuery,
      type: 'video',
      maxResults: 10,
      order: 'viewCount',
      publishedAfter: yesterday + "T00:00:00Z",
      safeSearch: "strict",
      videoEmbeddable: "true"
    };

    return youtubeSearch(keys.youtubeId, options)
      .then(res => {
        console.log(res)
        return { data: res.items };
      })
      .catch(err => {
        return err;
      });
  };

  Promise.all([
    giphyCallback(),
    newsCallback(),
    youtubeCallback()
  ])
    .then(function(value) {
      res.json({
        giphy: value[0].data.slice(0,10),
        news: value[1].data.slice(0,10),
        youtube: value[2].data
      });
    })
    .catch(err => {
      console.log("search didnt work");
      return;
    });
});

module.exports = router;
