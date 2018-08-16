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

export default class Itinerary extends React.Component {
  static navigationOptions = {
    title: "Itinerary",
    headerStyle: {
      backgroundColor: '#f4511e'
    }
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>

        <Content>
          <FlatList
            data={[
              {
                id: 1,
                name: "Sophia",
                notes: 'scrum master Lee',
                itinerary: 'Pacific Coast Highway',
                url: "https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1440464211%2FPCH0815-brixy-bridge.jpg%3Fitok%3DtDtK_XRW&w=700&q=85",
                thumbnailUrl: "https://avatars0.githubusercontent.com/u/25995901?s=460&v=4"
              },
              {
                id: 2,
                name: "Henry",
                notes: 'from the land of pineapple cakes',
                itinerary: 'Taiwan 101',
                url: "https://www.worldatlas.com/r/w728-h425-c728x425/upload/3c/e1/38/shutterstock-425692558.jpg",
                thumbnailUrl: "https://avatars1.githubusercontent.com/u/37286505?s=460&v=4"
              },
              {
                id: 3,
                name: "Ningyi",
                notes: 'master pepper',
                itinerary: 'Bay Area Tour',
                url: "https://media-cdn.tripadvisor.com/media/photo-s/06/b2/0f/a6/golden-gate-bridge.jpg",
                thumbnailUrl: "https://avatars0.githubusercontent.com/u/4583739?s=460&v=4"
              },
              {
                id: 4,
                name: "Julio",
                notes: 'likes to wear beanies',
                itinerary: 'super cool tour name',
                url: "http://www.explorehaiti-dmc.com/sites/default/files/styles/large/public/Haiti-0281-res.jpg?itok=dH7QjMAs",
                thumbnailUrl: "https://avatars3.githubusercontent.com/u/10291526?s=460&v=4"
              },
              {
                id: 5,
                name: "Sophia",
                notes: 'scrum master Lee',
                itinerary: "NYC Pizza Time",
                url: "https://amp.businessinsider.com/images/5ad8ae04cd862425008b4898-750-563.jpg",
                thumbnailUrl: "https://avatars0.githubusercontent.com/u/25995901?s=460&v=4"
              },
              {
                id: 6,
                name: "Ningyi",
                notes: 'master pepper',
                itinerary: 'Ultimate Yellowstone',
                url: "https://www.theepochtimes.com/assets/uploads/2017/12/14/AA-1280px-Grand_Prismatic_Spring-1-700x420.jpg",
                thumbnailUrl: "https://avatars0.githubusercontent.com/u/4583739?s=460&v=4"
              },

            ]}
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
                  <CardItem>
                    <Left>
                      <Thumbnail source={{ uri: item.thumbnailUrl }} />
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>{item.notes}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <ImageBackground
                      source={{ uri: item.url }}
                      style={{ height: 200, width: null, flex: 1 }}
                    >
                     <Text style={styles.tourname}>{item.itinerary}</Text>
                    </ImageBackground>
                  </CardItem>
                  {/* <CardItem>
                    <Left>
                      <Button transparent>
                        <Icon active name="thumbs-up" />
                        <Text>12 Likes</Text>
                      </Button>
                    </Left>
                    <Body>
                      <Button transparent>
                        <Icon active name="chatbubbles" />
                        <Text
                          onPress={() => {
                             1. Navigate to the Details route with params 
                            this.props.navigation.navigate("CommentStop", {
                              itinerary: item
                            });
                          }}>4 Comments</Text>
                      </Button>
                    </Body>
                    <Right>
                      <Text>11h ago</Text>
                    </Right>
                  </CardItem> */}
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
    textShadowRadius: 10
  }
});
