USE cruisin66_dev;

INSERT INTO users (username, email, firstname, lastname, password, photoAvatar, createdat, updatedat)
VALUES 
('Sophia', 'soph915@gmail.com', 'sophia', 'lee', 'password', 'https://avatars0.githubusercontent.com/u/25995901?s=460&v=4', NOW(), NOW()),
('Julio', 'julio117@gmail.com', 'julio', 'fils', 'password', 'https://avatars3.githubusercontent.com/u/10291526?s=460&v=4', NOW(), NOW()),
('Henry', 'henry556@gmail.com', 'henry', 'han', 'password', 'https://avatars1.githubusercontent.com/u/37286505?s=460&v=4', NOW(), NOW()),
('Ningyi', 'ningyi88@gmail.com', 'ningyi', 'ma', 'password', 'https://avatars0.githubusercontent.com/u/4583739?s=460&v=4', NOW(), NOW());


INSERT INTO categories (name, createdat, updatedat)
VALUES 
('nature', NOW(), NOW()), 
('history', NOW(), NOW()), 
('food', NOW(), NOW());

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('Pacific Coast Highway', 'beautiful spots along the famous Pacific Coast highway', 1, 1, NOW(), NOW(), 'https://i0.wp.com/travelfreak.net/wp-content/uploads/2017/11/bixby-creek-bridge.jpg?fit=800%2C533&ssl=1');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('NYC Pizza Time', 'The Ultimate NYC Pizza Tour', 1, 1, NOW(), NOW(), 'https://amp.businessinsider.com/images/5ad8ae04cd862425008b4898-750-563.jpg');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('Bay Area', 'See all the well known sites SF has to offer!', 2, 2, NOW(), NOW(), 'https://media-cdn.tripadvisor.com/media/photo-s/06/b2/0f/a6/golden-gate-bridge.jpg');

INSERT INTO itinerariescomments (text, rating, itineraryId, userId, createdat, updatedat)
VALUES ('this tour was the best, highly recommend!', '4', 1, 1, NOW(), NOW());

INSERT INTO stops (name, longitude, latitude, description, avgRating, address, zipcode, audiofile, createdat, updatedat)
VAlues ('McWay Falls', 36.157, -121.672, 'beautiful falls', 5, 'California 93920', '93920', 'exaudiofile', NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://i2.wp.com/wearetravelgirls.com/wp-content/uploads/2016/10/california-roadtrip-we-are-travel-girls-2.jpg', 'mcway falls', 1, NOW(), NOW());

INSERT INTO stopscomments (text, rating, stopId, userId, createdat, updatedat)
VALUES ('these falls were so gorgeous', '5', 1, 1, NOW(), NOW());

SELECT id into @stopid from stops where id =1;
SELECT id into @itineraryid from itineraries where id =1;
INSERT INTO itinerarystops (itineraryid, stopid, createdat, updatedat)
VALUES (@itineraryid, @stopid, NOW(), NOW());
