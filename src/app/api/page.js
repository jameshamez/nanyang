import clientPromise from "../../lib/mongo/index";


export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("NanyangDB");

        const data = await db.collection("NanyangDB").find({}).toArray();

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}