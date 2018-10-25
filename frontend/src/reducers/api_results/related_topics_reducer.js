import {
  RECEIVE_RELATED_TOPICS
} from '../../actions/trends_actions';

export default function relatedTopicsReducer(state =[], action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_RELATED_TOPICS:
      const relatedTopics = []
      action.related.data.relatedQueries.default.rankedList.forEach( rankedList => {
        rankedList.rankedKeyword.forEach( rankedKeyword => {
          relatedTopics.push(rankedKeyword.topic.title);
        })
      });
      return relatedTopics;
    default:
      return state;
  }
}
