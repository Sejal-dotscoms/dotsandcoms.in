import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Smartphone, Cloud, Target, Palette, Users } from "lucide-react";

export default function Services2() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const services = [
    {
      num: "01",
      icon: Monitor,
      hoverColor: "text-[#dc2626]",
      hoverBg: "bg-[#dc2626]/5",
      title: "Web Design",
      shortTitle: "Web Design",
      desc: "Pixel-perfect, custom layouts tailored for maximum user retention, modern visual storytelling, and responsive layouts across all viewports.",
    },
    {
      num: "02",
      icon: Smartphone,
      hoverColor: "text-emerald-600",
      hoverBg: "bg-emerald-600/5",
      title: "Mobile App Development",
      shortTitle: "Mobile Apps",
      desc: "Native iOS/Android applications built with Flutter and React Native, ensuring fluid micro-interactions and performance.",
    },
    {
      num: "03",
      icon: Cloud,
      hoverColor: "text-cyan-600",
      hoverBg: "bg-cyan-600/5",
      title: "Domains & Web Hosting",
      shortTitle: "Web Hosting",
      desc: "High-performance SSD cloud web hosting with 99.9% uptime guarantees, domains management, and enterprise-grade security structures.",
    },
    {
      num: "04",
      icon: Target,
      hoverColor: "text-rose-600",
      hoverBg: "bg-rose-600/5",
      title: "Digital Marketing",
      shortTitle: "Marketing",
      desc: "SEO audits, Google Ads, Meta campaigns, and high-conversion PPC structures designed to capture organic search traffic and scale sales.",
    },
    {
      num: "05",
      icon: Palette,
      hoverColor: "text-indigo-600",
      hoverBg: "bg-indigo-600/5",
      title: "Graphic Design",
      shortTitle: "Graphics",
      desc: "Creative brand guidelines, corporate identity style scales, print media, social assets, and unified visual guidelines that dictate brand presence.",
    },
    {
      num: "06",
      icon: Users,
      hoverColor: "text-purple-600",
      hoverBg: "bg-purple-600/5",
      title: "Remote IT Workforce",
      shortTitle: "Workforce",
      desc: "Bespoke dedicated developers, engineers, and digital experts integrated seamlessly to scale your internal technical resources and accelerate delivery.",
    },
  ];

  return (
    <section id="services" className="py-24 relative bg-[#f8fafc]">
      {/* Soft background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#dc2626]/3 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-left space-y-4 mb-16 max-w-2xl">
          <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
            // Core Offerings
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
            Our Expertise. Your Growth.
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            We provide comprehensive digital solutions that combine aesthetic beauty with rock-solid software infrastructure.
          </p>
        </div>

        {/* Desktop Layout - Horizontal Accordion with Vertical Text */}
        <div className="hidden lg:flex flex-row w-full min-h-[580px] border border-slate-200/80 rounded-3xl overflow-hidden bg-slate-50/30 shadow-xl shadow-slate-200/30">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const IconComponent = service.icon;

            return (
              <motion.div
                key={service.title}
                className={`relative flex flex-row border-r border-slate-200/60 last:border-r-0 cursor-pointer overflow-hidden transition-all duration-300 ${
                  isHovered ? "bg-white shadow-[inset_0_0_40px_rgba(0,0,0,0.015)]" : "bg-slate-50/50"
                }`}
                animate={{
                  flexGrow: isHovered ? 6 : 1,
                  flexShrink: 1,
                  flexBasis: "0%",
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Accent line on hover */}
                {isHovered && (
                  <motion.div 
                    layoutId="activeBorder"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#dc2626] z-10" 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Left Column (Vertical tab handler) */}
                <div className={`w-20 lg:w-26 h-full flex flex-col justify-between items-center py-8 shrink-0 select-none border-r border-slate-100/80 transition-all duration-300 ${
                  isHovered ? "bg-white" : "bg-slate-50/50"
                }`}>
                  {/* Number */}
                  <span className={`text-lg lg:text-2xl font-black font-mono transition-colors duration-300 ${
                    isHovered ? "text-[#dc2626]" : "text-slate-400/50"
                  }`}>
                    {service.num}
                  </span>

                  {/* Vertical Text Stack (Letters aligned vertically) */}
                  <div className="flex flex-col items-center justify-center my-auto py-4 space-y-1.5 lg:space-y-2 transition-all duration-300">
                    {service.shortTitle.split("").map((char, charIdx) => (
                      <span
                        key={charIdx}
                        className={`text-sm lg:text-[23px] font-black font-heading uppercase transition-colors duration-300 leading-none ${
                          isHovered ? "text-[#dc2626]" : "text-slate-500/70"
                        }`}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>

                  {/* Icon */}
                  <div className={`p-2.5 rounded-xl border transition-all duration-300 ${
                    isHovered
                      ? `${service.hoverBg} border-[#dc2626]/20 scale-110 shadow-sm`
                      : "bg-slate-100/50 border-slate-200/50"
                  }`}>
                    <IconComponent className={`w-4 h-4 transition-colors duration-300 ${
                      isHovered ? service.hoverColor : "text-slate-400"
                    }`} />
                  </div>
                </div>

                {/* Right Column (Expanded details) */}
                <div className="flex-1 h-full overflow-hidden relative bg-gradient-to-br from-white via-white to-red-50/10">
                  <AnimatePresence initial={false}>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute inset-0 p-12 flex flex-col justify-center min-w-[320px] z-0"
                      >
                        {/* Semi-transparent giant index number in background */}
                        <div className="absolute right-8 bottom-0 text-[180px] font-black text-slate-100/60 pointer-events-none select-none font-mono leading-none z-0">
                          {service.num}
                        </div>

                        <div className="space-y-6 relative z-10 max-w-lg">
                          <span className="text-[10px] font-bold font-mono tracking-widest text-[#dc2626] uppercase">
                            // SERVICE DETAILS
                          </span>
                          
                          <h3 className="text-3xl font-extrabold font-heading text-slate-800 tracking-tight leading-none">
                            {service.title}
                          </h3>

                          <div className="w-12 h-1 bg-[#dc2626] rounded-full" />

                          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-normal">
                            {service.desc}
                          </p>

                          <div className="pt-2">
                            <div className="inline-flex items-center space-x-2 text-sm font-bold text-[#dc2626] group/link hover:underline transition-all duration-300">
                                                <span>Discover More</span>
                              <span className="transform translate-x-0 group-hover/link:translate-x-1.5 transition-transform duration-300">→</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile/Tablet Layout - Accordion (Fallback) */}
        <div className="lg:hidden flex flex-col border border-slate-200/60 rounded-2xl overflow-hidden bg-white shadow-lg">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const IconComponent = service.icon;

            return (
              <div
                key={service.title}
                className="border-b border-slate-100 last:border-b-0 bg-white"
                onClick={() => setHoveredIndex(isHovered ? null : index)}
              >
                {/* Header Row */}
                <div className="py-5 px-6 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm font-black font-mono transition-colors duration-300 ${
                      isHovered ? "text-[#dc2626]" : "text-slate-300"
                    }`}>
                      {service.num}
                    </span>
                    <h3 className={`text-base font-bold font-heading text-slate-800 transition-colors duration-300 ${
                      isHovered ? "text-[#dc2626]" : ""
                    }`}>
                      {service.title}
                    </h3>
                  </div>

                  <div className={`p-2 rounded-lg border transition-all duration-300 ${
                    isHovered
                      ? `${service.hoverBg} border-[#dc2626]/20`
                      : "bg-slate-50 border-slate-100"
                  }`}>
                    <IconComponent className={`w-4 h-4 transition-colors duration-300 ${
                      isHovered ? service.hoverColor : "text-slate-400"
                    }`} />
                  </div>
                </div>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isHovered && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 space-y-4">
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {service.desc}
                        </p>
                        <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#dc2626]">
                                        <span>Discover More</span>
                          <span>→</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
