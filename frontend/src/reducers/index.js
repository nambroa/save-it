import { combineReducers } from 'redux';
import getTasksReducer from './getTasksReducer';
import createTaskReducer from './createTaskReducer';

export default combineReducers({
  getTasks: getTasksReducer,
  createTask: createTaskReducer,
});
