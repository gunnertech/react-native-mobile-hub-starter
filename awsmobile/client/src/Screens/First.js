import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { NavigationActions, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { colors } from 'theme';

import signInUser from '../actions/signInUser';
import SignIn from '../Components/LogIn';
import SignUp from '../Components/SignUp';

import {
  BottomNavigation
} from 'react-native-material-ui';


const FirstScreen = TabNavigator({
  LogIn: {
    screen: (props) => {
      const { screenProps, navigation, ...otherProps } = props;

      return (
        <SignIn
          { ...screenProps }
          { ...otherProps }
          onLogIn={(payload) => {
            ///TODO: This isn't right. You're navigating to a screen that requires the user before you've set the user.
            screenProps.rootNavigator.navigate('Home');
            screenProps.signInUser(payload);
          }}
        />
      );
    },
  },
  SignUp: {
    screen: (props) => {
      const { screenProps, ...otherProps } = props;

      return (
        <SignUp
          { ...screenProps }
          { ...otherProps }
          onSignUp={data => {
            otherProps.navigation.navigate('LogIn');
          }}
        />
      )
    },
  },
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: { },
    tabBarComponent: props => (<BottomNavigation active={props.navigationState.index == 0 ? 'signin' : 'signup'}
          hidden={false}
          
        >
        <BottomNavigation.Action
          key="signin"
          icon="home"
          label="Sign In"
          onPress={() => props.navigation.navigate('LogIn')}
        />
        <BottomNavigation.Action
          key="signup"
          icon="create"
          label="Sign Up"
          onPress={() => props.navigation.navigate('SignUp')}
        />
      </BottomNavigation>)
  });

export default connect((state, props) => ({ props }), { signInUser })((props) => {
  const { screenProps, ...otherProps } = props;

  return <FirstScreen screenProps={{ ...screenProps, ...otherProps }} />
});
