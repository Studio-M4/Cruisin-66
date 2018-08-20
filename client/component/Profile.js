import React from "react";
import { NavigationEvents } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
  ScrollView
} from "react-native";

import SegmentedControlTab from "react-native-segmented-control-tab";
import { Right } from "native-base";

export default class Profile extends React.Component {
  static navigationOptions = {
    title: "Profile"
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      user: {}
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

  getUserItineraries() {
    let userId = this.state.user.userId;
    
    return fetch(`http://localhost:3000/stops?userId=${userId}`, {
      method: 'GET', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        return response.json();
      }
    })
    .then(data => {
      console.log('stops', data);
      this.setState({
        stops: data
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }


  componentDidMount() {
    // this.getUserItineraries();
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
            values={["Itineraries", "Stops", "Favorites"]}
            onPress={index => this.setState({ selected: index })}
          />

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    alignItems: "center",
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
    width: 120,
    height: 120,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#336699",
    borderRadius: 60,
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
    marginTop:'49%',
    right:0,
    marginLeft:'80%',
    position:'absolute'
  }
});
