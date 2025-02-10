import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method !== "GET")
        return res.status(405).json({ message: "Method not allowed" });

    try {
        // ✅ Connect to MongoDB
        const client = await clientPromise;
        const db = client.db("nanyang");

        // ✅ Fetch all users' eco scores
        const ecoScores = await db.collection("eco_scores").find().toArray();

        // ✅ Map user_id -> group_name
        const userGroups = ecoScores.map((user) => ({
            user_id: user.user_id,
            group_name: mapGroupName(user.group) || "-", // ✅ แปลงชื่อ Group
        }));

        // ✅ ส่งกลับให้ Frontend ใช้
        res.status(200).json(userGroups);
    } catch (error) {
        console.error("❌ Error fetching groups:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// ✅ ฟังก์ชันแปลงชื่อกลุ่มให้ตรงกับ UI
function mapGroupName(groupName) {
    switch (groupName.replace("/", "")) {
        case "Ecoscore1": return "RecycledPolyester";
        case "Ecoscore3": return "EcoProduced";
        case "Ecoscore2": return "GreenTech";
        case "Ecoscore4": return "RecycledCotton";
        default: return null;
    }
}
