"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Introduction() {
  const [selectedSector, setSelectedSector] = useState(null);
  const [name, setName] = useState("Guest");
  const [workDesc, setWorkDesc] = useState("");
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setName(userData?.name || "Guest");
      setWorkDesc(userData?.workDesc || "");

      const language = Cookies.get("language");
      setIsEnglish(language === "en");
    }
  }, []);

  const handleNextClick = async () => {
    setIsNextClicked(true); // Set the button to active state
    setTimeout(() => setIsNextClicked(false), 200); // Reset after 200ms

    if (!name || !selectedSector || !workDesc) {
      alert(
        isEnglish ? "Please fill out all fields" : "Please fill out all fields"
      );
      return;
    }

    const existingUserData = JSON.parse(localStorage.getItem("userData")) || {};

    const updatedUserData = {
      ...existingUserData,
      companySector: selectedSector,
      jobDesc: workDesc,
    };

    try {
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      console.log("Updated user data saved to localStorage:", updatedUserData);

      const response = await fetch("/api/saveUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        console.log("User data saved successfully");
        router.push("/startquiz");
      } else {
        console.error("Failed to save user data");
      }
    } catch (error) {
      console.error("Error saving user:", error);
      response
        .status(500)
        .json({ message: "Internal server error", error: respons?.message });
    }
  };

  const getSectorImageSrc = (sector) => {
    if (selectedSector === sector) {
      return isEnglish
        ? `/introductionCon/${sector}ActiveEng.png`
        : `/introductionCon/${sector}Active.png`;
    } else {
      return isEnglish
        ? `/introductionCon/${sector}Eng.png`
        : `/introductionCon/${sector}.png`;
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/introductionCon/BG3.png')" }}
    >
      {/* Logo */}
      <div className="absolute top-8 md:top-12 lg:top-16 left-1/2 transform -translate-x-1/2 z-20">
        <img
          src={
            isEnglish
              ? "/introductionCon/1-LogoEng.png"
              : "/introductionCon/Logo3.png"
          }
          alt="Logo"
          className="w-24 md:w-36 lg:w-48"
        />
      </div>

      {/* Introduction Panel */}
      <div className="absolute top-[51%] md:top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <img
            src={
              isEnglish
                  ? "/introductionCon/PanelEN.png"
                  : "/introductionCon/Panel.png"
            }
          alt="Introduction Panel"
          className="w-[320px] sm:w-[360px] md:w-[400px] lg:w-[480px] max-w-none"
        />

        {/* Display the user's name */}
        <div className="absolute top-10 sm:top-14 md:top-14 lg:top-14 left-1/2 transform -translate-x-1/2 text-center">
          <img
            src="/introductionCon/nameLabel.png"
            alt="Name Label"
            className="w-[50px] sm:w-[60px] md:w-[60px] lg:w-[60px] max-w-none"
          />
          <div className="absolute top-[16px] md:top-[16px] lg:top-[16px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#4D7DBF] font-bold text-4xl sm:text-xl md:text-4xl lg:text-4xl">
            {name}
          </div>
        </div>

        {/* Work Description Input Overlay */}
        <div
            className={`absolute ${
                isEnglish ? "top-[190px]" : "top-[204px] sm:top-[234px] md:top-[260px] lg:top-[320px]"
            } left-1/2 transform -translate-x-1/2 w-[280px] sm:w-[280px] md:w-[300px] lg:w-[360px] h-[60px]`}
        >
        <input
            type="text"
            placeholder={
              isEnglish
                ? "Enter your work description"
                : "Entrez votre description de travail"
            }
            value={workDesc}
            onChange={(e) => setWorkDesc(e.target.value)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-transparent border-none focus:outline-none text-[#4D7DBF] text-center placeholder-[#4D7DBF] placeholder-opacity-80"
            style={{ color: "#4D7DBF" }}
          />
        </div>

        {/* Sectors */}
        <div
          className={`absolute top-[380px] sm:top-[410px] md:top-[450px] lg:top-[540px] ${
            isEnglish
              ? "left-[134px] sm:left-[170px] md:left-[184px] lg:left-[200px]"
              : "left-[130px] sm:left-[150px] md:left-[180px] lg:left-[180px]"
          } transform -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[280px] md:w-[300px]`}
        >
          {/* First row */}
          <div
            className={`grid gap-4 ${
              isEnglish
                ? "grid-cols-[80px_58px_0px] sm:grid-cols-[80px_100px_0px] md:grid-cols-[90px_70px_0px] lg:grid-cols-[110px_84px_0px]"
                : "grid-cols-[60px_78px_0px] sm:grid-cols-[70px_80px_0px] md:grid-cols-[80px_90px_0px] lg:grid-cols-[100px_110px_0px]"
            }`}
          >
            {["tech", "finance", "consumerable"].map((sector) => (
              <div
                key={sector}
                className="cursor-pointer"
                onClick={() => setSelectedSector(sector)}
              >
                <img
                  src={getSectorImageSrc(sector)}
                  alt={sector}
                  className="h-9 md:h-10 lg:h-12 w-auto max-w-none"
                />
              </div>
            ))}
          </div>

          {/* Second row */}
          <div
            className={`grid gap-16 mt-4 ${
              isEnglish
                ? "grid-cols-[20px_30px_0px] sm:grid-cols-[22px_80px_32px] md:grid-cols-[36px_44px_0px] lg:grid-cols-[52px_90px_0px]"
                : "grid-cols-[14px_64px_30px] sm:grid-cols-[20px_60px_30px] md:grid-cols-[34px_74px_0px] lg:grid-cols-[50px_100px_0px]"
            }`}
          >
            {["labor", "industrial", "resources"].map((sector) => (
              <div
                key={sector}
                className="cursor-pointer"
                onClick={() => setSelectedSector(sector)}
              >
                <img
                  src={getSectorImageSrc(sector)}
                  alt={sector}
                  className="h-9 md:h-10 lg:h-12 w-auto max-w-none"
                />
              </div>
            ))}
          </div>

          {/* Third row */}
          <div
            className={`grid gap-0 mt-4 ${
              isEnglish
                ? "grid-cols-[112px_0px] sm:grid-cols-[112px_0px] md:grid-cols-[132px_0px] lg:grid-cols-[152px_0px]"
                : "grid-cols-[112px_0px] sm:grid-cols-[110px_0px] md:grid-cols-[120px_0px] lg:grid-cols-[140px_0px]"
            }`}
          >
            {["realEstate", "agriculture"].map((sector) => (
              <div
                key={sector}
                className="cursor-pointer"
                onClick={() => setSelectedSector(sector)}
              >
                <img
                  src={getSectorImageSrc(sector)}
                  alt={sector}
                  className="h-9 md:h-10 lg:h-12 w-auto max-w-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div
        className="absolute bottom-10 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleNextClick}
      >
        <img
          src={
            isNextClicked
              ? "/introductionCon/nextButtonActive.png"
              : "/introductionCon/Next3-CF.png"
          }
          alt="Next Button"
          className="w-16 sm:w-20 md:w-32 lg:w-36"
        />
      </div>

      {/* Footer */}
      <div className="absolute -bottom-8 md:-bottom-24 lg:-bottom-32 left-0 w-full z-20">
        <img src="/introduction/footer2.svg" alt="Footer" className="w-full" />
      </div>
    </div>
  );
}
