import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

try {
  console.log("Connecting to MongoDB...");

  const client = new MongoClient(uri);

  await client.connect();

  console.log("Connected!");

  await client.close();
} catch (err) {
  console.error(err);
}
