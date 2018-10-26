import {
  RECEIVE_BOOKMARK,
  RECEIVE_BOOKMARKS,
  REMOVE_BOOKMARK,
  GET_BOOKMARK_ERRORS
} from "../actions/bookmark_actions";

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_BOOKMARK_ERRORS:
      debugger
      return action.errors;
    case RECEIVE_BOOKMARK:
      debugger
      return [];
    case RECEIVE_BOOKMARKS:
      return [];
    case REMOVE_BOOKMARK:
      return [];
    default:
      return state;
  }
};