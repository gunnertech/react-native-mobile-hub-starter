import * as types from '../constants/types';

export default auth => ({
  type: types.session.FETCH,
  payload: auth
});