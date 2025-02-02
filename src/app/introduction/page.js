"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Introduction() {
  const [name, setName] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const language = Cookies.get("language");
    setIsEnglish(language === "en");
  }, []);

  const handleNextClick = async () => {
    setIsNextClicked(true);
    setTimeout(() => setIsNextClicked(false), 200); // Reset after 200ms

    if (!name || !selectedGender || !selectedAge || !selectedOccupation) {
      alert(
        isEnglish
          ? "Please fill out all fields"
          : "Please fill out all fields"
      );
      return;
    }

    const userData = {
      name,
      gender: selectedGender,
      age: selectedAge,
      occupation: selectedOccupation,
      jobDesc: selectedOccupation === "student" ? null : null,
      companySector: selectedOccupation === "student" ? null : null,
    };

    if (selectedOccupation === "student") {
      try {
        const response = await fetch("/api/saveUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("User data saved successfully:", data);
          router.push("/startquiz");
        } else {
          console.error("Failed to save user data:", data.message);
        }
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    } else {
      try {
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log("User data saved to localStorage:", userData);
        router.push("/introductionCon");
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        alert(
          isEnglish
            ? "Failed to save data. Please try again."
            : "Failed to save data. Please try again."
        );
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/introduction/BG2.png')" }}
    >
      {/* Logo */}
      <div className="absolute top-8 sm:top-8 md:top-12 lg:top-16 left-1/2 transform -translate-x-1/2 z-20">
        <img
          src={
            isEnglish
              ? "/introduction/1-LogoEng.png"
              : "/introduction/logo2PNG.png"
          }
          alt="Logo"
          className="w-20 sm:24 md:w-36 lg:w-48"
        />
      </div>

      {/* Introduction Panel */}
      <div className="absolute top-[51%] md:top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <img
          src="/introduction/introductionPanel.svg"
          alt="Introduction Panel"
          className="w-[320px] sm:w-[360px] md:w-[400px] lg:w-[480px] max-w-none"
        />

        {/* Name Label */}
        <div className="absolute top-5 sm:top-5 md:top-8 left-1/2 transform -translate-x-1/2">
          <img
            src={
              isEnglish
                ? "/introduction/nameLabel.png"
                : "/introduction/nameLabel.png"
            }
            alt="Name Label"
            className="w-[100px] sm:w-[100px] md:w-[120px] lg:w-[180px] max-w-none"
          />
        </div>

        {/* Name Box */}
        <div className="absolute top-16 sm:top-16 md:top-20 lg:top-24 left-1/2 transform -translate-x-1/2">
          {/* Name Box Image */}
          <img
            src="/introduction/nameBox.png"
            alt="Name Box"
            className="w-[260px] sm:w-[280px] md:w-[300px] lg:w-[360px] max-w-none"
          />

          {/* Input Element Overlay */}
          <input
            type="text"
            placeholder={isEnglish ? "Enter your name" : "Enter your name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-transparent border-none focus:outline-none text-[#4D7DBF] text-center placeholder-[#4D7DBF]"
            style={{ color: "#4D7DBF" }}
          />
        </div>

        {/* Gender Icons */}
        <div className="absolute top-28 sm:top-28 md:top-32 lg:top-40 left-[150px] sm:left-[170px] md:left-[200px] lg:left-[214px] transform -translate-x-1/2 flex sm:justify-between w-[240px] sm:w-[280px] md:w-[300px] gap-2">
          {/* Male Icon */}
          <div
            className="cursor-pointer"
            onClick={() => setSelectedGender("male")}
          >
            <img
              src={
                selectedGender === "male"
                  ? isEnglish
                    ? "/introduction/maleActiveEng.png"
                    : "/introduction/maleActive.png"
                  : isEnglish
                  ? "/introduction/maleEng.png"
                  : "/introduction/male.png"
              }
              alt="Male"
              className="w-20 sm:w-20 md:w-24 lg:w-28 max-w-none"
            />
          </div>

          {/* Female Icon */}
          <div
            className="cursor-pointer"
            onClick={() => setSelectedGender("female")}
          >
            <img
              src={
                selectedGender === "female"
                  ? isEnglish
                    ? "/introduction/femaleActiveEng.png"
                    : "/introduction/femaleActive.png"
                  : isEnglish
                  ? "/introduction/femaleEng.png"
                  : "/introduction/female.png"
              }
              alt="Female"
              className="w-20 sm:w-20 md:w-24 lg:w-28 max-w-none"
            />
          </div>

          {/* LGBTQ Icon */}
          <div
            className="cursor-pointer"
            onClick={() => setSelectedGender("lgbtq")}
          >
            <img
              src={
                selectedGender === "lgbtq"
                  ? "/introduction/LGBTQActive.png"
                  : "/introduction/LGBTQ.png"
              }
              alt="LGBTQ"
              className="w-20 sm:w-20 md:w-24 lg:w-28 max-w-none"
            />
          </div>
        </div>

        {/* Age Label */}
        <div className="absolute top-40 sm:top-40 md:top-48 lg:top-56 left-1/2 transform -translate-x-1/2">
          <img
            src={isEnglish ? "/introduction/age.png" : "/introduction/age.png"}
            alt="Age"
            className="w-[36px] sm:w-[40px] md:w-[48px] lg:w-[56px] max-w-none"
          />
        </div>

        {/* Age Range Icons */}
        <div className="absolute top-48 sm:top-52 md:top-60 lg:top-[280px] left-1/2 transform -translate-x-1/2 w-[240px] sm:w-[280px] md:w-[300px]">
          {/* First Row */}
          <div className="flex justify-center space-x-2 sm:space-x-4 md:space-x-4 mb-2 sm:mb-4 md:mb-2 lg:mb-2">
            {["0-12", "13-28", "29-44"].map((age) => (
              <div
                key={age}
                className="cursor-pointer"
                onClick={() => setSelectedAge(age)}
              >
                <img
                  src={`/introduction/${
                    selectedAge === age
                      ? `${age}PNGActive.png`
                      : `${age}PNG.png`
                  }`}
                  alt={age}
                  className="w-20 sm:w-20 md:w-24 lg:w-28 max-w-none"
                />
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex justify-center space-x-2 sm:space-x-4">
            {["45-60", "61-79"].map((age) => (
              <div
                key={age}
                className="cursor-pointer"
                onClick={() => setSelectedAge(age)}
              >
                <img
                  src={`/introduction/${
                    selectedAge === age
                      ? `${age}PNGActive.png`
                      : `${age}PNG.png`
                  }`}
                  alt={age}
                  className="w-20 sm:w-20 md:w-24 lg:w-28 max-w-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Occupation Label */}
        <div className="absolute top-[310px] sm:top-[320px] md:top-[360px] lg:top-[420px] left-1/2 transform -translate-x-1/2">
          <img
            src={
              isEnglish
                ? "/introduction/occupation.png"
                : "/introduction/occupation.png"
            }
            alt="Occupation"
            className="w-[120px] sm:w-[100px] md:w-[140px] lg:w-[160px] max-w-none"
          />
        </div>

        {/* Occupation Icons */}
        <div className="absolute top-[350px] sm:top-[360px] md:top-[400px] lg:top-[480px] left-[160px] sm:left-[150px] md:left-[184px] lg:left-[180px] transform -translate-x-1/2 w-[240px] sm:w-[280px] md:w-[300px]">
          <div className="grid-container">
            {[
              "student",
              "officeWorker",
              "freelance",
              "foreigner",
              "businessOwner",
              "etc",
            ].map((occupation) => (
              <div
                key={occupation}
                className="cursor-pointer"
                onClick={() => setSelectedOccupation(occupation)}
              >
                <img
                  src={
                    isEnglish
                      ? `/introduction/${occupation}${
                          selectedOccupation === occupation
                            ? "ActiveEng"
                            : "Eng"
                        }.png`
                      : `/introduction/${occupation}${
                          selectedOccupation === occupation ? "Active" : ""
                        }.png`
                  }
                  alt={occupation}
                  className="w-28 sm:w-28 md:w-40 lg:w-52 max-w-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 z-30">
        <div onClick={handleNextClick}>
          <img
            src={
              isNextClicked
                ? "/introduction/nextButtonActive.png"
                : "/introduction/Next2.svg"
            }
            alt="Next Button"
            className="w-16 sm:w-20 md:w-28 lg:w-36 cursor-pointer"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute -bottom-8 md:-bottom-24 lg:-bottom-32 left-0 w-full z-20">
        <img src="/introduction/footer2.svg" alt="Footer" className="w-full" />
      </div>
    </div>
  );
}
