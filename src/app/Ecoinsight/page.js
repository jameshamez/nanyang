"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GroupsPage() {
    const [groups, setGroups] = useState({
        RecycledCotton: [],
        RecycledPolyester: [],
        EcoProduced: [],
        GreenTech: []
    });
    const [groupPercentages, setGroupPercentages] = useState({
        RecycledCotton: "0.00",
        RecycledPolyester: "0.00",
        EcoProduced: "0.00",
        GreenTech: "0.00"
    });

    useEffect(() => {
        async function fetchGroups() {
            const res = await fetch("/api/getGroups");
            if (res.ok) {
                const data = await res.json();
                setGroups(data.groups);
                setGroupPercentages(data.groupPercentages);
            }
        }
        fetchGroups();
    }, []);

    // ✅ กำหนดสีของแต่ละกลุ่ม
    const colors = {
        RecycledCotton: "#FFB74D", // ส้ม
        RecycledPolyester: "#4DB6AC", // ฟ้าอมเขียว
        EcoProduced: "#AED581", // เขียว
        GreenTech: "#64B5F6" // น้ำเงิน
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">
            <h1 className="text-3xl font-bold mb-8">🌍 ECO SCORE GROUPS</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.keys(groups).map((group, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <h2 className="text-lg font-semibold mb-2">{group}</h2>
                        <p className="text-gray-600">{groupPercentages[group]}%</p>
                        <div className="relative w-32 h-32 mt-4">
                            {groups[group].map((user, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full w-8 h-8"
                                    style={{
                                        backgroundColor: colors[group],
                                        top: `${Math.random() * 50}%`,
                                        left: `${Math.random() * 50}%`
                                    }}
                                    animate={{
                                        y: [0, -10, 10, -5, 5, 0],
                                        x: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "mirror"
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
