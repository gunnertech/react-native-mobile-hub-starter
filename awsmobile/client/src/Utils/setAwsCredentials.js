import awsmobile from '../aws-exports';


const setAwsCredentials = userToken => {
  const authenticator = `cognito-idp.${awsmobile['aws_cognito_region']}.amazonaws.com/${awsmobile['aws_user_pools_id']}`;

  AWS.config.update({ region: awsmobile['aws_cognito_region'] });

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsmobile['aws_cognito_identity_pool_id'],
    Logins: {
      [authenticator]: userToken
    }
  });

  return AWS.config.credentials.getPromise();
}


export default setAwsCredentials;