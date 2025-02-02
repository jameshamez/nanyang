"use client";
import { Kanit } from "next/font/google";
import { useRouter } from "next/navigation"; // ✅ ใช้ useRouter แทน useNavigate()
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

const kanit = Kanit({ subsets: ["thai"], weight: "700" });

export default function QuizPage() {
    const router = useRouter(); // ✅ ใช้ useRouter() แทน useNavigate()

    const handleNextClick = (selectedButton) => {
        if (selectedButton !== null) {
            router.push("/quiz3"); // ✅ ใช้ router.push() แทน navigate()
        } else {
            alert("Please select an option before proceeding.");
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
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4 relative overflow-hidden"
            style={{
                backgroundImage: `url(${isEnglish ? "/image/startquizEN.jpg" : "/image/startquiz.png"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* ☁️ ก้อนเมฆเคลื่อนไหว */}
            <div className="absolute top-10 left-[-100px] animate-cloudMove">
                <img src="/image/cloud.png" alt="Cloud 1" className="w-[225px] h-[60px]" />
            </div>

            <div className="absolute top-10 right-[-100px] animate-cloudMove">
                <img src="/image/cloud.png" alt="Cloud 2" className="w-[225px] h-[60px]" />
            </div>

            <div className="absolute top-40 right-100 animate-cloudMove">
                <img src="/image/cloud.png" alt="Cloud 2" className="w-[104px] h-[28px]" />
            </div>

            <div className="absolute top-60 left-[-80px] animate-cloudMove">
                <img src="/image/cloud.png" alt="Cloud 2" className="w-[104px] h-[28px]" />
            </div>

            <div className="absolute top-[560px] left-[30px] animate-cloudMove">
                <img src="/image/cloud.png" alt="Cloud 2" className="w-[104px] h-[28px]" />
            </div>

            <div className="absolute top-[615px] left-[200px] animate-cloudMove">
                <img src="/image/cloud.png" alt="Cloud 2" className="w-[150px] h-[40px]" />
            </div>

            {/* 🌿 ใบไม้โยกไปมา */}
            <div className="absolute bottom-0 left-[-15px] animate-leafSwing">
                <img src="/image/leafleft.png" alt="Leaf 1" />
            </div>

            <div className="absolute bottom-0 right-[-15px] animate-leafSwing">
                <img src="/image/leafright.png" alt="Leaf 1" />
            </div>

            {/* Bottom Buttons Container */}
            <div className="absolute bottom-auto translate-y-[130px] flex items-center gap-2">
                <button
                    className="w-[196px] h-[60px] flex justify-center items-center"
                    onClick={() => router.push("/quiz1")} // ✅ ใช้ router.push() แทน navigate()
                >
                    <img
                        src="/image/buttonstart.png"
                        alt="ECO TYPE INSIGHT"
                        className="w-full h-full object-contain"
                    />
                </button>
            </div>

            {/* เพิ่ม CSS animations */}
            <style jsx>{`
        @keyframes cloudMove {
          0% { transform: translateX(0); }
          50% { transform: translateX(50px); }
          100% { transform: translateX(0); }
        }
        .animate-cloudMove {
          animation: cloudMove 10s infinite linear;
        }

        @keyframes leafSwing {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-leafSwing {
          animation: leafSwing 3s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
}
