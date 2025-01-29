import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("nanyang"); // Replace with your database name

    // Test inserting a document
    const result = await db.collection("test").insertOne({
      message: "Hello, MongoDB!",
      timestamp: new Date(),
    });

    // Send a success response
    res.status(200).json({ message: "Connection successful!", result });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    // Send an error response
    res.status(500).json({ message: "Failed to connect to MongoDB", error: error.message });
  }
}