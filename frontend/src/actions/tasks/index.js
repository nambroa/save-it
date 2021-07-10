import axios from 'axios';

import { GET_TASKS, CREATE_TASK, EDIT_TASK, DELETE_TASK, FILTER_TASKS } from './actionTypes';

// redux-thunk allows action creators to return functions as well, besides classic action objects.
// the function that the action creator returns is called with dispatch and getstate as parameter

export const filterTasks = (filterData, toggleToast) => async (dispatch, getState) => {
  const filterField = filterData.field;
  const filterValue = filterData.value;
  var payload = {};
  console.log('filtrando');
  await axios
    .get(`/api/tasks/?${filterField}=${filterValue}`)
    .then(function(result) {
      payload.data = result.data;
      dispatch({ type: GET_TASKS, payload: payload });
    })
    .catch(function(error) {
      if (typeof toggleToast === 'function') {
        toggleToast('red', 'There was an error getting the available tasks. See the console for details.');
      }
      console.log(error.response.request.responseText);
    });
};

export const getTasks = toggleToast => async (dispatch, getState) => {
  var payload = {};
  await axios
    .get('/api/tasks/')
    .then(function(result) {
      payload.data = result.data;
      dispatch({ type: GET_TASKS, payload: payload });
    })
    .catch(function(error) {
      if (typeof toggleToast === 'function') {
        toggleToast('red', 'There was an error getting the available tasks. See the console for details.');
      }
      console.log(error.response.request.responseText);
    });
};

export const sortTasks = orderingParameter => async (dispatch, getState) => {
  var payload = {};
  await axios
    .get(`api/tasks?ordering=${orderingParameter}`)
    .then(function(result) {
      payload.data = result.data;
      dispatch({ type: GET_TASKS, payload: payload });
    })
    .catch(err => console.log(err.response.request.responseText));
};

export const createTask = (title, description, deadline, toggleToast) => async (dispatch, getState) => {
  const task = {
    title: title,
    description: description,
    completed: false,
    deadline: deadline,
    tags: [],
  };

  await axios
    .post('/api/tasks/', task)
    .then(function(result) {
      const payload = { data: {} };
      toggleToast('green', 'Task Created Successfully');
      dispatch(getTasks());
      payload.data = result.data;
      dispatch({ type: CREATE_TASK, payload: payload });
    })
    .catch(err => console.log(err.response.request.responseText));
};

export const editTask = (task, toggleToast) => async (dispatch, getState) => {
  await axios
    .patch(`/api/tasks/${task.id}/`, task)
    .then(function(result) {
      const payload = { data: {} };
      toggleToast('green', 'Task Edited Successfully');
      dispatch(getTasks());
      payload.data = result.data;
      dispatch({ type: EDIT_TASK, payload: payload });
    })
    .catch(err => console.log(err.response.request.responseText));
};

export const deleteTask = (taskId, toggleToast) => async (dispatch, getState) => {
  const response = await axios
    .delete(`/api/tasks/${taskId}/`)
    .then(dispatch({ type: DELETE_TASK, payload: {} }))
    .catch(err => console.log(err));
  if (response.status === 204) {
    toggleToast('green', 'Task Deleted Successfully');
    dispatch(getTasks());
  }
};

export const completeTask = (task, toggleToast, completedStatus) => async (dispatch, getState) => {
  const editedTask = { completed: completedStatus };
  const toastMessage = completedStatus ? 'Task Completed Successfully' : 'Task is now Incomplete';

  const response = await axios
    .patch(`/api/tasks/${task.id}/`, editedTask)
    .catch(err => console.log(err.response.request.responseText));

  const payload = { data: {} };
  if (response.status === 200) {
    toggleToast('green', toastMessage);
    dispatch(getTasks());
    payload.data = response.data;
  }
  dispatch({ type: EDIT_TASK, payload: payload });
};
