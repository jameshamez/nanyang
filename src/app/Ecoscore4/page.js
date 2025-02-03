"use client";
import { Kanit } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const kanit = Kanit({ subsets: ['thai'], weight: '700' });
import {useEffect, useState} from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";



export default function QuizPage() {

    const router = useRouter();
    const handleNextClick = (selectedButton) => {
        if (selectedButton !== null) {
            router.push("/Ecoinsight");
        } else {
            router.push("/Ecoinsight");
        }
    };
    const [selectedButton, setSelectedButton] = useState(null);
    const handleButtonClick = (index) => {
        setSelectedButton(index);
    };
    const [isEnglish, setIsEnglish] = useState(false);
    useEffect(() => {
        const language = Cookies.get("language");
        setIsEnglish(language === "en");
    }, []);
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="quiz-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, ease: "easeInOut" }} // ✅ ใช้เวลา 2.5 วิ เพื่อเฟดแบบช้าๆ
                className={`flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4 relative ${kanit.className}`}
                style={{
                    backgroundImage:"url(/image/score1.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <img
                    src={isEnglish ? "/image/ecoscore4EN.png" : "/image/ecoscore4.png"}
                    alt="Eco Score Card"
                    className="absolute top-[17%] w-[270px] sm:w-[300px] md:w-[350px] z-10"
                />

                {/* ✅ ใบไม้ลอยลงมา (ซ้าย-ขวาสลับกัน) */}
                <motion.img
                    src="/image/leaf1.png"
                    alt="Leaf"
                    className="absolute w-[70px] left-[5%]" // ซ้าย
                    initial={{ y: "-180%", rotate: 0 }} // ✅ ปรับให้เริ่มสูงขึ้น
                    animate={{ y: "100vh", rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                <motion.img
                    src="/image/leaf2.png"
                    alt="Leaf"
                    className="absolute w-[60px] right-[10%]" // ขวา
                    initial={{ y: "-130%", rotate: -30 }} // ✅ เริ่มสูงขึ้นกว่าเดิม
                    animate={{ y: "100vh", rotate: 180 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                />

                <motion.img
                    src="/image/leaf3.png"
                    alt="Leaf"
                    className="absolute w-[55px] left-[15%]" // ซ้าย
                    initial={{ y: "-140%", rotate: 15 }} // ✅ เริ่มสูงขึ้นสุด
                    animate={{ y: "100vh", rotate: -90 }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                />

                <motion.img
                    src="/image/leaf4.png"
                    alt="Leaf"
                    className="absolute w-[50px] right-[20%]" // ขวา
                    initial={{ y: "-125%", rotate: 45 }} // ✅ เริ่มสูงขึ้น
                    animate={{ y: "100vh", rotate: -45 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />


                {/* Bottom Buttons Container */}
                <div className="absolute bottom-auto translate-y-[320px] flex items-center gap-2">
                    {/* ECO TYPE INSIGHT Button */}
                    <button
                        className="h-[40px] flex justify-center items-center"
                        onClick={() => handleNextClick(selectedButton)}
                    >
                        <img
                            src="/image/buttoneco.png"
                            alt="ECO TYPE INSIGHT"
                            className="w-full h-full object-contain"
                        />
                    </button>

                    {/* Share Button */}
                    <button
                        className="w-[40px] h-[40px] flex justify-center items-center"
                        onClick={() => {
                            const shareUrl = encodeURIComponent("https://nanyang-ss9w.vercel.app");
                            const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
                            window.location.href = facebookShareUrl;
                        }}
                    >
                        <img src="/image/facebook.png" alt="Share" className="w-full h-full object-contain" />
                    </button>
                    <button
                        className="w-[40px] h-[40px] flex justify-center items-center"
                        onClick={() => {
                            const shareUrl = encodeURIComponent("https://nanyang-ss9w.vercel.app");
                            const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
                            window.location.href = facebookShareUrl;
                        }}
                    >
                        <img src="/image/instagram.png" alt="Share" className="w-full h-full object-contain" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
