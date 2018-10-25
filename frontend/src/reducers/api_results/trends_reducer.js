import {
  RECEIVE_TRENDS
} from '../../actions/trends_actions';

export default function trendsReducer(state =[], action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_TRENDS:
      return action.trends.data.trends;
    default: 
      return state;
  }
}