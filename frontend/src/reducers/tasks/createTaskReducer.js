import { CREATE_TASK } from '../../actions/tasks/actionTypes';

const createTaskReducer = (state = {}, action) => {
  if (action.type === CREATE_TASK) {
    return action.payload;
  }
  return state;
};

export default createTaskReducer;
