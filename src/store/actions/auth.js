import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    authData
  }
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  payload: {
    error
  }
});

export const auth = (email, password) => dispatch => {
  dispatch(authStart());
};
