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
      icon: <img src="/react-js.png" className="h-10 w-auto object-contain" alt="React JS - Modern frontend development library for interactive web applications" loading="lazy" width="256" height="256" />,
    },
    {
      name: "ASPX Core",
      role: "Enterprise Backend",
      desc: "Secure, high-performance MVC framework for robust server-side application logic and web APIs.",
      color: "from-purple-500/10 to-indigo-500/5",
      icon: <img src="/asp-net-icon.png" className="h-10 w-auto object-contain" alt="ASP.NET Core - High performance backend framework for secure web APIs" loading="lazy" width="200" height="138" />,
    },
    {
      name: "Node JS",
      role: "Backend APIs",
      desc: "Asynchronous event-driven JavaScript runtimes designed for highly scalable socket servers.",
      color: "from-green-500/10 to-emerald-500/5",
      icon: <img src="/node-logo-dark.svg" className="h-8 w-auto object-contain" alt="Node JS - Scalable JavaScript runtime for custom API development" loading="lazy" width="267" height="80" />,
    },
    {
      name: "Flutter",
      role: "Mobile App Development",
      desc: "Compiled cross-platform mobile architectures delivering high performance at 120Hz.",
      color: "from-blue-500/10 to-cyan-500/5",
      icon: <img src="/flutter-icon.png" className="h-10 w-auto object-contain" alt="Flutter - Cross platform framework for Android and iOS mobile app development" loading="lazy" width="200" height="200" />,
    },
    {
      name: "Figma",
      role: "UI/UX & Prototyping",
      desc: "Collaborative design platforms for interactive prototyping, high-fidelity wireframing, and custom design systems.",
      color: "from-pink-500/10 to-orange-500/5",
      icon: <img src="/figma-ui-ux-developer.png" className="h-10 w-auto object-contain" alt="Figma - Collaborative design tool for custom UI UX prototypes" loading="lazy" width="200" height="200" />,
    },
    {
      name: "Shopify",
      role: "E-Commerce",
      desc: "Robust checkouts, headless Storefront APIs, global transaction handling, and security.",
      color: "from-lime-600/10 to-green-500/5",
      icon: <img src="/shopify_logo_black.png" className="h-7 w-auto object-contain" alt="Shopify - Headless e-commerce development platform for online stores" loading="lazy" width="1000" height="286" />,
    },
    {
      name: "Hosting",
      role: "Deployment & Scaling",
      desc: "High-performance server configurations, web hosting infrastructure with 99.9% uptime, and auto-scaling support.",
      color: "from-orange-500/10 to-yellow-500/5",
      icon: <img src="/cloud-computing.png" className="h-10 w-auto object-contain" alt="Web Hosting - Secure server hosting and deployment solutions" loading="lazy" width="256" height="256" />,
    },
    {
      name: "SEO & Digital Marketing",
      role: "Growth & Visibility",
      desc: "Strategic search engine optimization, analytics monitoring, and digital lead generation campaigns.",
      color: "from-red-500/10 to-orange-500/5",
      icon: <img src="/seo.png" className="h-9 w-auto object-contain" alt="SEO & Digital Marketing - Search engine optimization for business growth" loading="lazy" width="256" height="144" />,
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
          {techs.map((tech, idx) => (
            <div
              key={tech.name}
              className="relative"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div
                className={`h-40 rounded-2xl glass-panel border border-slate-100 flex flex-col justify-center items-center cursor-pointer transition-all duration-300 bg-gradient-to-br bg-white ${
                  hoveredIdx === idx
                    ? `${tech.color} border-red-500/20 scale-[1.03] shadow-[0_15px_30px_-10px_rgba(220,38,38,0.06)]`
                    : "hover:border-slate-200"
                }`}
              >
                <div className="mb-3 transform transition-transform duration-300 group-hover:scale-110">
                  {tech.icon}
                </div>
                <h3 className="text-center text-sm font-bold text-slate-800 tracking-wider uppercase font-heading">
                  {tech.name}
                </h3>
                <span className="text-[10px] text-slate-400 uppercase font-mono mt-1">
                  {tech.role}
                </span>
              </div>

              {/* Tooltip Overlay Panel */}
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.div
                    className={`absolute z-30 bottom-[108%] w-[260px] xs:w-[280px] rounded-xl glass-panel border border-red-500/10 p-4 sm:p-5 shadow-2xl text-left pointer-events-none bg-white/95 
                      ${idx % 2 === 0 
                        ? "left-0 origin-bottom-left md:left-1/2 md:-translate-x-1/2 md:origin-bottom" 
                        : "right-0 origin-bottom-right md:left-1/2 md:-translate-x-1/2 md:origin-bottom"
                      }
                    `}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-[10px] font-bold font-mono text-[#ea580c] uppercase tracking-widest block mb-1">
                      System Deployment
                    </span>
                    <h4 className="text-slate-800 font-bold font-heading text-sm mb-2">
                      {tech.name}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {tech.desc}
                    </p>
                    {/* Tooltip Arrow */}
                    <div className={`absolute top-full border-8 border-transparent border-t-white
                      ${idx % 2 === 0 
                        ? "left-[29%] -translate-x-1/2 md:left-1/2 md:-translate-x-1/2" 
                        : "right-[29%] translate-x-1/2 md:left-1/2 md:-translate-x-1/2"
                      }
                    `} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
