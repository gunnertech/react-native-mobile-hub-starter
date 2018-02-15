import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import signOut from '../actions/signOut';

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.users.current,
  session: state.session.session,
  error: state.app.error
});

class SignOut extends React.Component {
  componentDidMount() {
    this.props.signOut(this.props.screenProps.auth);
  }

  componentWillReceiveProps(newProps) {
    if(!newProps.session) {
      this.props.rootNavigator.navigate('FirstScreen');
    }
  }

  render() {
    return <Text>Sign Out</Text>;
  }
}


export default connect(
  mapStateToProps,
  {signOut}
)(SignOut);