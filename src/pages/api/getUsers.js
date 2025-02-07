import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("nanyang"); // ✅ แก้เป็นชื่อ Database จริง
        const collection = db.collection("users");

        const users = await collection.find({}).toArray();

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    } finally {
        await client.close();
    }
}

