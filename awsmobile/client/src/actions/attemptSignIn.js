import * as types from '../constants/types';

export default (auth, username, password) => ({
  type: types.session.ATTEMPT_SIGN_IN,
  payload: {auth, username, password}
});