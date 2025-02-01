import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb"; // ✅ นำเข้า ObjectId
export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    const { user_id } = req.body;

    if (!user_id) return res.status(400).json({ message: "Missing user_id" });

    try {
        const client = await clientPromise;
        const db = client.db("nanyang");
        const collection = db.collection("quiz");

        // ✅ ดึงคำตอบของผู้ใช้จาก MongoDB
        const userAnswers = await collection.findOne({ user_id: new ObjectId(user_id) });

        if (!userAnswers || !userAnswers.answers) {
            return res.status(404).json({ message: "No answers found" });
        }

        // ✅ เริ่มต้นนับคะแนน A, B, C
        let counts = { A: 0, B: 0, C: 0 };

        // ✅ นับคะแนนจากคำตอบทั้งหมด
        userAnswers.answers.forEach(({ answer }) => {
            if (counts[answer] !== undefined) {
                counts[answer] += 1;
            }
        });

        console.log("📌 คะแนนที่นับได้:", counts);

        // ✅ คำนวณหาค่าสูงสุด & ต่ำสุด
        let maxScore = Math.max(counts.A, counts.B, counts.C);
        let minScore = Math.min(counts.A, counts.B, counts.C);
        let scoreDifference = maxScore - minScore;

        let targetPage = "/Ecoscore1"; // Default ถ้าไม่เข้าเงื่อนไขไหนเลย

        // ✅ กรณีเป็น GreenTech (คะแนนสูงสุดไม่เกิน 2 หรือคะแนนต่างกัน ≤ 1)
        if (maxScore <= Math.ceil(userAnswers.answers.length / 3) || scoreDifference <= 1) {
            targetPage = "/Ecoscore1";
        }
        // ✅ กรณีประเภทหลัก โดยใช้ค่าคะแนนสูงสุดเทียบกับจำนวนข้อ
        else {
            let maxCategory = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));

            if (maxCategory === "A") targetPage = "/Ecoscore4";
            else if (maxCategory === "B") targetPage = "/Ecoscore2";
            else if (maxCategory === "C") targetPage = "/Ecoscore3";
        }

        console.log("✅ ประเภทที่จัดให้:", targetPage);

        // ✅ บันทึกผลลัพธ์ลง MongoDB
        const scoresCollection = db.collection("eco_scores");
        await scoresCollection.updateOne(
            { user_id },
            { $set: { group: targetPage, calculated_at: new Date() } },
            { upsert: true }
        );

        res.status(200).json({ message: "Group assigned", targetPage });
    } catch (error) {
        console.error("❌ Error calculating group:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
