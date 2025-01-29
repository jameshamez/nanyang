"use client"; // Mark this as a Client Component (required for useState and interactivity)

import { useState, useEffect } from "react"; // Import useState and useEffect for interactivity

export default function Introduction() {
  const [selectedSector, setSelectedSector] = useState(null); // Track selected sector
  const [name, setName] = useState("Guest"); // Default to "Guest"
  const [workDesc, setWorkDesc] = useState(""); // State for work description

  // Access localStorage only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setName(userData?.name || "Guest"); // Fallback to "Guest" if name is not available
      setWorkDesc(userData?.workDesc || ""); // Fallback to empty string if work description is not available
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/introductionCon/BG3.png')" }}
    >
      {/* Logo */}
      <div className="absolute top-8 md:top-12 lg:top-16 left-1/2 transform -translate-x-1/2 z-20">
        <img
          src="/introductionCon/logo3.png"
          alt="Logo"
          className="w-24 md:w-36 lg:w-48"
        />
      </div>

      {/* Introduction Panel */}
      <div className="absolute top-[51%] md:top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <img
          src="/introductionCon/Panel.png"
          alt="Introduction Panel"
          className="w-[360px] sm:w-[360px] md:w-[400px] lg:w-[480px] max-w-none" // Responsive width
        />

        {/* Display the user's name here */}
        <div className="absolute top-14 md:top-8 left-1/2 transform -translate-x-1/2 text-center">
          <img
            src="/introductionCon/nameLabel.png"
            alt="Name Label"
            className="w-[50px] sm:w-[100px] md:w-[120px] lg:w-[180px] max-w-none" // Responsive width
          />
          {/* User's name */}
          <div className="absolute top-[16px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#4D7DBF] font-bold text-4xl sm:text-xl md:text-2xl lg:text-3xl">
            {name}
          </div>
        </div>

        {/* Work Description Input Overlay */}
        <div className="absolute top-[234px] md:top-[220px] lg:top-[240px] left-1/2 transform -translate-x-1/2 w-[280px] sm:w-[280px] md:w-[300px] lg:w-[360px] h-[60px]">
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
        <div className="absolute top-[410px] left-[150px] transform -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[280px] md:w-[300px]">
          <div className="grid grid-cols-[70px_80px_0px] gap-4">
            {/* First row with 3 columns */}
            {["tech", "finance", "consumerable"].map((sector) => (
              <div
                key={sector}
                className={`cursor-pointer transition-transform ${
                  selectedSector === sector
                    ? "scale-110 drop-shadow-lg"
                    : "opacity-80 hover:opacity-100"
                }`}
                onClick={() => setSelectedSector(sector)}
              >
                <img
                  src={`/introductionCon/${sector}.png`}
                  alt={sector}
                  className="h-9 w-auto max-w-none"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[20px_60px_30px] gap-16 mt-4">
            {/* Second row with 3 columns */}
            {["labor", "industrial", "mineral"].map((sector) => (
              <div
                key={sector}
                className={`cursor-pointer transition-transform ${
                  selectedSector === sector
                    ? "scale-110 drop-shadow-lg"
                    : "opacity-80 hover:opacity-100"
                }`}
                onClick={() => setSelectedSector(sector)}
              >
                <img
                  src={`/introductionCon/${sector}.png`}
                  alt={sector}
                  className="h-9 w-auto max-w-none"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[110px_0px] gap-0 mt-4">
            {/* Third row with 2 columns */}
            {["realEstate", "agriculture"].map((sector) => (
              <div
                key={sector}
                className={`cursor-pointer transition-transform ${
                  selectedSector === sector
                    ? "scale-110 drop-shadow-lg"
                    : "opacity-80 hover:opacity-100"
                }`}
                onClick={() => setSelectedSector(sector)}
              >
                <img
                  src={`/introductionCon/${sector}.png`}
                  alt={sector}
                  className="h-9 w-auto max-w-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="absolute bottom-8 md:bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 z-30">
        <img
          src="/introduction/Next2.svg"
          alt="Next Button"
          className="w-16 sm:w-20 md:w-36 lg:w-36 cursor-pointer hover:opacity-80 transition-opacity" // Responsive width
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