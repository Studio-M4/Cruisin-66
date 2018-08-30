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
import { toSortableStops, getStopsIdsOrder, updateStopsOrder, sortStopsByOrder } from '../utilities/sortableUtil';

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
      isOwner: true,
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
        // If the itinerary belongs to current user, then the user is owner.
        const isOwner = userId === itineraryOwnerId;
        this.setState({ itineraryId: itinerary.id, userId: userId, isOwner });
        this.getStopsById()
            .then((stops) => { 
              stops = sortStopsByOrder(stops);
              this.setState({ stops, sortableStops: toSortableStops(stops), stopsOrder: getStopsIdsOrder(stops) }
            )} 
        );
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
    const { isOwner, stops, sortableStops } = this.state;

    const renderAddIcon = () => {
      return isOwner ? (
        <Button onPress={() => navigation.navigate("CreateStop", { itineraryId: this.state.itineraryId, stopsAmount: stops.length })}>
          <Icon name="add" />
        </Button>
      ) : null;
    };

    const renderFavoriteIcon = () => {
      if (this.state.liked === false && this.state.isOwner === false) {
        return (
          <Button
            onPress={() => {
              this.addItineraryToFavorites()
            }}
          >
            <Ionicons name='ios-heart-empty' size={20}/>
          </Button>
        )
      } else if (this.state.liked === true && this.state.isOwner === false) {
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
            source={{ uri: navigation.getParam("itinerary").photoUrl || defaultImageUrl }}
            style={{ height: 160, width: null, flex: 1 }}
          >
            <Text style={styles.tourname}>
              {navigation.getParam("itinerary").name}
            </Text>
          </ImageBackground>
        </CardItem>
        <CardItem>
          <Body >
            <Text style={styles.description}>{navigation.getParam('itinerary').description} </Text>
            {/* <Text >Number of Stops: {stops.length}</Text> */}
          </Body>
        </CardItem>
        <SortableListView
          style={{ flex: 1 }}
          disableSorting={!this.state.isOwner}
          data={sortableStops}
          order={this.state.stopsOrder}
          onRowMoved={e => {
            const { stopsOrder, itineraryId } = this.state;
            stopsOrder.splice(e.to, 0, stopsOrder.splice(e.from, 1)[0]);
            this.setState({stopsOrder}, () => updateStopsOrder(stopsOrder, itineraryId)); 
          }}
          renderRow={stop => <StopItem stop={stop} navigation={this.props.navigation}/>}
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
              <Ionicons name="md-chatbubbles" size={20} color={'#939393'}/>
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
              <Ionicons name="md-map" size={20} color={'#939393'} />
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
  description: {
    textAlign:'left'
  },
  tourname: {
    color: '#fff',
    textAlign: 'center',
    marginTop:60,
    fontSize:28,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }
});

export default Stops;
