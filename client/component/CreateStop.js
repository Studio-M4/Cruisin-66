import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import ImagePicker from "react-native-image-picker";
import axios from "axios";

export default class CreateStop extends React.Component {
  static navigationOptions = {
    title: "CreateStop"
  };
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      itineraryId: null,
      address: null,
      description: null,
      name: null,
      imageSource: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    // This itineraryId is passed from Stops component.
    const itineraryId = navigation.getParam("itineraryId");
    this.setState({ itineraryId });
  }

  handleSubmit() {
    const postData = {
      stop: {
        name: this.state.name,
        description: this.state.description,
        address: this.state.address,
        userId: 8, // TODO: replace hardcoded
        StopPhotos: [{ url: '', description: '' }] // TODO: desciption
      },
      itineraryId: this.state.itineraryId
    };

    this.createStop(postData)
      .then(() => this.props.navigation.navigate('Stops', {itineraryId: this.state.itineraryId}))
      .catch(err => console.log(err));
  }

  handlePhotoUpload() {
    const options = {
      title: "Select Photo",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: "data:image/jpeg;base64," + response.data };
        this.setState({
          imageSource: source
        });
      }
    });
  }

  uploadToCloudinary(imageUri) {
    const url = "http://localhost:4000/cloudinary/photo/upload";
    return axios.post(url, { imageUri });
  }

  createStop(postData) {
    const url = "http://localhost:3000/stop";

    return this.uploadToCloudinary(this.state.imageSource.uri)
      .then(res => postData.stop.StopPhotos[0].url = res.data)
      .then(() => axios.post(url, postData));
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed="auto" // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
              const fullInfo = data.description;
              this.setState({
                name: getName(fullInfo),
                address: getAddress(fullInfo)
              });
            }}
            getDefaultValue={() => ""}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: "AIzaSyBHNIOJemEkEyO4gI_hask8BO6bJno9Q58",
              language: "en", // language of the results
              types: "" // default: 'geocode'
            }}
            styles={{
              textInputContainer: {
                width: "100%"
              },
              description: {
                fontWeight: "bold"
              },
              predefinedPlacesDescription: {
                color: "#1faadb"
              }
            }}
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: "distance",
              types: "food"
            }}
            filterReverseGeocodingByTypes={[
              "locality",
              "administrative_area_level_3"
            ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            debounce={600} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          />
          <Text style={styles.title}> Description: </Text>
          <TextInput
            editable={true}
            multiline={true}
            numberOfLines={6}
            maxLength={100}
            placeholder={"What so special here?"}
            style={styles.inputStyle}
            onChangeText={description => this.setState({ description })}
            value={this.state.description}
          />
          <Button title="Add Photo" onPress={this.handlePhotoUpload} />
          <Image style={styles.photo} source={this.state.imageSource} />
          <Button title="Create" onPress={this.handleSubmit} />
        </View>
      </ScrollView>
    );
  }
}

/**
 * Get location address from google api returned data.
 */
const getAddress = info => {
  return info
    .split(",")
    .slice(1)
    .join(",");
};

/**
 * Get location name from google api returned data.
 */
const getName = info => {
  return info.split(",")[0];
};

// Styles 😎
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    borderColor: "#000",
    height: "100%"
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 1
  },
  button: {
    alignItems: "center",
    backgroundColor: "#336699",
    marginTop: 20,
    padding: 10,
    width: 300
  },
  inputStyle: {
    height: 40,
    width: 300,
    borderColor: "#ccc",
    borderWidth: 0.4,
    paddingLeft: 10,
    marginTop: 10,
    backgroundColor: "white"
  },
  photo: {
    height: 200,
    width: 200
  }
});
