import axios from 'axios';
export const RECEIVE_TRENDS = 'RECEIVE_TRENDS';
export const RECEIVE_RELATED_TOPICS = 'RECEIVE_RELATED_TOPICS';

const receiveTrends = trends => {
  return {
    type: RECEIVE_TRENDS,
    trends
  }
}

const receiveRelatedTopics = related => {
  return {
    type: RECEIVE_RELATED_TOPICS,
    related
  }
}

export const fetchTrends = () => dispatch => {
  return axios.get(`/api/trends`)
    .then(trends => {
      dispatch(receiveTrends(trends));
    }, () => console.log('fetch trends did not work'))
    .catch(err => console.log('in catch of fetch trends'))
}

export const fetchRelatedTopics = searchQuery => dispatch => {
  return axios.get(`api/trends/related/${searchQuery}`)
    .then(relatedTopics => {
      dispatch(receiveRelatedTopics(relatedTopics))
    }, () => console.log('fetch related topics did not work'))
    .catch(err => console.log('in catch of fetch related topics'))
}
