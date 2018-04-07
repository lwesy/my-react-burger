import reducer from './auth';
import * as types from '../actions/actionTypes';

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    authRedirectPath: '/'
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store the token upon login', () => {
    expect(reducer(initialState, {
      type: types.AUTH_SUCCESS,
      payload: {
        token: 'some-token',
        userId: 'some-id'
      }
    })).toEqual({
      token: 'some-token',
      userId: 'some-id',
      loading: false,
      error: null,
      authRedirectPath: '/'
    });
  });
});
