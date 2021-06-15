import { combineReducers } from 'redux';
import getTasksReducer from './tasks/getTasksReducer';
import createTaskReducer from './tasks/createTaskReducer';
import editTaskReducer from './tasks/editTaskReducer';
import deleteTaskReducer from './tasks/deleteTaskReducer';
import getTagsReducer from './tags/getTagsReducer';
import createTagReducer from './tags/createTagReducer';
import sendToastToStoreReducer from './toasts/sendToastToStoreReducer';

export default combineReducers({
  getTasks: getTasksReducer,
  createTask: createTaskReducer,
  editTask: editTaskReducer,
  deleteTask: deleteTaskReducer,
  getTags: getTagsReducer,
  createTag: createTagReducer,
  toggleToast: sendToastToStoreReducer,
});
