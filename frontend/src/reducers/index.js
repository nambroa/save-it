import { combineReducers } from 'redux';
import getTasksReducer from './getTasksReducer';
import createTaskReducer from './createTaskReducer';
import editTaskReducer from './editTaskReducer';
import deleteTaskReducer from './deleteTaskReducer';

export default combineReducers({
  getTasks: getTasksReducer,
  createTask: createTaskReducer,
  editTask: editTaskReducer,
  deleteTask: deleteTaskReducer,
});
