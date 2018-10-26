import axios from "axios";
export const RECEIVE_BOOKMARK = 'RECEIVE_BOOKMARK';
export const RECEIVE_BOOKMARKS = 'RECEIVE_BOOKMARKS';
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK';
export const GET_BOOKMARK_ERRORS = "GET_BOOKMARK_ERRORS";

const receiveBookmark = bookmark => {
  return {
    type: RECEIVE_BOOKMARK,
    bookmark
  }
}

const receiveBookmarks = bookmarks => {
  return {
    type: RECEIVE_BOOKMARKS,
    bookmarks
  }
}

const removeBookmark = () => {
  return {
    type: REMOVE_BOOKMARK
  };
};

const receiveBookmarkErrors = errors => {
  return { 
    type: GET_BOOKMARK_ERRORS,
    errors
  };
};

export const fetchBookmarks = () => dispatch => {
  return axios.get(`/api/bookmarks/`)
    .then(bookmarks => {
      debugger
      dispatch(receiveBookmarks(bookmarks.data));
    })
    .catch(errors => {
      dispatch(receiveBookmarkErrors(errors));
    });
}

export const createBookmark = (bookmark) => dispatch => {
  // debugger
  return axios.post(`/api/bookmarks`, bookmark)
    .then(bookmark => {
      // debugger
      console.log('SUCCES MADE BOOKMAR');
      dispatch(receiveBookmark(bookmark));
    })
    .catch(errors => {
      // debugger
      console.log('FAILED TO MAKE BOOKMARK');
      console.log(errors);
      dispatch(receiveBookmarkErrors(errors));
    });
}

export const fetchBookmark = (bookmarkId) => dispatch => {
  return axios.get(`/api/bookmarks/${bookmarkId}`)
    .then( bookmark => {
      dispatch(receiveBookmark(bookmark));
    })
    .catch( errors => {
      dispatch(receiveBookmarkErrors(errors));
    });
}

export const updateBookmark = (bookmark) => dispatch => {
  return axios.patch(`/api/bookmarks/${bookmark._id}`, bookmark)
    .then(bookmark => {
      dispatch(receiveBookmarks(bookmark));
    })
    .catch(errors => {
      dispatch(receiveBookmarkErrors(errors));
    });
}

export const deleteBookmark = (bookmarkId) => dispatch => {
  return axios.get(`/api/bookmarks/${bookmarkId}`)
    .then( bookmark => {
      dispatch(removeBookmark(bookmark));
    })
    .catch( errors => {
      dispatch(receiveBookmarkErrors(errors));
    });
}
