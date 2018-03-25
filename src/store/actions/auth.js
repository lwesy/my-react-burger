import axios from 'axios';

import {AUTH_KEY} from '../../env';
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

export const auth = (email, password) => async dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true
  };

  try {
    const response = await axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${AUTH_KEY}`, authData);
    console.log(response.data);
    dispatch(authSuccess(response.data));
  } catch (err) {
    console.log(err);
    dispatch(authFail(err));
  }
};
