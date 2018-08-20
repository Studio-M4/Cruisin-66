// mysql2 doing dynamic lazy require of encodings ,but Jest not being able to handle this.
// So we need to add the following code. (reference: https://stackoverflow.com/questions/46227783/encoding-not-recognized-in-jest-js)
import iconv from "iconv-lite";
import encodings from "iconv-lite/encodings";
iconv.encodings = encodings;

describe("Testing Database/Models", () => {
  let db;
  beforeAll(() => {
    db = require("../models/index.js");
    return db.sequelize.sync();
  })
  afterAll(() => {
    return db.close();
  });

  /**
   * User Model
   */
  describe("User Model", () => {
    const user = {
      userName: "username_test",
      firstName: "firstName_test",
      lastName: "lastName_test",
      email: "email_test",
      password: "password_test",
      photoAvatar: "photoAvatar_test"
    };
    const queryOption = {
      where: { userName: user.userName }
    };
    const updatedName = "usernameUpdated_test";

    test("Should insert an user into DB", () => {
      return db.User.create(user).then(() => expect(true).toBeTruthy());
    });

    test("Should read an user from DB", () => {
      return db.User.findOne(queryOption).then(user =>
        expect(user.userName).toEqual(user.userName)
      );
    });

    test("Should update an user from DB", () => {
      return db.User.update({ username: updatedName }, queryOption).then(updatedRows =>
        expect(updatedRows.length).toBeGreaterThanOrEqual(1)
      );
    });

    test("Should delete an user from DB", () => {
      const deleteQuery = { where: { username: updatedName } };
      return db.User.destroy(deleteQuery)
        .then(() => db.User.findOne(deleteQuery))
        .then(user => expect(user).toBeNull());
    });
  });

  /**
   * Itinerary Model
   */
  describe("Itinerary Model", () => {
    const itinerary = {
      name: "name_test",
      description: "description_test",
    };
    const queryOption = {
      where: { name: itinerary.name }
    };
    const updatedName = "nameUpdated_test";

    test("Should insert an itinerary into DB", () => {
      return db.Itinerary.create(itinerary).then(() => expect(true).toBeTruthy());
    });

    test("Should read an itinerary from DB", () => {
      return db.Itinerary.findOne(queryOption).then(itinerary =>
        expect(itinerary.name).toEqual(itinerary.name)
      );
    });

    test("Should update an itinerary from DB", () => {
      return db.Itinerary.update({ name: updatedName }, queryOption).then(updatedRows =>
        expect(updatedRows.length).toBeGreaterThanOrEqual(1)
      );
    });

    test("Should delete an itinerary from DB", () => {
      const deleteQuery = { where: { name: updatedName } };
      return db.Itinerary.destroy(deleteQuery)
        .then(() => db.Itinerary.findOne(deleteQuery))
        .then(itinerary => expect(itinerary).toBeNull());
    });
  });

  /**
   * Category Model
   */
  describe("Category Model", () => {
    const category = {
      name: "name_test",
    };
    const queryOption = {
      where: { name: category.name }
    };
    const updatedName = "nameUpdated_test";

    test("Should insert an category into DB", () => {
      return db.Category.create(category).then(() => expect(true).toBeTruthy());
    });

    test("Should read an category from DB", () => {
      return db.Category.findOne(queryOption).then(category =>
        expect(category.name).toEqual(category.name)
      );
    });

    test("Should update an category from DB", () => {
      return db.Category.update({ name: updatedName }, queryOption).then(updatedRows =>
        expect(updatedRows.length).toBeGreaterThanOrEqual(1)
      );
    });

    test("Should delete an category from DB", () => {
      const deleteQuery = { where: { name: updatedName } };
      return db.Category.destroy(deleteQuery)
        .then(() => db.Category.findOne(deleteQuery))
        .then(category => expect(category).toBeNull());
    });
  });

  /**
   * Stop Model
   */
  describe("Stop Model", () => {
    const stop = {
      name: "name_test",
    };
    const queryOption = {
      where: { name: stop.name }
    };
    const updatedName = "nameUpdated_test";

    test("Should insert an stop into DB", () => {
      return db.Stop.create(stop).then(() => expect(true).toBeTruthy());
    });

    test("Should read an stop from DB", () => {
      return db.Stop.findOne(queryOption).then(stop =>
        expect(stop.name).toEqual(stop.name)
      );
    });

    test("Should update an stop from DB", () => {
      return db.Stop.update({ name: updatedName }, queryOption).then(updatedRows =>
        expect(updatedRows.length).toBeGreaterThanOrEqual(1)
      );
    });

    test("Should delete an stop from DB", () => {
      const deleteQuery = { where: { name: updatedName } };
      return db.Stop.destroy(deleteQuery)
        .then(() => db.Stop.findOne(deleteQuery))
        .then(stop => expect(stop).toBeNull());
    });
  });

  /**
   * Photo Model
   */
  describe("Photo Model", () => {
    const photo = {
      url: "url_test",
      description: "description_test"
    };
    const queryOption = {
      where: { url: photo.url }
    };
    const updatedUrl = "urlUpdated_test";

    test("Should insert an photo into DB", () => {
      return db.ItineraryPhoto.create(photo).then(() => expect(true).toBeTruthy());
    });

    test("Should read an photo from DB", () => {
      return db.ItineraryPhoto.findOne(queryOption).then(photo =>
        expect(photo.name).toEqual(photo.name)
      );
    });

    test("Should update an photo from DB", () => {
      return db.ItineraryPhoto.update({ url: updatedUrl }, queryOption).then(updatedRows =>
        expect(updatedRows.length).toBeGreaterThanOrEqual(1)
      );
    });

    test("Should delete an photo from DB", () => {
      const deleteQuery = { where: { url: updatedUrl } };
      return db.ItineraryPhoto.destroy(deleteQuery)
        .then(() => db.ItineraryPhoto.findOne(deleteQuery))
        .then(photo => expect(photo).toBeNull());
    });
  });

  /**
   * ItinerariesComment Model
   */
  describe.each("ItinerariesComment Model", () => {
    const itinerariesComment = {
      text: "text_test",
      rating: 4.65
    };
    const queryOption = {
      where: { text: itinerariesComment.text }
    };
    const updatedText = "textUpdated_test";

    test("Should insert an itinerariesComment into DB", () => {
      return db.ItinerariesComment.create(itinerariesComment).then(() => expect(true).toBeTruthy());
    });

    test("Should read an itinerariesComment from DB", () => {
      return db.ItinerariesComment.findOne(queryOption).then(itinerariesComment =>
        expect(itinerariesComment.text).toEqual(itinerariesComment.text)
      );
    });

    test("Should update an itinerariesComment from DB", () => {
      return db.ItinerariesComment.update({ text: updatedText }, queryOption).then(updatedRows =>
        expect(updatedRows.length).toBeGreaterThanOrEqual(1)
      );
    });

    test("Should delete an itinerariesComment from DB", () => {
      const deleteQuery = { where: { text: updatedText } };
      return db.ItinerariesComment.destroy(deleteQuery)
        .then(() => db.ItinerariesComment.findOne(deleteQuery))
        .then(itinerariesComment => expect(itinerariesComment).toBeNull());
    });
  });

  /**
   * ItinerariesComment Model
   */
  describe("db.StopsComment Model", () => {
    const stopsComment = {
      text: "text_test",
      rating: 4.65
    };
    const queryOption = {
      where: { text: stopsComment.text }
    };
    const updatedText = "textUpdated_test";

    test("Should insert an stopsComment into DB", () => {
      return db.StopsComment.create(stopsComment).then(() => expect(true).toBeTruthy());
    });

    test("Should read an stopsComment from DB", () => {
      return db.StopsComment.findOne(queryOption).then(stopsComment =>
        expect(stopsComment.text).toEqual(stopsComment.text)
      );
    });

    test("Should update an stopsComment from DB", () => {
      return db.StopsComment.update({ text: updatedText }, queryOption).then(updatedRows =>
        expect(updatedRows.length).toBeGreaterThanOrEqual(1)
      );
    });

    test("Should delete an stopsComment from DB", () => {
      const deleteQuery = { where: { text: updatedText } };
      return db.StopsComment.destroy(deleteQuery)
        .then(() => db.StopsComment.findOne(deleteQuery))
        .then(stopsComment => expect(stopsComment).toBeNull());
    });
  });

});
