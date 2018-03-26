import axios from 'axios';

import {AUTH_KEY} from '../../env';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: {
    token,
    userId
  }
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  payload: {
    error
  }
});

export const auth = (email, password, isSignup) => async dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true
  };

  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${AUTH_KEY}`;

  if (!isSignup) {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${AUTH_KEY}`;
  }

  try {
    const response = await axios.post(url, authData);
    dispatch(authSuccess(response.data.idToken, response.data.localId));
  } catch (err) {
    dispatch(authFail(err.response.data.error));
  }
};
