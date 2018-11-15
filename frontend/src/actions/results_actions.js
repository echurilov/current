import axios from "axios";
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';

const receiveResults = results => {
  return {
    type: RECEIVE_RESULTS,
    results
  }
}

export const clearResults = () => {
  return {
    type: CLEAR_RESULTS
  }
}

export const fetchResults = (searchTerm, filters, landingPageTopics) => dispatch => {
  return axios.get(`/api/search/${searchTerm}`, {
    params: {
      tumblr: filters.tumblr,
      imgur: filters.imgur,
      youtube: filters.youtube,
      news: filters.news,
      giphy: filters.giphy,
      landingPageTopics: landingPageTopics,
    },
  })
    .then( results => {
      dispatch(receiveResults(results.data));
    }, () => console.log('In error of fetchResults'))
    .catch(err => console.log('did not make it to search'))
}