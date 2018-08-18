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

const axios = require("axios");
class Signup extends React.Component {
  static navigationOptions = {
    title: "Cruisin'66"
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      showProgress: false
    };
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
        password: this.state.password
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
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
              />
              <TextInput
                style={styles.inputStyle}
                placeholder="Last name"
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
              />
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
              <TextInput
                style={styles.inputStyle}
                placeholder="Re-enter password"
                onChangeText={password2 => this.setState({ password2 })}
                value={this.state.password2}
                secureTextEntry
              />
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
