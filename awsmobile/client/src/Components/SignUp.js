import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView
} from 'react-native';
import {
  Toolbar,
  Button,
} from 'react-native-material-ui';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import MFAPrompt from '../../lib/Categories/Auth/Components/MFAPrompt';
import Container from '../Container';
import { Auth } from 'aws-amplify';
import Constants from '../Utils/constants';
import { colors } from 'theme';

import attemptSignUp from '../actions/attemptSignUp';
import confirmSignUp from '../actions/confirmSignUp';

const mapStateToProps = (state, ownProps) => ({
  showActivityIndicator: state.app.working,
  mfaRequired: state.app.requiresMfaOnSignUp,
  session: state.session.session,
  cognitoUser: state.session.cognitoUser,
  error: state.app.error
});

class SignUp extends React.Component {
  static navigationOptions = navigationProps => ({
    header: <Toolbar
    centerElement={Constants.APP_NAME}
      rightElement={<Button 
        text="Sign Up" 
        style={{text: {color: 'white'}}}
        onPress={() => navigationProps.navigation.state.params.handleSignUp() }
      />}
    />
  })

  constructor(props, context) {
    super(props, context);

    hackyStyleMerge(context.uiTheme);


    this.state = {
      showMFAPrompt: false,
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      phoneNumber: '',
      errorMessage: '',
    };

    this.baseState = this.state;

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleMFAValidate = this.handleMFAValidate.bind(this);
    this.handleMFASuccess = this.handleMFASuccess.bind(this);
    this.handleMFACancel = this.handleMFACancel.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.onSignUp = this.props.screenProps.onSignUp.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({handleSignUp: this.handleSignUp.bind(this)});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.error) {
      this.setState({errorMessage: nextProps.error.message});
    }

    if(nextProps.cognitoUser && !this.props.mfaRequired) {
      this.onSignUp(this.props.cognitoUser);
    }

    if(nextProps.cognitoUser && this.props.mfaRequired && !nextProps.cognitoUser.userConfirmed) {
      this.setState({
        showMFAPrompt: true
      });
    }

    if(nextProps.cognitoUser && nextProps.cognitoUser.userConfirmed) {
      this.onSignUp(this.props.cognitoUser);
    }
  }

  //TODO: code should be smart enough to accept country code if entered and add it if not

  handleSignUp() {
    const { username, password, email, phoneNumber, firstName, lastName } = this.state;
    this.props.attemptSignUp(Auth, username, password, email, ('+1' + phoneNumber), firstName, lastName)
  }

  handleMFAValidate(code = '') {
    this.props.confirmSignUp(Auth, this.state.username, code);
  }

  handleMFACancel() {
    this.setState({ showMFAPrompt: false })
  }

  handleMFASuccess() {
    this.setState({ showMFAPrompt: false }, () => {
      this.onSignUp(this.state.userData);
    });
  }

  handlePasswordChange(password) {
    const isValidPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)

    this.setState({
      password,
      errorMessage: isValidPassword ? '' : 'Your password must include one upper AND lower case letter, a special character and a number'
    });
  }

  handlePhoneChange(phoneNumber) {
    const isValidPhone = /\d{10}$/.test(phoneNumber.replace(/\D/g, ''))

    this.setState({
      phoneNumber,
      errorMessage: isValidPhone ? '' : 'Please enter a valid 10-digit U.S. Phone Number with area code'
    });
  }

  handleFirstNameChange(firstName) {
    const isValid = !!firstName.length;

    this.setState({
      firstName,
      errorMessage: isValid ? '' : 'Your must include a first name'
    });
  }

  handleLastNameChange(lastName) {
    const isValid = !!lastName.length;

    this.setState({
      lastName,
      errorMessage: isValid ? '' : 'Your must include a last name'
    });
  }

  render() {
    return (
      <Container backgroundColor="white">
        <ScrollView>
          <View>
            <FormValidationMessage>{this.state.errorMessage}</FormValidationMessage>
            <FormLabel>Username</FormLabel>
            <FormInput
              inputStyle={styles.input}
              editable
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="Enter your Username"
              returnKeyType="next"
              ref="username"
              textInputRef="usernameInput"
              onSubmitEditing={() => { this.refs.firstName.refs.firstNameInput.focus() }}
              value={this.state.username}
              onChangeText={username => this.setState({ username })} />
          </View>
          <View>
            <FormLabel>First Name</FormLabel>
            <FormInput
              inputStyle={styles.input}
              editable
              underlineColorAndroid="transparent"
              placeholder="Enter your First Name"
              returnKeyType="next"
              ref="firstName"
              textInputRef="firstNameInput"
              onSubmitEditing={() => { this.refs.lastName.refs.lastNameInput.focus() }}
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })} />
          </View>
          <View>
            <FormLabel>Last Name</FormLabel>
            <FormInput
              inputStyle={styles.input}
              editable
              underlineColorAndroid="transparent"
              placeholder="Enter your Last Name"
              returnKeyType="next"
              ref="lastName"
              textInputRef="lastNameInput"
              onSubmitEditing={() => { this.refs.password.refs.passwordInput.focus() }}
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })} />
          </View>
          <View>
            <FormLabel>Password</FormLabel>
            <FormInput
              inputStyle={styles.input}
              editable
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              placeholder="Enter your Password"
              returnKeyType="next"
              ref="password"
              textInputRef="passwordInput"
              onSubmitEditing={() => { this.refs.email.refs.emailInput.focus() }}
              secureTextEntry
              value={this.state.password}
              onChangeText={this.handlePasswordChange} />
          </View>
          <View>
            <FormLabel>Email</FormLabel>
            <FormInput
              inputStyle={styles.input}
              editable
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              placeholder="Enter your Email"
              returnKeyType="next"
              ref="email"
              textInputRef="emailInput"
              onSubmitEditing={() => { this.refs.phone.refs.phoneInput.focus() }}
              value={this.state.email}
              onChangeText={email => this.setState({ email })} />
          </View>
          <View>
            <FormLabel>Phone Number</FormLabel>
            <FormInput
              inputStyle={styles.input}
              editable
              autoCapitalize="none"
              keyboardType="number-pad"
              returnKeyType="done"
              underlineColorAndroid="transparent"
              placeholder="Enter your Phone Number"
              returnKeyType="done"
              ref="phone"
              textInputRef="phoneInput"
              value={(this.state.phoneNumber).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
              onBlur={this.onPhoneSubmit}
              onSubmitEditing={(e) => {
                this.handlePhoneChange(e.nativeEvent.text)
              }}
              onChangeText={this.handlePhoneChange} />
            {false && <FormValidationMessage>Error message</FormValidationMessage>}
          </View>
          {this.state.showMFAPrompt &&
            <MFAPrompt
              onValidate={this.handleMFAValidate}
              onCancel={this.handleMFACancel}
              onSuccess={this.handleMFASuccess}
            />}
        </ScrollView>
      </Container>
    );
  }
}

SignUp.contextTypes = {
  uiTheme: PropTypes.object
};

const SignUpStack = StackNavigator({
  SignUp: {
    screen: connect(
      mapStateToProps,
      {attemptSignUp, confirmSignUp}
    )(SignUp),
  },
}, {

});

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

export default props => <SignUpStack screenProps={{ onSignUp: props.onSignUp }} />;
