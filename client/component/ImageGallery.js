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
      modalImage: require('./images/amy.jpg'),
      images: [
        require('./images/amy.jpg'),
        require('./images/couple1.jpg'),
        require('./images/couple2.jpg'),
        require('./images/miller1.jpg'),
        require('./images/miller2.jpg'),
        require('./images/miller3.jpg'),
        require('./images/pusheen.jpg'),
        require('./images/stormy1.jpg'),
        require('./images/stormy2.jpg'),
      ]
    }
  }

  setModalVisible(visible, imageKey) {
    this.setState({
      modalImage: this.state.images[imageKey],
      modalVisible: visible
    });
  }

  getImage() {
    return this.state.modalImage;
  }

  render() {
    let images = this.state.images.map((image, key) => {
      return <TouchableWithoutFeedback key={key}
                onPress={() => { this.setModalVisible(true, key)}}>
                <View style={styles.imagewrap}>
                  <Image source={image} style={styles.image}></Image>
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
            <Image source={this.state.modalImage}></Image>
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

  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },

  text: {
    color: '#fff',
  }
});