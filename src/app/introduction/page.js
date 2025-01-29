"use client"; // Mark this as a Client Component (required for useState and interactivity)

import { useState } from "react";
import { useRouter } from 'next/navigation'; // For `app` directory

export default function Introduction() {
  const [name, setName] = useState(""); // Track user's name
  const [selectedGender, setSelectedGender] = useState(null); // Track selected gender
  const [selectedAge, setSelectedAge] = useState(null); // Track selected age
  const [selectedOccupation, setSelectedOccupation] = useState(null); // Track selected occupation

  const router = useRouter(); // Initialize useRouter

  // Function to handle the "Next" button click
  const handleNextClick = async () => {
    // Validate required fields
    if (!name || !selectedGender || !selectedAge || !selectedOccupation) {
      alert("Please fill out all fields");
      return;
    }

    // Prepare data to send to the API
    const userData = {
      name,
      gender: selectedGender,
      age: selectedAge,
      occupation: selectedOccupation,
      jobDesc: selectedOccupation === "student" ? null : "User's job description", // Replace with actual input if needed
      companySector: selectedOccupation === "student" ? null : "User's company sector", // Replace with actual input if needed
    };

    if (selectedOccupation === "student") {
      try {
        // Send data to the API route
        const response = await fetch("/api/saveUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          console.log("User data saved successfully");
          // Redirect to the quiz section
          router.push("/quiz");
        } else {
          console.error("Failed to save user data");
        }
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    } else {
      // Store data temporarily in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      // Redirect to the introductionCon page
      router.push("/introductionCon");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/introduction/BG2.png')" }}
    >
      {/* Logo */}
      <div className="absolute top-8 md:top-12 lg:top-16 left-1/2 transform -translate-x-1/2 z-20">
        <img
          src="/introduction/logo2PNG.png"
          alt="Logo"
          className="w-24 md:w-36 lg:w-48"
        />
      </div>

      {/* Introduction Panel */}
      <div className="absolute top-[51%] md:top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <img
          src="/introduction/introductionPanel.svg"
          alt="Introduction Panel"
          className="w-[360px] sm:w-[360px] md:w-[400px] lg:w-[480px] max-w-none" // Responsive width
        />

        {/* Name Label */}
        <div className="absolute top-5 md:top-8 left-1/2 transform -translate-x-1/2">
          <img
            src="/introduction/nameLabel.png"
            alt="Name Label"
            className="w-[140px] sm:w-[100px] md:w-[120px] lg:w-[180px] max-w-none" // Responsive width
          />
        </div>

        {/* Name Box */}
        <div className="absolute top-16 md:top-20 lg:top-24 left-1/2 transform -translate-x-1/2">
          {/* Name Box Image */}
          <img
            src="/introduction/nameBox.png"
            alt="Name Box"
            className="w-[280px] sm:w-[280px] md:w-[300px] lg:w-[360px] max-w-none" // Responsive width
          />

          {/* Input Element Overlay */}
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-transparent border-none focus:outline-none text-[#4D7DBF] text-center placeholder-[#4D7DBF]"
            style={{ color: "#4D7DBF" }}
          />
        </div>

        {/* Gender Icons */}
        <div className="absolute top-28 md:top-32 lg:top-40 left-1/2 lg:left-[220px] transform -translate-x-1/2 flex justify-between w-[240px] sm:w-[280px] md:w-[300px]">
          {/* Male Icon */}
          <div
            className={`cursor-pointer transition-transform ${
              selectedGender === "male"
                ? "scale-110 drop-shadow-lg"
                : "opacity-80 hover:opacity-100"
            }`}
            onClick={() => setSelectedGender("male")}
          >
            <img
              src="/introduction/male.png"
              alt="Male"
              className="w-20 sm:w-20 md:w-24 lg:w-28 max-w-none" // Responsive width
            />
          </div>

          {/* Female Icon */}
          <div
            className={`cursor-pointer transition-transform ${
              selectedGender === "female"
                ? "scale-110 drop-shadow-lg"
                : "opacity-80 hover:opacity-100"
            }`}
            onClick={() => setSelectedGender("female")}
          >
            <img
              src="/introduction/female.png"
              alt="Female"
              className="w-20 sm:w-20 md:w-24 lg:w-28 max-w-none" // Responsive width
            />
          </div>

          {/* LGBTQ Icon */}
          <div
            className={`cursor-pointer transition-transform ${
              selectedGender === "lgbtq"
                ? "scale-110 drop-shadow-lg"
                : "opacity-80 hover:opacity-100"
            }`}
            onClick={() => setSelectedGender("lgbtq")}
          >
            <img
              src="/introduction/LGBTQ.png"
              alt="LGBTQ"
              className="w-20 sm:w-20 md:w-24 lg:w-28 max-w-none" // Responsive width
            />
          </div>
        </div>

        {/* Age Label */}
        <div className="absolute top-40 md:top-48 lg:top-56 left-1/2 transform -translate-x-1/2">
          <img
            src="/introduction/age.png"
            alt="Age"
            className="w-[44px] sm:w-[40px] md:w-[48px] lg:w-[56px] max-w-none" // Responsive width
          />
        </div>

        {/* Age Range Icons */}
        <div className="absolute top-52 md:top-60 lg:top-72 left-1/2 transform -translate-x-1/2 w-[240px] sm:w-[280px] md:w-[300px]">
          {/* First Row */}
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-2 sm:mb-4">
            {["0-12", "13-28", "29-44"].map((age) => (
              <div
                key={age}
                className={`cursor-pointer transition-transform ${
                  selectedAge === age
                    ? "scale-110 drop-shadow-lg"
                    : "opacity-80 hover:opacity-100"
                }`}
                onClick={() => setSelectedAge(age)}
              >
                <img
                  src={`/introduction/${age}PNG.png`}
                  alt={age}
                  className="w-20 sm:w-20 md:w-24 lg:w-28 max-w-none" // Responsive width
                />
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex justify-center space-x-2 sm:space-x-4">
            {["45-60", "61-79"].map((age) => (
              <div
                key={age}
                className={`cursor-pointer transition-transform ${
                  selectedAge === age
                    ? "scale-110 drop-shadow-lg"
                    : "opacity-80 hover:opacity-100"
                }`}
                onClick={() => setSelectedAge(age)}
              >
                <img
                  src={`/introduction/${age}PNG.PNG`}
                  alt={age}
                  className="w-20 sm:w-20 md:w-24 lg:w-28 max-w-none" // Responsive width
                />
              </div>
            ))}
          </div>
        </div>

        {/* Occupation Label */}
        <div className="absolute top-[320px] md:top-[360px] lg:top-[420px] left-1/2 transform -translate-x-1/2">
          <img
            src="/introduction/occupation.png"
            alt="Occupation"
            className="w-[140px] sm:w-[100px] md:w-[140px] lg:w-[160px] max-w-none" // Responsive width
          />
        </div>

        {/* Occupation Icons */}
        <div className="absolute top-[380px] md:top-[400px] lg:top-[480px] left-[135px] md:left-[170px] lg:left-[180px] transform -translate-x-1/2 w-[240px] sm:w-[280px] md:w-[300px]">
          <div className="grid-container">
            {[
              "student",
              "officeWorker",
              "freelance",
              "foreigner",
              "bussinessOwner",
              "etc",
            ].map((occupation) => (
              <div
                key={occupation}
                className={`cursor-pointer transition-transform ${
                  selectedOccupation === occupation
                    ? "scale-110 drop-shadow-lg"
                    : "opacity-80 hover:opacity-100"
                }`}
                onClick={() => setSelectedOccupation(occupation)}
              >
                <img
                  src={`/introduction/${occupation}.png`}
                  alt={occupation}
                  className="w-40 sm:w-28 md:w-44 lg:w-52 max-w-none" // Responsive width
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="absolute bottom-8 md:bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 z-30">
        <div onClick={handleNextClick}>
          <img
            src="/introduction/Next2.svg"
            alt="Next Button"
            className="w-16 sm:w-20 md:w-36 lg:w-36 cursor-pointer hover:opacity-80 transition-opacity" // Responsive width
          />
        </div>
      </div>

      {/* Footer */}
      <div className="absolute -bottom-8 md:-bottom-24 lg:-bottom-32 left-0 w-full z-20">
        <img
          src="/introduction/footer2.svg"
          alt="Footer"
          className="w-full" // Footer fills the entire screen width
        />
      </div>
    </div>
  );
}