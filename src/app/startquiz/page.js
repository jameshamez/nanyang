"use client";
import { Kanit } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const kanit = Kanit({ subsets: ['thai'], weight: '700' });
import { useState } from 'react';





export default function QuizPage() {

    const router = useRouter();
    const handleNextClick = (selectedButton) => {
        if (selectedButton !== null) {
            router.push("/quiz3");
        } else {
            alert("Please select an option before proceeding.");
        }
    };
    const [selectedButton, setSelectedButton] = useState(null);
    const handleButtonClick = (index) => {
        setSelectedButton(index);
    };
    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4 relative overflow-hidden"
            style={{
                backgroundImage: "url(/image/score2.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* ☁️ ก้อนเมฆเคลื่อนไหว */}
            <div className="absolute top-10 left-0 animate-cloudMove">
                <img src="/image/cloud.png" alt="Cloud 1" className="w-32 h-auto opacity-70" />
            </div>

            <div className="absolute top-20 right-10 animate-cloudMove">
                <img src="/image/cloud.png" alt="Cloud 2" className="w-40 h-auto opacity-70" />
            </div>

            {/* 🌿 ใบไม้โยกไปมา */}
            <div className="absolute bottom-10 left-5 w-24 h-24 bg-green-500 rounded-full animate-leafSwing"></div>
            <div className="absolute bottom-10 right-5 w-24 h-24 bg-green-600 rounded-full animate-leafSwing"></div>

            {/* Bottom Buttons Container */}
            <div className="absolute bottom-auto translate-y-[260px] flex items-center gap-2">
                <button
                    className="w-[196px] h-[60px] flex justify-center items-center"
                    onClick={() => console.log("Navigate to eco-type-insight")}
                >
                    <img
                        src="/image/buttoneco.png"
                        alt="ECO TYPE INSIGHT"
                        className="w-full h-full object-contain"
                    />
                </button>

                <button
                    className="w-[60px] h-[60px] flex justify-center items-center"
                    onClick={() => console.log("Navigate to share")}
                >
                    <img
                        src="/image/share.png"
                        alt="Share"
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

