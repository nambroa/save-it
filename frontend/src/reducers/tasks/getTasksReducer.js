import { GET_TASKS } from '../../actions/tasks/actionTypes';

const getTasksReducer = (state = [], action) => {
  if (action.type === GET_TASKS) {
    return action.payload;
  }
  // When the reducer gets called for the 1st time during initialization, task parameter (state) comes as undefined and
  // gets replaced by [] (since it means that we have no task list to return). Then we return task.
  return state;
};

export default getTasksReducer;
