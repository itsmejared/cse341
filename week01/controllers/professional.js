import { getDb } from "../db/connect.js";

const getData = async (req, res) => {
  try {
    const result = await getDb().collection("professional").find();
    const lists = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]); // We only need the first document
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export { getData };
