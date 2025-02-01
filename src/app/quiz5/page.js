"use client";
import { Kanit } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const kanit = Kanit({ subsets: ['thai'], weight: '700' });
import {useEffect, useState} from 'react';


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
                    src="image/bar5.png"
                    alt="Progress Bar"
                    className="w-full h-full object-contain"
                />
            </div>
            <div
                className="absolute top-[15%] text-center w-full"
                style={{
                    transform: "translateY(-50%)", // ขยับให้สมดุล
                }}
            >
                <h1
                    className={`text-2xl font-bold leading-[1.5] ${kanit.className}`}
                    style={{
                        textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none",
                        color: "#606E56",
                    }}
                >
                    5.เมื่อเสื้อผ้าหมดอายุการใช้งาน
                    <br />เธอคิดว่าควรทำยังไง?
                </h1>
            </div>



            {/* Question Section */}
            <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-8 lg:px-10"
                 style={{
                     transform: "translateY(-50%)", // ขยับให้สมดุล
                 }}
            >
                {[{
                    text: "ส่งคืนโรงงานให้รีไซเคิล",
                    bgColor: "#B5D08B",
                    answer: "A",
                }, {
                    text: "ฝังไว้ในดินให้ธรรมชาติจัดการ",
                    bgColor: "#B5D08B",
                    answer: "B",
                }, {
                    text: "ออกแบบให้เสื้อผ้ามีอายุการใช้งานได้นานที่สุดก่อนส่งต่อ",
                    bgColor: "#B5D08B",
                    answer: "C",
                }].map((button, index) => (
                    <button
                        key={index}
                        onClick={() => handleButtonClick(index, button.answer)}
                        className="w-full h-[40px] px-4 py-2 font-medium"
                        style={{
                            width: "359px",
                            height: "55px",
                            borderRadius: "90px",
                            border: "4px solid #FFF7F0",
                            boxShadow: "0px 4px 0px 0px #0000001A",
                            backgroundColor: selectedButton === index ? "#606E56" : button.bgColor,
                            color:selectedButton === index ? "#FFFFFF" : "#606E56",
                            fontSize: "13px",
                        }}
                    >
                        {button.text}
                    </button>
                ))}
            </div>




            {/* Background Decoration */}
            <div
                className="absolute flex justify-center"
                style={{
                    top: "75%",
                }}
            >
                <div
                    className="w-[146px] h-[133px] sm:w-[180px] sm:h-[160px] md:w-[200px] md:h-[180px] lg:w-[250px] lg:h-[220px]"
                    style={{
                        left: "calc(50% - 73px)",
                    }}
                >
                    <img
                        src="image/tree5.png"
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
        </div>

    );
}
