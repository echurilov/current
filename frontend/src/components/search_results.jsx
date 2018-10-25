import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchResults } from '../actions/results_actions';

import GiphyIndexItem from './results/giphy/giphy_index_item';

const mapStateToProps = state => ({
  giphy: state.entities.giphy
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
    
    this.props.fetchResults(this.state.searchTerm)
      .then( this.setState({render: true}))
  }

  componentWillReceiveProps(newProps) {
    // set render false 
    if (this.props.searchTerm != newProps.searchTerm) {
      // this.setState({ searchTerm: newProps.searchTerm })
      // set render true
      this.props.fetchResults(this.state.searchTerm)
    }
  }

  render() {
    let { searchTerm } = this.props;

    return (
      <div className="search-results">
        {this.props.giphy.map( giphyItem => {
          return <GiphyIndexItem giphyItem={giphyItem} />
        })}
      </div>
    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults))
