import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TechStack() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const techs = [
    {
      name: "React JS",
      role: "User Interfaces",
      desc: "Client-side rendering, virtual DOM state machines, and micro-animations for immersive web portals.",
      color: "from-cyan-500/10 to-blue-500/5",
      icon: <img src="/react-js.png" className="h-10 w-auto object-contain" alt="React JS - Modern frontend development library for interactive web applications" loading="lazy" decoding="async" width="256" height="256" />,
    },
    {
      name: "ASPX Core",
      role: "Enterprise Backend",
      desc: "Secure, high-performance MVC framework for robust server-side application logic and web APIs.",
      color: "from-purple-500/10 to-indigo-500/5",
      icon: <img src="/asp-net-icon.png" className="h-10 w-auto object-contain" alt="ASP.NET Core - High performance backend framework for secure web APIs" loading="lazy" decoding="async" width="200" height="138" />,
    },
    {
      name: "Node JS",
      role: "Backend APIs",
      desc: "Asynchronous event-driven JavaScript runtimes designed for highly scalable socket servers.",
      color: "from-green-500/10 to-emerald-500/5",
      icon: <img src="/node-logo-dark.svg" className="h-8 w-auto object-contain" alt="Node JS - Scalable JavaScript runtime for custom API development" loading="lazy" decoding="async" width="267" height="80" />,
    },
    {
      name: "Flutter",
      role: "Mobile App Development",
      desc: "Compiled cross-platform mobile architectures delivering high performance at 120Hz.",
      color: "from-blue-500/10 to-cyan-500/5",
      icon: <img src="/flutter-icon.png" className="h-10 w-auto object-contain" alt="Flutter - Cross platform framework for Android and iOS mobile app development" loading="lazy" decoding="async" width="200" height="200" />,
    },
    {
      name: "Figma",
      role: "UI/UX & Prototyping",
      desc: "Collaborative design platforms for interactive prototyping, high-fidelity wireframing, and custom design systems.",
      color: "from-pink-500/10 to-orange-500/5",
      icon: <img src="/figma-ui-ux-developer.png" className="h-10 w-auto object-contain" alt="Figma - Collaborative design tool for custom UI UX prototypes" loading="lazy" decoding="async" width="200" height="200" />,
    },
    {
      name: "ChatGPT",
      role: "AI Generator",
      desc: "Advanced LLM integration, custom GPT agents, conversational UI workflows, and automated intelligence pipelines.",
      color: "from-emerald-500/10 to-teal-500/5",
      icon: <img src="/chatgpt-logo.png" className="h-10 w-auto object-contain" alt="ChatGPT - AI Generator and LLM integration" loading="lazy" decoding="async" width="256" height="256" />,
    },
    {
      name: "Claude",
      role: "AI Generator",
      desc: "Sophisticated reasoning models, complex code generation, long-context data synthesis, and enterprise AI solutions.",
      color: "from-amber-600/10 to-orange-500/5",
      icon: <img src="/claude-logo.png" className="h-10 w-auto object-contain" alt="Claude - AI Generator and advanced reasoning" loading="lazy" decoding="async" width="256" height="256" />,
    },
    {
      name: "SEO & Digital Marketing",
      role: "Growth & Visibility",
      desc: "Strategic search engine optimization, analytics monitoring, and digital lead generation campaigns.",
      color: "from-red-500/10 to-orange-500/5",
      icon: <img src="/seo.png" className="h-9 w-auto object-contain" alt="SEO & Digital Marketing - Search engine optimization for business growth" loading="lazy" decoding="async" width="256" height="144" />,
    },
  ];

  return (
    <section className="py-12 md:py-24 relative bg-[#f8fafc]/60 border-t border-slate-100">
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[300px] bg-[#dc2626]/3 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-left space-y-4 mb-16 max-w-2xl">
          <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
            // Technical Stack
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
            Our Development Arsenal
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Hover over any technical framework to reveal how we deploy it to optimize performance, scalability, and security.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techs.map((tech, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={tech.name}
                className={`relative h-40 rounded-2xl overflow-hidden glass-panel border cursor-pointer bg-white transition-all duration-500 ease-out ${
                  isHovered
                    ? "border-red-500/30 shadow-[0_15px_30px_-5px_rgba(220,38,38,0.08)] scale-[1.02]"
                    : "border-slate-100 shadow-sm hover:border-slate-200"
                }`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Normal Logo State */}
                <motion.div
                  className="h-full w-full flex flex-col justify-center items-center p-4 text-center select-none"
                  animate={{
                    opacity: isHovered ? 0 : 1,
                    y: isHovered ? -10 : 0,
                    scale: isHovered ? 0.94 : 1,
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-3 transform transition-transform duration-500 ease-out">
                    {tech.icon}
                  </div>
                  <h3 className="text-center text-sm font-bold text-slate-800 tracking-wider uppercase font-heading">
                    {tech.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 uppercase font-mono mt-1">
                    {tech.role}
                  </span>
                </motion.div>

                {/* In-Card Hover Detail Overlay */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className={`absolute inset-0 z-10 p-5 flex flex-col justify-center text-left bg-gradient-to-br ${tech.color} bg-white rounded-2xl select-none`}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[10px] font-bold font-mono text-[#ea580c] uppercase tracking-widest block mb-1"
                      >
                        System Deployment
                      </motion.span>
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-slate-800 font-bold font-heading text-sm mb-1"
                      >
                        {tech.name}
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="text-slate-600 text-xs leading-relaxed"
                      >
                        {tech.desc}
                      </motion.p>
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
