import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const WORDS = [
  "CRAFTING EXPERIENCES",
  "BUILDING PLATFORMS",
  "DRIVING GROWTH",
  "CONNECTING DOTS",
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(window.hasLoadedOnce ? 100 : 0);
  const [isDone, setIsDone] = useState(!!window.hasLoadedOnce);
  const [isBypassed] = useState(!!window.hasLoadedOnce);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (window.hasLoadedOnce) {
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    const duration = 1800; // Increased to 1.8 seconds for premium pacing
    const intervalTime = 16;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          window.hasLoadedOnce = true;
          setTimeout(() => {
            setIsDone(true);
            if (onCompleteRef.current) onCompleteRef.current();
          }, 350);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  if (isBypassed) {
    return null;
  }

  // Map progress (0 - 100) to WORDS index (0 - 3)
  const activeWordIndex = Math.min(
    Math.floor(progress / 25),
    WORDS.length - 1
  );

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }} // Keep wrapper mounted while panels slide up
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Staggered Vertical Panels (Curtain Reveal) */}
          <div className="pointer-events-none absolute inset-0 z-0 flex">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{
                  duration: 0.85,
                  ease: [0.76, 0, 0.24, 1],
                  delay: i * 0.08,
                }}
                className="relative h-full w-1/4 overflow-hidden border-r border-slate-900/30 bg-[#080b11] last:border-r-0"
              >
                {/* Subtle digital node matrix within curtains */}
                <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] opacity-[0.03] [background-size:20px_20px]" />
              </motion.div>
            ))}
          </div>

          {/* Glowing Radial Ambient Aura (Slides up with panels) */}
          <motion.div
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="pointer-events-none absolute -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-[#dc2626]/4 to-[#ea580c]/3 blur-3xl"
          />

          {/* Loader Interactive Content Panel */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: -40,
              transition: { duration: 0.4, ease: "easeIn" } 
            }}
            className="relative z-10 flex flex-col items-center justify-center select-none"
          >
            {/* Logo */}
            <div className="mb-8 scale-95 opacity-90 md:scale-100">
              <Logo size="2xl" />
            </div>

            {/* Orbiting Dots Animation ("Dots and Coms ") */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative mb-6 flex h-16 w-16 items-center justify-center"
            >
              {/* Dot 1 - Red */}
              <motion.div
                className="absolute left-0 h-3.5 w-3.5 rounded-full bg-[#dc2626] shadow-[0_0_12px_#dc2626]"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Connecting line */}
              <div className="absolute h-[1.2px] w-full bg-gradient-to-r from-[#dc2626] to-[#ea580c] opacity-30" />

              {/* Dot 2 - Orange */}
              <motion.div
                className="absolute right-0 h-3.5 w-3.5 rounded-full bg-[#ea580c] shadow-[0_0_12px_#ea580c]"
                animate={{ scale: [1.25, 1, 1.25] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Percentage Progress Counter */}
            <div className="flex h-[80px] items-center justify-center overflow-hidden md:h-[100px]">
              <h1 className="font-heading text-6xl font-black tracking-tighter text-white tabular-nums md:text-8xl">
                {Math.round(progress)}
                <span className="ml-1 bg-gradient-to-r from-[#dc2626] to-[#ea580c] bg-clip-text font-extrabold text-transparent select-none">
                  %
                </span>
              </h1>
            </div>

            {/* Subtext and Word Cycling Text Slider */}
            <div className="mt-3 flex flex-col items-center justify-center">
              <span className="font-mono font-bold tracking-[0.25em] text-[10px] text-slate-500 uppercase">
                ESTABLISHED 1999
              </span>
              
              <div className="relative mt-2 flex h-6 w-[240px] items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeWordIndex}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                    className="font-heading text-center font-bold tracking-widest text-[10px] text-[#ea580c] uppercase"
                  >
                    {WORDS[activeWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

