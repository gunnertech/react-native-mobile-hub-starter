import initialState from '../constants/initialState';
import * as types from '../constants/types';

export const app = (state = initialState.app, action) => {
    switch (action.type) {
        case types.shudi.UPDATE:
        case types.shudi.FETCH:
        case types.shudi.CREATE:
        case types.shudi.LOAD:
            return {...state, working: true }
        case types.shudi.UPDATED:
        case types.shudi.FETCHED:
        case types.shudi.CREATED:
        case types.shudi.LOADED:
            return {...state, working: false }
        case types.app.ERROR:
            return {...state, working: false, error: {...action.error, message: "An Error message to show"} }
        case types.app.ERROR_CLEARED:
            return {...state, error: null }
        default:
            return state
    }
}