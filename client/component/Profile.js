import React from "react";
import { NavigationEvents } from "react-navigation";
import {
  StyleSheet,
  View,
  Image,
  AsyncStorage
} from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import {Text} from "native-base";
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
        userObject = JSON.parse(value);
        this.setState({
          user: userObject.data.token
        });
        this.getUserItineraries();
        this.getUserFavorites();
      }
    } catch (error) {
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
      this.setState({
        userItineraries: response.data
      })
    })
    .catch((error) => {
      alert(error);
    });
}

  getUserFavorites = () => {
    let userId = this.state.user.userId;
    axios
    .get(`http://localhost:3000/favorite?userId=${userId}`)
    .then((response) => {
      this.setState({
        userFavorites: response.data
      })
    })
    .catch((error) => {
      alert(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={payload => this._retrieveData()} />
          <View style={styles.header}>  
            <Image
              style={styles.imagesStyle}
              round source={{ uri: 'https://avatars0.githubusercontent.com/u/25995901?s=460&v=4'}}
            />
            <View style={styles.headerContent}>
              <Text style={styles.title}>
                {this.state.user.firstName} {this.state.user.lastName} 
              </Text>      
              <Text onPress={this._logOut} style={styles.logout}> Log Out </Text>
            </View>
          </View>
    
          <SegmentedControlTab
            tabsContainerStyle={styles.tabsContainerStyle}
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
    width: "100%",
    height: "100%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#FEFEFE"
  },
  headerContent: {
    marginLeft: 15,
    alignSelf: "center"
  },
  title: {
    fontWeight: "bold",
    color: "#444",
    fontSize: 20
  },
  imagesStyle: {
    width: 80,
    height: 80,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#336699",
    borderRadius: 40,
    padding: 5,
    zIndex: 2,
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
    marginTop:10
  },
  logout:{
    color:'red',
    fontSize: 16,
    paddingTop: 5
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