import axios from "axios";
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';

const receiveResults = results => {
  console.log('in receiveResults', results)
  return {
    type: RECEIVE_RESULTS,
    results
  }
}

export const fetchResults = (searchTerm) => dispatch => {
  return axios.get(`/api/search/${searchTerm}`)
    .then( results => {
      console.log('In success of fetchResults', results);
      dispatch(receiveResults(results.data));
    }, () => console.log('In error of fetchResults'))
    .catch(err => console.log('did not make it to search'))
}