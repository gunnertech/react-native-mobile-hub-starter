import * as types from '../constants/types';
import uuid from 'react-native-uuid';
import { API } from 'aws-amplify';
import { NavigationActions } from 'react-navigation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';


export default (action$, store) =>
action$.ofType(types.comment.CREATE)
    .map(action => ({...action.payload, commentId: `${uuid.v1()}`, createdAt: (new Date()).toISOString()}))
    .switchMap(params =>
        Observable.fromPromise(API.post('commentsCRUD', '/comments', { body: params }))
        .mergeMap(data => Observable.merge(
            Observable.of({ type: types.comment.CREATED, payload: params })
        ))
        .catch(err => Observable.merge(
            Observable.of({ type: types.comment.CREATE_ERROR, error: err, payload: params }),
            Observable.of({ type: types.app.ERROR, error: err, payload: params })
        ))
    )