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
  FlatList,
  ActivityIndicator,
} from "react-native";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { openImagePicker, uploadToCloudinary } from "../utilities/photoUtil";
// import photoUtil from "../utilities/photoUtil";
import { InputGroup, Input, Container, Content, Icon } from "native-base";

import axios from "axios";

export default class CreateStop extends React.Component {
  static navigationOptions = {
    title: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      address: null,
      description: null,
      name: null,
      longitude: null,
      latitude: null,
      editable: true,
      showSpinner: false,
    };

    this.stopId = null;
    this.itineraryId = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhotoUpload = this.handlePhotoUpload.bind(this);
    this.handleAutoCompletePress = this.handleAutoCompletePress.bind(this);
    this.fetchAndSaveAllGooglePhotos = this.fetchAndSaveAllGooglePhotos.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    // This itineraryId is passed from Stops component.
    this.itineraryId = navigation.getParam("itineraryId");
  }

  handleSubmit() {
    const { navigation } = this.props;

    // If the stop is already in db, we just connect it to the specific itinerary.
    if (this.stopId) {
      this.connectStopToItinerary(this.itineraryId, this.stopId)
          .then(() => navigation.navigate("Stops", { itineraryId: this.itineraryId }))
          .catch((err) => console.log(err));
      return;
    }

    console.log(this.state);
    const { name, description, address, photos, latitude, longitude } = this.state;
    const postData = {
      stop: {
        name: name,
        description: description,
        address: address,
        StopPhotos: photos.map((url) => ({ url: url, description: "" })), // description is decrecated
        latitude: latitude,
        longitude: longitude
      },
      itineraryId: this.itineraryId,
    };

    this.createStop(postData)
      .then(() =>
        navigation.navigate("Stops", {
          itineraryId: this.itineraryId
        })
      )
      .catch(err => console.log(err));
  }

  handleAutoCompletePress(data, details) {
    console.log(data, details);
    const fullInfo = data.description;
    const { lat, lng } = details.geometry.location;

    this.searchStopByCoordinate(lng, lat)
        .then((res) => {
          console.log('RES ', res);
          const stop = res.data;
          // If this stop already exists in the database, we just pull it out.
          if (stop) {
            this.stopId = stop.id;
            this.setState({
              photos: stop.StopPhotos.map(photo => photo.url),
              description: stop.description,
              editable: false,
            });
          // If this stop doesn't exist in the database, we need to upload photos and create this stop.
          } else {
            this.setState({name: getName(fullInfo), address: getAddress(fullInfo) ,latitude: lat, longitude: lng});

            const { photos } = details;
            const photorefs = photos ? photos.slice(0, 4).map(photo => photo.photo_reference) : [];
            this.fetchAndSaveAllGooglePhotos(photorefs)
                .then((imageUrls) => this.setState({photos: imageUrls, showSpinner: false}));
          }
        })
        .catch((err) => console.log(err));
  }

  handlePhotoUpload() {
    openImagePicker(null, (response) => {
      console.log('imagePickerResponse: ', response);
      const { photos } = this.state;
      const source = { uri: "data:image/jpeg;base64," + response.data };

    uploadToCloudinary(source.uri, () => {this.setState({showSpinner: true})})
      .then((url) => this.setState({photos: photos.concat(url), showSpinner:false}))
      .catch((err) => console.log(err));
    });
  }

  /**
   * Get photos from google place photo api and then save them into cloudinary.
   * @param {array} photosReferences - An array of photoreferences that can be used for fetching google place photos
   */
  fetchAndSaveAllGooglePhotos(photosReferences = []) {
    if (photosReferences.length == 0) {
      return;
    }
    this.setState({showSpinner:true});
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
   * Search a stop from DB by given coordinate.
   */
  searchStopByCoordinate(lng, lat) {
    const url = `http://localhost:3000/stop/coordinate/${lng}/${lat}`;
    return axios.get(url);
  }

  createStop(postData) {
    const url = "http://localhost:3000/stop";
    return axios.post(url, postData)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
  }

  /**
   * Connect the relationship between Itinerary and Stop.
   */
  connectStopToItinerary(itineraryId, stopId) {
    const url = 'http://localhost:3000/itinerarystops';
    return axios.post(url, { itineraryId, stopId });
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
              style={{
                textInputContainer: {
                  backgroundColor: 'transparent',
                  borderColor: 'yellow',
                  borderWidth: 0
                },
                textInput: {
                  borderWidth: 0
                },
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
              editable={this.state.editable}
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
                    <ImageBackground style={styles.photo}source={{uri: url}}/>
                  </View>
                )
              })}
              { this.state.showSpinner ? <ActivityIndicator style={styles.photo} animating={this.state.showSpinner} size="large" color="grey"/> : null }
            </View>
            <Button title="Upload Photo" onPress={this.handlePhotoUpload} />
            <Button title="Add Stop" onPress={this.handleSubmit} />
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