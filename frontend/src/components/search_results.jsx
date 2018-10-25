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
    this.state = { searchTerm: props.searchTerm, render: false };
  }

  componentDidMount() {
    // search results, it'll populate the state
    // set render true
    
    this.props.fetchResults(this.props.searchTerm)
      .then( this.setState({render: true}))
  }

  componentWillReceiveProps(newProps) {
    // set render false 
    if (this.props.searchTerm != newProps.searchTerm) {
      this.setState({ searchTerm: newProps.searchTerm })
      // set render true
      this.props.fetchResults(this.state.searchTerm)
    }
  }

  render() {
    // let { searchTerm } = this.props;

    let giphyItems = [];
    this.props.giphy.forEach(
      giphyItem => (giphyItems.push((<GiphyIndexItem giphyItem={giphyItem} />)))
    )
    let newsItems = [];
    this.props.news.forEach(
      article => (newsItems.push((<NewsIndexItem article={article} />)))
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
