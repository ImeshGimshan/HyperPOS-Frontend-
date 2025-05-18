import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ParticleBackground from "../../UI/ParticleBackground";
import "../Hero/Hero.css";

const Section = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Cards fade in as you scroll
  const cardsOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] ">
      {/* Main sticky container */}
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-6 md:px-8">
        {/* Particle BG and scanlines, matching Hero */}
        <ParticleBackground count={15} className="absolute inset-0 -z-5" />
        <div className="absolute inset-0 bg-black/40 hyper-scanlines -z-5 pointer-events-none" />
        {/* Deep purple radial BG, matching Hero */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
                "radial-gradient(ellipse 100% 60% at 60% 40%, #1c002d 20%, #140021 70%, #090010 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xl -z-10"></div>

        {/* Animated masked text heading */}
        <motion.div
          className="w-full text-center z-10"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <h1 className="masked-text text-5xl md:text-7xl font-bold mb-2 select-none">
            Industries We Empower
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-3 text-center"
            style={{ textShadow: "0 2px 20px #9854F8" }}>
            Tailored POS Solutions For Every Business Type
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-6 mx-auto z-10"
          style={{ opacity: cardsOpacity }}
        >
          {[
            {
              title: "Restaurant",
              text: "Manage your restaurant with ease using tools for order taking, table management, kitchen printing, split billing, and real-time sales tracking.",
              colorFrom: "#9854F8",
              colorTo: "#FF44CC",
            },
            {
              title: "Retail",
              text: "All the retail tools you need for selling online and in-store, including inventory management, detailed reports, customer profiles, and seamless returns processing.",
              colorFrom: "#FF44CC",
              colorTo: "#FFE942",
            },
            {
              title: "Cafe & Coffee Shop",
              text: "Streamline operations with quick order processing, customizable menus, loyalty programs, and inventory tracking designed for busy cafes.",
              colorFrom: "#FFE942",
              colorTo: "#9854F8",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="relative bg-black/50 backdrop-blur-lg rounded-2xl border border-[#f472b6]/40 shadow-2xl overflow-hidden h-full flex flex-col items-center px-6 py-10 transition-transform hover:scale-105 group"
              style={{
                boxShadow: `0 0 24px 4px ${card.colorFrom}44, 0 2px 48px 12px #000b`,
              }}
            >
              {/* Top neon line */}
              <div
                className="absolute top-0 left-0 w-full h-1 blur-[1.5px]"
                style={{
                  background: `linear-gradient(90deg, ${card.colorFrom}, ${card.colorTo}, transparent)`,
                }}
              />
              {/* Circle icon */}
              <div
                className="h-20 w-20 flex items-center justify-center rounded-full mb-4"
                style={{
                  background: `radial-gradient(circle at 60% 30%, ${card.colorFrom} 40%, ${card.colorTo} 100%)`,
                  boxShadow: `0 0 24px 6px ${card.colorTo}80`,
                }}
              >
                <img
                  src="./nap_cat.gif"
                  alt={card.title}
                  className="h-12 w-12 rounded-full"
                />
              </div>
              {/* Card content */}
              <h3 className="mt-2 mb-4 text-xl font-bold text-[#f472b6] text-center drop-shadow-lg">
                {card.title}
              </h3>
              <div className="bg-black/40 rounded-lg p-4">
                <p className="text-purple-300/70 text-center leading-relaxed">
                  {card.text}
                </p>
              </div>
              {/* Bottom neon line */}
              <div
                className="absolute bottom-0 left-0 w-full h-1 blur-[1.5px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${card.colorTo}, ${card.colorFrom})`,
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Section;
