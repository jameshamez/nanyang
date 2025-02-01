import clientPromise from "../../../lib/mongodb";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, gender, age, occupation, jobDesc, companySector } = req.body;

      if (!name || !gender || !age || !occupation) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const client = await clientPromise;
      await client.connect(); // ✅ เชื่อมต่อ MongoDB
      const db = client.db("nanyang");
      const collection = db.collection("users");

      // ✅ บันทึกข้อมูลลง MongoDB
      const result = await collection.insertOne({
        name,
        gender,
        age,
        occupation,
        jobDesc: occupation === "student" ? null : jobDesc,
        companySector: occupation === "student" ? null : companySector,
        createdAt: new Date(),
      });

      // ✅ ดึง `_id` ของผู้ใช้ที่ถูกสร้าง
      const userId = result.insertedId.toString();

      // ✅ สร้าง Cookie และเซ็ต `_id`
      const userCookie = serialize(
          "userData",
          JSON.stringify({ _id: userId }),
          {
            httpOnly: true, // ป้องกันการเข้าถึง Cookie จาก JavaScript ฝั่ง Client
            sameSite: "strict", // ป้องกัน CSRF
            path: "/", // Cookie ใช้ได้ทุกหน้า
            maxAge: 60 * 60 * 24 * 7, // Cookie อยู่ได้นาน 7 วัน
          }
      );

      // ✅ ส่ง Cookie กลับไปยัง Browser
      res.setHeader("Set-Cookie", userCookie);
      res.status(201).json({ message: "User data saved successfully", userId });
    } catch (error) {
      console.error("Error saving user data:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
