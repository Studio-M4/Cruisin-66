import React from 'react';
import { StyleSheet, View,FlatList, Image, TextInput,
   TouchableHighlight,ScrollView,Modal } from 'react-native';

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

export default class Favorites extends React.Component {
    static navigationOptions = {
        title: 'Favorites',
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
    return (
      <Container>
      <Content>
        <FlatList
          data={[
            {
              albumId: 1,
              id: 1,
              title: "accusamus beatae ad facilis cum similique qui sunt",
              url: "http://placehold.it/600/92c952",
              thumbnailUrl: "http://placehold.it/150/92c952"
            },
            {
              albumId: 1,
              id: 2,
              title: "reprehenderit est deserunt velit ipsam",
              url: "http://placehold.it/600/771796",
              thumbnailUrl: "http://placehold.it/150/771796"
            },
            
            {
              albumId: 1,
              id: 6,
              title: "accusamus ea aliquid et amet sequi nemo",
              url: "http://placehold.it/600/56a8c2",
              thumbnailUrl: "http://placehold.it/150/56a8c2"
            }
          ]}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate("Stops", {
                  id: item
                });
              }}
            >
              <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: item.thumbnailUrl }} />
                    <Body>
                      <Text>Julio </Text>
                      <Text note>{item.title}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image
                    source={{ uri: item.thumbnailUrl }}
                    style={{ height: 200, width: null, flex: 1 }}
                  />
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active name="thumbs-up" />
                      <Text>12 Likes</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles" />
                      <Text>4 Comments</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>11h ago</Text>
                  </Right>
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
    margin:2,
    borderRadius: 5
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
    marginBottom: 20,
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
  }
});
