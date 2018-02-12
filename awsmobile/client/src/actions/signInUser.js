import * as types from '../constants/types';

export default cognitoSession => ({
  type: types.user.SIGN_IN,
  payload: {...cognitoSession.idToken.payload, jwtToken: cognitoSession.idToken.jwtToken}
});