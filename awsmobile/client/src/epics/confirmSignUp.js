import * as types from '../constants/types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

export default (action$, store) =>
  action$.ofType(types.session.CONFIRM_SIGN_UP)
    .do(() => console.log("epic!"))
    .pluck('payload')
    .do(() => console.log("still epic!"))
    .mergeMap(({auth, username, code}) => 
      Observable.fromPromise(auth.confirmSignUp(username, code))
      .do(() => console.log("still still epic!"))
        .mergeMap(data => Observable.of({ type: types.session.CONFIRMED_SIGN_UP, payload: {data} }))
        .catch(err => console.log(err) || Observable.merge(
            Observable.of({ type: types.app.ERROR, error: {
              message: err.invalidCredentialsMessage || err.message || err
            }, payload: {} }),
            Observable.of({ type: types.session.CONFIRMED_SIGN_UP, error: err })
        ))
    )