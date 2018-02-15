import initialState from '../constants/initialState';
import * as types from '../constants/types';

export const session = (state = initialState.session, action) => {
    switch (action.type) {
      case types.session.SIGN_OUT:
        console.log("REDUCER!!!!!")
        return {};
      case types.session.SIGNED_OUT:
        console.log("REDUCER!!!!!")
        return {};

      case types.session.CONFIRMED_SIGN_UP:
        if(action.error) {
          return {};
        } else {
          return {...state, cognitoUser: {...state.cognitoUser, userConfirmed: true} };
        }

      case types.session.ATTEMPTED_SIGN_UP:
        if(action.error) {
          return {}
        } else {
          return {...state, ...action.payload };
        }
      case types.session.FETCHED:
      case types.session.ATTEMPTED_SIGN_IN:
        if(action.error) {
          return {}
        } else {
          return {...state, ...action.payload };
        }
        
      default: return state;
    }
}