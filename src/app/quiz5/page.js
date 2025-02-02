"use client";
import { Kanit } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
const kanit = Kanit({ subsets: ["thai"], weight: "700" });
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function QuizPage() {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // ✅ สร้าง state เพื่อเช็คว่าโหลด `userId` เสร็จหรือยัง
  const [isNextButtonActive, setIsNextButtonActive] = useState(false); // State for button press effect

  // ✅ ดึง `_id` จาก Cookie และป้องกันการเรียก API ซ้ำ
  useEffect(() => {
    async function fetchUserId() {
      try {
        const res = await fetch("/api/getUser");
        if (res.ok) {
          const data = await res.json();
          setUserId(data._id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoadingUser(false); // ✅ โหลดเสร็จแล้ว
      }
    }
    fetchUserId();
  }, []);

  // ✅ ฟังก์ชันบันทึกคำตอบ
  const handleButtonClick = async (index, answer) => {
    if (!userId) {
    }

    setSelectedButton(index); // ✅ อัปเดต state ก่อนส่ง API

    try {
      const response = await fetch("/api/save-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          question_no: 5,
          answer,
        }),
      });

      if (!response.ok) {
        console.error("Failed to save answer");
      }
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  };

  // ✅ ฟังก์ชันกดปุ่ม Next
  const handleNextClick = async () => {
    if (selectedButton === null) {
      alert("กรุณาเลือกคำตอบก่อน");
      return;
    }

    if (!userId) {
    }

    try {
      // ✅ 1. เรียก API คำนวณกลุ่ม
      setIsNextButtonActive(true); // Set button to active state
      const response = await fetch("/api/calculate-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ User assigned to group:", data.targetPage);

        // ✅ 2. นำทางไปหน้าที่เหมาะสม
        router.push(data.targetPage);
      } else {
        console.error("❌ Failed to assign group");
        alert("เกิดข้อผิดพลาดในการคำนวณ กรุณาลองใหม่");
      }
    } catch (error) {
      console.error("❌ Error calculating group:", error);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4 relative ${kanit.className}`} // ใช้ฟอนต์ Kanit
      style={{
        backgroundImage: "url(/image/bgquiz.png)",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      {/* Top Bar with Image */}
      <div className="absolute top-10 w-[90%]">
        <img src="image/bar5.png" alt="Progress Bar" className="w-full" />
      </div>
      <div
        className="absolute top-[20%] text-center w-full"
        style={{
          transform: "translateY(-50%)", // ขยับให้สมดุล
        }}
      >
        <img
          src="/image/q5.png" // 🔹 เปลี่ยนเป็น Path ของ PNG
          alt="คำถามที่ 1"
          className="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] mx-auto"
        />
      </div>

      {/* Question Section */}
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-8 lg:px-10 absolute transform -translate-y-[40%] sm:-translate-y-[40%] md:-translate-y-[35%] w-full">
        {[
          {
            img: "/image/5optionA.png",
            imgSelected: "/image/5optionA_selected.png",
            answer: "A",
          },
          {
            img: "/image/5optionB.png",
            imgSelected: "/image/5optionB_selected.png",
            answer: "B",
          },
          {
            img: "/image/5optionC.png",
            imgSelected: "/image/5optionC_selected.png",
            answer: "C",
          },
        ].map((button, index) => (
          <motion.img
            key={index}
            src={selectedButton === index ? button.imgSelected : button.img} // ✅ เปลี่ยนรูปเมื่อเลือก
            alt={`Option ${button.answer}`}
            onClick={() => handleButtonClick(index, button.answer)}
            className="cursor-pointer w-[300px] sm:w-[300px] md:w-[500px] lg:w-[700px] transition-opacity duration-300 mx-auto"
            whileTap={{ scale: 0.9 }} // ✅ ทำให้เด้งลงเล็กน้อยเมื่อคลิก
          />
        ))}
      </div>

      {/* Background Decoration */}
      <div
        className="absolute flex justify-center"
        style={{
          top: "75%",
        }}
      >
        <div className="w-[240px] sm:w-[240px] md:w-[270px] lg:w-[330px] bottom-[-110px] sm:bottom-[-110px] md:bottom-[-76px] lg:bottom-[-100px] left-[-108px] sm:left-[-108px] md:left-[-122px] lg:left-[-140px] absolute">
          <img
            src="image/tree5.png"
            alt="Plant illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="absolute w-full bottom-[60px] sm:bottom-[60px] md:bottom-[80px] lg:bottom-[100px] px-0 flex flex-col items-center z-50">
        <button
          onClick={() => handleNextClick(selectedButton)}
          aria-label="Next"
          className="mb-[-30px]"
        >
          <img
            src={
              isNextButtonActive
                ? "image/nextButtonActive.png"
                : "image/next1.png"
            } // ✅ เปลี่ยนรูปเมื่อคลิก
            alt="Footer Decoration"
            className="w-[60px] sm:w-[60px] md:w-[120px] lg:w-[140px]"
          />
        </button>
      </div>
      <div className="absolute w-full bottom-0">
      <img
          src="image/footer.png"
          alt="Footer Decoration"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}