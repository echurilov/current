import {
  RECEIVE_BOOKMARK,
  RECEIVE_BOOKMARKS,
  REMOVE_BOOKMARK,
} from "../actions/bookmark_actions";

const bookmarkReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOOKMARK:
      let newState = state.push(action.data.bookmark);
      return newState;
    case RECEIVE_BOOKMARKS:
      return action.bookmarks;
    case REMOVE_BOOKMARK:
      return action.payload;
    default:
      return state;
  }
};

export default bookmarkReducer;