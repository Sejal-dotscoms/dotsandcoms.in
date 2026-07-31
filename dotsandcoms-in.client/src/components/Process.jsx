import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Process() {
  const containerRef = useRef(null);

  // Track scroll position of this container to animate progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const steps = [
    {
      num: "01",
      name: "Discovery",
      title: "Auditing & Foundations",
      desc: "We dive deep into your business model, customer profiles, competitive landscapes, and existing tech stacks to extract product blueprints.",
    },
    {
      num: "02",
      name: "Strategy",
      title: "Mapping the System",
      desc: "Creating precise feature matrices, data models, wireframes, user personas, and a bulletproof technical execution schedule.",
    },
    {
      num: "03",
      name: "Design",
      title: "High-Fidelity Aesthetics",
      desc: "Drafting premium responsive visuals, layout grids, components, glassmorphic interactions, and dynamic micro-animations.",
    },
    {
      num: "04",
      name: "Development",
      title: "Production Engineering",
      desc: "Converting designs into high-performance React applications, solid C# backend integration APIs, and secure database systems.",
    },
    {
      num: "05",
      name: "Launch",
      title: "Validation & Deployment",
      desc: "Conducting rigorous cross-browser audits, SEO optimization audits, performance optimization runs, and scaling up the production servers.",
    },
    {
      num: "06",
      name: "Growth",
      title: "Marketing & Optimization",
      desc: "Deploying Google Ads automation, tracking customer acquisition stats, executing updates, and monitoring growth scaling.",
    },
  ];

  return (
    <section ref={containerRef} id="process" className="pt-6 pb-12 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#ea580c]/3 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* Title */}
        <div className="text-left space-y-4 mb-20 max-w-2xl">
          <span className="text-xs font-bold font-mono tracking-widest text-[#ea580c] uppercase">
            // Operational Playbook
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
            How We Build Success
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Our step-by-step methodology designed to eliminate development surprises and deliver scalable enterprise systems.
          </p>
        </div>

        {/* Timeline body wrapper */}
        <div className="relative pl-6 md:pl-16 max-w-5xl mx-auto">
          {/* Static Background Line */}
          <div className="absolute left-[9px] md:left-[19px] top-2 bottom-2 w-0.5 bg-slate-200" />
          
          {/* Animated Foreground Progress Line */}
          <motion.div
            className="absolute left-[9px] md:left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#dc2626] to-[#ea580c] origin-top z-10"
            style={{ scaleY }}
          />

          <div className="space-y-16">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                className="relative pl-10 md:pl-16 text-left grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                {/* Node marker */}
                <div className="absolute left-[-2px] md:left-[8px] top-1.5 w-6 h-6 rounded-full bg-[#f8fafc] border-2 border-slate-200 flex items-center justify-center group-hover:border-[#ea580c] transition-colors duration-300 z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-350 group-hover:bg-[#dc2626] transition-colors duration-300" />
                </div>

                {/* Left col: Num & Name */}
                <div className="lg:col-span-4 flex items-baseline space-x-4">
                  <span className="text-2xl md:text-3xl font-extrabold font-heading text-slate-300 group-hover:text-[#dc2626] transition-colors duration-300">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wider font-heading">
                      {step.name}
                    </h3>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {step.title}
                    </span>
                  </div>
                </div>

                {/* Right col: Desc */}
                <div className="lg:col-span-8">
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed max-w-xl group-hover:text-slate-700 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
