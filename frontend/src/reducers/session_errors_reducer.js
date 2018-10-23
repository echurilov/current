import {
  GET_ERRORS,
  RECEIVE_CURRENT_USER
} from '../util/session_api_util';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case GET_ERRORS:
    // debugger
      return action.payload;
    case RECEIVE_CURRENT_USER:
    // debugger
      return [];
    default:
      return state;
  }
};