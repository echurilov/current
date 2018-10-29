import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchResults } from '../actions/results_actions';

import ImgurIndexItem from './results/imgur_index_item';
import GiphyIndexItem from './results/giphy_index_item';
import NewsIndexItem from './results/news/news_index_item';
import YoutubeIndexItem from './results/youtube/youtube_index_item';
import TumblrIndexItem from './results/tumblr_index_item';

import "../css/search_results.scss";
const shuffle = require('shuffle-array');

const mapStateToProps = state => ({
  giphy: state.entities.giphy,
  news: state.entities.news,
  imgur: state.entities.imgur,
  youtube: state.entities.youtube,
  tumblr: state.entities.tumblr,
})

const mapDispatchToProps = dispatch => ({
  fetchResults: (searchTerm, filters) => dispatch(fetchResults(searchTerm, filters))
});

class SearchResults extends React.Component {

  render() {

    let { giphy, news, imgur, youtube, tumblr } = this.props; 

    let giphyItems;
    if (giphy.length > 0) {
      giphyItems = [];
      giphy.forEach((giphyItem, idx) =>
        giphyItems.push(<GiphyIndexItem key={giphyItem.id} giphyItem={giphyItem} />)
      );
    } else {
      giphyItems = [];
    }

    let newsItems;
    if (news.length > 0) {
      newsItems = [];
      news.forEach(article =>
        newsItems.push(
          <NewsIndexItem key={Math.random()} article={article} />
        )
      );
    } else {
      newsItems = [];
    }

    let imgurItems;
    if (imgur.length > 0) {
      imgurItems = [];
      imgur.forEach(imgurItem =>
        imgurItems.push(
          <ImgurIndexItem key={imgurItem.id} imgurItem={imgurItem} />
        )
      );
    } else {
      imgurItems = [];
    }

    let youtubeItems;
    if (youtube.length > 0) {
      youtubeItems = [];
      this.props.youtube.forEach(
        (video) => (youtubeItems.push((<YoutubeIndexItem key={video.id.videoId} video={video} />)))
      )
    } else {
      youtubeItems = [];
    }

    let tumblrItems;
    if (tumblr.length > 0) {
      tumblrItems = [];
      tumblr.forEach( tumblrItem => 
        tumblrItems.push(<TumblrIndexItem tumblrItem={tumblrItem} key={tumblrItem.id} />)
      )
    }

    let results = shuffle(giphyItems.concat(newsItems).concat(youtubeItems).concat(imgurItems).concat(tumblrItems));

    return (
      <div className="search-results">
        {results}
      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults))
