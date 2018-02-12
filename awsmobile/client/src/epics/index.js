import { combineEpics } from 'redux-observable';

import signInUser from './signInUser';

/**
 * Every epic should have an action in the 'actions' folder by the same name.
 * epics generally coincide with crud actions (created, retreive, update, delete) but are not limited to those.
 */


export default combineEpics(
    signInUser
)