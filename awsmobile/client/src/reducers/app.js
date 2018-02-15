import initialState from '../constants/initialState';
import * as types from '../constants/types';

export const app = (state = initialState.app, action) => {
    switch (action.type) {
      case types.session.ATTEMPT_SIGN_IN:
      case types.session.FETCH:
          return {...state, working: true }
      case types.session.ATTEMPTED_SIGN_IN:
      case types.session.FETCHED:
          return {...state, working: false }
      case types.app.ERROR:
          return {...state, working: false, error: action.error }
      case types.app.ERROR_CLEARED:
          return {...state, error: null }
      default:
          return state
    }
}