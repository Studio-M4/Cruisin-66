import React from 'react';
import { StyleSheet, View,FlatList,Image, TextInput,
  ImageBackground, TouchableHighlight,ScrollView,Modal } from 'react-native';

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

export default class CommentItinerary extends React.Component {
    static navigationOptions = {
        title: 'Comments',
    };
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
    }; 
  }

  goDetails(){
    this.props.navigation.navigate('Profile');
  }

  render() {
    const { navigation } = this.props;
    console.log(navigation)
    return (  
      <Container>
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
          data={[
            {
              albumId: 1,
              id: 2,
              title: "reprehenderit est deserunt velit ipsam",
              url: "http://placehold.it/600/771796",
              thumbnailUrl: "http://placehold.it/150/771796"
            },
            {
              albumId: 1,
              id: 2,
              title: "reprehenderit est deserunt velit ipsam",
              url: "http://placehold.it/600/771796",
              thumbnailUrl: "http://placehold.it/150/771796"
            },{
              albumId: 1,
              id: 2,
              title: "reprehenderit est deserunt velit ipsam",
              url: "http://placehold.it/600/771796",
              thumbnailUrl: "http://placehold.it/150/771796"
            }
          ]}
          renderItem={({ item }) =>
          <TouchableHighlight>
    
          <ListItem thumbnail>
            <Left>
              <Thumbnail round  source={{ uri: item.thumbnailUrl }} />
            </Left>
            <Body>
              <Text>Julio</Text>
              <Text note numberOfLines={1}>{item.title}</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text like>  1h ago</Text>
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
         style={styles.inputStyle}
         placeholder="Be nice !!!"
       />
         <Button rounded light>
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
