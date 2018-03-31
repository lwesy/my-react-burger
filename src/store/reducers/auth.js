import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utils';

const authStart = state => updateObject(state, {
  error: null,
  loading: true
});

const authSuccess = (state, action) => updateObject(state, {
  token: action.payload.token,
  userId: action.payload.userId,
  loading: false
});

const authFail = (state, action) => updateObject(state, {
  error: action.payload.error,
  loading: false
});

const authLogout = state => updateObject(state, {
  token: null,
  userId: null
});

const setAuthRedirectPath = (state, action) => updateObject(state, {
  authRedirectPath: action.payload.path
});

export default (state = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectPath: '/'
}, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
};
