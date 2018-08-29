import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";


import StopItem from './StopItem';
import SortableListView from 'react-native-sortable-listview';

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

import axios from "axios";
import { toSortableStops, getStopsOrder, updateStopsOrder } from '../utilities/sortableUtil';

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
      sortableStops: {}, // this is for srotable list
      stopsOrder: [], // this is for srotable list
      liked: false,
      showAddIcon: true,
      userId: null
    };

    this.addItineraryToFavorites = this.addItineraryToFavorites.bind(this);
    this.deleteItineraryFromFavorites = this.deleteItineraryFromFavorites.bind(this);
  }

  getStopsById = () => {
    const itineraryId = this.state.itineraryId;
    const url = `http://localhost:3000/stops?itineraryId=${itineraryId}`;
    return axios.get(url).then((res) => res.data);
  };

  handleFocus() {
    const { navigation } = this.props;
    // This is passed from Itinerary component.
    const itinerary = navigation.getParam("itinerary");
    const itineraryOwnerId = itinerary.UserId;

    AsyncStorage.getItem("userInfo")
      .then(storageStr => {
        const userId = JSON.parse(storageStr).data.token.userId;
        // If the itinerary belongs to current user, then he can add stops to it.
        const showAddIcon = userId === itineraryOwnerId;
        this.setState({ itineraryId: itinerary.id, userId: userId, showAddIcon });
        this.getStopsById().then(
          (stops) => this.setState(
            { stops, sortableStops: toSortableStops(stops), stopsOrder: getStopsOrder(stops) }, () => console.log(this.state)));
        this.checkIfFavorited(); 
      })
      .catch(err => console.log(err));
  }

  addItineraryToFavorites() {
    let userId = this.state.userId
    let itineraryId = this.state.itineraryId

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

  checkIfFavorited() {
    let userId = this.state.userId
    let itineraryId = this.state.itineraryId

    console.log('USER_ID line 169', userId)
    console.log('ITINERARYID', itineraryId)

    return fetch(`http://localhost:3000/heart?userId=${userId}&itineraryId=${itineraryId}`, {
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
        console.log("line 188", data);
        if (data === null) {
          this.setState({liked: false})
        } else {
          this.setState({liked: true})
        }
      })
      .catch(error => {
        console.log(error);
      });
  };




  render() {
    const defaultImageUrl = 'https://www.telegraph.co.uk/content/dam/Travel/2018/April/road-trip-GettyImages-655931324.jpg?imwidth=1400'
    const { navigation } = this.props;
    const { showAddIcon, liked , itineraryId, stops, sortableStops } = this.state;

    const renderAddIcon = () => {
      return showAddIcon ? (
        <Button onPress={() => navigation.navigate("CreateStop", { itineraryId })}>
          <Icon name="add" />
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
        <CardItem cardBody>
          <ImageBackground
            source={{ uri: navigation.getParam("itinerary").photoUrl || defautImageUrl }}
            style={{ height: 125, width: null, flex: 1 }}
          >
            <Text style={styles.tourname}>
              {navigation.getParam("itinerary").name}
            </Text>
          </ImageBackground>
        </CardItem>
        <CardItem>
          <Body>
            <Text>Description: {navigation.getParam('itinerary').description} </Text>
            <Text>Number of Stops: {stops.length}</Text>
          </Body>
        </CardItem>
        <SortableListView
          style={{ flex: 1 }}
          data={sortableStops}
          order={this.state.stopsOrder}
          onRowMoved={e => {
            const { stopsOrder } = this.state;
            stopsOrder.splice(e.to, 0, stopsOrder.splice(e.from, 1)[0]);
            this.setState({stopsOrder}, () => updateStopsOrder(stopsOrder)); 
          }}
          renderRow={stop => <StopItem stop={stop} />}
        />
        <Footer>
          <FooterTab>
            <Button
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate("CommentItinerary", {
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
                navigation.navigate("MapComponent",{
                    stop: stops
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
