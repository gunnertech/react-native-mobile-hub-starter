import initialState from '../constants/initialState';
import * as types from '../constants/types';

export const users = (state = initialState.users, action) => {
  switch (action.type) {
    case types.user.SIGNED_IN:
      return {...state, data: [...state.data, action.payload], current: action.payload }
    default:
      return state;
  }
}