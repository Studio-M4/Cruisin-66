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
  AsyncStorage
} from "react-native";

import { InputGroup, Input, Container, Content, Icon } from "native-base";

const axios = require("axios");

import {
  InputGroup,
  Input,
  Icon
} from 'native-base';

class Login extends React.Component {
  static navigationOptions = {
    title: "Cruisin'66"
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      validUsername: false,
      validPassword: false,
      showProgress: true,
      error: null
    };
  }

  onLoginPressed() {
    this.setState({ showProgress: true });
  }

  //submitLogin using axios
  submintLoginAxios() {
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
  _testIftheUserAlreadyLogin = async () => {
    const { navigate } = this.props.navigation; // define here for the context

    try {
      const value = await AsyncStorage.getItem("userInfo");
      if (value !== null) {
        // user already login -- go to home page
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
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Password"
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  secureTextEntry
                />
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
    paddingTop: 21
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
