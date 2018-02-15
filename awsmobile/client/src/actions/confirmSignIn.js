import * as types from '../constants/types';

export default (auth, cognitoUser, code) => ({
  type: types.session.CONFIRM_SIGN_IN,
  payload: {auth, cognitoUser, code}
});