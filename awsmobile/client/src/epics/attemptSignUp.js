import * as types from '../constants/types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

export default (action$, store) =>
  action$.ofType(types.session.ATTEMPT_SIGN_UP)
    .pluck('payload')
    .mergeMap(({auth, username, password, email, phoneNumber, firstName, lastName}) => 
      Observable.fromPromise(auth.signUp(username, password, email, phoneNumber, firstName, lastName)) 
        .mergeMap( cognitoUser => Observable.of({ type: types.session.ATTEMPTED_SIGN_UP, payload: {cognitoUser} }))
        .catch(err => console.log(err) || Observable.merge(
            Observable.of({ type: types.app.ERROR, error: {
              message: err.invalidCredentialsMessage || err.message || err
            }, payload: {} }),
            Observable.of({ type: types.session.ATTEMPTED_SIGN_UP, error: err })
        ))
    )
    