import * as types from '../constants/types';

export default (auth, username, password, email, phoneNumber, firstName, lastName) => ({
  type: types.session.ATTEMPT_SIGN_UP,
  payload: {auth, username, password, email, phoneNumber, firstName, lastName}
});