import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TextInput,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
  Modal
} from "react-native";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title,
  Footer,
  Item,
  Input,
  FooterTab
} from "native-base";

import {NavigationEvents} from 'react-navigation';

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
      stops: []
    };
  }


  componentWillMount() {
    const { navigation } = this.props;
    // This is passed from Itinerary component.
    const itineraryId = navigation.getParam('itinerary').id;
    console.log(navigation);
    this.setState({ itineraryId });
  }

  componentDidMount() {
    this.getStopsById();
  }

  getStopsById = () => {
    let itineraryId = this.state.itineraryId;
    
    return fetch(`http://localhost:3000/stops?itineraryId=${itineraryId}`, {
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

  handleFocus() {
    this.getStopsById();
  }

  addItineraryToFavorites() {
    console.log('hi')
    
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <NavigationEvents
          onDidFocus = {payload => this.handleFocus()}
        />
        <Content>
          <CardItem cardBody>
            <ImageBackground
              source={{ uri: navigation.getParam('itinerary').photoUrl }}
              style={{ height: 200, width: null, flex: 1 }}
            >
            <Text style={styles.tourname}>{navigation.getParam('itinerary').name}</Text>
            </ImageBackground>
          </CardItem>
          <CardItem>
              <Body>
                  <Button transparent>
                  <Icon active name="heart" /> 
                </Button>
               <Text>Description: {navigation.getParam('itinerary').description} </Text>
               <Text>Number of Stops: {this.state.stops.length}</Text>
              </Body>
            </CardItem>
          <FlatList
            data = {this.state.stops}
            
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
                      <Thumbnail square style={{width: 75, height: 75}} source={{ uri: item.StopPhotos[0] ? item.StopPhotos[0].url : 'https://images-na.ssl-images-amazon.com/images/I/11qnZ2RCZML._SX331_BO1,204,203,200_.jpg' }} />
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
<<<<<<< HEAD

            <Button onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate("CommentItinerary", {
                    itinerary: navigation.getParam('itinerary')
                  });
                }}>
              <Icon name="ios-chatbubbles-outline" />
=======
            <Button>
              <Icon name='camera' 
                onPress={() => {
                this.addItineraryToFavorites()
              }}
             />
>>>>>>> set up favorite controller and routes
            </Button>
            <Button
              onPress={() => {
                /* 1. Navigate map and see the direction */
                this.props.navigation.navigate("CreateStop", {itineraryId: this.state.itineraryId})
              }}
            >
              <Icon name="add" />
            </Button>
            <Button
              onPress={() => {
                /* 1. Navigate map and see the direction */
                this.props.navigation.navigate("MapComponent");
              }}
            >
              <Icon name="navigate" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    flex: 1,
    marginLeft:'5%',
    justifyContent: 'center'
  },
  container2: {
    flexDirection:'row',
    flex: 1,
    justifyContent: 'flex-end'
  },
  tourname: {
    color: '#fff',
    textAlign: 'center',
    marginTop:90,
    fontSize:30,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  }
});


export default Stops;
