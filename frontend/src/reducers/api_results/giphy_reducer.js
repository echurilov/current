import {
  RECEIVE_RESULTS, CLEAR_RESULTS
} from '../../actions/results_actions';

export default function giphyReducer(state = [], action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RESULTS:
      return action.results.giphy;
    case CLEAR_RESULTS:
      return [];
    default:
      return state;
  }
}