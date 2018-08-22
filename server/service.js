const express = require("express");
// Middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");
const service = express();

const axios = require('axios');

const { cloudinary, convertToHttps } = require("./api.js");

/****** SETUP HEADERS *****/
service.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Origin, X-Requested-With"
  );
  next();
});

// Set what we are listening on
service.set("port", 4000);
// Logging and parsing
service.use(morgan("dev"));
service.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
service.use(bodyParser.json({ limit: "50mb", extended: true }));

// Upload a photo to Cloudinary and then return photo's url.
service.post("/cloudinary/photo/upload", (req, res) => {
  const { imageUri } = req.body;
  console.log('imageUri ', imageUri);
  cloudinary.uploader.upload(imageUri, result => {
    if (result.error) {
      res.status(500).send(result.error);
    } else {
      res.status(201).send(convertToHttps(result.url));
    }
  });
});

// Get photos from google place photos api and then save them into cloudinary.
service.post("/google/photo", (req, endResponse) => {
  const apiUrl = 'https://maps.googleapis.com/maps/api/place/photo';
  axios.get(apiUrl, {
    params: {
      key: 'AIzaSyBHNIOJemEkEyO4gI_hask8BO6bJno9Q58',
      photoreference: req.body.photoreference, // photoreference is sent from google map search autocomplete
      maxwidth: 200,
    },
    responseType: 'arraybuffer',
  })
  // decode binary data to base64
<<<<<<< HEAD
<<<<<<< HEAD
  .then((res) => new Buffer(res.data, 'binary').toString('base64'))
  // convert to image format uri so that cloudinary can regonize
  .then((base64) => `data:image/jpeg;base64,${base64}`)
  // upload to cloudinary
  .then((data) =>axios.post('http://localhost:4000/cloudinary/photo/upload', {
    imageUri: data
  }) )
  // return the image url from cloudinary
  .then((cloudResponse) => endResponse.send(cloudResponse.data))
=======
  .then((res) => {console.log('RES', res.data); return new Buffer(res.data, 'binary').toString('base64')})
=======
  .then((res) => new Buffer(res.data, 'binary').toString('base64'))
>>>>>>> (feat) Google photos upload functionality now connects front-and back-end.
  // convert to image format uri so that cloudinary can regonize
  .then((base64) => `data:image/jpeg;base64,${base64}`)
  // upload to cloudinary
  .then((data) =>axios.post('http://localhost:4000/cloudinary/photo/upload', {
    imageUri: data
  }) )
  // return the image url from cloudinary
<<<<<<< HEAD
  .then((clouResponse) => endResponse.send(clouResponse.data))
>>>>>>> (feat) Add fetching google photos.
=======
  .then((cloudResponse) => endResponse.send(cloudResponse.data))
>>>>>>> (feat) Google photos upload functionality now connects front-and back-end.
  .catch(err => console.log(err));
});


if (!module.parent) {
  service.listen(service.get("port"));
  console.log("Listening on", service.get("port"));
}

module.exports.service = service;