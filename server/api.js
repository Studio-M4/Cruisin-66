const cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'db5rb32ne', 
  api_key: '692822772329959', 
  api_secret: 'yq_e727Jnw2Yk7hASZ8yyl7J-zI' 
});

module.exports = {
  cloudinary: cloudinary
};
