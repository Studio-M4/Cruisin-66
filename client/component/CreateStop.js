import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Button,
  ImageBackground,
  FlatList
} from "react-native";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import ImagePicker from "react-native-image-picker";

import axios from "axios";

export default class CreateStop extends React.Component {
  static navigationOptions = {
    title: ""
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
      longitude: null,
      latitude: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
    this.handleAutoCompletePress = this.handleAutoCompletePress.bind(this);
    this.fetchAndSaveAllGooglePhotos = this.fetchAndSaveAllGooglePhotos.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    // This itineraryId is passed from Stops component.
    const itineraryId = navigation.getParam("itineraryId");
    this.setState({ itineraryId });
  }

  handleSubmit() {
    console.log(this.state);
    const { itineraryId, name, description, address, photos, latitude, longitude } = this.state;
    const postData = {
      stop: {
        name: name,
        description: description,
        address: address,
        userId: 8, // TODO: replace hardcoded
        StopPhotos: photos.map((url) => ({ url: url, description: "" })), // TODO: desciption
        latitude: latitude,
        longitude: longitude
      },
      itineraryId: itineraryId,
    };

    // this.createStop(postData)
    //   .then(() =>
    //     this.props.navigation.navigate("Stops", {
    //       itineraryId: this.state.itineraryId
    //     })
    //   )
    //   .catch(err => console.log(err));
  }

  handleAutoCompletePress(data, details) {
    console.log(data, details);
    const fullInfo = data.description;
    const { lat, lng } = details.geometry.location;
    this.setState({name: getName(fullInfo), address: getAddress(fullInfo) ,latitude: lat, longitude: lng});

    const { photos } = details;
    const photorefs = photos ? photos.slice(0, 4).map(photo => photo.photo_reference) : [];
    this.fetchAndSaveAllGooglePhotos(photorefs)
        .then((imageUrls) => this.setState({photos: imageUrls}));

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
        const { photos } = this.state;
        const source = { uri: "data:image/jpeg;base64," + response.data };

        this.uploadToCloudinary(source.uri)
            .then((url) => this.setState({photos: photos.concat(url)}))
            .catch((err) => console.log(err));
      }
    });
  }

  /**
   * Return a cloudinary photo url.
   */
  uploadToCloudinary(imageUri) {
    const url = "http://localhost:4000/cloudinary/photo/upload";
    return axios.post(url, { imageUri })
                .then((res) => res.data);
  }

  /**
   * Get photos from google place photo api and then save them into cloudinary.
   * @param {array} photosReferences - An array of photoreferences that can be used for fetching google place photos
   */
  fetchAndSaveAllGooglePhotos(photosReferences = []) {
    if (photosReferences.length == 0) {
      return;
    }
    const promises = photosReferences.map(ref =>
      this.fetchAndSaveOneGooglePhoto(ref)
    );
    return axios
      .all(promises)
      .then(axios.spread((...responses) => responses.map((res) => res.data)));
  }

  /**
   * Get one photo from google place photo api and then save it into cloudinary.
   * @param {array} photosReferences - An photoreference sent back by google map autocomplete.
   *                                   It can be used for fetching a google place photo.
   */
  fetchAndSaveOneGooglePhoto(photoreference) {
    const url = "http://localhost:4000/google/photo";
    console.log(photoreference);
    return axios.post(url, { photoreference });
  }

  /**
   * Get photos from google place photo api and then save them into cloudinary.
   * @param {array} photosReferences - An array of photoreferences that can be used for fetching google place photos
   */
  fetchAndSaveAllGooglePhotos(photosReferences = []) {
    if (photosReferences.length == 0) {
      return;
    }
    const promises = photosReferences.map(ref =>
      this.fetchAndSaveOneGooglePhoto(ref)
    );
    return axios
      .all(promises)
      .then(axios.spread((...responses) => responses.map((res) => res.data)));
  }

  /**
   * Get one photo from google place photo api and then save it into cloudinary.
   * @param {array} photosReferences - An photoreference sent back by google map autocomplete.
   *                                   It can be used for fetching a google place photo.
   */
  fetchAndSaveOneGooglePhoto(photoreference) {
    const url = "http://localhost:4000/google/photo";
    console.log(photoreference);
    return axios.post(url, { photoreference });
  }

  createStop(postData) {
    const url = "http://localhost:3000/stop";
    return axios.post(url, postData);
  }

  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={{
          uri:
            "https://i.pinimg.com/564x/bf/a8/fa/bfa8faf7d84fe084ef38ff5667656d85.jpg"
        }}
      >
        <ScrollView>
          <View style={styles.container}>
            <GooglePlacesAutocomplete
              styles={{
                poweredContainer: {
                  width: 0,
                  height: 0
                },
                powered: {
                  width: 0,
                  height: 0
                }
              }}
              placeholder="Search"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              enablePoweredByContainer={false}
              returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed={false} // true/false/undefined
              fetchDetails={true}  // 'details' in onPress() callback is provided when fetchDetails = true
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => { this.handleAutoCompletePress(data, details) }}
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
            <View style={{marginTop:15}}>
              <Text style={styles.title}> Description: </Text>
            </View>
            
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
            <View style={{flex: 1, flexDirection: 'row', margin:10}}>
              {this.state.photos.map((url) => {
                return (
                  <View style={{padding: 1, alignSelf: 'flex-start'}}>
                    <Image style={styles.photo} source={{uri: url}} />
                  </View>
                )
              })}
            </View>
            <Button title="Add Photo" onPress={this.handlePhotoUpload} />
            <Button title="Create" onPress={this.handleSubmit} />
          </View>
        </ScrollView>
      </ImageBackground>
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
    color: "white",
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
    padding: 10,
    marginTop: 10,
    backgroundColor: "white"
  },
  photo: {
    height: 59,
    width: 59,
    padding: 2,
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    resizeMode: "stretch"
  },
  description: {
    padding: 10,
  }
});