import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { teamSlides, teamIntro } from "../../data/about";

export default function TeamSection() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const slideInterval = useRef(null);

  // Escape key listener & body scroll lock for lightbox
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isLightboxOpen]);


  const activeIndex = page;

  const stopAutoplay = useCallback(() => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    slideInterval.current = setInterval(() => {
      setPage(([prevPage, prevDir]) => {
        const nextPage = (prevPage + 1) % teamSlides.length;
        return [nextPage, 1];
      });
    }, 4500);
  }, [stopAutoplay]);

  useEffect(() => {
    if (!isHovered) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [isHovered, startAutoplay, stopAutoplay]);

  const handlePrev = () => {
    setPage(([prevPage, prevDir]) => {
      const nextPage = (prevPage - 1 + teamSlides.length) % teamSlides.length;
      return [nextPage, -1];
    });
  };

  const handleNext = () => {
    setPage(([prevPage, prevDir]) => {
      const nextPage = (prevPage + 1) % teamSlides.length;
      return [nextPage, 1];
    });
  };

  const handleDotClick = (index) => {
    setPage(([prevPage, prevDir]) => {
      const dir = index > prevPage ? 1 : -1;
      return [index, dir];
    });
  };

  // Slide animation variants for smooth horizontal motion
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : direction > 0 ? "-100%" : 0,
      opacity: 0
    })
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Text Content & Info */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div>
                          <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
                {teamIntro.badge}
              </span>
                          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                {teamIntro.title}
              </h2>
            </div>

            <p className="text-slate-700 text-[16px] leading-relaxed">
              {teamIntro.subtitlePrefix} <span className="font-semibold text-slate-900">{teamIntro.totalAssociates}</span> {teamIntro.subtitleMiddle} <span className="font-semibold text-slate-900">{teamIntro.teamStrength}</span> {teamIntro.subtitleSuffix}
            </p>

            {/* Inclusions List with red filled play symbol arrowheads */}
            <ul className="space-y-3.5 text-slate-700 text-[15px] pl-1">
              {teamIntro.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 text-[#dc2626]">
                    <svg className="w-3 h-3 fill-[#dc2626]" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-slate-600 text-[15px] leading-relaxed">
              {teamIntro.paragraphs[0]}
            </p>

            <p className="text-slate-600 text-[15px] leading-relaxed">
              If you are someone who is inspired to join our team; visit our{" "}
              <a 
                href={teamIntro.careerUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#dc2626] font-extrabold hover:underline"
              >
                career section
              </a>{" "}
              and {teamIntro.paragraphs[1].split('career section and ')[1]}
            </p>
          </div>

          {/* Right Column: Premium Custom Slideshow */}
          <div className="lg:col-span-5 w-full flex flex-col justify-center items-center">
            <div 
              className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Carousel Slides */}
              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.25 }
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      src={teamSlides[activeIndex].image} 
                      alt={teamSlides[activeIndex].alt || `${teamSlides[activeIndex].title} - Dots & Coms Development Team Baroda`}
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => setIsLightboxOpen(true)}
                      loading="lazy"
                      width={teamSlides[activeIndex].width}
                      height={teamSlides[activeIndex].height}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Arrows */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="w-10 h-10 rounded-full bg-black/35 hover:bg-[#dc2626] text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 cursor-pointer pointer-events-auto active:scale-90"
                  aria-label="Previous Team Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="w-10 h-10 rounded-full bg-black/35 hover:bg-[#dc2626] text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 cursor-pointer pointer-events-auto active:scale-90"
                  aria-label="Next Team Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slider Caption Below Image */}
            <div className="w-full max-w-lg mt-5 text-left space-y-1.5 px-2">
              <div className="flex items-center justify-between">
                <h4 className="text-base sm:text-lg font-bold text-slate-800 font-heading">
                  {teamSlides[activeIndex].title}
                </h4>
                <span className="text-[10px] font-bold font-mono tracking-widest text-[#dc2626] uppercase">
                  // Team Life
                </span>
              </div>
              <p className="text-xs text-slate-550 leading-relaxed font-normal">
                {teamSlides[activeIndex].desc}
              </p>
            </div>

            {/* Slider Dots/Indicators */}
            <div className="flex items-center justify-center space-x-2 mt-5">
              {teamSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? "w-6 bg-[#dc2626]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Show slide ${idx + 1}`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>

      {/* Lightbox / Fancybox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLightboxOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm cursor-zoom-out"
            />

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-w-5xl w-full flex flex-col items-center z-10 pointer-events-none"
            >
              
              {/* Close button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-[-50px] right-2 md:right-[-10px] p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer pointer-events-auto active:scale-95"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Large Image Frame */}
              <div className="relative w-full max-h-[75vh] flex justify-center items-center pointer-events-auto">
                <img
                  src={teamSlides[activeIndex].image}
                  alt={teamSlides[activeIndex].alt || `${teamSlides[activeIndex].title} - Dots & Coms Development Team Baroda`}
                  className="max-w-full max-h-[75vh] rounded-xl object-contain shadow-2xl border border-white/10"
                  loading="lazy"
                  width={teamSlides[activeIndex].width}
                  height={teamSlides[activeIndex].height}
                />

                {/* Left Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-[#dc2626] text-white flex items-center justify-center transition-all cursor-pointer pointer-events-auto active:scale-90"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-[#dc2626] text-white flex items-center justify-center transition-all cursor-pointer pointer-events-auto active:scale-90"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption details below large image */}
              <div className="mt-4 text-center max-w-2xl px-4 pointer-events-auto text-white">
                <h4 className="text-lg font-bold font-heading">
                  {teamSlides[activeIndex].title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {teamSlides[activeIndex].desc}
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
