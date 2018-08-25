

import React from 'react';
import { StyleSheet, View,FlatList,Image, TextInput,
  ImageBackground, TouchableHighlight,AsyncStorage,ScrollView,Modal } from 'react-native';
  import TimeAgo from 'react-native-timeago';
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
  List,
  ListItem,
  Body,
  Right,
  Title,
  Item,Input
} from "native-base";
import { NavigationEvents } from "react-navigation";

const axios = require("axios");
export default class CommentStop extends React.Component {
    static navigationOptions = {
        title: 'Comments stops',
    };
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
        data: [],
        text:"",
        UserId: "",
        stopId: null, 
        modalVisible: false
    }; 
  }
 
 
  postComment(){
    axios.post('http://localhost:3000/stopcomments', {
        "text":this.state.text,
        "UserId": this.state.UserId,
        "StopId": this.props.nav.state.params.item.id,
        "rating": 1
    })
    .then(response => {
      console.log(response);
      this.setState({"text":""})
      this.getComment();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getComment(){
    axios.get(`http://localhost:3000/stopcomments?stopId=${this.props.nav.state.params.item.id}`
    )
  .then( response=> {
    // handle success
    this.setState({
      data: response.data
    })
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  }
  componentWillMount(){
    this.getComment();
    this._retrieveData();
  }

  _retrieveData = async () => {
    this.setState({
        stopId : this.props.nav.state.params.item.id
    })

    try {
      const value = await AsyncStorage.getItem("userInfo");
      if (value !== null) {
        // We have data!!
        userObject = JSON.parse(value);
        this.setState({
          UserId: userObject.data.token.userId
        });
        //console.log("dass",userObject.data.token.userId)
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
    }

  };
  render() {
    return (  
      <Container>
      <NavigationEvents onDidFocus={payload => this._retrieveData()} />

      <Content>
        <List>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
          <TouchableHighlight>
    
          <ListItem thumbnail>
            <Left>
              <Thumbnail round  source={{ uri: item.User.password }} />
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
