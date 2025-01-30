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
                backgroundImage: "url(/image/insight.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

        </div>
    );
}

