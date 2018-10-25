import axios from 'axios';
export const RECEIVE_TRENDS = 'RECEIVE_TRENDS';

const receiveTrends = trends => {
  return {
    type: RECEIVE_TRENDS,
    trends
  }
}

export const fetchTrends = () => dispatch => {
  return axios.get(`/api/trends`)
    .then(trends => {
      console.log('TRENDS', trends)
      dispatch(receiveTrends(trends))
    }, () => console.log('fetch trends did not workd'))
    .catch(err => console.log('in catch of fetch trends'))
}