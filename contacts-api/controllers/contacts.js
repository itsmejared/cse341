import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

// GET /contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await getDb().collection("contacts").find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving contacts.",
    });
  }
};

// GET /contacts/:id
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID format." });
    }

    const contact = await getDb()
      .collection("contacts")
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving the contact.",
    });
  }
};

// POST /contacts
export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const response = await getDb().collection("contacts").insertOne(newContact);

    res.status(201).json({ id: response.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the contact.",
    });
  }
};

// PUT /contacts/:id
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID format." });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const response = await getDb()
      .collection("contacts")
      .replaceOne({ _id: new ObjectId(id) }, updatedContact);

    if (response.modifiedCount === 0) {
      return res.status(404).json({ message: "Contact not found or no changes made." });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the contact.",
    });
  }
};

// DELETE /contacts/:id
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID format." });
    }

    const response = await getDb()
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found." });
    }

    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while deleting the contact.",
    });
  }
};
