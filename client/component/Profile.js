import React from "react";
import { NavigationEvents } from "react-navigation";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Modal,
  FlatList,
  AsyncStorage
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

const axios = require("axios");

export default class Profile extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      user: {},
      userItineraries: []
    };
  }
  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
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
        this.getUserItineraries();
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
    }
  };
  _logOut  = async () => {
      try {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Login");
      } catch (error) {
        alert(error)
      }
  }

  getUserItineraries = () => {
    let userId = this.state.user.userId;

    axios
    .get(`http://localhost:3000/profile/itineraries?UserId=${userId}`)
    .then((response) => {
      // console.log(response.data);
      this.setState({
        userItineraries: response.data
      })
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
}


  //NavigationEvents  instead of wcdl
  render() {
    return (
      <ScrollView>
        <NavigationEvents onDidFocus={payload => this._retrieveData()} />
        <View style={styles.container}>
          <View>        
            <Image
              style={styles.imagesStyle}
              source={require("./imgs/icon.png")}
            />
          </View>
          <Text style={styles.title}>
            {this.state.user.firstName} {this.state.user.lastName} 
          </Text>
       
           <Text onPress={this._logOut} style={styles.logout}> Logout </Text>
    
          <SegmentedControlTab
            tabsContainerStyle={styles.tabsContainerStyle}
            tabStyle={styles.tabStyle}
            tabTextStyle={styles.tabTextStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTabTextStyle={styles.activeTabTextStyle}
            selectedIndex={1}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
            allowFontScaling={false}
            values={["My itineraries", "Favorites"]}
            onPress={index => this.setState({ selected: index })}
          />
          <Content>

            {
              this.state.selectedIndex === 0 ?              
            <FlatList
            data = {this.state.userItineraries}
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
                        source={{ uri: item.photoUrl }}
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
            : 
            
            <FlatList
            data = {this.state.userItineraries}
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
                        source={{ uri: item.photoUrl }}
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
            }
          </Content>
        </View>
      </ScrollView>
    );
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
  tabsContainerStyle: {
    //custom styles
    margin: 10,
    height: 40,
    marginTop:20
  },
  tabStyle: {
    //custom styles
  },
  tabTextStyle: {
    //custom styles
  },
  activeTabStyle: {
    //custom styles
  },
  activeTabTextStyle: {
    //custom styles
  },
  tabBadgeContainerStyle: {
    //custom styles
  },
  activeTabBadgeContainerStyle: {
    //custom styles
  },
  tabBadgeStyle: {
    //custom styles
  },
  activeTabBadgeStyle: {
    //custom styles
  },
  logout:{
    color:'red',
    marginTop:'34%',
    right:0,
    marginLeft:'80%',
    position:'absolute'
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
