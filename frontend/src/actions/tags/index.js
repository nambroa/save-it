import axios from 'axios';
import { GET_TAGS, CREATE_TAG } from './actionTypes';

export const getTags = toggleToast => async (dispatch, getState) => {
  var payload = {};
  const response = axios
    .get('/api/tags')
    .then(res => (payload.data = res.data))
    .catch(err => console.log(err));
  if (!response) {
    toggleToast('red', 'There was an error getting the available tags. See the console for details.');
  }
  dispatch({ type: GET_TAGS, payload: payload });
};

// export const createTask = (title, description, deadline, toggleTaskCreatedToast) => async (dispatch, getState) => {
//     const task = {
//         title: title,
//         description: description,
//         completed: false,
//         deadline: deadline,
//     };

//     const response = await axios.post('/api/tasks/', task).catch(err => console.log(err));

//     const payload = { data: {} };
//     if (response.status === 201) {
//         toggleTaskCreatedToast();
//         dispatch(getTasks());
//         payload.data = response.data;
//     }
//     dispatch({ type: CREATE_TASK, payload: payload });
// };

// export const createTag = async (dispatch, getState) => {

// }
