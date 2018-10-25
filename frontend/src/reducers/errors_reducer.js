import { combineReducers } from 'redux';

import session from './session_errors_reducer';
import bookmarks from "./bookmarks_errors_reducer";

export default combineReducers({
  session,
  bookmarks
});
