import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("nanyang"); // ✅ แก้เป็นชื่อ Database จริง
        const collection = db.collection("quiz");

        const answers = await collection.find({}).toArray();

        res.status(200).json(answers);
    } catch (error) {
        console.error("Error fetching quiz answers:", error);
        res.status(500).json({ error: "Failed to fetch quiz answers" });
    } finally {
        await client.close();
    }
}
