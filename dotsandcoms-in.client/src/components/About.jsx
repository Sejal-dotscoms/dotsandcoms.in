import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aboutHeroData } from "../data/about";

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = aboutHeroData.slides;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Helper to calculate 3D card transformation styling based on active index offset
  const getCardStyle = (index) => {
    let offset = index - activeIndex;
    
    // Handle wrapping around the slides array
    if (offset < 0) offset += slides.length;

    const zIndex = 30 - offset * 10;
    const scale = 1 - offset * 0.07;
    
    // 3D perspective variables
    const rotateY = offset === 0 ? 0 : offset === 1 ? -15 : 15;
    const rotateZ = offset === 0 ? 0 : offset === 1 ? 4 : -4;
    const isMobile = windowWidth < 768;
    const x = offset === 0 ? 0 : offset === 1 ? (isMobile ? 22 : 55) : (isMobile ? -22 : -55);
    const y = offset === 0 ? 0 : offset === 1 ? 8 : 16;
    const opacity = offset === 0 ? 1 : offset === 1 ? 0.8 : 0.55;
    const filter = offset === 0 ? "none" : "blur(0.5px) brightness(0.9)";

    return {
      zIndex,
      scale,
      rotateY,
      rotate: rotateZ,
      x,
      y,
      opacity,
      filter,
      pointerEvents: offset === 0 ? "auto" : "none",
    };
  };

  return (
    <section id="about" className="pt-12 pb-6 md:py-24 relative overflow-hidden bg-[#f8fafc]/40">
      {/* Light highlights */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#ea580c]/3 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Agency Story (Correct & Intact) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-1 text-left">
            <span className="text-xs font-bold font-mono tracking-widest text-[#ea580c] uppercase">
              {aboutHeroData.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
              {aboutHeroData.title}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              {aboutHeroData.paragraphs[0]}
            </p>
            <p className="text-slate-500 leading-relaxed text-sm">
              {aboutHeroData.paragraphs[1]}
            </p>

            <div className="pt-6 grid grid-cols-2 gap-6 border-t border-slate-200 mt-4">
              {aboutHeroData.stats.map((stat, idx) => (
                <div key={idx}>
                  <h4 className="text-2xl font-bold text-slate-800 font-heading">{stat.value}</h4>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Modern 3D Image Slider */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div 
              className="relative w-full max-w-xl h-[380px] md:h-[460px] flex flex-col items-center justify-between"
              style={{ perspective: 1200 }}
            >
              {/* Stacked Cards Container */}
              <div className="relative w-full h-[300px] md:h-[375px] flex items-center justify-center">
                {slides.map((slide, index) => {
                  const cardStyle = getCardStyle(index);
                  return (
                    <motion.div
                      key={slide.id}
                      className="absolute w-[90%] md:w-[95%] h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-100/50 cursor-pointer bg-white"
                      style={{
                        transformOrigin: "center bottom",
                        backfaceVisibility: "hidden",
                      }}
                      animate={{
                        x: cardStyle.x,
                        y: cardStyle.y,
                        scale: cardStyle.scale,
                        rotate: cardStyle.rotate,
                        rotateY: cardStyle.rotateY,
                        zIndex: cardStyle.zIndex,
                        opacity: cardStyle.opacity,
                        filter: cardStyle.filter,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 24,
                      }}
                      onClick={() => {
                        // Clicking any card brings it to the front
                        setActiveIndex(index);
                      }}
                    >
                      {/* Card Image and Glass Gradient */}
                      <div className="relative w-full h-full group">
                        <img
                          src={slide.image}
                          alt={slide.alt || `${slide.title} - Custom Web Design & Web Development Company in Vadodara`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          width={slide.width}
                          height={slide.height}
                        />
                        {/* Shadow/Glass Bottom overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/10 to-transparent opacity-90 transition-opacity duration-300" />
                        
                        {/* Caption overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-[#ea580c] uppercase bg-black/45 px-2.5 py-1 rounded backdrop-blur-sm">
                            {slide.location}
                          </span>
                          <h3 className="text-xl md:text-2xl font-black font-heading mt-2.5 text-white drop-shadow-sm">
                            {slide.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Controls and descriptions */}
              <div className="w-full max-w-md mt-6 flex flex-col items-center">
                {/* Active Caption */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-center px-4 min-h-[48px]"
                  >
                    <p className="text-slate-500 mt-4 text-sm leading-relaxed max-w-sm">
                      {slides[activeIndex].desc} 
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Slider Buttons & Indicators */}
                <div className="flex items-center space-x-6 mt-3">
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-[#ea580c] hover:border-[#ea580c] hover:shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                    aria-label="Previous slide"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Dot Indicators */}
                  <div className="flex space-x-2">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeIndex === idx ? "w-5 bg-[#ea580c]" : "w-1.5 bg-slate-200 hover:bg-slate-300"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-[#ea580c] hover:border-[#ea580c] hover:shadow-sm transition-all duration-300 cursor-pointer active:scale-95"
                    aria-label="Next slide"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
