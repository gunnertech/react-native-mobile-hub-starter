import * as types from '../constants/types';

export default auth => ({
  type: types.session.SIGN_OUT,
  payload: auth
});