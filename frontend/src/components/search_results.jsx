import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchResults } from '../actions/results_actions';
import GiphyIndexItem from './results/giphy/giphy_index_item';
import NewsIndexItem from './results/news/news_index_item';
import YoutubeIndexItem from './results/youtube/youtube_index_item';
import "../css/search_results.scss";
const shuffle = require('shuffle-array');

const mapStateToProps = state => ({
  giphy: state.entities.giphy,
  news: state.entities.news,
  youtube: state.entities.youtube
})

const mapDispatchToProps = dispatch => ({
  fetchResults: searchTerm => dispatch(fetchResults(searchTerm))
});

class SearchResults extends React.Component {

  render() {
    let { giphy, news, youtube } = this.props; 

    let giphyItems;
    if (giphy.length > 0) {
      giphyItems = [];
      this.props.giphy.forEach(
        (giphyItem, idx) => (giphyItems.push((<GiphyIndexItem key={idx} giphyItem={giphyItem} />)))
      )
    } else {
      giphyItems = [];
    }

    let newsItems;
    if (news.length > 0) {
      newsItems = [];
      this.props.news.forEach(
        (article) => (newsItems.push((<NewsIndexItem key={Math.random()} article={article} />)))
      )
    } else {
      newsItems = [];
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

    let results = shuffle(giphyItems.concat(newsItems).concat(youtubeItems));

    return (
      <div className="search-results">
        {results}
      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults))
