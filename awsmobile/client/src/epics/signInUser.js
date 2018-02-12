import * as types from '../constants/types';
import { API } from 'aws-amplify-react-native';
import { NavigationActions } from 'react-navigation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import setAwsCredentials from '../Utils/setAwsCredentials';
import streamUserDataFromCognito from '../Utils/streamUserDataFromCognito';

export default (action$, store) =>
  action$.ofType(types.user.SIGN_IN)
    .mergeMap(action => 
      Observable.forkJoin(
        Observable.fromPromise(setAwsCredentials(action.payload.jwtToken)),
        Observable.fromPromise(API.post('usersCRUD', '/users', { body: {sub: action.payload.sub} }))
          .mergeMap(data => 
            Observable.fromPromise(API.get('usersCRUD', '/users/object'))
          ),
        streamUserDataFromCognito(action.payload.sub)
      )
      .mergeMap(([result, user, cognitoUser]) => Observable.of({ type: types.user.SIGNED_IN, payload: {...cognitoUser, ...user} }))
      .catch(err => Observable.merge(
          Observable.of({ type: types.app.ERROR, error: err, payload: action.payload })
      ))
    )