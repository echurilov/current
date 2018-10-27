import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal_actions';
import { fetchTrends, fetchRelatedTopics } from '../actions/trends_actions';
import { fetchResults } from '../actions/results_actions';
import { fetchBookmarks } from '../actions/bookmark_actions';

class BookmarksModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { bookmarks: null }
    this.dispatchSearch = this.dispatchSearch.bind(this);
  }

  componentDidMount() {
    this.props.fetchBookmarks()
      .then( () => this.setState({ bookmarks: this.props.bookmarks }));
  }

  dispatchSearch(query) {
    this.props.closeModal();
    let searchTerm = query;
    this.props.bookmarkFunc(searchTerm);
    document.getElementById('search-input').value = searchTerm;
  }

  render() {

    let { bookmarks } = this.state;
     
    if (bookmarks === null) {
      return null;
    }

    let bookmarkButtons = [];
    bookmarks.forEach( 
      bookmark => {
        let btn = (
          <li className="bookmark-li" key={Math.random()}>
            <button onClick={() => this.dispatchSearch(bookmark.query)}>
              {bookmark.query}
            </button>
          </li>
        )
        bookmarkButtons.push(btn);
      }
    )

    return (
      <div className="bookmark-box"> 
        <h3>- Bookmarks -</h3>
        <ul>
          {bookmarkButtons}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bookmarks: Object.values(state.entities.bookmarks)
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  fetchTrends: () => dispatch(fetchTrends()),
  fetchRelatedTopics: (searchTerm) => dispatch(fetchRelatedTopics(searchTerm)),
  fetchResults: (searchTerm, filters) => dispatch(fetchResults(searchTerm, filters)),
  fetchBookmarks: () => dispatch(fetchBookmarks())
})

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksModal);