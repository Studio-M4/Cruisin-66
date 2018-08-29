// This file is just for backup - Henry
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