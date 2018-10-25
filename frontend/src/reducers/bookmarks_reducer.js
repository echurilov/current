import {
  RECEIVE_BOOKMARK,
  RECEIVE_BOOKMARKS,
  REMOVE_BOOKMARK,
} from "../actions/bookmark_actions";

const _nullUser = Object.freeze({
  id: null
});

const sessionReducer = (state = _nullUser, action) => {
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

export default sessionReducer;