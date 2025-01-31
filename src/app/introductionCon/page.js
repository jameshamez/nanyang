"use client"; // Mark this as a Client Component (required for useState and interactivity)

import { useState, useEffect } from "react"; // Import useState and useEffect for interactivity
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Introduction() {
  const [selectedSector, setSelectedSector] = useState(null); // Track selected sector
  const [name, setName] = useState("Guest"); // Default to "Guest"
  const [workDesc, setWorkDesc] = useState(""); // State for work description
  const [isNextClicked, setIsNextClicked] = useState(false); // Track if the Next button is clicked
  const router = useRouter(); // Initialize the router

  // Access localStorage only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setName(userData?.name || "Guest"); // Fallback to "Guest" if name is not available
      setWorkDesc(userData?.workDesc || ""); // Fallback to empty string if work description is not available
    }
  }, []);

  // Handle Next Button Click
  const handleNextClick = async () => {
    setIsNextClicked(true); // Set the button to active state
    setTimeout(() => setIsNextClicked(false), 200); // Reset after 200ms

    // Validate required fields
    if (!name || !selectedSector || !workDesc) {
      alert("Please fill out all fields");
      return;
    }

    // Retrieve existing userData from localStorage
    const existingUserData = JSON.parse(localStorage.getItem("userData")) || {};

    // Update userData with new values
    const updatedUserData = {
      ...existingUserData, // Spread existing data
      companySector: selectedSector, // Add selected sector
      jobDesc: workDesc, // Add work description
    };

    try {
      // Save updated userData to localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      console.log("Updated user data saved to localStorage:", updatedUserData);

      // Send updated data to the API route
      const response = await fetch("/api/saveUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        console.log("User data saved successfully");
        // Redirect to the quiz section
        router.push("/startquiz");
      } else {
        router.push("/startquiz");
        // console.error("Failed to save user data");
      }
    } catch (error) {
      router.push("/startquiz");
      console.error("Error saving user data:", error);
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
          src="/introductionCon/Logo3.png"
          alt="Logo"
          className="w-24 md:w-36 lg:w-48"
        />
      </div>

      {/* Introduction Panel */}
      <div className="absolute top-[51%] md:top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <img
          src="/introductionCon/Panel.png"
          alt="Introduction Panel"
          className="w-[320px] sm:w-[360px] md:w-[400px] lg:w-[480px] max-w-none" // Responsive width
        />

        {/* Display the user's name here */}
        <div className="absolute top-10 sm:top-14 md:top-14 lg:top-14 left-1/2 transform -translate-x-1/2 text-center">
          <img
            src="/introductionCon/nameLabel.png"
            alt="Name Label"
            className="w-[50px] sm:w-[60px] md:w-[60px] lg:w-[60px] max-w-none" // Responsive width
          />
          {/* User's name */}
          <div className="absolute top-[16px] md:top-[16px] lg:top-[16px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#4D7DBF] font-bold text-4xl sm:text-xl md:text-4xl lg:text-4xl">
            {name}
          </div>
        </div>

        {/* Work Description Input Overlay */}
        <div className="absolute top-[204px] sm:top-[234px] md:top-[260px] lg:top-[320px] left-1/2 transform -translate-x-1/2 w-[280px] sm:w-[280px] md:w-[300px] lg:w-[360px] h-[60px]">
          {/* Input Element Overlay */}
          <input
            type="text"
            placeholder="Enter your work description"
            value={workDesc}
            onChange={(e) => setWorkDesc(e.target.value)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-transparent border-none focus:outline-none text-[#4D7DBF] text-center placeholder-[#4D7DBF] placeholder-opacity-80"
            style={{ color: "#4D7DBF" }}
          />
        </div>

        {/* All of the sector here */}
        <div className="absolute top-[380px] sm:top-[410px] md:top-[450px] lg:top-[540px] left-[130px] sm:left-[150px] md:left-[180px] lg:left-[180px] transform -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[280px] md:w-[300px]">
          <div className="grid grid-cols-[60px_78px_0px] sm:grid-cols-[70px_80px_0px] md:grid-cols-[80px_90px_0px] lg:grid-cols-[100px_110px_0px] gap-4">
            {/* First row with 3 columns */}
            {["tech", "finance", "consumerable"].map((sector) => (
              <div
                key={sector}
                className="cursor-pointer"
                onClick={() => setSelectedSector(sector)}
              >
                <img
                  src={`/introductionCon/${
                    selectedSector === sector
                      ? `${sector}Active.png`
                      : `${sector}.png`
                  }`}
                  alt={sector}
                  className="h-9 md:h-10 lg:h-12 w-auto max-w-none"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[14px_64px_30px] sm:grid-cols-[20px_60px_30px] md:grid-cols-[34px_74px_0px] lg:grid-cols-[50px_100px_0px] gap-16 mt-4">
            {/* Second row with 3 columns */}
            {["labor", "industrial", "mineral"].map((sector) => (
              <div
                key={sector}
                className="cursor-pointer"
                onClick={() => setSelectedSector(sector)}
              >
                <img
                  src={`/introductionCon/${
                    selectedSector === sector
                      ? `${sector}Active.png`
                      : `${sector}.png`
                  }`}
                  alt={sector}
                  className="h-9 md:h-10 lg:h-12 w-auto max-w-none"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[112px_0px] sm:grid-cols-[110px_0px] md:grid-cols-[120px_0px] lg:grid-cols-[140px_0px] gap-0 mt-4">
            {/* Third row with 2 columns */}
            {["realEstate", "agriculture"].map((sector) => (
              <div
                key={sector}
                className="cursor-pointer"
                onClick={() => setSelectedSector(sector)}
              >
                <img
                  src={`/introductionCon/${
                    selectedSector === sector
                      ? `${sector}Active.png`
                      : `${sector}.png`
                  }`}
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
        onClick={handleNextClick} // Add onClick handler
      >
        <img
          src={
            isNextClicked
              ? "/introductionCon/nextButtonActive.png"
              : "/introductionCon/Next3-CF.png"
          }
          alt="Next Button"
          className="w-16 sm:w-20 md:w-32 lg:w-36" // Responsive width
        />
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
