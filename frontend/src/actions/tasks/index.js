import axios from 'axios';

import { GET_TASKS, CREATE_TASK, EDIT_TASK, DELETE_TASK } from './actionTypes';

// redux-thunk allows action creators to return functions as well, besides classic action objects.
// the function that the action creator returns is called with dispatch and getstate as parameter

export const getTasks = toggleToast => async (dispatch, getState) => {
  var payload = {};
  const response = await axios
    .get('/api/tasks/')
    .then(res => (payload.data = res.data))
    .catch(err => console.log(err));

  if (!response) {
    toggleToast('red', 'There was an error getting the available tasks. See the console for details.');
  }
  dispatch({ type: GET_TASKS, payload: payload });
};

export const sortTasks = orderingParameter => async (dispatch, getState) => {
  var payload = {};
  await axios
    .get(`api/tasks?ordering=${orderingParameter}`)
    .then(res => (payload.data = res.data))
    .catch(err => console.log(err));

  dispatch({ type: GET_TASKS, payload: payload });
};

export const createTask = (title, description, deadline, toggleTaskCreatedToast) => async (dispatch, getState) => {
  const task = {
    title: title,
    description: description,
    completed: false,
    deadline: deadline,
  };

  const response = await axios.post('/api/tasks/', task).catch(err => console.log(err));

  const payload = { data: {} };
  if (response.status === 201) {
    toggleTaskCreatedToast();
    dispatch(getTasks());
    payload.data = response.data;
  }
  dispatch({ type: CREATE_TASK, payload: payload });
};

export const editTask = (title, description, deadline, taskId, toggleSuccessToast) => async (dispatch, getState) => {
  const task = {
    title: title,
    description: description,
    completed: false,
    deadline: deadline,
  };

  const response = await axios.put(`/api/tasks/${taskId}/`, task).catch(err => console.log(err));

  const payload = { data: {} };
  if (response.status === 200) {
    toggleSuccessToast();
    dispatch(getTasks());
    payload.data = response.data;
  }
  dispatch({ type: EDIT_TASK, payload: payload });
};

export const deleteTask = (taskId, toggleToast) => async (dispatch, getState) => {
  const response = await axios.delete(`/api/tasks/${taskId}/`).catch(err => console.log(err));
  if (response.status === 204) {
    toggleToast('green', 'Task Deleted Successfully');
    dispatch(getTasks());
  }

  dispatch({ type: DELETE_TASK, payload: {} });
};

export const completeTask = (task, toggleToast, completedStatus) => async (dispatch, getState) => {
  const editedTask = {
    title: task.title,
    description: task.description,
    completed: completedStatus,
    deadline: task.deadline,
  };

  const toastMessage = completedStatus ? 'Task Completed Successfully' : 'Task is now Incomplete';

  const response = await axios.put(`/api/tasks/${task.id}/`, editedTask).catch(err => console.log(err));
  const payload = { data: {} };
  if (response.status === 200) {
    toggleToast('green', toastMessage);
    dispatch(getTasks());
    payload.data = response.data;
  }
  dispatch({ type: EDIT_TASK, payload: payload });
};
