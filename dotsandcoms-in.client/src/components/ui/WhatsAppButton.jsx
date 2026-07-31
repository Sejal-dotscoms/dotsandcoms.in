import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 2.5 seconds to capture user attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    // Auto hide tooltip after 8.5 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 pointer-events-auto">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="hidden md:flex items-center gap-2 bg-white text-slate-800 px-4 py-2.5 rounded-xl shadow-xl border border-slate-100 text-sm font-medium whitespace-nowrap relative"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Chat with us on WhatsApp!
            {/* Close button for tooltip */}
            <button
              onClick={() => setShowTooltip(false)}
              className="ml-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-base leading-none font-bold"
              aria-label="Close tooltip"
            >
              ×
            </button>
            {/* Tooltip arrow */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-slate-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/918469332448"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
      >
        {/* Pulsing rings for elegant effect */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-75 pointer-events-none" style={{ animationDuration: '2s' }} />
        <span className="absolute -inset-2 rounded-full bg-emerald-400/10 animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />
        
        {/* WhatsApp Icon */}
        <FaWhatsapp size={32} className="relative z-10 filter drop-shadow-sm" />
      </motion.a>
    </div>
  );
}
