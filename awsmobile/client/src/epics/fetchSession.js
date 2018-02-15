import * as types from '../constants/types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

export default (action$, store) =>
  action$.ofType(types.session.FETCH)
    .pluck('payload')
    .mergeMap(auth => 
      Observable.fromPromise(auth.currentSession())  
        .mergeMap( session => Observable.of({ type: types.session.FETCHED, payload: {session} }))
        .catch(err => Observable.merge(
            Observable.of({ type: types.app.ERROR, error: {
              message: err.invalidCredentialsMessage || err.message || err
            }, payload: {} }),
            Observable.of({ type: types.session.FETCHED, error: err })
        ))
    )