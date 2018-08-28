import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Modal,
  FlatList
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
  Item,Input
} from "native-base";

import { NavigationEvents } from "react-navigation";
import axios from "axios";

export default class Itinerary extends React.Component {
  static navigationOptions = {
    title: "Itinerary",
    headerStyle: {
      backgroundColor: '#f4511e'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      itineraries: [],
      query: '',
      allItineraries: [],
    }

    this.getItineraries = this.getItineraries.bind(this);
  }

  getItineraries() {
    axios
      .get('http://localhost:3000/itineraries')
      .then((response) => {
        // console.log(response.data);
        this.setState({
          itineraries: response.data,
          allItineraries: response.data
        })
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  componentDidMount() {
    this.getItineraries();
  }

  handleSearch = (text) => {
    console.log('text', text)
    this.setState({query:text})

    const newData = this.state.allItineraries.filter((item)=> {
      if (item.name.includes(text) || item.description.includes(text)) {
        return true;
      }
    })

    this.setState({itineraries:newData})
  }

  render() {
    const defaultImageUrl = 'https://www.telegraph.co.uk/content/dam/Travel/2018/April/road-trip-GettyImages-655931324.jpg?imwidth=1400'
    return (
      <Container>
        <NavigationEvents onDidFocus={this.getItineraries}></NavigationEvents>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={this.handleSearch} />
          </Item>
          <Button transparent>
            <Text handleTextChange>Search</Text>
          </Button>
        </Header>

        <Content>
          <FlatList

            data = {this.state.itineraries}

            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate("Stops", {
                    itinerary: item
                  });
                }}
              >
                <Card>
                  <CardItem cardBody>
                    <ImageBackground
                      source={{ uri: item.photoUrl || defaultImageUrl}}
                      style={{ height: 200, width: null, flex: 1, opacity: .95 }}
                    >
                     <Text style={styles.tourname}>{item.name}</Text>
                    </ImageBackground>
                  </CardItem>
                </Card>
              </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    margin: 4,
    borderRadius: 5
  },
  container2: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: 4,
    borderRadius: 5,
    backgroundColor: "#eee"
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginTop: 25,
    marginLeft: 4,
    width: "75%"
  },
  imagesStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20
  },
  imagesStyleModal: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20
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
  tourname: {
    color: '#fff',
    textAlign: 'center',
    marginTop:90,
    fontSize:30,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 12
  }
});
