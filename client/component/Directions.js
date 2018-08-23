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
 
  handleGetDirections = () => {
    const data = {
       source: {
        latitude: 36.602951,
        longitude: -121.895763
      },
      destination: {
        latitude: 36.157,
        longitude: -121.672
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
 
  render() {
    return (
        <Button transparent textStyle={{color: '#87838B'}} >
          <Icon name="navigate" 
            onPress={this.handleGetDirections}
          />
          <Text>Directions</Text>
        </Button>
    );
  }
}