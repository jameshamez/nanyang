import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

    try {
        const client = await clientPromise;
        const db = client.db("nanyang");
        const collection = db.collection("quiz");

        // ✅ ดึงคำตอบของผู้ใช้ทั้งหมด
        const users = await collection.find().toArray();
        const totalUsers = users.length || 1; // ป้องกันหาร 0

        // ✅ คำนวณคะแนนของแต่ละคน
        let groups = {
            RecycledCotton: [],
            RecycledPolyester: [],
            EcoProduced: [],
            GreenTech: []
        };

        users.forEach(user => {
            let counts = { A: 0, B: 0, C: 0 };

            user.answers.forEach(({ answer }) => {
                if (counts[answer] !== undefined) {
                    counts[answer] += 1;
                }
            });

            let maxScore = Math.max(counts.A, counts.B, counts.C);
            let minScore = Math.min(counts.A, counts.B, counts.C);
            let scoreDifference = maxScore - minScore;
            let assignedGroup = "GreenTech"; // Default เป็น GreenTech

            if (counts.A === 3 && counts.B === 2 && counts.C === 1) {
                assignedGroup = "RecycledCotton";
            } else if (counts.A === 2 && counts.B === 3 && counts.C === 1) {
                assignedGroup = "RecycledPolyester";
            } else if (counts.A === 1 && counts.B === 1 && counts.C === 3) {
                assignedGroup = "EcoProduced";
            } else if (scoreDifference <= 1) {
                assignedGroup = "GreenTech";
            }

            groups[assignedGroup].push(user.user_id);
        });

        // ✅ คำนวณ % ของแต่ละกลุ่ม
        let groupPercentages = {};
        Object.keys(groups).forEach(group => {
            groupPercentages[group] = Math.round((groups[group].length / totalUsers) * 100);
        });

        res.status(200).json({ groups, groupPercentages });
    } catch (error) {
        console.error("❌ Error fetching groups:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
