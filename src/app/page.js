"use client";

import { useState } from 'react';
import Cookies from 'js-cookie';
export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const handleLanguageChange = () => {
    const newLanguage = !isEnglish;
    setIsEnglish(newLanguage);
    Cookies.set('language', newLanguage ? 'en' : 'fr', { expires: 7 }); // Set cookie for 7 days
  };
  useEffect(() => {
    // ตรวจสอบ User Agent
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isLineBrowser = /Line/i.test(userAgent);

    // ถ้าเปิดจาก LINE ให้ Redirect ไป Chrome หรือ Safari
    if (isLineBrowser) {
      const url = window.location.href; // URL ปัจจุบัน
      alert("กรุณาเปิดเว็บไซต์ใน Chrome หรือ Safari เพื่อใช้งานได้เต็มที่!");

      // ลองเปิด Chrome บน iOS / Android
      if (/iPhone|iPad|iPod/i.test(userAgent)) {
        window.location.href = `googlechrome://${url.replace("https://", "").replace("http://", "")}`;
      } else if (/android/i.test(userAgent)) {
        window.location.href = `intent://${url.replace("https://", "").replace("http://", "")}#Intent;scheme=https;package=com.android.chrome;end;`;
      }
    }
  }, []);
  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/index/1-BG.svg')" }}
    >
      {/* Clouds */}
      <img
        src="/index/1-cloud1.svg"
        alt="Cloud 1"
        className="absolute top-[5%] left-[5%] w-[40%] max-w-[160px] animate-cloud-move"
        style={{ animationDelay: "0.5s" }}
      />
      <img
        src="/index/1-cloud2.svg"
        alt="Cloud 2"
        className="absolute top-[10%] right-[5%] w-[48%] max-w-[200px] animate-cloud-move"
        style={{ animationDelay: "1s" }}
      />
      <img
        src="/index/1-cloud3.svg"
        alt="Cloud 3"
        className="absolute top-[20%] left-[10%] w-[36%] max-w-[140px] animate-cloud-move"
        style={{ animationDelay: "1.5s" }}
      />
      <img
        src="/index/1-cloud4.svg"
        alt="Cloud 4"
        className="absolute top-[30%] right-[5%] w-[44%] max-w-[180px] animate-cloud-move"
        style={{ animationDelay: "2s" }}
      />

      {/* Language Button (Top Right) */}
      <div className="absolute top-8 right-8 z-20 md:top-6 md:right-6">
        <img
          src={isEnglish ? "/index/ThButton.png" : "/index/EnButton.png"}
          alt="Change Language"
          className="w-10 md:w-12 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLanguageChange}
        />
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col justify-center items-center relative z-10">
        {/* Logo with Magnifying Glass */}
        <div className="relative">
          {/* Logo */}
          <img
            src={isEnglish ? "/index/1-LogoEng.png" : "/index/1-Logo.png"}
            alt="Eco Quiz Logo"
            className="mx-auto mb-8 md:mb-16 w-[80%] max-w-[600px] animate-logo-bounce"
          />

          {/* Magnifying Glass */}
          <img
            src="/index/1-Zoom.svg"
            alt="Magnifying Glass"
            className="absolute top-[20%] right-[-20%] w-[100%] max-w-[800px] animate-magnifying-glass"
          />
        </div>

        <a
          href="/introduction"
          className="inline-block hover:opacity-80 transition-opacity mt-16 md:mt-20 lg:mt-24 hover:scale-110 transition-transform duration-300 z-10"
          onClick={handleClick}
        >
          <img
            src={isClicked ? "/index/nextButtonActive.png" : "/index/1-Next.svg"}
            alt="Next"
            className="w-24 md:w-28 lg:w-32"
          />
        </a>
      </div>

      {/* Footer */}
      <img
        src="/index/1-Footer.svg"
        alt="Footer"
        className="absolute bottom-0 left-0 w-full"
      />
    </div>
  );
}