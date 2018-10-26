import {
  RECEIVE_BOOKMARK,
  RECEIVE_BOOKMARKS,
  REMOVE_BOOKMARK,
} from "../actions/bookmark_actions";

const _nullBookmark = Object.freeze({
  id: null
});

const bookmarkReducer = (state = _nullBookmark, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOOKMARK:
      // debugger
      return action.payload;
    case RECEIVE_BOOKMARKS:
      // debugger
      return action.payload;
    case REMOVE_BOOKMARK:
      // debugger
      return action.payload;
    default:
      return state;
  }
};

export default bookmarkReducer;