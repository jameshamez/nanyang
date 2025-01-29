import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, gender, age, occupation, jobDesc, companySector } = req.body;

      // Validate required fields
      if (!name || !gender || !age || !occupation) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const client = await clientPromise;
      const db = client.db("nanyang"); // Replace with your database name
      const collection = db.collection("users");

      // Insert user data into MongoDB
      const result = await collection.insertOne({
        name,
        gender,
        age,
        occupation,
        jobDesc: occupation === "student" ? null : jobDesc,
        companySector: occupation === "student" ? null : companySector,
        createdAt: new Date(),
      });

      res.status(201).json({ message: "User data saved successfully", result });
    } catch (error) {
      console.error("Error saving user data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}