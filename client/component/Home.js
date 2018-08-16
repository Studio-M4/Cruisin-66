// import React from 'react';
// import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight,ScrollView } from 'react-native';

//  //for table
// import { createBottomTabNavigator } from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Profil from './Profil';
// import Favorites from './Favorites';
// import Create from './Create';

// export default class Home extends React.Component {
//     static navigationOptions = {
//         title: 'Home',
//     };

//     render() {
//         return (
//             <Tabs />
//         );
//     }
// }

// const Tabs = createBottomTabNavigator({
//     Favorites: Favorites,
//     Create: Create,
//     Profil: Profil
//   },
//     {
//       navigationOptions: ({ navigation }) => ({
//         tabBarIcon: ({ focused, tintColor }) => {
//           const { routeName } = navigation.state;
//           let iconName;
//           if (routeName === 'Profil') {
//             iconName = `ios-contact${focused ? '' : '-outline'}`;
//           } else if (routeName === 'Favorites') {
//             iconName = `ios-folder${focused ? '' : '-outline'}`;
//           }
//           else if (routeName === 'Create') {
//             iconName = `ios-add-circle${focused ? '' : '-outline'}`;
//           }
  
  
//           // You can return any component that you like here! We usually use an
//           // icon component from react-native-vector-icons
//           return <Ionicons name={iconName} size={25} color={tintColor} />;
//         },
//       }),
//       tabBarOptions: {
//         activeTintColor: 'tomato',
//         inactiveTintColor: 'gray',
//       },
//     }
//   );
  