import React from "react";
import {
  TouchableHighlight, 
  Text,
  StyleSheet
} from "react-native";
import { Card, CardItem, Left, Thumbnail, Body } from "native-base";

class StopItem extends React.Component {
  render() {
    const { stop, sortHandlers, navigation } = this.props;

    return (
      <TouchableHighlight
        onPress={() => { navigation.navigate("Details", { item: stop }) }}
        underlayColor={"#eee"}
        style={{
          padding: 0.1,
          backgroundColor: "#F8F8F8",
          borderColor: "#eee"
        }}
        {...sortHandlers}
      >
        <Card>
          <CardItem>
            <Left>
              <Thumbnail
                square
                style={{ width: 75, height: 75 }}
                source={{
                  uri: stop.StopPhotos[0]
                    ? stop.StopPhotos[0].url
                    : "https://images-na.ssl-images-amazon.com/images/I/11qnZ2RCZML._SX331_BO1,204,203,200_.jpg"
                }}
              />
              <Body>
                <Text style={styles.stopname}>{stop.name}</Text>
                <Text note numberOfLines={1}>{stop.description}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  stopname: {
    fontSize:18,
    fontWeight: '600',
  }
});

export default StopItem;
