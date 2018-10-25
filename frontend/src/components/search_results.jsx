import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchResults } from '../actions/results_actions';
import GiphyIndexItem from './results/giphy_index_item';
import NewsIndexItem from './apis/news/news_index_item';
import ImgurIndexItem from './results/imgur_index_item';
import "../css/search_results.scss";
const shuffle = require('shuffle-array');

const mapStateToProps = state => ({
  giphy: state.entities.giphy,
  news: state.entities.news,
  imgur: state.entities.imgur
})

const mapDispatchToProps = dispatch => ({
  fetchResults: searchTerm => dispatch(fetchResults(searchTerm))
});

class SearchResults extends React.Component {

  render() {

    let { giphy, news, imgur } = this.props; 

    let giphyItems;
    if (giphy.length > 0) {
      giphyItems = [];
      giphy.forEach((giphyItem, idx) =>
        giphyItems.push(<GiphyIndexItem key={idx} giphyItem={giphyItem} />)
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
          <ImgurIndexItem key={Math.random()} imgurItem={imgurItem} />
        )
      );
    } else {
      imgurItems = [];
    }

    let results = shuffle(giphyItems.concat(newsItems).concat(imgurItems));

    return (
      <div className="search-results">
        {results}
      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults))
