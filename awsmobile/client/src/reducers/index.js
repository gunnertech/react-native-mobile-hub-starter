import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux'


import { app } from './app';
import { session } from './session';
import { users } from './users';





export default combineReducers({
    app,
    session,
    users
});