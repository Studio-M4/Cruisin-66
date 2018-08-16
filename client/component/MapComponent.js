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

import MapView from 'react-native-maps';
export default class CommentStop extends React.Component {
  static navigationOptions = {
    title: "Map directions"
  };
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <MapView
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 4,
    borderRadius: 5
  },
  container2: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 4,
    borderRadius: 5
  },
  title: {
    fontSize: 14,
    color: "#777",
    marginTop: 7,
    padding: 9,
    borderRadius: 25,
    marginLeft: 4,
    width: "80%",
    height: 30
  },
  imagesStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 3
  },
  imagesStyleModal: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20
  },
  textDesign: {
    width: "80%",
    color: "#333",
    marginBottom: 20
  },
  closeIt: {
    padding: 10,
    marginLeft: "80%",
    marginTop: 5
  },
  inputStyle: {
    height: 40,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 0.4,
    paddingLeft: 10,
    marginTop: 10,
    marginLeft: 4,
    bottom: 5,
    borderRadius: 20
  }
});
