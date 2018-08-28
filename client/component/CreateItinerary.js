import React from 'react';
import { NavigationEvents } from "react-navigation";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ScrollView,
  Button,
  ImageBackground,
} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import { openImagePicker, uploadToCloudinary } from "../utilities/photoUtil";
import { Container, Content } from "native-base";
import axios from 'axios';

export default class CreateItinerary extends React.Component {
  static navigationOptions = {
    title: 'CreateItinerary'
  };

  constructor(props) {
    super(props);
    this.state = {
      categoryId: null,
      categories: [],
      name: null,
      description: null,
      photoUrl: null,
      user: {}
    };

    this.getCategories = this.getCategories.bind(this);
    this.createItinerary = this.createItinerary.bind(this);
    this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  handleSubmit = () => {
    const { navigation } = this.props;
    this.createItinerary()
        .then((itinerary) => navigation.navigate("Stops", {itinerary}))
        .catch((err) => console.log(err));
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("userInfo");
      if (value !== null) {
        // We have data!!
        userObject = JSON.parse(value);
        this.setState({
          user: userObject.data.token
        });
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
    }
  };

  createItinerary() {
    console.log(this.state);
    const url = 'http://localhost:3000/itinerary';
    const { name, description, user, categoryId, photoUrl } = this.state;
    const postData = {
      name: name,
      description: description,
      UserId: user.userId,
      CategoryId: categoryId,
      photoUrl: photoUrl,
    };
    console.log('postData ', postData);
    return axios.post(url, postData)
                .then((res) => res.data); // res.data is the created Itinerary object.
  };

  getCategories() {
    const url = 'http://localhost:3000/categories';
    axios.get(url)
         .then((res) => {
           const dropdownOptions = res.data.map((category) => ({label: category.name, value: category.id}));
           this.setState({categories: dropdownOptions});
         })
         .catch((err) => console.log(err));
  }

  handlePhotoUpload() {
    openImagePicker(null, (response) => {
      console.log('imagePickerResponse: ', response);
      const source = { uri: "data:image/jpeg;base64," + response.data };

    uploadToCloudinary(source.uri)
      .then((url) => this.setState({photoUrl: url}))
      .catch((err) => console.log(err));
    });
  }

  render() {
    const defautImageUrl = 'https://www.telegraph.co.uk/content/dam/Travel/2018/April/road-trip-GettyImages-655931324.jpg?imwidth=1400'
    return (
      <Container>
        <Content>
        <NavigationEvents onDidFocus={payload => this._retrieveData()} />
        <ImageBackground
          source={{ uri: this.state.photoUrl || defautImageUrl }}
          style={{ height: 200, width: null, flex: 1 }}
        >
          <Text style={styles.tourname}>
            {this.state.name}
          </Text>
        </ImageBackground>
        <View style={styles.container}>
          <TextInput
            name="name"
            style={styles.inputStyle}
            placeholder="Name"
            onChangeText={(name) => this.setState({name})}
            value={this.state.firstName}
          />
          <TextInput
            name="description"
            style={styles.inputStyle}
            placeholder="Description"
            onChangeText={(description) =>  this.setState({description})}
            value={this.state.firstName}
          />
          <PickerSelect
            placeholder={{
                label: 'Select a category...',
                value: null,
            }}
            items={this.state.categories}
            onValueChange={(value) => {
                this.setState({
                  categoryId: value,
                });
            }}
            value={this.state.categoryId}
            style={{...pickerSelectStyles}}
          />
          <Button title='Upload Photo' onPress={this.handlePhotoUpload} />
          <Button title='Create' onPress={this.handleSubmit.bind(this)} />
        </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 60
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#336699',
    marginTop: 20,
    padding: 10,
    width: 300
  },
  inputStyle: {
    fontSize: 16,
    height: 45,
    width: 300,
    borderColor: "#ccc",
    borderWidth: 0.4,
    borderRadius: 4,
    paddingLeft: 10,
    marginTop: 10
  },
  tourname : {
    color: "#fff",
    textAlign: "center",
    marginTop: 90,
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 45,
    width: 300,
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    marginTop: 10,
    right: -17,
  },
  icon: {
    width: 0,
    height: 0,
    top: 28,
    right: 50,
  }
});

