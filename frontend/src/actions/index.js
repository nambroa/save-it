import { get, post } from 'axios';
import { GET_TASKS, CREATE_TASK } from './actionTypes';

// redux-thunk allows action creators to return functions as well, besides classic action objects.
// the function that the action creator returns is called with dispatch and getstate as parameter

export const getTasks = () => async (dispatch, getState) => {
  const response = await get('/api/tasks/')
    .then(res => res.data)
    .catch(err => console.log(err));

  dispatch({ type: GET_TASKS, payload: response });
};

export const createTask = (
  title,
  description,
  deadline,
  toggleTaskCreatedToast
) => async (dispatch, getState) => {
  const task = {
    title: title,
    description: description,
    completed: false,
    deadline: deadline,
  };

  const response = await post('/api/tasks/', task).catch(err => console.log(err));

  const payload = { taskCreatedSuccessfully: false, data: {} };
  if (response.status === 201) {
    toggleTaskCreatedToast();
    dispatch(getTasks());
    payload.data = response.data;
  }
  dispatch({ type: CREATE_TASK, payload: payload });
};
