const express = require("express");
// Middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");
const service = express();

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
  cloudinary.uploader.upload(imageUri, result => {
    console.log(result);
    if (result.error) {
      res.status(500).send(result.error);
    } else {
      res.status(201).send(convertToHttps(result.url));
    }
  });
});

if (!module.parent) {
  service.listen(service.get("port"));
  console.log("Listening on", service.get("port"));
}

module.exports.service = service;
