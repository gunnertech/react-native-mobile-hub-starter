import initialState from '../constants/initialState';
import * as types from '../constants/types';

export const app = (state = initialState.app, action) => {
    switch (action.type) {
        case types.app.ERROR:
            return {...state, working: false, error: {...action.error, message: "An Error message to show"} }
        case types.app.ERROR_CLEARED:
            return {...state, error: null }
        default:
            return state
    }
}