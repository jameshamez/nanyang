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
            className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-4 relative"
            style={{
                backgroundImage: "url(/image/score3.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Bottom Buttons Container */}
            <div className="absolute bottom-auto translate-y-[260px] flex items-center gap-2">
                {/* ECO TYPE INSIGHT Button */}
                <button
                    className="w-[196px] h-[60px] flex justify-center items-center"
                    onClick={() => console.log('Navigate to eco-type-insight')}
                >
                    <img
                        src="/image/buttoneco.png"
                        alt="ECO TYPE INSIGHT"
                        className="w-full h-full object-contain"
                    />
                </button>

                {/* Share Button */}
                <button
                    className="w-[60px] h-[60px] flex justify-center items-center"
                    onClick={() => console.log('Navigate to share')}
                >
                    <img
                        src="/image/share.png"
                        alt="Share"
                        className="w-full h-full object-contain"
                    />
                </button>
            </div>
        </div>
    );
}

