"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GroupsPage() {
  const [groups, setGroups] = useState({
    RecycledCotton: [],
    RecycledPolyester: [],
    EcoProduced: [],
    GreenTech: [],
  });
  const [groupPercentages, setGroupPercentages] = useState({
    RecycledCotton: "0",
    RecycledPolyester: "0",
    EcoProduced: "0",
    GreenTech: "0",
  });

  const getRandomPosition = () => ({
    left: `${Math.random() * 100}%`,
    top: `-${Math.random() * 20}%`, // start just above the viewport
  });

  useEffect(() => {
    async function fetchGroups() {
      const res = await fetch("/api/getGroups");
      if (res.ok) {
        const data = await res.json();
        setGroups(data.groups);
        setGroupPercentages(data.groupPercentages);
      }
    }
    fetchGroups();
  }, []);

  // Images for each group
  const groupImages = {
    RecycledCotton: "/image/recycledcotton.png",
    RecycledPolyester: "/image/recycledpolyester.png",
    EcoProduced: "/image/ecoproduce.png",
    GreenTech: "/image/greentech.png",
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        backgroundImage: "url(/image/bginsight.png)",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Falling Leaves */}
      {[...Array(10)].map((_, i) => (
        <motion.img
          key={i}
          src="/image/leafinsight.png"
          alt="Falling Leaf"
          className="absolute w-[50px] sm:w-[50px] md:w-[60px] lg:w-[80px] xl:w-[100px] 2xl:w-[200px] opacity-80 z-[0]"
          style={getRandomPosition()}
          animate={{
            y: ["0vh", "100vh"],
            rotate: [0, 10, -10, 5, -5, 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Wrapper to center layout horizontally and vertically */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Grouped Title (Insightname.png) */}
        <motion.div
          className="text-center mt-[-50] mb-5 sm:mb-5 md:mb-10 lg:mb-20 xl:mb-30 2xl:mb-52 z-10 relative"
          animate={{ opacity: [0, 1], y: [-10, 0] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="/image/Insightname.png"
            alt="ECO SCORE GROUPS"
            className="w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[1200px] mx-auto mb-4 z-10 relative"
          />
        </motion.div>

        {/* Group Icons Container as a Grid with 4 Rows & 2 Columns with auto-sizing rows */}
        <div
          className="grid 
  grid-rows-[120px_120px_120px_120px] 
  grid-cols-[120px_120px] 
  sm:grid-rows-[120px_120px_120px_120px] 
  sm:grid-cols-[120px_120px] 
  md:grid-rows-[150px_150px_150px_150px] 
  md:grid-cols-[150px_150px] 
  lg:grid-rows-[180px_180px_180px_180px] 
  lg:grid-cols-[180px_180px] 
  xl:grid-rows-[210px_210px_210px_210px]
  xl:grid-cols-[210px_210px]
  2xl:grid-rows-[500px_500px_500px_500px]
  2xl:grid-cols-[500px_500px]
  gap-0 relative items-center justify-items-center"
        >
          {" "}
          {/* Recycled Cotton (Row 1, Col 1) */}
          <motion.div
            className="flex items-center rounded-full shadow-md row-start-1 col-start-1 z-2 
    w-[calc(150px+var(--recycled-cotton))] 
    sm:w-[calc(150px+var(--recycled-cotton))] 
    md:w-[calc(210px+var(--recycled-cotton))] 
    lg:w-[calc(270px+var(--recycled-cotton))]
    xl:w-[calc(300px+var(--recycled-cotton))]
    2xl:w-[calc(800px+var(--recycled-cotton))]"
            animate={{ y: [0, -10, 10, -5, 5, 0], x: [0, 5, -5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              "--recycled-cotton": `${groupPercentages.RecycledCotton}px`,
            }}
          >
            <img
              src={groupImages.RecycledCotton}
              alt="Recycled Cotton"
              className="object-cover rounded-full w-full h-full"
            />
            <div className="absolute flex items-center justify-center w-full h-full">
              <span
                className="text-black font-bold text-[calc(18px+var(--recycled-cotton)/3)] 
        sm:text-[calc(18px+var(--recycled-cotton)/3)] 
        md:text-[calc(28px+var(--recycled-cotton)/3)] 
        lg:text-[calc(40px+var(--recycled-cotton)/3)] 
        xl:text-[calc(44px+var(--recycled-cotton)/3)]
        2xl:text-[calc(100px+var(--recycled-cotton)/3)]
        text-[#509776] translate-y-[calc(-44px+var(--recycled-cotton)/2)] 
        sm:translate-y-[calc(-44px+var(--recycled-cotton)/2)] 
        md:translate-y-[calc(-64px+var(--recycled-cotton)/2)] 
        lg:translate-y-[calc(-84px+var(--recycled-cotton)/2)]
        xl:translate-y-[calc(-92px+var(--recycled-cotton)/2)]
        2xl:translate-y-[calc(-240px+var(--recycled-cotton)/2)]"
              >
                {groupPercentages.RecycledCotton}%
              </span>
            </div>
          </motion.div>
          {/* Recycled Polyester (Row 2, Col 2) */}
          <motion.div
            className="flex items-center rounded-full shadow-md row-start-2 col-start-2 z-1
        w-[calc(150px+var(--recycled-polyester))] 
        sm:w-[calc(150px+var(--recycled-polyester))] 
        md:w-[calc(210px+var(--recycled-polyester))] 
        lg:w-[calc(270px+var(--recycled-polyester))]
        xl:w-[calc(300px+var(--recycled-polyester))]
        2xl:w-[calc(800px+var(--recycled-polyester))]"
            animate={{ y: [0, -10, 10, -5, 5, 0], x: [0, 5, -5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              "--recycled-polyester": `${groupPercentages.RecycledPolyester}px`,
            }}
          >
            <img
              src={groupImages.RecycledPolyester}
              alt="Recycled Polyester"
              className="object-cover rounded-full w-full h-full"
            />
            <div className="absolute flex items-center justify-center w-full h-full">
              <span
                className="text-black font-bold text-[calc(18px+var(--recycled-polyester)/3)] 
      sm:text-[calc(18px+var(--recycled-polyester)/3)] 
      md:text-[calc(28px+var(--recycled-polyester)/3)] 
      lg:text-[calc(40px+var(--recycled-polyester)/3)]
      xl:text-[calc(44px+var(--recycled-polyester)/3)]
      2xl:text-[calc(100px+var(--recycled-polyester)/3)] 
      text-[#509776] translate-y-[calc(-44px+var(--recycled-polyester)/2)] 
      sm:translate-y-[calc(-44px+var(--recycled-polyester)/2)] 
      md:translate-y-[calc(-64px+var(--recycled-polyester)/2)] 
      lg:translate-y-[calc(-76px+var(--recycled-polyester)/2)]
      xl:translate-y-[calc(-84px+var(--recycled-polyester)/2)]
      2xl:translate-y-[calc(-220px+var(--recycled-polyester)/2)]"
              >
                {groupPercentages.RecycledPolyester}%
              </span>
            </div>
          </motion.div>
          {/* Eco Produced (Row 3, Col 1) */}
          <motion.div
            className="flex items-center rounded-full shadow-md row-start-3 col-start-1 
    w-[calc(150px+var(--eco-produced))] 
    sm:w-[calc(150px+var(--eco-produced))] 
    md:w-[calc(210px+var(--eco-produced))] 
    lg:w-[calc(270px+var(--eco-produced))]
    xl:w-[calc(300px+var(--eco-produced))]
    2xl:w-[calc(800px+var(--eco-produced))]"
            animate={{ y: [0, -10, 10, -5, 5, 0], x: [0, 5, -5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{ "--eco-produced": `${groupPercentages.EcoProduced}px` }}
          >
            <img
              src={groupImages.EcoProduced}
              alt="Eco Produced"
              className="object-cover rounded-full w-full h-full"
            />
            <div className="absolute flex items-center justify-center w-full h-full">
              <span
                className="text-black font-bold text-[calc(18px+var(--eco-produced)/3)] 
        sm:text-[calc(18px+var(--eco-produced)/3)] 
        md:text-[calc(28px+var(--eco-produced)/3)] 
        lg:text-[calc(40px+var(--eco-produced)/3)]
        xl:text-[calc(44px+var(--eco-produced)/3)]
        2xl:text-[calc(100px+var(--eco-produced)/3)] 
        text-[#39B14D] translate-y-[calc(-52px+var(--eco-produced)/2)] 
        sm:translate-y-[calc(-52px+var(--eco-produced)/2)] 
        md:translate-y-[calc(-64px+var(--eco-produced)/2)] 
        lg:translate-y-[calc(-84px+var(--eco-produced)/2)]
        xl:translate-y-[calc(-92px+var(--eco-produced)/2)]
        2xl:translate-y-[calc(-200px+var(--eco-produced)/2)]"
              >
                {groupPercentages.EcoProduced}%
              </span>
            </div>
          </motion.div>
          {/* GreenTech (Row 4, Col 2) */}
          <motion.div
            className="flex items-center rounded-full shadow-md row-start-4 col-start-2 
    w-[calc(150px+var(--green-tech))] 
    sm:w-[calc(150px+var(--green-tech))] 
    md:w-[calc(210px+var(--green-tech))] 
    lg:w-[calc(270px+var(--green-tech))]
    xl:w-[calc(300px+var(--green-tech))]
    2xl:w-[calc(800px+var(--green-tech))]"
            animate={{ y: [0, -10, 10, -5, 5, 0], x: [0, 5, -5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{ "--green-tech": `${groupPercentages.GreenTech}px` }}
          >
            <img
              src={groupImages.GreenTech}
              alt="Green Tech"
              className="object-cover rounded-full w-full h-full"
            />
            <div className="absolute flex items-center justify-center w-full h-full">
              <span
                className="text-black font-bold text-[calc(18px+var(--green-tech)/3)] 
        sm:text-[calc(18px+var(--green-tech)/3)] 
        md:text-[calc(28px+var(--green-tech)/3)] 
        lg:text-[calc(40px+var(--green-tech)/3)]
        xl:text-[calc(44px+var(--green-tech)/3)] 
        2xl:text-[calc(100px+var(--green-tech)/3)]
        text-[#314397] translate-y-[calc(-116px+var(--green-tech)/2)] 
        sm:translate-y-[calc(-116px+var(--green-tech)/2)] 
        md:translate-y-[calc(-132px+var(--green-tech)/2)] 
        lg:translate-y-[calc(-148px+var(--green-tech)/2)]
        xl:translate-y-[calc(-160px+var(--green-tech)/2)]
        2xl:translate-y-[calc(-300px+var(--green-tech)/2)]"
              >
                {groupPercentages.GreenTech}%
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Swinging Leaves */}
      <motion.img
        src="/image/leftinsight.png"
        alt="Swinging Left Leaf"
        className="absolute left-[-50px] bottom-[-60px] sm:bottom-[-60px] md:bottom-[-80px] lg:bottom-[-100px] w-[200px] sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[400px] 2xl:w-[500px] object-cover"
        animate={{ rotate: [-10, -20, -10] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.img
        src="/image/rightinsight.png"
        alt="Swinging Right Leaf"
        className="absolute right-[-0px] bottom-[-80px] sm:bottom-[-80px] md:bottom-[-100px] lg:bottom-[-120px] w-[200px] sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[400px] 2xl:w-[500px] object-cover"
        animate={{ rotate: [1, -5, 1], x: [0, 5, -5, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
