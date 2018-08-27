import React from "react";
import { NavigationEvents } from "react-navigation";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
  FlatList,
} from "react-native";

import SegmentedControlTab from "react-native-segmented-control-tab";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Item,
  Input,
  Content
} from "native-base";


export default class UserFavorites extends React.Component {

    render() {
      const { navigate } = this.props.navigation;
        return (


        <FlatList
            data = {this.props.data}

            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate("Stops", {
                    itinerary: item
                  });
                }}
              >
                <Card>
                    <CardItem cardBody>
                      <ImageBackground
                        source={{ uri: item.photoUrl || 'https://www.telegraph.co.uk/content/dam/Travel/2018/April/road-trip-GettyImages-655931324.jpg?imwidth=1400' }}
                        style={{ height: 120, width: null, flex: 1, opacity: .8 }}
                      >
                      <Text style={styles.tourname}>{item.name}</Text>
                      </ImageBackground>
                    </CardItem>
                  </Card>
                
              </TouchableHighlight>
              )}
              keyExtractor={(item, index) => index.toString()}
            />


        )
    }

}


const styles = StyleSheet.create({
    container: {
      backgroundColor: "#eee",
      // alignItems: "center",
      width: "100%",
      height: "100%"
    },
  
    title: {
      fontSize: 17,
      fontWeight: "bold",
      color: "#000",
      marginTop: 2,
      marginBottom: 2,
      backgroundColor: "#fff",
      width: "100%",
      padding: 20
    },
    imagesStyle: {
      width: 80,
      height: 80,
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: "#336699",
      borderRadius: 40,
      padding: 5
    },
    button: {
      alignItems: "center",
      backgroundColor: "#336699",
      marginTop: 20,
      padding: 10,
      width: 300
    },
    tourname: {
      color: '#fff',
      textAlign: 'center',
      marginTop:50,
      fontSize:25,
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    }
  });