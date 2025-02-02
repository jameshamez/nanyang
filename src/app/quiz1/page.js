"use client";
import { Kanit } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
const kanit = Kanit({ subsets: ["thai"], weight: "700" });
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function QuizPage() {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isNextButtonActive, setIsNextButtonActive] = useState(false); // State for button press effect

  // ✅ ดึง `_id` จาก Cookie
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
      }
    }
    fetchUserId();
  }, []);

  // ✅ ฟังก์ชันบันทึกคำตอบ
  const handleButtonClick = async (index, answer) => {
    setSelectedButton(index); // ✅ อัปเดต state ก่อนส่ง API

    if (!userId) {
    }

    try {
      const response = await fetch("/api/save-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          question_no: 1,
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

  // ✅ ฟังก์ชันเมื่อคลิกปุ่ม Next
  const handleNextClick = (selectedButton) => {
    if (selectedButton !== null) {
      setIsNextButtonActive(true); // Set button to active state
      router.push("/quiz2"); // Navigate after a short delay
    } else {
      alert("กรุณาเลือกคำตอบก่อน");
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
        <img src="image/bar1.png" alt="Progress Bar" className="w-full" />
      </div>

      {/* Question Section */}
      <div
        className="absolute top-[20%] text-center w-full"
        style={{
          transform: "translateY(-50%)", // ขยับให้สมดุล
        }}
      >
        <img
          src="/image/q1.png" // 🔹 เปลี่ยนเป็น Path ของ PNG
          alt="คำถามที่ 1"
          className="w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] mx-auto"
        />
      </div>

      {/* Options Section */}
      <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-8 lg:px-10 absolute transform -translate-y-[40%] sm:-translate-y-[40%] md:-translate-y-[45%] w-full">
        {[
          {
            img: "/image/1optionA.png",
            imgSelected: "/image/1optionA_selected.png",
            answer: "A",
          },
          {
            img: "/image/1optionB.png",
            imgSelected: "/image/1optionB_selected.png",
            answer: "B",
          },
          {
            img: "/image/1optionC.png",
            imgSelected: "/image/1optionC_selected.png",
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

      {/* หยดน้ำที่ค่อยๆ หยดลงมา */}
      <div
        className="absolute bottom-[280px] md:bottom-[380px] lg:bottom-[480px] left-[50%] animate-drop"
        style={{ animationDelay: "0.1s" }}
      >
        <img src="/image/drop.png" alt="หยดน้ำ" className="w-7 h-7" />
      </div>
      <div
        className="absolute bottom-[250px] md:bottom-[350px] lg:bottom-[450px] left-[40%] animate-drop"
        style={{ animationDelay: "0.3s" }}
      >
        <img src="/image/drop.png" alt="หยดน้ำ" className="w-6 h-6" />
      </div>
      <div
        className="absolute bottom-[230px] md:bottom-[330px] lg:bottom-[430px] right-[40%] animate-drop"
        style={{ animationDelay: "0.5s" }}
      >
        <img src="/image/drop.png" alt="หยดน้ำ" className="w-4 h-4" />
      </div>
      <div
        className="absolute bottom-[150px] md:bottom-[250px] lg:bottom-[350px] right-[40%] animate-drop"
        style={{ animationDelay: "0.8s" }}
      >
        <img src="/image/drop.png" alt="หยดน้ำ" className="w-4 h-4" />
      </div>

      {/* Background Decoration */}
      <div
        className="absolute flex justify-center"
        style={{
          top: "75%",
        }}
      >
        <div className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] bottom-[-120px] sm:bottom-[-120px] md:bottom-[-76px] lg:bottom-[-100px] absolute">
          <img
            src="image/tree.png"
            alt="Plant illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Footer */}
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
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes drop {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(50px);
            opacity: 0;
          }
        }

        .animate-drop {
          animation: drop 1s infinite linear;
        }
      `}</style>
    </div>
  );
}