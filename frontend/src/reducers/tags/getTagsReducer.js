import { GET_TAGS } from '../../actions/tags/actionTypes';

const getTagsReducer = (state = [], action) => {
  if (action.type === GET_TAGS) {
    return action.payload;
  }
  return state;
};

export default getTagsReducer;
