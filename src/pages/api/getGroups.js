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

    // 🔍 Debug Log: Check what data is fetched from MongoDB
    console.log(
      "🔍 Debug - Fetched ecoScores:",
      JSON.stringify(ecoScores, null, 2)
    );

    // ✅ Initialize group counts to 0
    let groups = {
      RecycledCotton: 0,
      RecycledPolyester: 0,
      EcoProduced: 0,
      GreenTech: 0,
    };

    // ✅ Count occurrences of each Ecoscore
    ecoScores.forEach((user) => {
      const groupName = user.group.replace("/", ""); // Remove leading "/"

      switch (groupName) {
        case "Ecoscore1":
          groups.RecycledPolyester += 1;
          break;
        case "Ecoscore2":
          groups.EcoProduced += 1;
          break;
        case "Ecoscore3":
          groups.GreenTech += 1;
          break;
        case "Ecoscore4":
          groups.RecycledCotton += 1;
          break;
      }
    });

    // ✅ Calculate total users
    const totalUsers = ecoScores.length;

    // ✅ Calculate percentages
    let groupPercentages = {};
    Object.keys(groups).forEach((group) => {
      groupPercentages[group] =
        totalUsers > 0 ? Math.round((groups[group] / totalUsers) * 100) : 0;
    });

    // 🔍 Debug Log: Check computed results
    console.log("🔍 Debug - Computed Groups:", JSON.stringify(groups, null, 2));
    console.log(
      "🔍 Debug - Computed Percentages:",
      JSON.stringify(groupPercentages, null, 2)
    );

    // ✅ Send response
    res.status(200).json({ groups, groupPercentages });
  } catch (error) {
    console.error("❌ Error fetching groups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
