import { CREATE_TASK } from '../actions/actionTypes';

const createTaskReducer = (state = {}, action) => {
  if (action.type === CREATE_TASK) {
    return action.payload;
  }
  return state;
};

export default createTaskReducer;
