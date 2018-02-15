import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  Modal,
  Dimensions
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import {
  Toolbar,
  Button,
} from 'react-native-material-ui';

import MFAPrompt from '../../lib/Categories/Auth/Components/MFAPrompt';
import ForgotPassword from './ForgotPassword';
import { colors } from 'theme';
import Constants from '../Utils/constants';
import Container from '../Container';

import attemptSignIn from '../actions/attemptSignIn';
import fetchSession from '../actions/fetchSession';
import confirmSignIn from '../actions/confirmSignIn';



const { width } = Dimensions.get('window');

const mapStateToProps = (state, ownProps) => ({
  showActivityIndicator: state.app.working,
  mfaRequired: state.app.requiresMfaOnSignIn,
  session: state.session.session,
  cognitoUser: state.session.cognitoUser,
  error: state.app.error
});

class LogIn extends React.Component {
  static navigationOptions = navigationProps => ({
    header: <Toolbar
      centerElement={Constants.APP_NAME}
      rightElement={<Button 
        text="Sign In" 
        style={{text: {color: 'white'}}}
        onPress={() => navigationProps.navigation.state.params.handleSignIn() }
      />}
    />
  })

  constructor(props, context) {
    super(props, context);

    hackyStyleMerge(context.uiTheme);

    this.state = {
      username: '',
      password: '',
      showMFAPrompt: false,
    };

    this.handleLogInClick = this.handleLogInClick.bind(this);
    this.handleMFAValidate = this.handleMFAValidate.bind(this);
    this.handleMFACancel = this.handleMFACancel.bind(this);
    this.handleMFASuccess = this.handleMFASuccess.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({handleSignIn: this.handleLogInClick.bind(this)});
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.cognitoUser && nextProps.cognitoUser) {
      if(!this.props.mfaRequired) {
        this.props.fetchSession(this.props.screenProps.auth)
      }
    }

    if(!this.props.session && nextProps.session) {
      this.props.screenProps.onLogIn(nextProps.session)
    }
  }

  handleLogInClick() {
    const { auth } = this.props.screenProps;
    const { username, password } = this.state;
    
    ////BUG: In the simulator, if you don't call this twice, it pauses execution until you click the screen again.
    //// If you're thinking, that's stupid, you're right and it made me want to kill myself.
    this.props.attemptSignIn(auth, username, password);
    this.props.attemptSignIn(auth, username, password);
  }

  handleMFAValidate(code = '') {
    const { auth } = this.props.screenProps;
    this.props.confirmSignIn(auth, this.props.cognitoUser, code);
  }

  handleMFACancel() {
    this.setState({ showMFAPrompt: false });
  }

  handleMFASuccess() {
    this.setState({ showMFAPrompt: false });
  }

  render() {
    return (
      <Container backgroundColor="white">
        {this.state.showMFAPrompt &&
          <MFAPrompt
            onValidate={this.handleMFAValidate}
            onCancel={this.handleMFACancel}
            onSuccess={this.handleMFASuccess}
          />}
        <Modal
          visible={this.props.showActivityIndicator}
          onRequestClose={() => null}
        >
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
          />
        </Modal>
        <ScrollView>
          <FormValidationMessage labelStyle={styles.validationText}>{this.props.error ? this.props.error.message : ''}</FormValidationMessage>
          <FormLabel>Username</FormLabel>
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
            editable={true}
            placeholder="Please enter your username"
            returnKeyType="next"
            ref="username"
            textInputRef="usernameInput"
            onSubmitEditing={() => { this.refs.password.refs.passwordInput.focus() }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username} />
          <FormLabel>Password</FormLabel>
          <FormInput
            inputStyle={styles.input}
            selectionColor={colors.primary}
            underlineColorAndroid="transparent"
            editable={true}
            secureTextEntry={true}
            placeholder="Please enter your password"
            returnKeyType="next"
            ref="password"
            textInputRef="passwordInput"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password} />

          <Text
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
            style={styles.passwordResetButton}
          >Forgot your password?</Text>
        </ScrollView>
      </Container>
    );
  }

}

LogIn.contextTypes = {
  uiTheme: PropTypes.object
};

ForgotPassword.contextTypes = {
  uiTheme: PropTypes.object
};

const LogInStack = (StackNavigator({
  LogIn: {
    screen: connect(
      mapStateToProps,
      {attemptSignIn, fetchSession, confirmSignIn}
    )(LogIn)
  },
  ForgotPassword: {
    screen: ForgotPassword
  },
}, { 
  
 }));



var styles = StyleSheet.create({});

const hackyStyleMerge = (theme) => {
  styles = StyleSheet.create({
    activityIndicator: {
      backgroundColor: colors.mask,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    input: {
      color: theme.palette.accentColor
    },
    passwordResetButton: {
      color: theme.palette.primaryColor,
      marginTop: 10,
      textAlign: 'center',
    },
  });

  return true;
}

export default props => <LogInStack screenProps={{ ...props }} />;