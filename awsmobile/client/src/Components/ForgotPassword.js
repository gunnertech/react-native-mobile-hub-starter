import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

import {
  Toolbar,
  Button,
} from 'react-native-material-ui';

import MFAPrompt from '../../lib/Categories/Auth/Components/MFAPrompt';
import { colors } from 'theme';

import Container from '../Container';

const { width } = Dimensions.get('window');

class ForgotPassword extends React.Component {
  static navigationOptions = navigationProps => ({
    header: <Toolbar
      centerElement="Change Password"
      rightElement={<Button 
        text="Reset" 
        style={{text: {color: 'white'}}}
        onPress={() => navigationProps.navigation.state.params.handleReset() }
      />}
      leftElement="arrow-back"
      onLeftElementPress={() => navigationProps.navigation.state.params.handleBack()}
    />
  })

  constructor(props, context) {
    super(props, context);

    hackyStyleMerge(context.uiTheme);

    this.state = {
      signedInUser: null,
      username: '',
      password: '',
      errorMessage: '',
      showMFAPrompt: false,
    };

    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleMFAValidate = this.handleMFAValidate.bind(this);
    this.handleMFACancel = this.handleMFACancel.bind(this);
    this.handleMFASuccess = this.handleMFASuccess.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({
      handleReset: this.handleResetClick.bind(this),
      handleBack: this.props.navigation.goBack.bind(this)
    });
  }

  async componentDidMount() {
    const signedInUser = await this.getCurrentUser();

    this.setState({ signedInUser });
  }

  getCurrentUser() {
    return this.props.screenProps.auth.currentUser()
      .catch((err) => { return null });
  }

  handleResetClick() {
    const { auth } = this.props.screenProps;
    const { username, signedInUser: user } = this.state;
    const send = user ? user.username : username;
    auth.forgotPassword(send)
      .then(this.setState({ showMFAPrompt: true }))
      .catch((err) => { console.log(err) });
  }

  async handleMFAValidate(code = '') {
    const { auth } = this.props.screenProps;
    const { username, password, signedInUser: user } = this.state;
    const send = user ? user.username : username;
    try {
      await auth.forgotPasswordSubmit(send, code, password);
    } catch (err) {
      return err;
    }
    return true;
  }

  handleMFACancel() {
    this.setState({ showMFAPrompt: false });
  }

  handleMFASuccess() {
    this.setState({
      showMFAPrompt: false,
    }, () => {
      this.props.navigation.goBack();
    });
  }

  render() {
    const { signedInUser: user } = this.state;

    return (
      <Container backgroundColor="white">
        <ScrollView>
          <Text style={styles.resetInfoMessage}>{user ? 'Change your password' : 'Please enter your username and we’ll help you reset your password.'}</Text>
          <FormValidationMessage labelStyle={styles.validationText}>{this.state.errorMessage}</FormValidationMessage>
          <View>
            <FormLabel>Username</FormLabel>
            <FormInput
              inputStyle={styles.input}
              selectionColor={colors.primary}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              editable={user == null}
              placeholder="Please enter your username"
              returnKeyType="next"
              ref="username"
              textInputRef="usernameInput"
              onSubmitEditing={() => { this.refs.password.refs.passwordInput.focus() }}
              onChangeText={(username) => this.setState({ username })}
              value={user ? user.username : this.state.username}
            />
            <FormLabel>New password</FormLabel>
            <FormInput
              inputStyle={styles.input}
              selectionColor={colors.primary}
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              editable={true}
              placeholder="Please enter your new password"
              returnKeyType="next"
              ref="password"
              textInputRef="passwordInput"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
            {this.state.showMFAPrompt &&
              <MFAPrompt
                onValidate={this.handleMFAValidate}
                onCancel={this.handleMFACancel}
                onSuccess={this.handleMFASuccess}
              />}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

ForgotPassword.contextTypes = {
  uiTheme: PropTypes.object
};

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
    resetInfoMessage: {
      textAlign: 'center',
      marginTop: 10,
      paddingHorizontal: 20,
    },
    passwordResetButton: {
      color: theme.palette.primaryColor,
      marginTop: 10,
      textAlign: 'center',
    },
  });

  return true;
}

export default ForgotPassword;

