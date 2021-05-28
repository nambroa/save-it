import { DELETE_TASK } from '../../actions/tasks/actionTypes';

const deleteTaskReducer = (state = {}, action) => {
  if (action.type === DELETE_TASK) {
    return action.payload;
  }
  return state;
};

export default deleteTaskReducer;
