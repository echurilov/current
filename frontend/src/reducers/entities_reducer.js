import { combineReducers } from 'redux';
import imgurReducer from './api_results/imgur_reducer';
import bookmarksReducer from './bookmarks_reducer';
import giphyReducer from './api_results/giphy_reducer';
import trendsReducer from './api_results/trends_reducer';
import newsReducer from './api_results/news_reducer';
import youtubeReducer from './api_results/youtube_reducer';
import tumblrReducer from './api_results/tumblr_reducer';
import relatedTopicsReducer from './api_results/related_topics_reducer';

export default combineReducers({
  imgur: imgurReducer,
  bookmarks: bookmarksReducer,
  giphy: giphyReducer,
  trends: trendsReducer,
  news: newsReducer,
  youtube: youtubeReducer,
  tumblr: tumblrReducer,
  relatedTopics: relatedTopicsReducer,
});
