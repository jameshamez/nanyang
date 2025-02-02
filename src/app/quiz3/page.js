"use client";
import { Kanit } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const kanit = Kanit({ subsets: ['thai'], weight: '700' });
import {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import Cookies from "js-cookie";


export default function QuizPage() {

    const router = useRouter();
    const [selectedButton, setSelectedButton] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true); // ✅ สร้าง state เพื่อเช็คว่าโหลด `userId` เสร็จหรือยัง

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
                    question_no: 3,
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
    const handleNextClick = () => {
        if (selectedButton !== null) {
            router.push("/quiz4");
        } else {
            alert("กรุณาเลือกคำตอบก่อน");
        }
    };
    const [isEnglish, setIsEnglish] = useState(false);


    useEffect(() => {
        const language = Cookies.get("language");
        setIsEnglish(language === "en");
    }, []);
    return (
        <div
            className={`flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4 relative ${kanit.className}`} // ใช้ฟอนต์ Kanit
            style={{
                backgroundImage: "url(/image/bgquiz.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Top Bar with Image */}
            <div
                className="absolute left-5 top-10 sm:left-10 sm:top-8 md:left-20 md:top-12"
                style={{
                    width: "90%",
                    maxWidth: "400px",
                    height: "10px",
                    borderRadius: "20px 0 0 0",
                }}
            >
                <img
                    src="image/bar3.png"
                    alt="Progress Bar"
                    className="w-full h-full object-contain"
                />
            </div>
            <div
                className="absolute top-[20%] text-center w-full"
                style={{
                    transform: "translateY(-50%)", // ขยับให้สมดุล
                }}
            >
                <img
                    src={isEnglish ? "/image/q3EN.png" : "/image/q3.png"} // ✅ เปลี่ยนรูปตาม isEnglish
                    alt="คำถามที่ 1"
                    className="mx-auto h-auto"
                />
            </div>


            {/* Question Section */}
            <div
                className="space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-8 lg:px-10"
                style={{
                    transform: "translateY(-30%)", // ขยับให้สมดุล
                }}
            >
                {[
                    { img: isEnglish ? "/image/3optionA_en.png" : "/image/3optionA.png", imgSelected: isEnglish ? "/image/3optionA_selected_en.png" : "/image/3optionA_selected.png", answer: "A" },
                    { img: isEnglish ? "/image/3optionB_en.png" : "/image/3optionB.png", imgSelected: isEnglish ? "/image/3optionB_selected_en.png" : "/image/3optionB_selected.png", answer: "B" },
                    { img: isEnglish ? "/image/3optionC_en.png" : "/image/3optionC.png", imgSelected: isEnglish ? "/image/3optionC_selected_en.png" : "/image/3optionC_selected.png", answer: "C" }
                ].map((button, index) => (
                    <motion.img
                        key={index}
                        src={selectedButton === index ? button.imgSelected : button.img} // ✅ เปลี่ยนรูปเมื่อเลือก
                        alt={`Option ${button.answer}`}
                        onClick={() => handleButtonClick(index, button.answer)}
                        className="cursor-pointer w-[359px] h-[55px] transition-opacity duration-300"
                        whileTap={{ scale: 0.9 }} // ✅ ทำให้เด้งลงเล็กน้อยเมื่อคลิก
                    />
                ))}
            </div>

            {/* หยดน้ำที่ค่อยๆ หยดลงมา */}
            <div className="absolute bottom-[280px] left-[50%] animate-drop" style={{ animationDelay: "0.1s" }}>
                <img src="/image/drop.png" alt="หยดน้ำ" className="w-7 h-7" />
            </div>
            <div className="absolute bottom-[250px] left-[40%] animate-drop" style={{ animationDelay: "0.3s" }}>
                <img src="/image/drop.png" alt="หยดน้ำ" className="w-6 h-6" />
            </div>
            <div className="absolute bottom-[230px] right-[40%] animate-drop" style={{ animationDelay: "0.5s" }}>
                <img src="/image/drop.png" alt="หยดน้ำ" className="w-4 h-4" />
            </div>
            <div className="absolute bottom-[150px] right-[40%] animate-drop" style={{ animationDelay: "0.8s" }}>
                <img src="/image/drop.png" alt="หยดน้ำ" className="w-4 h-4" />
            </div>


            {/* Background Decoration */}
            <div
                className="absolute flex justify-center"
                style={{
                    top: "75%",
                }}
            >
                <div
                    className="w-[146px] h-[131px] sm:w-[180px] sm:h-[160px] md:w-[200px] md:h-[180px] lg:w-[250px] lg:h-[220px]"
                    style={{
                        left: "calc(50% - 73px)",
                    }}
                >
                    <img
                        src="image/tree3.png"
                        alt="Plant illustration"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            <footer className="absolute bottom-0 w-full px-0 flex flex-col items-center">
                <button
                    onClick={() => handleNextClick(selectedButton)}
                    aria-label="Next"
                    className="mb-[-30px]"
                >
                    <img
                        src="image/next1.png"
                        alt="Footer Decoration"
                        className="max-w-[60px] max-h-[60px] object-cover"
                    />
                </button>
                <div className="w-full">
                    <img
                        src="image/footer.png"
                        alt="Footer Decoration"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </footer>
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
