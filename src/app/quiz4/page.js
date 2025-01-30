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
            router.push("/quiz5");
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
                    src="image/bar4.png"
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
                    4.เธอได้รับโจทย์ให้ผลิตเสื้อผ้า
                    <br />สุดรักษ์โลกสำหรับลูกค้าเจ้าใหญ่
                    <br />จะเลือกทางไหน?
                </h1>
            </div>



            {/* Question Section */}
            <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-8 lg:px-10"
                 style={{
                     transform: "translateY(-50%)", // ขยับให้สมดุล
                 }}
            >
                {[{
                    text: "เสื้อผ้าทำจากผ้ารีไซเคิล ใส่ใจโลกสุดๆ",
                    bgColor: "#B5D08B",
                }, {
                    text: "เสื้อผ้าทำจากวัสดุที่ย่อยสลายได้",
                    bgColor: "#B5D08B",
                }, {
                    text: "เสื้อผ้าผลิตด้วยเทคโนโลยีที่ลดทั้งน้ำและพลังงาน",
                    bgColor: "#B5D08B",
                }].map((button, index) => (
                    <button
                        key={index}
                        onClick={() => handleButtonClick(index)}
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
                    className="w-[146px] h-[133px] sm:w-[180px] sm:h-[160px] md:w-[200px] md:h-[180px] lg:w-[250px] lg:h-[220px]"
                    style={{
                        left: "calc(50% - 73px)",
                    }}
                >
                    <img
                        src="image/tree4.png"
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
