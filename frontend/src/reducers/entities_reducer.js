import { combineReducers } from 'redux';
// import imgurReducer from './api_results/imgur_reducer';
import giphyReducer from './api_results/giphy_reducer';

// import users from './users_reducer';

export default combineReducers({
  // imgur: imgurReducer,
  giphy: giphyReducer
});
