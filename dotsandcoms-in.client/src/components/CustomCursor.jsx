import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef(null);

  // Motion values for smooth trailing effect
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover/has pointer (exclude mobile/touch)
    const mediaQuery = window.matchMedia("(any-hover: hover)");
    if (!mediaQuery.matches) {
      return;
    }

    // Enable custom cursor styles in body
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Listeners for hover elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .interactive-hover'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Initial setup for hover elements
    addHoverListeners();

    // Create a MutationObserver to watch for dynamically added nodes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.body.classList.remove("custom-cursor-active");
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Follower */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-red-600 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? "rgba(220, 38, 38, 0.05)" : "rgba(220, 38, 38, 0)",
          borderColor: isHovered ? "#ea580c" : "#dc2626",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#ea580c] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
