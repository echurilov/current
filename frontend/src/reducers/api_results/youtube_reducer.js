import {
  RECEIVE_RESULTS
} from '../../actions/results_actions';

export default function youtubeReducer(state = [], action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESULTS:
      return action.results.youtube;
    default: 
      return state;
  }
}