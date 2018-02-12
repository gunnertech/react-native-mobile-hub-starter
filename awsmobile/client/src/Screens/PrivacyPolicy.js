import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {
  Toolbar,
  ActionButton
} from 'react-native-material-ui';

import Container from '../Container';



const mapStateToProps = (state, ownProps) => ({ });

class PrivacyPolicy extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Container>
        <Toolbar
          leftElement="menu"
          centerElement="Shudi - Privacy Policy"
          onLeftElementPress={() => this.props.rootNavigator.navigate('DrawerOpen')}
        />
        <View><Text>Hello, Privacy</Text></View>
      </Container>
    );
  }
};


export default connect(
  mapStateToProps,
  {}
)(PrivacyPolicy);