USE cruisin66_dev;

INSERT INTO users (username, email, firstname, lastname, password, photoAvatar, createdat, updatedat)
VALUES 
('Julio', 'julio117@gmail.com', 'Julio', 'Fils', 'password', 'https://avatars3.githubusercontent.com/u/10291526?s=460&v=4', NOW(), NOW()),
('Henry', 'henry556@gmail.com', 'Henry', 'Han', 'password', 'https://avatars1.githubusercontent.com/u/37286505?s=460&v=4', NOW(), NOW()),
('Ningyi', 'ningyi88@gmail.com', 'Ningyi', 'Ma', 'password', 'https://avatars0.githubusercontent.com/u/4583739?s=460&v=4', NOW(), NOW());

UPDATE users
SET photoAvatar = 'https://avatars0.githubusercontent.com/u/25995901?s=460&v=4'
WHERE id =1;

INSERT INTO categories (name, createdat, updatedat)
VALUES 
('nature', NOW(), NOW()), 
('history', NOW(), NOW()), 
('food', NOW(), NOW());

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('Pacific Coast Highway', 'Known as one of the most scenic drives in the world, this drive takes you to the best stops on the 101', 1, 2, NOW(), NOW(), 'https://i0.wp.com/travelfreak.net/wp-content/uploads/2017/11/bixby-creek-bridge.jpg?fit=800%2C533&ssl=1');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('NYC Pizza Time', 'Eat your heart out, this is the ultimate NYC Pizza Tour', 1, 1, NOW(), NOW(), 'https://amp.businessinsider.com/images/5ad8ae04cd862425008b4898-750-563.jpg');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('Bay Area', 'See all the well known sites SF has to offer!', 2, 2, NOW(), NOW(), 'https://media-cdn.tripadvisor.com/media/photo-s/06/b2/0f/a6/golden-gate-bridge.jpg');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('Ultimate Iceland', 'The land of fire and ice has so many amazing sites!', 2, 1, NOW(), NOW(), 'https://www.telegraph.co.uk/content/dam/Travel/2018/March/iceland-GettyImages-760156127.jpg?imwidth=450');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('Cali 101', 'Drive the length of California and see all the Golden State has to offer.', 2, 3, NOW(), NOW(), 'https://www.visitcalifornia.com/sites/default/files/styles/welcome_image/public/vc_oceanside_st_rm_829793708_1280x640.jpeg');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('Taiwan 101', 'The land of pineapple cakes', 2, 3, NOW(), NOW(), 'https://www.worldatlas.com/r/w728-h425-c728x425/upload/3c/e1/38/shutterstock-425692558.jpg');

INSERT INTO stops (name, longitude, latitude, description, avgRating, address, zipcode, audiofile, createdat, updatedat)
VAlues ('Monterey Bay Aquarium', 36.157, -121.672, 'The otters are a must see!', 5, 'California 93920', '93920', 'exaudiofile', NOW(), NOW());

INSERT INTO stops (name, longitude, latitude, description, avgRating, address, zipcode, audiofile, createdat, updatedat)
VAlues ('Point Lobos State Park', 36.157, -121.672, 'The crown jewel of Californias state parks', 5, 'California 93920', '93920', 'exaudiofile', NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://www.lighthousedistrict.net/sites/default/files/styles/8-large_650/public/uploads/users/1320/news/mbaq_tropicalfish2.jpg?itok=zrD4mzeZ', 'mcway falls', 1, NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://cache-graphicslib.viator.com/graphicslib/page-images/360x240/137927_Monterey%20&%20Carmel_PointLobosStateReserve_10681.jpg', 'mcway falls', 2, NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://media-cdn.tripadvisor.com/media/photo-s/13/e6/10/e7/photo0jpg.jpg', 'mcway falls', 3, NOW(), NOW());

SELECT id into @stopid from stops where id =1;
SELECT id into @itineraryid from itineraries where id =2;
INSERT INTO itinerarystops (itineraryid, stopid, createdat, updatedat)
VALUES (@itineraryid, @stopid,NOW(), NOW());

SELECT id into @stopid from stops where id =2;
SELECT id into @itineraryid from itineraries where id =2;
INSERT INTO itinerarystops (itineraryid, stopid, createdat, updatedat)
VALUES (@itineraryid, @stopid, NOW(), NOW());

INSERT INTO itinerariescomments (text, rating, createdAt, updatedAt, ItineraryId, UserId)
VALUES ('California is so beautiful.', 5, NOW(), NOW(), 1,2 );

INSERT INTO itinerariescomments (text, rating, createdAt, updatedAt, ItineraryId, UserId)
VALUES ('An absolute must do.', 5, NOW(), NOW(), 1,4 );

INSERT INTO itinerariescomments (text, rating, createdAt, updatedAt, ItineraryId, UserId)
VALUES ('This tour was the best, highly recommend!', 5, NOW(), NOW(), 1,3 );

INSERT INTO itinerariescomments (text, rating, createdAt, updatedAt, ItineraryId, UserId)
VALUES ('West Coast. Best coast.', 5, NOW(), NOW(), 1,3 );

INSERT INTO stops (name, longitude, latitude, description, avgRating, address, zipcode, audiofile, createdat, updatedat)
VAlues ('Jökulsárlón Lagoon', -16.23055, 64.07844, 'Icelands most famous glacier lagoon', 5, 'Iceland', NULL, 'exaudiofile', NOW(), NOW());

INSERT INTO stops (name, longitude, latitude, description, avgRating, address, zipcode, audiofile, createdat, updatedat)
VAlues ('Reynisfjara', -19.071619, 63.4057404, 'Black sand beach and cool basalt columns', 5, 'Iceland', NULL, 'exaudiofile', NOW(), NOW());

SELECT id into @stopid from stops where id =3;
SELECT id into @itineraryid from itineraries where id =4;
INSERT INTO itinerarystops (itineraryid, stopid, order, createdat, updatedat)
VALUES (@itineraryid, @stopid, 1,  NOW(), NOW());

SELECT id into @stopid from stops where id =4;
SELECT id into @itineraryid from itineraries where id =4;
INSERT INTO itinerarystops (itineraryid, stopid, order, createdat, updatedat)
VALUES (@itineraryid, @stopid, 2, NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://images.adventures.is/assets/uploads/2015/11/19164800/jokulsarlon-glacier-lagoon1.jpg', 'mcway falls', 3, NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://farm3.staticflickr.com/2836/34140581015_647b4b1100_c.jpg', 'mcway falls', 4, NOW(), NOW());





