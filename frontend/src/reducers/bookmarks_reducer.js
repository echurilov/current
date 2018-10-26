import {
  RECEIVE_BOOKMARK,
  RECEIVE_BOOKMARKS,
  REMOVE_BOOKMARK,
} from "../actions/bookmark_actions";
import merge from 'lodash';

// const _nullBookmark = Object.freeze({
//   id: null
// });

const bookmarkReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOOKMARK:
      // let newState = merge({}, state, { [action.bookmark.data.bookmark._id]: action.bookmark.data.bookmark });
      let newState = state.push(action.data.bookmark);
      return newState;
    case RECEIVE_BOOKMARKS:
      // let newState = merge({}, state, action.bookmarks)
      return action.bookmarks;
    case REMOVE_BOOKMARK:
      return action.payload;
    default:
      return state;
  }
};

export default bookmarkReducer;