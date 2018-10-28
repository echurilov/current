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
  let filters = req.query;

  const imgurCallback = () => {
    if (filters.imgur === 'true') {
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
    } else {
      return Promise.resolve();
    }
    
  };

  const giphyCallback = () => {
    if (filters.giphy === 'true') {
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
    } else {
      return Promise.resolve();
    } 
  };

  const newsCallback = () => {
    if (filters.news === 'true') {
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
    } else {
      return Promise.resolve();
    }   
  };

  const youtubeCallback = () => {

    if (filters.youtube === 'true') {
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
    } else {
      return Promise.resolve();
    }
    
  };

  Promise.all([
    giphyCallback(),
    newsCallback(),
    youtubeCallback(),
  ])
    .then(function(value) {

      let giphyData = [];
      if (value[0]){
        giphyData = value[0].data.slice(0,10);
      }

      let newsData = [];
      if (value[1]){
        newsData = value[1].data.slice(0,10);
      }

      let youtubeData = [];
      if (value[2]) {
        youtubeData = value[2].data;
      }

      const validImgurData = [];
      if (value[3]) {
        value[3].data.forEach(imgurData => {
          if (imgurData.type && imgurData.type.slice(0, 5) === 'image' && imgurData.privacy !== 'hidden') {
            validImgurData.push(imgurData);
          }
        });
      }
      
      res.json({
        giphy: giphyData,
        news: newsData,
        youtube: youtubeData,
        imgur: []
      });
    })
    .catch(err => {
      console.log("search didnt work");
      return;
    });
});

module.exports = router;
