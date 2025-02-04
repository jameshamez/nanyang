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
        RecycledCotton: "0",
        RecycledPolyester: "0",
        EcoProduced: "0",
        GreenTech: "0"
    });
    const getRandomPosition = () => ({
        left: `${Math.random() * 100}%`,
        top: `-${Math.random() * 20}%` // เริ่มเหนือจอเล็กน้อย
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

    // ✅ กำหนดภาพของแต่ละกลุ่มแยกกันไปเลย
    const groupImages = {
        RecycledCotton: "/images/recycledcotton.png",
        RecycledPolyester: "/images/recycledpolyester.png",
        EcoProduced: "/images/ecoproduced.png",
        GreenTech: "/images/greentech.png"
    };

    // ✅ กำหนดขนาดของแต่ละกลุ่ม
    const groupSizes = {
        RecycledCotton: "w-12 h-12",   // ขนาดใหญ่สุด
        RecycledPolyester: "w-10 h-10",
        EcoProduced: "w-8 h-8",
        GreenTech: "w-6 h-6"          // ขนาดเล็กสุด
    };

    return (
        <div
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            style={{
                backgroundImage: "url(/image/bginsight.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            {[...Array(10)].map((_, i) => (
                <motion.img
                    key={i}
                    src="/image/leafinsight.png"
                    alt="Falling Leaf"
                    className="absolute w-10 h-auto opacity-80 z-[0]" // ✅ ลด z-index ให้ไปข้างหลัง
                    style={getRandomPosition()}
                    animate={{
                        y: [0, 800], // เคลื่อนที่ลง
                        rotate: [0, 10, -10, 5, -5, 0], // หมุนเล็กน้อย
                        opacity: [1, 1, 0] // ค่อยๆ หายไป
                    }}
                    transition={{
                        duration: 6 + Math.random() * 4, // กำหนดเวลาตกแบบสุ่ม
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 3 // เริ่มตกในเวลาที่ต่างกัน
                    }}
                />
            ))}
            <div className="text-center mb-10 z-10 relative"> {/* ✅ เพิ่ม z-10 ให้มากกว่าใบไม้ */}
                <img
                    src="/image/Insightname.png"
                    alt="ECO SCORE GROUPS"
                    className="w-64 h-auto mx-auto mb-4 z-10 relative"
                />
            </div>
            <div className="flex items-center justify-end relative">
                <motion.div
                    className="relative flex items-center justify-center rounded-full shadow-md"
                    animate={{ y: [0, -10, 10, -5, 5, 0], x: [0, 5, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                    style={{
                        width: `100px`,
                        height: `100px`,
                        top: "5px",
                    }}
                >
                    <img
                        src="/image/recycledpolyester.png"
                        alt="Recycled Polyester"
                        className="object-cover rounded-full w-full h-full"
                    />
                    <div className="absolute flex items-center justify-center w-full h-full">
                <span
                    className="text-black font-bold"
                    style={{
                        fontSize: `${12 + groupPercentages.RecycledPolyester / 3}px`,
                        position: "absolute",
                        color: "#509776",
                        transform: `translateY(${-160 + groupPercentages.RecycledPolyester / 2}%)`
                    }}
                >
                    {groupPercentages.RecycledPolyester}%
                </span>
                    </div>
                </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 items-center">
                {/* ✅ Recycled Cotton - ซ้าย */}
                <div className="relative w-full h-[10px] flex flex-col items-center">
                    <motion.div
                        className="relative flex items-center justify-center rounded-full shadow-md"
                        animate={{ y: [0, -10, 10, -5, 5, 0], x: [0, 5, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                        style={{
                            width: `${100 + groupPercentages.RecycledCotton}px`,
                            height: `${100 + groupPercentages.RecycledCotton}px`,
                            left: "50px",
                        }}
                    >
                        <img
                            src="/image/cotton.png"
                            alt="Recycled Cotton"
                            className="object-cover rounded-full w-full h-full"
                        />
                        <div className="absolute flex items-center justify-center w-full h-full">
                <span
                    className="text-black font-bold"
                    style={{
                        fontSize: `${12 + groupPercentages.RecycledCotton / 3}px`,
                        position: "absolute",
                        color: "#22989E",
                        transform: `translateY(${-140 + groupPercentages.RecycledCotton / 2}%)`
                    }}
                >
                    {groupPercentages.RecycledCotton}%
                </span>
                        </div>
                    </motion.div>
                </div>



                {/* ✅ Eco Produced - ซ้าย */}
                <div className="flex items-center justify-start relative">
                    <motion.div
                        className="relative flex items-center justify-center rounded-full shadow-md"
                        animate={{ y: [0, -10, 10, -5, 5, 0], x: [0, 5, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                        style={{
                            width: `${100 + groupPercentages.EcoProduced}px`,
                            height: `${100 + groupPercentages.EcoProduced}px`,
                        }}
                    >
                        <img
                            src="/image/ecoproduce.png"
                            alt="Eco Produced"
                            className="object-cover rounded-full w-full h-full"
                        />
                        <div className="absolute flex items-center justify-center w-full h-full">
                <span
                    className="text-black font-bold"
                    style={{
                        fontSize: `${12 + groupPercentages.EcoProduced / 3}px`,
                        position: "absolute",
                        color: "#39B14D",
                        transform: `translateY(${-140 + groupPercentages.EcoProduced / 2}%)`
                    }}
                >
                    {groupPercentages.EcoProduced}%
                </span>
                        </div>
                    </motion.div>
                </div>

                {/* ✅ Green Tech - ขวา */}
                <div className="flex items-center justify-end relative">
                    <motion.div
                        className="relative flex items-center justify-center rounded-full shadow-md"
                        animate={{ y: [0, -10, 10, -5, 5, 0], x: [0, 5, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                        style={{
                            width: `${100 + groupPercentages.GreenTech}px`,
                            height: `${100 + groupPercentages.GreenTech}px`,
                            top:"-10px",
                            left: "50px",
                        }}
                    >
                        <img
                            src="/image/greentech.png"
                            alt="Green Tech"
                            className="object-cover rounded-full w-full h-full"
                        />
                        <div className="absolute flex items-center justify-center w-full h-full">
                <span
                    className="text-black font-bold"
                    style={{
                        fontSize: `${12 + groupPercentages.GreenTech / 3}px`,
                        position: "absolute",
                        color:"#314397",
                        transform: `translateY(${-140 + groupPercentages.GreenTech / 2}%)`
                    }}
                >
                    {groupPercentages.GreenTech}%
                </span>

                        </div>
                    </motion.div>
                </div>
                <motion.img
                    src="/image/leftinsight.png"
                    alt="Swinging Left Leaf"
                    className="absolute left-0 bottom-[-60px] w-36 h-auto object-cover" // ✅ ปรับตำแหน่งลง
                    animate={{
                        rotate: [-10, -20, -10],  // ขยับไปมา
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                    }}
                />

                {/* 🍃 ใบไม้ด้านขวา */}
                <motion.img
                    src="/image/rightinsight.png"
                    alt="Swinging Right Leaf"
                    className="absolute right-[50px] bottom-[-60px] w-36 h-auto object-cover" // ✅ ขยับเข้ามาตรงกลาง
                    animate={{
                        rotate: [1, -5, 1],  // ขยับไปมา
                        x: [0, 5, -5, 0],  // ✅ ให้ใบไม้ขยับไปทางขวาเล็กน้อย
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                    }}
                />
            </div>


        </div>
    );
}
