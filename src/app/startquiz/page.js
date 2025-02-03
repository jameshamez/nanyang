"use client";
import { Kanit } from "next/font/google";
import { useRouter } from "next/navigation"; // ✅ ใช้ useRouter แทน useNavigate()
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const kanit = Kanit({ subsets: ["thai"], weight: "700" });

export default function QuizPage() {
  const router = useRouter();
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  const handleStartButtonClick = () => {
    setIsButtonActive(true);
    router.push("/quiz1");
  };

  useEffect(() => {
    const language = Cookies.get("language");
    setIsEnglish(language === "en");
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4 relative overflow-hidden"
      style={{
        backgroundImage: "url(/startquiz/BG2PNG.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blue Mist Image */}
      <div className="absolute top-[-200px] sm:top-[-200px] md:top-[-200px] lg:top-[-200px] inset-0 z-10 flex items-center justify-center">
        <img
          src="/startQuiz/blueMist.png"
          alt="Blue Mist"
          className="w-100 sm:w-100 md:w-100 lg:w-100 opacity-40"
        />
      </div>

      {/* Scenario Text Image */}
      <div className="absolute top-[-180px] sm:top-[-180px] md:top-[-180px] lg:top-[-180px] inset-0 z-40 flex items-center justify-center">
        <img
            src={isEnglish ? "/image/scenarioTextEN.png" : "/startQuiz/scenarioText.png"}
            alt="Scenario Text"
            className="w-60 sm:w-80 md:w-[100px] lg:w-[100px]"
        />
      </div>
      {/* ☁️ ก้อนเมฆเคลื่อนไหว */}
      <div className="absolute top-10 left-[-100px] animate-cloudMove z-30">
        <img
          src="/image/cloud.png"
          alt="Cloud 1"
          className="w-[225px] sm:w-[225px] md:w-[250px] lg:w-[300px]"
        />
      </div>

      <div className="absolute top-10 right-[-100px] animate-cloudMove z-30">
        <img
          src="/image/cloud.png"
          alt="Cloud 2"
          className="w-[225px] sm:w-[225px] md:w-[250px] lg:w-[300px]"
        />
      </div>

      <div className="absolute top-40 right-100 animate-cloudMove z-30">
        <img
          src="/image/cloud.png"
          alt="Cloud 2"
          className="w-[104px] sm:w-[104px] md:w-[124px] lg:w-[150px]"
        />
      </div>

      <div className="absolute top-60 left-[-80px] animate-cloudMove z-30">
        <img
          src="/image/cloud.png"
          alt="Cloud 2"
          className="w-[104px] sm:w-[104px] md:w-[124px] lg:w-[150px]"
        />
      </div>

      <div className="absolute top-[560px] left-[30px] animate-cloudMove z-30">
        <img
          src="/image/cloud.png"
          alt="Cloud 2"
          className="w-[89px] sm:w-[89px] md:w-[109px] lg:w-[120px]"
        />
      </div>

      <div className="absolute top-[615px] left-[200px] animate-cloudMove z-30">
        <img
          src="/image/cloud.png"
          alt="Cloud 2"
          className="w-[150px] sm:w-[150px] md:w-[175px] lg:w-[200px]"
        />
      </div>

      {/* 🌿 ใบไม้โยกไปมา */}
      <div className="absolute bottom-0 left-[-5px] animate-leafSwing z-30">
        <img
          src="/image/leafleft.png"
          alt="Leaf 1"
          className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px]"
        />
      </div>

      <div className="absolute bottom-0 right-[-5px] animate-leafSwing z-30">
        <img
          src="/image/leafright.png"
          alt="Leaf 1"
          className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px]"
        />
      </div>

      {/* Bottom Buttons Container */}
      <div className="absolute bottom-auto translate-y-[130px] flex items-center gap-2 z-50">
        <button
          className="w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] flex justify-center items-center"
          onClick={handleStartButtonClick}
        >
          <img
            src={
              isButtonActive
                ? "/startQuiz/buttonstartActive.png"
                : "/startQuiz/buttonstart.png"
            }
            alt="ECO TYPE INSIGHT"
            className="w-full h-full object-contain"
          />
        </button>
      </div>

      {/* เพิ่ม CSS animations */}
      <style jsx>{`
        @keyframes cloudMove {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(50px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-cloudMove {
          animation: cloudMove 10s infinite linear;
        }

        @keyframes leafSwing {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(5deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        .animate-leafSwing {
          animation: leafSwing 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
