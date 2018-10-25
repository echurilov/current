import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchResults } from '../actions/results_actions';

import GiphyIndexItem from './results/giphy/giphy_index_item';
import NewsIndexItem from './apis/news/news_index_item';

const mapStateToProps = state => ({
  giphy: state.entities.giphy,
  news: state.entities.news
})

const mapDispatchToProps = dispatch => ({
  fetchResults: searchTerm => dispatch(fetchResults(searchTerm))
});

class SearchResults extends React.Component {

  constructor(props) {
    super(props);
    // this.state = { searchTerm: props.searchTerm, render: false };
  }

  // componentDidMount() {
  //   this.props.fetchResults(this.props.searchTerm)
  //     .then( this.setState({render: true}))
  // }

  // componentWillReceiveProps(newProps) {
  //   if (this.props.searchTerm != newProps.searchTerm) {
  //     debugger
  //     this.setState({ searchTerm: newProps.searchTerm })
  //     this.props.fetchResults(this.state.searchTerm)
  //   }
  // }

  // shouldComponentUpdate(newProps) {
  //   if (this.props.searchTerm != newProps.searchTerm) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // componentDidUpdate(newProps) {
  //   this.setState({ searchTerm: newProps.searchTerm })
  //   this.props.fetchResults(this.state.searchTerm)
  // }

  render() {

    let giphyItems = [];
    this.props.giphy.forEach(
      (giphyItem, idx) => (giphyItems.push((<GiphyIndexItem key={idx} giphyItem={giphyItem} />)))
    )
    let newsItems = [];
    this.props.news.forEach(
      (article, idx) => (newsItems.push((<NewsIndexItem key={Math.random()} article={article} />)))
    )

    let results = giphyItems.concat(newsItems);

    return (
      <div className="search-results">
        {results}
      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults))
