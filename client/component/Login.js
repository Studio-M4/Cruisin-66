
import React from "react";
import ReactNative from 'react-native'
import { NavigationEvents } from "react-navigation";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import { InputGroup, Input, Container, Content, Icon } from "native-base";

import validate from './Utilities';

const axios = require("axios");

class Login extends React.Component {
  static navigationOptions = {
    title: "Cruisin'66"
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      showProgress: true,
    };
  }

  onLoginPressed() {
    this.setState({ showProgress: true });
  }

  validateInputs() {
    const emailError = validate('email', this.state.email);
    const passwordError = validate('password', this.state.password);

    this.setState({
      emailError: emailError,
      passwordError: passwordError
    });

    if (!emailError && !passwordError) {
      return true;
    } else {
      return false;
    }
  }

  //submitLogin using axios
  submintLoginAxios() {
    if (this.validateInputs()) {
      const { navigate } = this.props.navigation; // define here for the context
  
      axios
        .post("http://localhost:3000/login", {
          email: this.state.email,
          password: this.state.password
        })
        .then(function(response) {
          if (response.data.messageCode === 103) {
            alert(response.data.message);
          } else {
            var dataUser = AsyncStorage.setItem(
              "userInfo",
              JSON.stringify(response)
            );
            if (dataUser) {
              console.log(dataUser);
              navigate("Home");
            }
          }
        })
        .catch(function(error) {
          console.log(error);
          alert(error);
        });
    }
  }
  _testIftheUserAlreadyLogin = async () => {
    const { navigate } = this.props.navigation; // define here for the context

    try {
      const value = await AsyncStorage.getItem("userInfo");
      if (value !== null) {
        // user already login -- go to home page
        userObject = JSON.parse(value);
        this.setState({
          user: userObject.data.token
        });
        navigate("Home");
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
    }
  };

  render() {
    console.disableYellowBox = true;
    setTimeout(() => {
      this.setState({
        showProgress: false
      });
    }, 3000);

    return (
      <Container>
        <Content>
          <ScrollView>
            <NavigationEvents
              onDidFocus={payload => this._testIftheUserAlreadyLogin()}
            />
            <View style={styles.container}>
              <Text style={styles.title}>{/* Cruisin'66 */}</Text>
              <ActivityIndicator
                animating={this.state.showProgress}
                size="large"
                style={styles.loader}
              />
              <View>
                <Image
                  style={styles.imagesStyle}
                  source={require("./imgs/icon.png")}
                />
              </View>
              <View style={styles.formStyle}>
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
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.submintLoginAxios.bind(this)}
                >
                  <Text style={styles.buttonTextColor}> LOGIN </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate("Signup")}
                >
                  <Text style={styles.buttonTextColor}> SIGN UP </Text>
                </TouchableHighlight>
              </View>
            </View>
          </ScrollView>
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
    paddingTop: 21,
  },
  inputError: {
    marginTop: 2,
    color: "red",
    marginRight: "auto",
    marginLeft: '10%'
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

export default Login;