"use client";
import { Kanit } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
const kanit = Kanit({ subsets: ["thai"], weight: "700" });
import { useEffect, useState } from "react";
import Head from "next/head";
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
    const shareToInstagram = async () => {
        const imageUrl = isEnglish
            ? "https://nanyang-james24.vercel.app/image/bgeco4EN.jpg"
            : "https://nanyang-james24.vercel.app/image/bgeco4.jpg";

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], isEnglish ? "bgeco4EN.jpg" : "bgeco4.jpg", { type: "image/png" });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: isEnglish ? "Share My Eco Score!" : "แชร์ Eco Score ของฉัน!",
                    text: isEnglish ? "Check your Eco Score now!" : "เช็คคะแนน Eco Score ของคุณเลย!",
                    files: [file],
                });
            } else {
                alert(isEnglish ? "Your browser doesn't support file sharing!" : "เบราว์เซอร์ของคุณไม่รองรับการแชร์ไฟล์!");
            }
        } catch (error) {
            console.error(isEnglish ? "An error occurred:" : "เกิดข้อผิดพลาด:", error);
        }
    };
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
          backgroundImage: "url(/image/score1.png)",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        {/* Container that centers content both vertically and horizontally */}
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 z-10">
          {/* Eco Score Card Image */}
          <img
            src={isEnglish ? "/image/ecoscore4EN.png" : "/image/ecoscore4.png"}
            alt="Eco Score Card"
            className="w-[250px] sm:w-[250px] md:w-[300px] lg:w-[450px]"
          />

          {/* Bottom Buttons Container */}
            <div className="flex items-center gap-2 pb-6 sm:pb-8 md:pb-10 lg:pb-12">

                {/* ECO TYPE INSIGHT Button */}
                <button
                    className="h-[40px] sm:h-[40px] md:h-[55px] lg:h-[80px] flex justify-center items-center"
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
                    className="h-[40px] sm:h-[40px] md:h-[55px] lg:h-[80px] flex justify-center items-center"
                    onClick={shareToInstagram}
                >
                    <img
                        src="/image/facebook.png"
                        alt="Share"
                        className="w-full h-full object-contain"
                    />
                </button>

                {/* Instagram Share Button */}
                <button
                    className="h-[40px] sm:h-[40px] md:h-[55px] lg:h-[80px] flex justify-center items-center"
                    onClick={shareToInstagram}
                >
                    <img
                        src="/image/instagram.png"
                        alt="Share to Instagram"
                        className="w-full h-full object-contain"
                    />
                </button>
            </div>
        </div>

        {/* ✅ ใบไม้ลอยลงมา (ซ้าย-ขวาสลับกัน) */}
        <motion.img
          src="/image/leaf1.png"
          alt="Leaf"
          className="absolute w-[50px] sm:w-[50px] md:w-[60px] lg:w-[70px] top-[0%] left-[5%]"
          initial={{ y: "-180%", rotate: 0 }} // ✅ ปรับให้เริ่มสูงขึ้น
          animate={{ y: "100vh", rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        <motion.img
          src="/image/leaf2.png"
          alt="Leaf"
          className="absolute w-[40px] sm:w-[40px] md:w-[50px] lg:w-[60px] top-[0%] right-[10%]"
          initial={{ y: "-200%", rotate: -30 }} // ✅ เริ่มสูงขึ้นกว่าเดิม
          animate={{ y: "100vh", rotate: 180 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />

        <motion.img
          src="/image/leaf3.png"
          alt="Leaf"
          className="absolute w-[35px] sm:w-[35px] md:w-[40px] lg:w-[45px] top-[0%] left-[15%]"
          initial={{ y: "-140%", rotate: 15 }} // ✅ เริ่มสูงขึ้นสุด
          animate={{ y: "100vh", rotate: -90 }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        />

        <motion.img
          src="/image/leaf4.png"
          alt="Leaf"
          className="absolute w-[30px] sm:w-[30px] md:w-[35px] lg:w-[40px] top-[0px] right-[20%]"
          initial={{ y: "-125%", rotate: 45 }} // ✅ เริ่มสูงขึ้น
          animate={{ y: "100vh", rotate: -45 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
