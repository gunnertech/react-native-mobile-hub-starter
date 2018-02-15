export default {
  app: {
    working: false,
    requiresMfaOnSignIn: false,
    requiresMfaOnSignUp: false,
    error: null
  },
  session: {
    cognitoUser: null,
    session: null
  },

  users: {
    current: null,
    data: []
  },

  
};