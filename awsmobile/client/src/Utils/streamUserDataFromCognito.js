import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import awsmobile from '../aws-exports';


const cognitoParams = sub => ({
  UserPoolId: awsmobile['aws_user_pools_id'],
  Filter: `sub = \"${sub}\"`,
  Limit: 1,
});

const fetchCognitoUser$ = sub => {
  const cognitoidentityserviceprovider = new CognitoIdentityServiceProvider({region: 'us-east-1'});
  return (Observable.bindNodeCallback(
    cognitoidentityserviceprovider.listUsers.bind(cognitoidentityserviceprovider)
  )(cognitoParams(sub)))
    .pluck('Users')
    .map(users => users[0])
    .catch(console.log)
}

export default fetchCognitoUser$;