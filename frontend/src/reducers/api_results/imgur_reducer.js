import {
  RECEIVE_RESULTS
} from '../../actions/results_actions';

export default function imgurReducer(state = [], action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RESULTS:
      return action.results.imgur;
    default: 
      return state;
  }
}