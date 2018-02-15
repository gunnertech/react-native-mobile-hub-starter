global.Buffer = global.Buffer || require('buffer').Buffer; // Required for aws sigv4 signing

import React from 'react';
import {View,Text,StatusBar} from 'react-native';

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
import Amplify from 'aws-amplify';
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



class customComponent extends React.Component {
// const customComponent = (props) => {
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: 'Home'
    }
  }

  mapNavItem(item) {
    return (
      Object.assign(({
        "Home": {
          icon: 'home',
          value: 'Old Stuff'
        },
        "ForgotPassword": { icon: 'lock-open', value: 'Forgot Password' },
        "PrivacyPolicy": { icon: 'security', value: 'Privacy Policy' },
        "SignOut": { icon: 'exit-to-app', value: 'Sign Out' },
      }[item.key] || {}), {
        onPress: () => {
          this.setState({
            active: item.key
          });
          this.props.navigation.navigate(item.key);
        },
        active: (this.state.active === item.key)
      })
    )
  }

  render() {
    return (
      <Drawer>
        <DrawerNavHeader />
        <Drawer.Section
            items={this.props.items.map(item => this.mapNavItem(item)).filter(item => !!item.value)}
        />
      </Drawer>
      );
  }
}

const App = DrawerNavigator({
  ForgotPassword: {
    screen: (props) => {
      return <ForgotPassword {...props.screenProps} onCancel={() => props.navigation.navigate('Home')} onSuccess={() => props.navigation.navigate('Home')} />
    }, navigationOptions: { drawerLabel: 'Change password' }
  },
  SignOut: {
    screen: (props) => {
      return <SignOut rootNavigator={props.navigation} {...props} />
    }, navigationOptions: { drawerLabel: 'Sign Out' }
  },
  Splash: {
    screen: props => {
      return (
        <Splash navigation={props.navigation} { ...props.screenProps } />
      )
    },
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
  Home: {
    screen: props => <PrivacyPolicy rootNavigator={props.navigation} screenProps={{ ...props.screenProps }} />,
    navigationOptions: {
      drawerLabel: 'Privacy Policy',
    },
  },
}, { 
  initialRouteName: 'Splash',
  contentComponent: customComponent,
  headerMode: 'none'
});


const AppContainer = props => (
  <Provider store={store}>
    <ThemeProvider uiTheme={uiTheme}>
      <App screenProps={{ ...props }} />
    </ThemeProvider>
  </Provider>
);

export default WithAuth(AppContainer);