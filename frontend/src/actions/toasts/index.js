import { SEND_TOAST_TO_STORE } from './actionTypes';

export const sendToastToStore = toggleToastFunction => async (dispatch, getState) => {
  dispatch({ type: SEND_TOAST_TO_STORE, payload: toggleToastFunction });
};
