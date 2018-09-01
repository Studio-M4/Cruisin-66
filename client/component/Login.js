
import React from "react";
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
  AsyncStorage,
  ImageBackground
} from "react-native";

import { 
  Container, 
  Content 
} from "native-base";

import validate from './Utilities';

const axios = require("axios");

class Login extends React.Component {
  static navigationOptions = {
    title: ''
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
      <ImageBackground
        style={styles.background}
        source={require('./imgs/monument-valley.jpg')}
      >
        <Content>
          <ScrollView>
            <NavigationEvents
              onDidFocus={payload => this._testIftheUserAlreadyLogin()}
            />
            <View style={styles.container}>
              <ActivityIndicator
                animating={this.state.showProgress}
                size="large"
                style={styles.loader}
              />
              <View>
                <Image
                  style={styles.imagesStyle}
                  source={require("./imgs/cruisin66logo.png")}
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
                  <Text style={styles.buttonTextColor}> LOG IN </Text>
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
      </ImageBackground>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    borderColor: "#000",
    height: "100%"
  },
  imagesStyle: {
    width: 120,
    height: 120,
    marginBottom: 30
  },
  inputStyle: {
    height: 40,
    width: 300,
    color: '#000',
    backgroundColor: '#fff',
    borderColor: "#ccc",
    borderWidth: 0.4,
    paddingLeft: 10,
    marginTop: 10,
    opacity: 0.8,
    borderRadius: 5
  },
  formStyle: {
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
    marginTop: 20,
    padding: 10,
    width: 300,
    justifyContent: "center",
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 0.4,
    fontWeight: 'bold',
    opacity: .6,
    backgroundColor: '#fff',
  },
  buttonTextColor: {
    color: "#000"
  },
  loader: {
    marginTop: 10
  },
  error: {
    color: "red",
    marginBottom: 20
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    resizeMode: "stretch"
  },
});

export default Login;