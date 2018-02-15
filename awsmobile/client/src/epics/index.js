import { combineEpics } from 'redux-observable';


import signInUser from './signInUser';
import attemptSignIn from './attemptSignIn';
import fetchSession from './fetchSession';
import confirmSignIn from './confirmSignIn';
import confirmSignUp from './confirmSignUp';
import attemptSignUp from './attemptSignUp';
import signOut from './signOut';

export default combineEpics(
    signOut,

    signInUser,

    
    fetchSession,
    attemptSignIn,
    confirmSignIn,
    confirmSignUp,
    attemptSignUp
)