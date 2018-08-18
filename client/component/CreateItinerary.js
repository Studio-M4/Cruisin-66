import React from 'react';
import { NavigationEvents } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ScrollView,
  Button
} from 'react-native';
import Tcomb from 'tcomb-form-native';

const { Form } = Tcomb.form;

export default class CreateItinerary extends React.Component {
  static navigationOptions = {
    title: 'CreateItinerary'
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  handleSubmit = () => {
    let valuesObj = this._form.getValue();   
    valuesObj.userId = this.state.user.userId;
    console.log('Form values: ', valuesObj);
    
    this.createItinerary(valuesObj)
      .then(itinerary =>{
        console.log('ITINERARAY ', itinerary);
        this.props.navigation.navigate('Stops', { itinerary: itinerary })}
      )
      .catch(err => console.log(err));
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("userInfo");
      if (value !== null) {
        // We have data!!
        userObject = JSON.parse(value);
        this.setState({
          user: userObject.data.token
        });
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
    }
  };

  /**
   * Should be used to connect to endpoint for creating an Itinerary.
   * @param {object} params - parameters for post request
   */
  createItinerary = params => {
    return fetch('http://localhost:3000/itinerary', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        return res.json(); // this is the created itinerary object.
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    <NavigationEvents onDidFocus={payload => this._retrieveData()} />
    return (
      <ScrollView>
        <View style={styles.container}>
          <Form ref={c => (this._form = c)} type={Itinerary} />
          <Button title='Create' onPress={this.handleSubmit} />
        </View>
      </ScrollView>
    );
  }
}

/**
 * Get all the categories from server.
 */
const getCategories = () => {
  return fetch('http://localhost:3000/categories', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.error) {
        throw res.error;
      }
      return res.json();
    })
    .then(categories => {
      return categories.reduce((accum, category) => {
        accum[category.id] = category.name;
        return accum;
      }, {});
    })
    .catch(error => {
      console.log(error);
    });
};

/**
 * Dropdown list options. Key of property is the actual returned value.
 * The actual data should be replaced by getCategories().
 */
let Itinerary;
getCategories().then((categories) => {
  /**
   * Form storage object for 'tcomb-form-native'.
   */
  Itinerary = Tcomb.struct({
    name: Tcomb.String,
    description: Tcomb.String,
    CategoryId: Tcomb.enums(categories)
  });
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 60
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#336699',
    marginTop: 20,
    padding: 10,
    width: 300
  }
});

