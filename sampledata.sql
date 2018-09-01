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
('Nature', NOW(), NOW()), 
('History', NOW(), NOW()), 
('Food', NOW(), NOW());

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('Pacific Coast Highway', 'Known as one of the most scenic drives in the world, this drive takes you to the best stops on the 101', 1, 1, NOW(), NOW(), 'https://i0.wp.com/travelfreak.net/wp-content/uploads/2017/11/bixby-creek-bridge.jpg?fit=800%2C533&ssl=1');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('Bay Area Tour', 'See all the well known sites SF has to offer!', 2, 2, NOW(), NOW(), 'https://media-cdn.tripadvisor.com/media/photo-s/06/b2/0f/a6/golden-gate-bridge.jpg');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('America Southwest', 'Eat your heart out, this is the ultimate NYC Pizza Tour', 1, 1, NOW(), NOW(), 'https://media.deseretdigital.com/file/a8b0cb4577?type=jpeg&quality=55&c=15&a=4379240d');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('Ultimate Yellowstone', 'Americas oldest National Park, Yellowstone is known for its dramatic canyons, hot springs, and gushing geysers', 2, 1, NOW(), NOW(), 'https://cdn.images.express.co.uk/img/dynamic/78/590x/Yellowstone-volcano-eruption-990586.jpg?r=1532332731690');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('Taiwan 101', 'The land of pineapple cakes', 2, 3, NOW(), NOW(), 'https://www.worldatlas.com/r/w728-h425-c728x425/upload/3c/e1/38/shutterstock-425692558.jpg');

INSERT INTO itineraries (name, description, categoryId, userId, createdat, updatedat, photoUrl)
VALUES ('NYC Pizza Time', 'Eat your heart out, this is the ultimate NYC Pizza Tour', 1, 1, NOW(), NOW(), 'https://amp.businessinsider.com/images/5ad8ae04cd862425008b4898-750-563.jpg');

INSERT INTO stops (name, longitude, latitude, description, avgRating, address, zipcode, audiofile, createdat, updatedat)
VAlues ('Monterey Bay Aquarium', -121.901728, 36.619383, 'Known for its regional focus on the marine habitats of Monterey Bay', 5, 'California 93920', '93920', 'exaudiofile', NOW(), NOW());

INSERT INTO stops (name, longitude, latitude, description, avgRating, address, zipcode, audiofile, createdat, updatedat)
VAlues ('Point Lobos State Park', 36.516964, -121.942089, 'The crown jewel of Californias state parks', 5, 'California 93920', '93920', 'exaudiofile', NOW(), NOW());

INSERT INTO stops(name, longitude, latitude, description, avgRating, address, zipcode, audiofile, createdat, updatedat)
VAlues ('Hack Reactor', 36.516964, -121.942089, 'Best coding bootcamp!', 5, ' 944 Market Street San Francisco California 94102', '94102', 'exaudiofile', NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://www.lighthousedistrict.net/sites/default/files/styles/8-large_650/public/uploads/users/1320/news/mbaq_tropicalfish2.jpg?itok=zrD4mzeZ', 'mcway falls', 1, NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://cache-graphicslib.viator.com/graphicslib/page-images/360x240/137927_Monterey%20&%20Carmel_PointLobosStateReserve_10681.jpg', 'mcway falls', 2, NOW(), NOW());

SELECT id into @stopid from stops where id =1;
SELECT id into @itineraryid from itineraries where name ='Pacific Coast Highway';
INSERT INTO itinerarystops (itineraryid, stopid, createdat, updatedat)
VALUES (@itineraryid, @stopid,NOW(), NOW());

SELECT id into @stopid from stops where id =2;
SELECT id into @itineraryid from itineraries where name ='Pacific Coast Highway';
INSERT INTO itinerarystops (itineraryid, stopid, createdat, updatedat)
VALUES (@itineraryid, @stopid, NOW(), NOW());

SELECT id into @stopid from stops where id =3;
SELECT id into @itineraryid from itineraries where name ='Bay Area Tour';
INSERT INTO itinerarystops (itineraryid, stopid, createdat, updatedat)
VALUES (@itineraryid, @stopid, NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://avatars3.githubusercontent.com/u/2824164?s=280&v=4', 'mcway falls', 3, NOW(), NOW());

INSERT INTO itinerariescomments (text, rating, createdAt, updatedAt, ItineraryId, UserId)
VALUES ('California is so beautiful.', 5, NOW(), NOW(), 1,2 );

INSERT INTO itinerariescomments (text, rating, createdAt, updatedAt, ItineraryId, UserId)
VALUES ('An absolute must do.', 5, NOW(), NOW(), 1,4 );

INSERT INTO itinerariescomments (text, rating, createdAt, updatedAt, ItineraryId, UserId)
VALUES ('This tour was the best, highly recommend!', 5, NOW(), NOW(), 1,3 );

INSERT INTO itinerariescomments (text, rating, createdAt, updatedAt, ItineraryId, UserId)
VALUES ('West Coast. Best coast.', 5, NOW(), NOW(), 1,3 );

INSERT INTO stops (name, longitude, latitude, description, avgRating, address, zipcode, audiofile, createdat, updatedat)
VAlues ('Artist Point', -16.23055, 64.07844, 'An overlook point on the edge of the Grand Canyon', 5, 'Wyoming 82190', NULL, 'exaudiofile', NOW(), NOW());

INSERT INTO stops (name, longitude, latitude, description, avgRating, address, zipcode, audiofile, createdat, updatedat)
VAlues ('Mammoth Hot Springs', -19.071619, 63.4057404, 'Huge area of geothermal vents and travertine flourishes.', 5, 'Yellowstone National Park Wyoming 82190', '81290', 'exaudiofile', NOW(), NOW());

SELECT id into @stopid from stops where id =4;
SELECT id into @itineraryid from itineraries where name ='Ultimate Yellowstone';
INSERT INTO itinerarystops (itineraryid, stopid, createdat, updatedat)
VALUES (@itineraryid, @stopid, NOW(), NOW());

SELECT id into @stopid from stops where id =5;
SELECT id into @itineraryid from itineraries where name ='Ultimate Yellowstone';
INSERT INTO itinerarystops (itineraryid, stopid, createdat, updatedat)
VALUES (@itineraryid, @stopid, NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://www.hikespeak.com/img/Wyoming/Yellowstone/Grand_Canyon/Artist/Artist_Point_Grand_Canyon_of_Yellowstone_IMG_9882.jpg', 'mcway falls', 4, NOW(), NOW());

INSERT INTO stopphotos (url, description, stopid, createdat, updatedat)
VALUES ('https://heulys.com/wp-content/uploads/2017/02/yellowstone-mammoth-hot-springs-terraces-main-spring.jpg', 'mcway falls', 5, NOW(), NOW());






INSERT INTO stopscomments (text, rating, createdAt, updatedAt, stopId, UserId)
VALUES ('Trail is an easy 10 minutes walk.', 5, NOW(), NOW(), 6,2 );

INSERT INTO stopscomments (text, rating, createdAt, updatedAt, stopId, UserId)
VALUES ('Bring cash. Parking is $10.', 5, NOW(), NOW(), 6,4 );

INSERT INTO stopscomments (text, rating, createdAt, updatedAt, stopId, UserId)
VALUES ('Also check out the inland trails', 5, NOW(), NOW(), 6, 3);

UPDATE itineraries
SET userId = 2
where name = 'Pacific Coast Highway'


