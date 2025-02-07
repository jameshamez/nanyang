import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("❌ Please add your MongoDB URI to .env.local");
}

const options = { useNewUrlParser: true, useUnifiedTopology: true };

let clientPromise = new MongoClient(uri, options).connect();

export default clientPromise;
