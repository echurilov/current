import {
  RECEIVE_RESULTS, CLEAR_RESULTS
} from '../../actions/results_actions';

export default function tumblrReducer(state = [], action) {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_RESULTS:
      return action.results.tumblr;
    case CLEAR_RESULTS:
      return [];
    default:
      return state;
  }
}