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

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat)
-- VALUES ('Pacific Coast Highway Tour', 'beautiful spots along the famous Pacific Coast highway', 1, 1, NOW(), NOW());
VALUES 
('NYC Pizza Time', 'scrum master', 3, 1, NOW(), NOW()),
('Super cool tour name', 'likes to wear beanies', 2, 2, NOW(), NOW()),
('Taiwan 101', 'from the land of pineapple cakes', 3, 3, NOW(), NOW()),
('Bay Area Tour', 'master pepper', 1, 4, NOW(), NOW());

INSERT INTO itinerariescomments (text, rating, itineraryId, userId, createdat, updatedat)
VALUES ('this tour was the best, highly recommend!', '4', 1, 1, NOW(), NOW());

INSERT INTO itineraryphotos (url, description, itineraryid, createdat, updatedat)
-- VALUES ('https://i0.wp.com/wearetravelgirls.com/wp-content/uploads/2016/10/big-sur-pacific-coast-highway.jpg', 'view of bixby bridge', 1, NOW(), NOW());
VALUES 
('https://amp.businessinsider.com/images/5ad8ae04cd862425008b4898-750-563.jpg', 'view of NYC', 1, NOW(), NOW()),
('http://haitianhollywood.com/images/banners/Port-au-Prince.jpg', 'view of Port-au-Prince', 2, NOW(), NOW()),
('https://www.worldatlas.com/r/w728-h425-c728x425/upload/3c/e1/38/shutterstock-425692558.jpg', 'view of Taipei', 3, NOW(), NOW()),
('https://media-cdn.tripadvisor.com/media/photo-s/06/b2/0f/a6/golden-gate-bridge.jpg', 'view of bay area', 4, NOW(), NOW());


INSERT INTO stops (name, longitude, latitude, description, avgRating, address, zipcode, audiofile, createdat, updatedat)
VAlues ('mcway falls', 36.157, -121.672, 'beautiful falls', 5, 'California 93920', '93920', 'exaudiofile', NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://i2.wp.com/wearetravelgirls.com/wp-content/uploads/2016/10/california-roadtrip-we-are-travel-girls-2.jpg', 'mcway falls', 1, NOW(), NOW());

INSERT INTO stopscomments (text, rating, stopId, userId, createdat, updatedat)
VALUES ('these falls were so gorgeous', '5', 1, 1, NOW(), NOW());

SELECT id into @stopid from stops where id =1;
SELECT id into @itineraryid from itineraries where id =1;
INSERT INTO itinerarystops (itineraryid, stopid, createdat, updatedat)
VALUES (@itineraryid, @stopid, NOW(), NOW());
