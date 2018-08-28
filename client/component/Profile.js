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


import UserItineraries from './UserItineraries.js';
import UserFavorites from "./UserFavorites.js";

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
      userItineraries: [],
      userFavorites:[]
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
        this.getUserFavorites();
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

  getUserFavorites = () => {
    let userId = this.state.user.userId;
    axios
    .get(`http://localhost:3000/favorite?userId=${userId}`)
    .then((response) => {
      // console.log(response.data);
      this.setState({
        userFavorites: response.data
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
      <View style={styles.container}>
        <NavigationEvents onDidFocus={payload => this._retrieveData()} />
          <View>  
            <Image
              style={styles.imagesStyle}
              round source={{ uri: this.state.user.photoAvatar }} 
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
            values={["My Itineraries", "Favorites"]}
            onPress={index => this.setState({ selected: index })}
          />

          {this.state.selectedIndex === 0 ?              
            <UserItineraries data={this.state.userItineraries} navigation = {this.props.navigation}></UserItineraries>
            : 
            <UserFavorites data={this.state.userFavorites} navigation = {this.props.navigation}></UserFavorites>
          }

      </View>    

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
    marginTop:'38%',
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
