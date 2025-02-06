"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

export default function QuizPage() {
  const router = useRouter();
  const handleNextClick = () => {
    router.push("/Ecoinsight");
  };

  const [isEnglish, setIsEnglish] = useState(false);
  useEffect(() => {
    const language = Cookies.get("language");
    setIsEnglish(language === "en");
  }, []);

  const shareToInstagramStories = () => {
    const imageUrl = "https://nanyang-james24.vercel.app/image/ecoscore1.png";
    const stickerUrl = "https://nanyang-james24.vercel.app";

    if (/android/i.test(navigator.userAgent)) {
      const intentUrl = `intent://create/story?background_image_url=${encodeURIComponent(imageUrl)}&sticker_url=${encodeURIComponent(stickerUrl)}#Intent;package=com.instagram.android;scheme=instagram;end`;
      window.location.href = intentUrl;
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      const iosUrl = `instagram-stories://share?background_image_url=${encodeURIComponent(imageUrl)}&sticker_url=${encodeURIComponent(stickerUrl)}`;
      window.location.href = iosUrl;
    } else {
      alert("Instagram Story Sharing รองรับเฉพาะบนมือถือเท่านั้น!");
    }
  };

  return (
      <AnimatePresence mode="wait">
        <motion.div
            key="quiz-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center min-h-[100dvh] bg-blue-50 px-4 relative"
            style={{
              backgroundImage: "url(/image/score1.png)",
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              paddingBottom: "env(safe-area-inset-bottom)", // ✅ รองรับ Safe Area ของ iPhone XR
            }}
        >
          {/* ✅ Container ให้เนื้อหากลางหน้าจอเสมอ */}
          <div className="flex flex-col justify-center items-center gap-4 z-10 w-full max-w-md">
            {/* ✅ Eco Score Card */}
            <img
                src={isEnglish ? "/image/ecoscore1EN.png" : "/image/ecoscore1.png"}
                alt="Eco Score Card"
                className="w-[70%] max-w-[450px]"
            />

            {/* ✅ ปุ่มต่าง ๆ */}
            <div className="flex items-center justify-center gap-2">
              {/* ปุ่ม ECO TYPE INSIGHT */}
              <button className="w-13 h-11 sm:w-20 sm:h-20 flex justify-center items-center p-0" onClick={handleNextClick}>
                <img src="/image/buttoneco.png" alt="ECO TYPE INSIGHT" className="w-full h-full" />
              </button>

              {/* ปุ่มแชร์ Facebook */}
              <button
                  className="w-11 h-11 sm:w-20 sm:h-20 flex justify-center items-center p-0"
                  onClick={() => {
                    const facebookShareUrl = `https://www.facebook.com/dialog/feed?app_id=653004017158901&display=popup&link=${encodeURIComponent(
                        "https://nanyang-19r9.vercel.app"
                    )}&picture=${encodeURIComponent("https://nanyang-jl85.vercel.app/image/ecoscore1.png")}&name=${encodeURIComponent(
                        "นี่คือหัวข้อโพสต์"
                    )}&caption=${encodeURIComponent("ตัวอย่างโพสต์จาก Graph API")}&description=${encodeURIComponent(
                        "นี่คือรายละเอียดของโพสต์"
                    )}&redirect_uri=${encodeURIComponent("https://nanyang-jl85.vercel.app/callback")}`;
                    window.open(facebookShareUrl, "_blank", "width=600,height=400");
                  }}
              >
                <img src="/image/facebook.png" alt="Share" className="w-full h-full" />
              </button>

              {/* ปุ่มแชร์ Instagram */}
              <button className="w-11 h-11 sm:w-20 sm:h-20 flex justify-center items-center p-0" onClick={shareToInstagramStories}>
                <img src="/image/instagram.png" alt="Share to Instagram" className="w-full h-full" />
              </button>
            </div>

          </div>

          {/* ✅ ใบไม้ลอยลงมา (Animation) */}
          <motion.img
              src="/image/leaf1.png"
              alt="Leaf"
              className="absolute w-12 top-0 left-[5%]"
              initial={{ y: "-180%", rotate: 0 }}
              animate={{ y: "100vh", rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>
  );
}
