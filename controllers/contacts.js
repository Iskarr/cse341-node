const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// CREATE contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
      favoriteSport: req.body.favoriteSport,
      musicGenre: req.body.musicGenre,
      currentCollege: req.body.currentCollege,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the contact."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE contact
const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
      favoriteSport: req.body.favoriteSport,
      musicGenre: req.body.musicGenre,
      currentCollege: req.body.currentCollege,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .replaceOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the contact."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE contact
const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while deleting the contact."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET all Contacts
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("contacts").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET single contact
const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
