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
  
  let filters = {
    imgur: req.query.imgur,
    tumblr: req.query.tumblr,
    giphy: req.query.giphy,
    news: req.query.news,
    youtube: req.query.youtube,
  }

  let landingResultQueries = req.query.landingPageTopics ? 
    req.query.landingPageTopics.map( query => {
      return query.split(" ").join("+");
    }) : undefined;

  const imgurCallback = () => {
    const queryToUse = landingResultQueries ? landingResultQueries[0] : processedQuery

    if (filters.imgur === 'true') {
      return axios({
        method: "get",
        url: `https://api.imgur.com/3/gallery/search?q=${queryToUse}`,
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

  const tumblrCallback = () => {
    const queryToUse = landingResultQueries ? landingResultQueries[1] : processedQuery;

    if (filters.tumblr === 'true') {
      return axios({
        method: "get",
        url: `http://api.tumblr.com/v2/tagged?tag=${queryToUse}&api_key=${keys.tumblrId}`
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
    const queryToUse = landingResultQueries ? landingResultQueries[2] : processedQuery;

    if (filters.giphy === 'true') {
      return axios({
        method: "get",
        url: `https://api.giphy.com/v1/gifs/search?api_key=${
          keys.giphyId
          }&q=${queryToUse}`
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
    const queryToUse = landingResultQueries ? landingResultQueries[3] : processedQuery;

    if (filters.news === 'true') {
      return news.v2
        .everything({
          q: queryToUse,
          language: "en",
          sortBy: "relevancy",
          from: twoDaysAgo,
          pageSize: 10,
          page: 1
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
    const queryToUse = landingResultQueries ? landingResultQueries[4] : processedQuery;

    if (filters.youtube === 'true') {
      const options = {
        part: 'snippet, id',
        q: queryToUse,
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
    imgurCallback(),
    tumblrCallback(),
  ])
    .then(function(value) {

      let giphyData = [];
      if (value[0]){
        giphyData = value[0].data.slice(0,10);
      }

      let newsData = [];
      if (value[1]){
        newsData = value[1].data;
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

      let tumblrData = [];
      if (value[4]) {
        value[4].response.forEach(tumblrItem => {
          if (tumblrItem.type === 'photo' && (tumblrItem.photos[0].original_size.height/tumblrItem.photos[0].original_size.width) > 0.7) {
            tumblrData.push(tumblrItem);
          }
        });
      }
      
      res.json({
        giphy: giphyData,
        news: newsData,
        youtube: youtubeData,
        imgur: validImgurData.slice(0, 10),
        tumblr: tumblrData.slice(0, 10),
      });
    })
    .catch(err => {
      console.log("search didnt work");
      return;
    });
});

module.exports = router;
