import { SEND_TOAST_TO_STORE } from '../../actions/toasts/actionTypes';

const sendToastToStoreReducer = (state = {}, action) => {
  if (action.type === SEND_TOAST_TO_STORE) {
    return action.payload;
  }
  return state;
};

export default sendToastToStoreReducer;
