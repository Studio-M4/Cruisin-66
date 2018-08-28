import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const openImagePicker = (options, callback) => {
  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      callback(response);
    }
  });
};

const uploadToCloudinary = (imageUri) => {
  const url = 'http://localhost:4000/cloudinary/photo/upload';
  return axios.post(url, { imageUri })
              .then((res) => res.data);
}

export { openImagePicker, uploadToCloudinary };