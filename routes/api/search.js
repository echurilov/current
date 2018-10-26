const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("../../config/keys");
const NewsAPI = require("newsapi");
const news = new NewsAPI(keys.newsId);
const youtubeSearch = require("youtube-api-v3-search");
const moment = require("moment");

const twoDaysAgo = moment().subtract(2, "day").format("YYYY-MM-DD");
const twoWeeksAgo = moment().subtract(14, "day").format("YYYY-MM-DD");

router.get("/:searchQuery", (req, res) => {
  const processedQuery = req.params.searchQuery.split(" ").join("+");

  // console.log('WE MADE IT INTO THE BACKEND SEARCH!!!')

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
      })
  };

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
        from: twoDaysAgo
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
      part: 'snippet, id',
      q: processedQuery,
      type: 'video',
      maxResults: 10,
      order: 'viewCount',
      publishedAfter: twoWeeksAgo + "T00:00:00Z",
      safeSearch: "strict",
      videoEmbeddable: "true",
      relevanceLanguage: "en"
    };

    return youtubeSearch(keys.youtubeId, options)
      .then(res => {
        return { data: res.items };
      })
      .catch(err => {
        return err;
      });
  };

  Promise.all([
    giphyCallback(),
    newsCallback(),
    youtubeCallback(),
    imgurCallback()
  ])
    .then(function(value) {

      const validImgurData = []
      value[3].data.forEach( imgurData => {
        if (imgurData.type && imgurData.type.slice(0,5) === 'image' && imgurData.privacy != 'hidden') {
          validImgurData.push(imgurData);
        }
      });

      res.json({
        giphy: value[0].data.slice(0,10),
        news: value[1].data.slice(0,10),
        youtube: value[2].data,
        imgur: validImgurData.slice(0,10)
      });
    })
    .catch(err => {
      console.log("search didnt work");
      return;
    });
});

module.exports = router;
