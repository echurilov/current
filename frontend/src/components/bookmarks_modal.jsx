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
    this.props.fetchResults(searchTerm)
      .then(() => this.props.fetchRelatedTopics(searchTerm))
    document.getElementById('search-input').value = searchTerm;
  }

  render() {

    let { bookmarks } = this.state;

    // 
    if (bookmarks === null) {
      console.log('bookmarks are null');
      return null;
    }

    // let bookmarks = [
    //   { title: 'cats', query: 'cats'},
    //   { title: 'tv', query: 'modern family'},
    //   { title: 'dogs', query: 'puppy'},
    //   { title: 'food', query: 'pizza'},
    //   { title: 'fashion', query: 'fashion'},
    // ]
    console.log('BOOKMARKS', bookmarks);
    

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
  fetchResults: searchTerm => dispatch(fetchResults(searchTerm)),
  fetchBookmarks: () => dispatch(fetchBookmarks())
})

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksModal);