import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  Image
} from 'react-native';

// import ImageElement from './ImageElement.js';

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalImageUrl: 'https://res.cloudinary.com/db5rb32ne/image/upload/v1535046177/skfljwaqqz4681lzuhel.jpg',
      imageUrls: this.props.photoUrls,
    }
    console.log('imageUrls ', this.state.imageUrls);
  }

  setModalVisible(visible, imageKey) {
    console.log('imageKey', imageKey);
    console.log('modal clicked modelUrls  ', this.state.imageUrls[imageKey]);
    this.setState({
      modalImageUrl: this.state.imageUrls[imageKey],
      modalVisible: visible
    }, console.log('modelUrl ', this.state.modalImageUrl));
  }

  getImage() {
    return this.state.modalImageUrl;
  }

  render() {
    console.log('modelImage ', this.state.modalImageUrl);
    let images = this.state.imageUrls.map((imageURL, key) => {
      console.log('key ', key);
      return <TouchableWithoutFeedback key={key}
                onPress={() => { this.setModalVisible(true, key)}}>
                <View style={styles.imagewrap}>
                  <Image source={{uri: imageURL}} style={styles.image}></Image>
                </View>
              </TouchableWithoutFeedback>
    })
    return (
      <View style={styles.container}>
        <Modal style={styles.modal} 
          animationType={'fade'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.modal}>
            <Text style={styles.text}
              onPress={() => {this.setModalVisible(false)}}>
              Close
            </Text>
            <Image style={styles.modalImage} source={{uri: this.state.modalImageUrl}}></Image>
          </View>
        </Modal>
        {images}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eee'
  },

  imagewrap: {
    margin: 2,
    padding: 2,
    height: (Dimensions.get('window').height / 3) - 12,
    width: (Dimensions.get('window').width / 2) - 4,
    backgroundColor: '#fff',
  },

  image: {
    flex: 1,
    width: null,
    alignSelf: 'stretch',    
  },

  modalImage: {
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
  },

  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },

  text: {
    color: '#fff',
  },
});