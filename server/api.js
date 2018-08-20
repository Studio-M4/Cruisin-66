const cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'db5rb32ne', 
  api_key: '692822772329959', 
  api_secret: 'yq_e727Jnw2Yk7hASZ8yyl7J-zI' 
});

const convertToHttps = url => `https:${url.split(':')[1]}`;

module.exports = {
  cloudinary: cloudinary,
  convertToHttps: convertToHttps,
};
