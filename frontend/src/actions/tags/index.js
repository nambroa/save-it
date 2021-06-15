import axios from 'axios';
import { GET_TAGS, CREATE_TAG } from './actionTypes';

// This function taught me a VERY important lesson.
// Only dispatch the action after the promise has been fullfilled.
// The dispatch used to be the last line of code and that meant that, if the promise took longer, the data would be lost since the action was already dispatched.
export const getTags = toggleToast => async (dispatch, getState) => {
  var payload = {};
  const response = axios
    .get('/api/tags/')
    .then(function(result) {
      payload.data = result.data;
      dispatch({ type: GET_TAGS, payload: payload });
    })
    .catch(function(error) {
      console.log(error);
      toggleToast('red', 'There was an error getting the available tags. See the console for details.');
    });
};

// export const createTask = (title, description, deadline, toggleTaskCreatedToast) => async (dispatch, getState) => {
//     const task = {
//         titl: title,
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

export const createTag = (tag, task) => async (dispatch, getState) => {
  tag.tasks = [task.id];
  var payload = {};
  const response = await axios
    .post('/api/tags/', tag)
    .then(res => (payload.data = res.data))
    .catch(err => console.log(err));
  dispatch({ type: CREATE_TAG, payload });
};
