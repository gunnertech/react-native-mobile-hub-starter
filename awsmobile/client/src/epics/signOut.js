import * as types from '../constants/types';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

export default (action$, store) => 
  action$.ofType(types.session.SIGN_OUT)
    .pluck('payload')
    .do(auth => auth.signOut())
    .mergeMap( auth => Observable.of({ type: types.session.SIGNED_OUT, payload: {} }))