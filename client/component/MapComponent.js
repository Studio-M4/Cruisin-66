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

import MapView   from "react-native-maps";
import { Marker } from "react-native-maps";

export default class CommentStop extends React.Component {
  static navigationOptions = (navigation) => {
    
    console.log("The talk about nav ", navigation.state)
    return {
       title : "navigation"
    }
 
  };
  constructor(props) {
    super(props);
    this.state = {},
    region = {};
    stops = [];

  }
  componentWillMount(){
    this.getStop()
  }

  onRegionChange = region => {
    this.setState({ region });
  }

  getStop = () => {
    const { navigation} = this.props;
    var allStop = navigation.state.params.stop; 
    this.setState({
      stops: allStop
    })
  }

  

  render() {
    const { navigation} = this.props;
    var allStop = navigation.state.params.stop; 
    console.log("Mm the long", typeof(allStop[0]))
    return (
      <View style={styles.container}>

      <MapView
         userLocationAnnotationTitle="me"
         //followsUserLocation
         showsUserLocation   
        style={styles.map}
        showsUserLocation      
        initialRegion={{
          latitude: allStop[0].latitude,
          longitude: allStop[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      {this.state.stops.map(marker => {
          const coordinate = {
            latitude: marker.latitude,
            longitude: marker.longitude
          }
          console.log("The coodinate 's ",coordinate)
          return(
            <Marker
              //image = {marker.StopPhotos[0].url}
              coordinate={coordinate}
              description={marker.description}
           />
          )}
        )}
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
  },
  imageMap:{
    width:100,
    height:1000,
    borderRadius:15
  }
});
