import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
  FlatList,
} from "react-native";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Body
} from "native-base";
import SegmentedControlTab from "react-native-segmented-control-tab";

// import MapView from "react-native-maps";
// import { Rating } from "react-native-elements";
import { Button } from "native-base";

import ImageGallery from './ImageGallery.js';

import CommentStop from "./CommentStop.js";

import Directions from './Directions.js';


export default class Details extends React.Component {
  static navigationOptions = {
    title: "Details"
  };
  constructor(props) {
    super(props);
    this.state = {
      stopId: null, 
      modalVisible: false,
      selectedIndex: 0
    };
  }
  handleIndexChange = index => {
    this.setState({
      ...this.state,
      selectedIndex: index
    });
  };

  render() {
    // retrieve data
    const { navigation } = this.props; // destructor
    const item = navigation.getParam("item", {});

    return (
      <Container>
        {/* <Image
          source={{ uri: 'https://media-cdn.tripadvisor.com/media/photo-s/01/7c/15/9f/mc-way-falls.jpg' }}
          style={{ height: 200, width: 100 + "%", flex: 1 }}
        /> */}
        
        
        <Text 
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#000",
            marginTop: 4,
            marginLeft: 4,
          }}> 
          {item.name}
        </Text>
        <Button transparent textStyle={{color: '#87838B'}} >
          <Icon name="heart" />
          <Text>1,926</Text>
        </Button>

        {/* <Directions></Directions> */}

        <ScrollView>
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
          {
             this.state.selectedIndex === 0 ?  
             <ImageGallery></ImageGallery>:
             <CommentStop /> 
          }  
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: "30%",
    backgroundColor: "#fff"
  },
  title2: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 2
  },
  imagesStyle: {
    width: "100%",
    height: 140,
    backgroundColor: "#fff"
  },
  inputStyle: {
    height: 40,
    width: "90%",
    borderColor: "#ccc",
    borderWidth: 0.4,
    paddingLeft: 10,
    marginTop: 10,
    bottom: 0
  },
  container2: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 5
  },
  title: {
    fontSize: 14,
    color: "#777",
    marginTop: 7,
    padding: 9,
    borderRadius: 25,
    marginLeft: 4,
    width: "80%",
    height: 30
  },
  imagesStyle2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 3
  },
  textDesign: {
    width: "80%",
    color: "#333",
    marginBottom: 20
  },
  closeIt: {
    padding: 10,
    marginLeft: "80%",
    marginTop: 5
  },
  inputStyle: {
    height: 40,
    width: '98%',
    borderColor: '#ccc',
    borderWidth: 0.4,
    paddingLeft: 10,
    marginTop: 10,
    marginLeft: 4,
    bottom:5,
    borderRadius:20
  }
});
