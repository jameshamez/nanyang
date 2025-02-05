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
            src={isEnglish ? "/image/ecoscore1EN.png" : "/image/ecoscore1.png"}
            alt="Eco Score Card"
            className="w-[250px] sm:w-[250px] md:w-[300px] lg:w-[450px]"
          />

          {/* Bottom Buttons Container */}
          <div className="flex items-center gap-2">
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
              onClick={() => {
                const facebookShareUrl = `https://www.facebook.com/dialog/feed?app_id=653004017158901&display=popup&link=${encodeURIComponent("https://nanyang-james24.vercel.app")}&picture=${encodeURIComponent("https://nanyang-jl85.vercel.app/image/ecoscore1.png")}&name=${encodeURIComponent("นี่คือหัวข้อโพสต์")}&caption=${encodeURIComponent("ตัวอย่างโพสต์จาก Graph API")}&description=${encodeURIComponent("นี่คือรายละเอียดของโพสต์")}&redirect_uri=${encodeURIComponent("https://nanyang-jl85.vercel.app/callback")}`;
                window.open(facebookShareUrl, "_blank", "width=600,height=400");
              }}
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
              onClick={() => {
                const shareUrl = "https://nanyang-jl85.vercel.app"; // 🔗 URL ของเกม
                const instagramStoryUrl = `https://www.instagram.com/stories/create?url=${encodeURIComponent(
                  shareUrl
                )}`;
                window.open(instagramStoryUrl, "_blank");
              }}
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