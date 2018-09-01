import React from "react";
import {
  StyleSheet,
  Text,
} from "react-native";

import {
  Container,
} from "native-base";

import SegmentedControlTab from "react-native-segmented-control-tab";

import ImageGallery from './ImageGallery.js';
import CommentStop from "./CommentStop.js";
import Directions from './Directions.js'

export default class Details extends React.Component {
  static navigationOptions = {
    title: "Details"
  };
  constructor(props) {
    super(props);
    this.state = {
      stopId: null, 
      modalVisible: false,
      selectedIndex: 0,
      data:[],
      UserId:""
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
        <Text style={styles.description}>{item.description}</Text>
        <Directions props={item}></Directions>
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
            values={["Gallery", "Comments"]}
            onPress={index => this.setState({ selected: index })}
          />
          {
             this.state.selectedIndex === 0 ?  
             <ImageGallery photoUrls={item.StopPhotos.map((photo) => photo.url)}></ImageGallery>:
             <CommentStop nav = {this.props.navigation} /> 
          }  
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
  imagesStyle: {
    width: "100%",
    height: 140,
    backgroundColor: "#fff"
  },
  inputStyle: {
    height: 40,
    width: "80%",
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
  description: {
    marginTop: 3,
    marginLeft: 10,
    marginRight: 5,
    fontSize: 16
  },
  tabsContainerStyle: {
    marginTop: 5
  }
});