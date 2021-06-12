import { CREATE_TAG } from '../../actions/tags/actionTypes';

const createTagReducer = (state = {}, action) => {
  if (action.type === CREATE_TAG) {
    return action.payload;
  }
  return state;
};

export default createTagReducer;
