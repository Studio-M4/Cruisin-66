import React from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { InputGroup, Input, Container, Content, Icon } from "native-base";
import validate from './Utilities';

const axios = require("axios");
class Signup extends React.Component {
  static navigationOptions = {
    title: "Cruisin'66"
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      userName: '',
      userNameError: '',
      email: '',
      emailError: '',
      // photoAvatar: '',
      // photoAvatarError: '',
      password: '',
      passwordError: '',
      confirmPassword: '',
      confirmPasswordError: '',
      showProgress: false
    };
  }

  validateInputs() {
    const firstNameError = validate('firstName', this.state.firstName);
    const lastNameError = validate('lastName', this.state.lastName);
    const userNameError = validate('userName', this.state.userName);
    const emailError = validate('email', this.state.email);
    const passwordError = validate('password', this.state.password);
    const confirmPasswordError = validate('confirmPassword', this.state.confirmPassword);

    this.setState({
      firstNameError: firstNameError,
      lastNameError: lastNameError,
      userNameError: userNameError,
      emailError: emailError,
      passwordError: passwordError,
      confirmPasswordError: confirmPasswordError
    });

    if (!emailError && !passwordError && !firstNameError && !lastNameError && !userNameError && !confirmPasswordError) {
      return true;
    } else {
      return false;
    }
  }

  //todo: error handling (Ex: account already exists)
  handleSubmitSignUp() {
    const { navigate } = this.props.navigation; // define here for the context
    axios
      .post("http://localhost:3000/signup", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        // photoAvatar: this.state.photoAvatar
      })
      .then(function(response) {
        if (response.err) {
          alert("Error login");
        } else {
          var dataUser = AsyncStorage.setItem(
            "userInfo",
            JSON.stringify(response)
          );
          if (dataUser) {
            navigate("Home");
          }
        }
      })
      .catch(function(error) {
        console.log(error);
        alert(error);
      });
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            <View style={styles.formStyle}>
              <TextInput
                style={styles.inputStyle}
                placeholder="First name"
                autoCapitalize='none'
                onChangeText={value => this.setState({ firstName: value.trim() })}
                onBlur={() => {
                  this.setState({
                    firstNameError: validate('firstName', this.state.firstName),
                  })
                }}
              />
              <Text style={styles.inputError}>{ this.state.firstNameError ?  this.state.firstNameError : null}</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Last name"
                autoCapitalize='none'
                onChangeText={value => this.setState({ lastName: value.trim() })}
                onBlur={() => {
                  this.setState({
                    lastNameError: validate('lastName', this.state.lastName),
                  })
                }}
              />
              <Text style={styles.inputError}>{ this.state.lastNameError ?  this.state.lastNameError : null}</Text>
              
              <TextInput
                style={styles.inputStyle}
                placeholder="User name"
                autoCapitalize='none'
                onChangeText={value => this.setState({ userName: value.trim() })}
                onBlur={() => {
                  this.setState({
                    userNameError: validate('userName', this.state.userName),
                  })
                }}
              />
              <Text style={styles.inputError}>{ this.state.userNameError ?  this.state.userNameError : null}</Text>
              
              <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                onChangeText={value => this.setState({ email: value.trim() })}
                onBlur={() => {
                  this.setState({
                    emailError: validate('email', this.state.email),
                  })
                }}
                autoCapitalize='none'
              />
              <Text style={styles.inputError}>{ this.state.emailError ?  this.state.emailError : null}</Text>
                
              {/* <TextInput
                style={styles.inputStyle}
                placeholder="Photo avatar"
                autoCapitalize='none'
                onChangeText={photoAvatar => this.setState({ photoAvatar })}
                value={this.state.photoAvatar}
              /> */}
              
              <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                autoCapitalize='none'
                onChangeText={value => this.setState({ password: value.trim() })}
                onBlur={() => {
                  this.setState({
                    passwordError: validate('password', this.state.password),
                  })
                }}
                secureTextEntry={true}
              />
              <Text style={styles.inputError}>{ this.state.passwordError ?  this.state.passwordError : null}</Text>
              
              <TextInput
                style={styles.inputStyle}
                placeholder="Re-enter password"
                autoCapitalize='none'
                onChangeText={value => this.setState({ confirmPassword: value.trim() })}
                onBlur={() => {
                  this.setState({
                    confirmPasswordError: validate('confirmPassword', this.state.confirmPassword),
                  })
                }}
                secureTextEntry={true}
              />
              <Text style={styles.inputError}>{ this.state.confirmPasswordError ?  this.state.confirmPasswordError : null}</Text>
              <ActivityIndicator
                animating={this.state.showProgress}
                size="large"
                style={styles.loader}
              />

              <TouchableHighlight
                style={styles.button}
                onPress={this.handleSubmitSignUp.bind(this)}
              >
                <Text style={styles.buttonTextColor}> Sign up </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    alignItems: "center",
    width: "100%",
    borderColor: "#000",
    height: "100%"
  },
  imagesStyle: {
    width: 80,
    height: 80,
    marginBottom: 40
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginTop: 0
  },
  inputStyle: {
    height: 40,
    width: 300,
    borderColor: "#ccc",
    borderWidth: 0.4,
    paddingLeft: 10,
    marginTop: 10
  },
  formStyle: {
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    borderColor: "#000",
    height: "auto",
    paddingBottom: 20,
    paddingTop: 21
  },
  inputError: {
    marginTop: 2,
    color: "red",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#336699",
    marginTop: 20,
    padding: 10,
    width: 300,
    justifyContent: "center",
    borderRadius: 5
  },
  buttonTextColor: {
    color: "#fff"
  },
  loader: {
    marginTop: 10
  },
  error: {
    color: "red",
    marginBottom: 20
  }
});

export default Signup;
