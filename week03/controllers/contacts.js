const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find()
    .toArray() // Eliminado el callback de adentro para usar promesas fijas
    .then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message || err });
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId })
    .toArray() // Eliminado el callback de adentro para usar promesas fijas
    .then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0] || {}); // Devuelve objeto vacío si no encuentra nada
    })
    .catch((err) => {
      res.status(400).json({ message: err.message || err });
    });
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  try {
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json('Some error occurred while creating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};

const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid contact id to update a contact.');
  }
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  try {
    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while updating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const userId = new ObjectId(req.params.id);
  try {
    // .remove() fue eliminado en drivers modernos de MongoDB; se actualizó a .deleteOne()
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Some error occurred while deleting the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
