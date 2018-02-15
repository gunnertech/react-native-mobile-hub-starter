import * as types from '../constants/types';

export default (auth, username, code) => ({
  type: types.session.CONFIRM_SIGN_UP,
  payload: {auth, username, code}
});