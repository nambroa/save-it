import { EDIT_TASK } from '../../actions/tasks/actionTypes';

const editTaskReducer = (state = {}, action) => {
  if (action.type === EDIT_TASK) {
    return action.payload;
  }
  return state;
};

export default editTaskReducer;
