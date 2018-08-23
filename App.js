
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableHighlight, 
  ScrollView,
  Platform
} from 'react-native';

import { createBottomTabNavigator,createTabNavigator, createSwitchNavigator,createStackNavigator } from "react-navigation";
//import views 

import React, {Component} from 'react';
import Login from './client/component/Login';
import Signup from './client/component/Signup';
import Details from './client/component/Details';
import Favorites from './client/component/Favorites';
import Itinerary from "./client/component/Itinerary";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "./client/component/Profile";
import CreateItinerary from "./client/component/CreateItinerary";
import CreateStop from './client/component/CreateStop';
import Stops from "./client/component/Stops";
import CommentStop from "./client/component/CommentStop";
import MapComponent from "./client/component/MapComponent";
import CommentItinerary from "./client/component/CommentItinerary";

const TabsIcons = (isFocused) => (
  {
    Profile: `ios-person${isFocused ? "" : ""}`,
    Favorites: `ios-folder${isFocused ? "" : ""}`,
    CreateItinerary: `ios-add-circle${isFocused ? "" : ""}`,
    CreateStop: `ios-add-circle${isFocused ? "" : ""}`,
    Itinerary: `ios-menu${isFocused ? "" : ""}`,
  }
);
// can't swipe createBottomTabNavigator 
// createTabNavigator depreciate but can swip :)
const Tabs = createBottomTabNavigator({
    Itinerary: Itinerary,
    Favorites: Favorites,
    CreateItinerary: CreateItinerary,
    Profile: Profile
    },
    {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        const iconName = TabsIcons(focused)[routeName];
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={20} color={tintColor} />;
      }
    }),
   
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
       
    },
    
   // tabBarComponent: () => null,
    swipeEnabled: true,
    
  }
);
// Define navigator
const AppStack = createStackNavigator({ 
  Home: Tabs, // Home 's a key not a component 
  Details: Details,
  Favorites:Favorites,
  Itinerary:Itinerary,
  Stops:Stops,
  Profile:Profile,
  CommentStop:CommentStop,
  MapComponent: MapComponent,
  CreateStop:CreateStop,
  CommentItinerary:CommentItinerary
});
// Auth navigator
const AuthStack = createStackNavigator(
  { 
    Login: Login,
    Signup: Signup
  },
  {
    initialRouteName: 'Login'
  }
);

// use switch navigator to fixe the back button in the login
const RootStack = createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth'
  }
);

class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}

export default App

