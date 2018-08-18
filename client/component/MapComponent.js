import React from "react";

import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Modal
} from "react-native";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  List,
  ListItem,
  Body,
  Right,
  Title,
  Item,
  Input
} from "native-base";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

export default class CommentStop extends React.Component {
  static navigationOptions = {
    title: "Map directions"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          userLocationAnnotationTitle="me"
          followsUserLocation
          showsUserLocation
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          {[
            {
              latlng: {37.78825: -122.4324},
              title: "Don't know my name",
              description:
                " Grace waterfall i don't my name i don't play by the rules"
            }
          ].map(marker => (
            <Marker
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
