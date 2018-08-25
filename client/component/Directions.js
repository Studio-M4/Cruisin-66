import getDirections from 'react-native-google-maps-directions'

import React from "react";

import {
    Text
  } from "react-native";
  
import {
    Icon,
    Button
  } from "native-base";
 
export default class gmapsDirections extends React.Component {

  constructor({props}) {
    super(props);
    this.state = {
      currLatitude: 36.602951,
      currLongitude: -121.895763,
      destLatitude: props.latitude,
      destLongitude: props.longitude
    };
  }
 
  handleGetDirections = () => {
    const data = {
       source: {
        latitude: this.state.currLatitude,
        longitude: this.state.currLongitude
      },
      destination: {
        latitude: this.state.destLatitude,
        longitude: this.state.destLongitude
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode 
        }
      ]
    }
 
    getDirections(data)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currLatitude: position.coords.latitude,
          currLongitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  
  
 
  render() {
    return (
        <Button transparent textStyle={{color: '#87838B'}} onPress={this.handleGetDirections}>
          <Icon name="navigate"/>
          <Text>Directions</Text>
        </Button>
    );
  }
}