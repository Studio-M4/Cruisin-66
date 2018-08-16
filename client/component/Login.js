import React from "react";
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
} from 'react-native';
import {
  InputGroup,
  Input,
  Icon
} from 'native-base';
// import FormMessage from './FormMessage'
class Login extends React.Component {
  static navigationOptions = {
      title: 'Cruisin\'66'
  };

  constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        validUsername: false, 
        validPassword: false,
        showProgress: false,
        error: null
      };
  }

  // onLoginPressed() {
  //   this.setState({showProgress: true});
  // }

  // renderError() {
  //   if (this.state.error) {
  //     return (
  //       <Text style={styles.error}>
  //         {this.state.error}
  //       </Text>
  //     )
  //   }
  // }

  //todo: handler utility for response messages 
  //https://medium.com/@yoniweisbrod/interacting-with-apis-using-react-native-fetch-9733f28566bb

  submitLogin() {
    console.log('inside submitLogin')
    console.log('email', this.state.email)
    console.log('password', this.state.password)

    return fetch('http://localhost:3000/login', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => {
      // console.log(response);
      if (response.error) {
        console.log("Error with login information")
      } else {
        console.log('Login success');
        return response.json();
      }
    })
    .then(data => {
      // AsyncStorage.setItem('token', data.token)
      // .then(() => {
        console.log(data);
        this.props.navigation.navigate('Home', data.token);
      // });
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>
            {/* Cruisin'66 */}
          </Text>
          <View>
            {/* <Image
              style={styles.imagesStyle}
              source={require("./imgs/icon.png")}
            /> */}
          </View>
          <View style={styles.formStyle}>
            <TextInput
              style={styles.inputStyle}
              placeholder="Email"
              onChangeText={(email) => this.setState({ email })}
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
              // onPress={this.onLoginPressed.bind(this)}
              onPress={this.submitLogin.bind(this)}
              >
              <Text style={styles.buttonTextColor}> LOGIN </Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Signup')}
              >
              <Text style={styles.buttonTextColor}> SIGN UP </Text>
            </TouchableHighlight>
          </View>
          <ActivityIndicator
            animating={this.state.showProgress}
            size="large"
            style={styles.loader}
          />
        </View>
      </ScrollView>
    );
  };
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
