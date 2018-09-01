import React from 'react';
import { StyleSheet, View, FlatList,TextInput,
  ImageBackground, TouchableHighlight,AsyncStorage} from 'react-native';
import TimeAgo from 'react-native-timeago';
import {
  Container,
  Content,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  List,
  ListItem,
  Body,
  Right,
} from "native-base";
import { NavigationEvents } from "react-navigation";

const axios = require("axios");
export default class CommentItinerary extends React.Component {
    static navigationOptions = {
        title: 'Comments',
    };
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
        data: [],
        text:"",
        UserId: "",
    }; 
  }
  postComment(){
    const { navigation } = this.props;
    axios.post('http://localhost:3000/itinerarycomments', {
        "text":this.state.text,
        "UserId": this.state.UserId,
        "ItineraryId": navigation.getParam("itinerary").id,
        "rating": 1
    })
    .then(response => {
      console.log(response);
      this.setState({"text":""})
      this.getComment(); // call it again
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getComment(){
    const { navigation } = this.props;
    console.log(navigation)
    axios.get(`http://localhost:3000/itinerarycomments?itineraryId=${navigation.getParam("itinerary").id}
    `)
  .then( response=> {
    // handle success
    console.log("my responce ",response.data);
    this.setState({
      data: response.data
    })
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  }
 
  _retrieveData = async () => {
    this.getComment()
    try {
      const value = await AsyncStorage.getItem("userInfo");
      if (value !== null) {
        userObject = JSON.parse(value);
        this.setState({
          UserId: userObject.data.token.userId
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  goDetails(){
    this.props.navigation.navigate('Profile');
  }

  render() {
    const { navigation } = this.props;
    return (  
      <Container>
        <NavigationEvents onDidFocus={payload => this._retrieveData()} />

        <CardItem cardBody>
          <ImageBackground
            source={{ uri: navigation.getParam('itinerary').photoUrl }}
            style={{ height: 160, width: null, flex: 1 }}
          >
            <Text style={styles.tourname}>{navigation.getParam('itinerary').name}</Text>
          </ImageBackground>
        </CardItem>
      <Content>
        <List>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
          <TouchableHighlight>
            <ListItem thumbnail>
              <Left>
                <Thumbnail round  source={{ uri: item.User.photoAvatar }} /> 
              </Left>
              <Body>
                <Text>{item.User.firstName}</Text>
                <Text note>{item.text}</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text like>  <TimeAgo time={item.updatedAt} hideAgo={true} /></Text>
                </Button>
              </Right>
            </ListItem>
          </TouchableHighlight>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        </List>
        <View style={styles.container}>
          <TextInput
          onChangeText={(text) => this.setState({"text":text})}
          value={this.state.text}
          style={styles.inputStyle}
          placeholder="Be nice !!!"
          />
          <Button rounded light onPress={() => {
            this.postComment()
          }}>
            <Text>Post</Text>
          </Button>
        </View>
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
    backgroundColor:'#fff',
    margin:4,
    borderRadius: 5
  },
  tourname: {
    color: '#fff',
    textAlign: 'center',
    marginTop:60,
    fontSize:30,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  container2: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor:'#fff',
    margin:4,
    borderRadius: 5
  },
  title: {
    fontSize: 14,
    color: "#777",
    marginTop: 7,
    padding:9,
    borderRadius:25,
    marginLeft: 4,
    width: "80%",
    height:30
  },
  imagesStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 3,
  }, 
  imagesStyleModal: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
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
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 0.4,
    paddingLeft: 10,
    marginTop: 10,
    marginLeft: 4,
    bottom:5,
    borderRadius:20
  }
});
