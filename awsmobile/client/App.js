/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
global.Buffer = global.Buffer || require('buffer').Buffer; // Required for aws sigv4 signing

import React from 'react';

import 'react-native-polyfill';

import { DrawerNavigator } from 'react-navigation';

import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import initialReduxState from './src/constants/initialState';

import { COLOR, ThemeProvider } from 'react-native-material-ui';
import {
    Avatar,
    ListItem,
    Toolbar,
    Drawer
} from 'react-native-material-ui';

import { WithAuth } from './lib/Categories/Auth/Components';
import Amplify from 'aws-amplify-react-native';
import awsmobile from './src/aws-exports';
import First from './src/Screens/First';
import Splash from './src/Screens/Splash';
import PrivacyPolicy from './src/Screens/PrivacyPolicy';
import SignOut from './src/Components/SignOut';
import ForgotPassword from './src/Components/ForgotPassword';
import DrawerNavHeader from './src/Components/DrawerNavHeader';

import 'rxjs';

Amplify.configure(awsmobile);



const store = configureStore(initialReduxState);

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
        accentColor: COLOR.pink500,
    },
    spacing: {
      gutter: 10
    }
};




const mapNavItem = (props, item) => (
  Object.assign(({
    "ForgotPassword": { icon: 'lock-open', value: 'Forgot Password', active: true },
    "PrivacyPolicy": { icon: 'security', value: 'Privacy Policy' },
    "SignOut": { icon: 'exit-to-app', value: 'Sign Out' },
  }[item.key] || {}), {onPress: () => props.navigation.navigate(item.key)})
)

const customComponent = (props) => {
  return (
  <Drawer>
    <DrawerNavHeader />
    <Drawer.Section
        items={props.items.map(item => mapNavItem(props, item)).filter(item => !!item.value)}
    />
  </Drawer>
  );
}

const App = DrawerNavigator({
  PrivacyPolicy: {
    screen: props => <PrivacyPolicy rootNavigator={props.navigation} {...props.screenProps } />,
    navigationOptions: {
      drawerLabel: 'Privacy Policy',
    },
  },
  ForgotPassword: {
    screen: (props) => {
      return <ForgotPassword {...props.screenProps} onCancel={() => props.navigation.navigate('PrivacyPolicy')} onSuccess={() => props.navigation.navigate('PrivacyPolicy')} />
    }, navigationOptions: { drawerLabel: 'Change password' }
  },
  SignOut: {
    screen: (props) => {
      return <SignOut rootNavigator={props.navigation} {...props} />
    }, navigationOptions: { drawerLabel: 'Sign Out' }
  },
  Splash: {
    screen: props => <Splash navigation={props.navigation} { ...props.screenProps } />,
    navigationOptions: {
      drawerLabel: ' ',
    },
  },
  FirstScreen: {
    screen: props => <First rootNavigator={props.navigation} screenProps={{ ...props.screenProps }} />,
    navigationOptions: {
      drawerLabel: ' ',
    },
  },
}, { 
  initialRouteName: 'Splash',
  contentComponent: customComponent
});

const AppContainer = props => (
  <Provider store={store}>
    <ThemeProvider uiTheme={uiTheme}>
      <App screenProps={{ ...props }} />
    </ThemeProvider>
  </Provider>
);

// class App extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <ThemeProvider uiTheme={uiTheme}>
//           <MainTabNavigator ref={(nav) => { this.navigator = nav; }} />
//         </ThemeProvider>
//       </Provider>
//     );
//   }
// }

export default WithAuth(AppContainer);
