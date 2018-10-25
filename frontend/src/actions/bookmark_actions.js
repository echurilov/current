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

export const fetchBookmark = bookmarkId => dispatch => {
  return axios.get(`/api/bookmarks/${bookmarkId}`)
    .then( bookmark => {
      dispatch(receiveBookmark(bookmark));
    })
    .catch(errors => {
      dispatch(receiveBookmarkErrors(errors));
    });
}

export const fetchBookmarks = () => dispatch => {
  return axios.get(`/api/bookmarks/`)
    .then( bookmarks => {
      dispatch(receiveBookmarks(bookmarks));
    })
    .catch( errors => {
      dispatch(receiveBookmarkErrors(errors));
    });
}

export const deleteBookmark = bookmarkId => dispatch => {
  return axios.get(`/api/bookmarks/${bookmarkId}`)
    .then(bookmark => {
      dispatch(removeBookmark(bookmark));
    })
    .catch(errors => {
      dispatch(receiveBookmarkErrors(errors));
    });
}