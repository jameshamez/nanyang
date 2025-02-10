import { MongoClient, ObjectId } from "mongodb";
import { parse } from "cookie";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    // ✅ ดึง `_id` จาก Cookie
    const cookies = parse(req.headers.cookie || "");
    const userId = cookies.userData ? JSON.parse(cookies.userData)._id : null;

    if (!userId || !ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid or missing user ID" });
    }

    const { question_no, answer } = req.body;
    if (question_no === undefined || !answer) {
        return res.status(400).json({ error: "Missing data" });
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("nanyang");
    const collection = db.collection("quiz");

    // ✅ ตรวจสอบว่ามีคำตอบสำหรับ `question_no` อยู่แล้วหรือไม่
    const existingAnswer = await collection.findOne({
        user_id: new ObjectId(userId),
        answers: { $elemMatch: { question_no } },
    });

    if (existingAnswer) {
        // ✅ ถ้ามี `question_no` อยู่แล้ว → อัปเดตคำตอบแทน
        await collection.updateOne(
            { user_id: new ObjectId(userId), "answers.question_no": question_no },
            { $set: { "answers.$.answer": answer } }
        );
    } else {
        // ✅ ถ้า `question_no` ยังไม่มี → เพิ่มคำตอบใหม่เข้าไป
        await collection.updateOne(
            { user_id: new ObjectId(userId) },
            {
                $push: { answers: { question_no, answer } },
                $setOnInsert: { created_at: new Date() }
            },
            { upsert: true }
        );
    }

    client.close();
    res.status(200).json({ message: "Answer saved/updated" });
}
