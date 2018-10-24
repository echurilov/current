import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class SearchResults extends React.Component {

  constructor(props) {
    super(props);
    this.state = { searchTerm: props.searchTerm, render: false };
  }

  componentDidMount() {
    // search results, it'll populate the state
    // set render true
  }

  componentWillReceiveProps(newProps) {
    // set render false
    if (this.props.searchTerm != newProps.searchTerm) {
      this.setState({ searchTerm: newProps.searchTerm })
      // set render true
    }
  }

  render() {
    let { searchTerm } = this.props;

    // let songs = (<SongIndex></SongIndex>);
    // let artists = (<ArtistIndex></ArtistIndex>);
    // let albums = (<AlbumIndex></AlbumIndex>);
    // let playlists = (<PlaylistIndex></PlaylistIndex>);

    return (
      <div className="search-results">
        {/* {songs}
        {artists}
        {albums}
        {playlists} */}
      </div>
    )
  }

}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults))
