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
    const historyCollection = db.collection("quiz_history");

    const userObjectId = new ObjectId(userId);

    // ✅ ค้นหาคำตอบเดิม (ถ้ามี)
    const existingAnswer = await collection.findOne({
        user_id: userObjectId,
        answers: { $elemMatch: { question_no } },
    });

    if (existingAnswer) {
        // ✅ ดึงคำตอบเดิมออกมา
        const oldAnswer = existingAnswer.answers.find(a => a.question_no === question_no)?.answer || null;

        // ✅ ถ้ามี `question_no` อยู่แล้ว → อัปเดตคำตอบแทน
        await collection.updateOne(
            { user_id: userObjectId, "answers.question_no": question_no },
            { $set: { "answers.$.answer": answer } }
        );

        // ✅ บันทึก History
        await historyCollection.insertOne({
            user_id: userObjectId,
            question_no,
            old_answer: oldAnswer,
            new_answer: answer,
            updated_at: new Date()
        });

    } else {
        // ✅ ถ้า `question_no` ยังไม่มี → เพิ่มคำตอบใหม่เข้าไป
        await collection.updateOne(
            { user_id: userObjectId },
            {
                $push: { answers: { question_no, answer } },
                $setOnInsert: { created_at: new Date() }
            },
            { upsert: true }
        );

        // ✅ บันทึก History (เฉพาะตอนเพิ่มคำตอบครั้งแรก)
        await historyCollection.insertOne({
            user_id: userObjectId,
            question_no,
            old_answer: null, // ไม่มีคำตอบเดิม
            new_answer: answer,
            updated_at: new Date()
        });
    }

    client.close();
    res.status(200).json({ message: "Answer saved/updated with history" });
}
