import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';

// import users from './users_reducer';

export default combineReducers({
  session: sessionReducer
});
