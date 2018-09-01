import React from "react";

import {
  StyleSheet,
  View
} from "react-native";

import MapView, { Polyline }   from "react-native-maps";
import { Marker } from "react-native-maps";

export default class CommentStop extends React.Component {
  static navigationOptions = (navigation) => {
    return {
      title : "Map"
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
          latitudeDelta: 0.1,
          longitudeDelta: 0.12,
        }}
      >
      {this.state.stops.map(marker => {
          const coordinate = {
            latitude: marker.latitude,
            longitude: marker.longitude
          }
          return(
            <Marker
              //image = {marker.StopPhotos[0].url}
              coordinate={coordinate}
              // description={marker.name}
              title={marker.name}
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
