import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight,ScrollView } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'  
export default class Profile extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }
  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  }

  render() {
   
    return (
      <ScrollView>
        <View style={styles.container}>
            <View>
              <Image style={styles.imagesStyle} source={require('./imgs/icon.png')} />
          </View>
          <Text style={styles.title}> Sophia Lee </Text>

         <SegmentedControlTab tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
          selectedIndex={1}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
          allowFontScaling={false}
          values={['Itineraries', 'Stops', 'Favorites']}
          onPress= {index => this.setState({selected:index})}
        />
          
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
 
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: "#000",
    marginTop: 2,
    marginBottom: 2,
    backgroundColor:'#fff',
    width:'100%',
    padding:20
  },
  imagesStyle: {
    width: 120,
    height: 120,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#336699',
    borderRadius:60,
    padding:5
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#336699',
    marginTop: 20,
    padding: 10,
    width: 300,
  },
  tabsContainerStyle: {
    //custom styles
    margin:10,
    height:40
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
  }
});
