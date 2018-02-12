import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { NavigationActions, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import {
  Icon,
} from 'react-native-elements';
import { colors } from 'theme';

import signInUser from '../actions/signInUser';
import SignIn from '../Components/LogIn';
import SignUp from '../Components/SignUp';


const styles = StyleSheet.create({
  tabBarLabel: { marginLeft: 9 },
  tabBarIconContainer: { flexDirection: 'row', alignItems: 'center', height: 30 },
});

const FirstScreen = TabNavigator({
  LogIn: {
    screen: (props) => {
      const { screenProps, navigation, ...otherProps } = props;

      return (
        <SignIn
          { ...screenProps }
          { ...otherProps }
          onLogIn={(payload) => {
            console.log("GO TO PRIVACY!!!")
            ///TODO: This isn't right. You're navigating to a screen that requires the user before you've set the user.
            screenProps.rootNavigator.navigate('PrivacyPolicy');
            screenProps.signInUser(payload);
          }}
        />
      );
    },
    navigationOptions: {
      tabBarLabel: 'Sign In',
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabBarIconContainer}>
          <Icon type='font-awesome' name="sign-in" style={styles.tabBarIcon} color={tintColor} />
          {Platform.OS === 'ios' && <Text style={[styles.tabBarLabel, { color: tintColor }]}>SIGN IN</Text>}
        </View>
      ),
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
    navigationOptions: {
      tabBarLabel: 'Sign Up',
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabBarIconContainer}>
          <Icon type='font-awesome' name="pencil-square-o" style={styles.tabBarIcon} color={tintColor} />
          {Platform.OS === 'ios' && <Text style={[styles.tabBarLabel, { color: tintColor }]}>SIGN UP</Text>}
        </View>
      )
    },
  },
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      tabStyle: { borderTopWidth: 0.5, borderTopColor: '#ededed' },
      showIcon: true,
      showLabel: Platform.OS !== 'ios',
      activeTintColor: colors.primary,
    },
  });

export default connect((state, props) => ({ props }), { signInUser })((props) => {
  const { screenProps, ...otherProps } = props;

  return <FirstScreen screenProps={{ ...screenProps, ...otherProps }} />
});
