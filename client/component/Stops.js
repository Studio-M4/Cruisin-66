import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";


import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TextInput,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
  Modal,
  AsyncStorage
} from "react-native";

import {
  Container,
  Header,
  Icon,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  Title,
  Footer,
  Item,
  Input,
  FooterTab
} from "native-base";

import { NavigationEvents } from "react-navigation";

const axios = require("axios");

class Stops extends React.Component {
  static navigationOptions = {
    title: "Stops",

    headerRight: (
      <Button
        onPress={() => alert("This is a button!")}
        title="add Stop"
        color="#000"
      />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      itineraryId: null,
      modalVisible: false,
      stops: [],
      liked: false,
      showAddIcon: true,
      userId: null
    };
  }

  componentWillMount() {
    const { navigation } = this.props;
    // This is passed from Itinerary component.
    const itinerary = navigation.getParam("itinerary");
    const itineraryOwnerId = itinerary.UserId;

    AsyncStorage.getItem("userInfo")
      .then(storageStr => {
        const userId = JSON.parse(storageStr).data.token.userId;
        // If the itinerary belongs to current user, then he can add stops to it.
        const showAddIcon = userId === itineraryOwnerId;
        this.setState({ itineraryId: itinerary.id, userId: userId, showAddIcon }),
          console.log(this.state);
        this.getStopsById();  
      })
      .catch(err => console.log(err));
  }

  // componentDidMount() {
  //   this.getStopsById();
  // }

  getStopsById = () => {
    let itineraryId = this.state.itineraryId;

    return fetch(`http://localhost:3000/stops?itineraryId=${itineraryId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.error) {
          console.log(response.error);
        } else {
          return response.json();
        }
      })
      .then(data => {
        console.log("stops", data);
        this.setState({
          stops: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFocus() {
    this.getStopsById();
  }

  addItineraryToFavorites() {
    let userId = this.state.userId
    let itineraryId = this.state.itineraryId

    console.log('USER_ID', userId)
    console.log('ITINERARYID', itineraryId)

    axios
    .post('http://localhost:3000/favorite', {
      userId: userId,
      itineraryId: itineraryId
    })
    .then((response) => {
      // console.log(response.data);
      this.setState({
        liked: true
      })
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  deleteItineraryFromFavorites() {
    let userId = this.state.userId
    let itineraryId = this.state.itineraryId

    console.log('USER_ID line 150', userId)
    console.log('ITINERARYID', itineraryId)

    axios
    .delete('http://localhost:3000/favorite', {params: 
      {
        userId: userId,
        itineraryId: itineraryId
      }
    })
    .then((response) => {
      // console.log(response.data);
      this.setState({
        liked: false
      })
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }



  render() {
    const defaultImageUrl = 'https://www.telegraph.co.uk/content/dam/Travel/2018/April/road-trip-GettyImages-655931324.jpg?imwidth=1400'
    const { navigation } = this.props;
    
    const renderAddIcon = () => {
      return this.state.showAddIcon ? (
        <Button
          onPress={() => {
            /* 1. Navigate map and see the direction */
            navigation.navigate("CreateStop", {
              itineraryId: this.state.itineraryId
            });
          }}
        >
          <Ionicons name="ios-add" size={20}/>
        </Button>
      ) : null;
    };

    const renderFavoriteIcon = () => {
      if (this.state.liked === false && this.state.showAddIcon === false) {
        return (
          <Button
            onPress={() => {
              this.addItineraryToFavorites()
            }}
          >
            <Ionicons name='ios-heart-empty' size={20}/>
          </Button>
        )
      } else if (this.state.liked === true && this.state.showAddIcon === false) {
        return (
          <Button
            onPress={() => {
              this.deleteItineraryFromFavorites()
            }}
          >
            <Ionicons name='ios-heart' size={20}/>
          </Button>
        )
      }
       
    }

    return (
      <Container>
        <NavigationEvents onDidFocus={payload => this.handleFocus()} />
        <Content>
          <CardItem cardBody>
            <ImageBackground
              source={{ uri: navigation.getParam("itinerary").photoUrl || defaultImageUrl }}
              style={{ height: 200, width: null, flex: 1 }}
            >
              <Text style={styles.tourname}>
                {navigation.getParam("itinerary").name}
              </Text>
            </ImageBackground>
          </CardItem>
          <CardItem>
              <Body>
               <Text>Description: {navigation.getParam('itinerary').description} </Text>
               <Text>Number of Stops: {this.state.stops.length}</Text>
              </Body>
            </CardItem>
          <FlatList
            data={this.state.stops}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate("Details", {
                    item: item
                  });
                }}
              >
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail
                        square
                        style={{ width: 75, height: 75 }}
                        source={{
                          uri: item.StopPhotos[0]
                            ? item.StopPhotos[0].url
                            : "https://images-na.ssl-images-amazon.com/images/I/11qnZ2RCZML._SX331_BO1,204,203,200_.jpg"
                        }}
                      />
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>{item.description}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate("CommentItinerary", {
                  itinerary: navigation.getParam("itinerary")
                });
              }}
            >
              <Ionicons name="md-chatbubbles" size={20}/>
            </Button>
            {renderAddIcon()}
            {renderFavoriteIcon()}
            <Button
              onPress={() => {
                /* 1. Navigate map and see the direction */
                this.props.navigation.navigate("MapComponent",{
                    stop: this.state.stops
                });
              }}
            >
              <Ionicons name="md-map" size={20} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    marginLeft: "5%",
    justifyContent: "center" 
  },
  container2: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end"
  },
  tourname: {
    color: "#fff",
    textAlign: "center",
    marginTop: 90,
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});

export default Stops;
