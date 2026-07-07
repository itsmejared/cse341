import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

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

export const getContactById = async (req, res) => {
  try {
    const userId = new ObjectId(req.params);

    const contact = await getDb()
      .collection("contacts")
      .findOne({ _id: userId });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found.",
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving the contact.",
    });
  }
};
