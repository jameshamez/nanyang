import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("nanyang");
    const collection = db.collection("test");

    // ลองเพิ่มข้อมูลทดสอบ
    const result = await collection.insertOne({ message: "Hello, MongoDB!", createdAt: new Date() });

    res.status(200).json({ message: "✅ MongoDB Connected Successfully!", result });
  } catch (error) {
    console.error("❌ Connection Failed:", error);
    res.status(500).json({ message: "Failed to connect to MongoDB", error: error.message });
  }
}