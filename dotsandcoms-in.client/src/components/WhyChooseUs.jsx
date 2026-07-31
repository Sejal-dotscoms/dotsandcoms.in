import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShieldAlert, Award, Compass, Zap } from "lucide-react";

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState(0);

  const comparisonData = [
    {
      metric: "Delivery Speed",
      icon: <Zap className="w-5 h-5" />,
      traditional: {
        title: "Bloated Processes",
        desc: "3-6 months loaded with endless committee meetings, lack of engineering vision, and delayed milestones.",
        status: false,
      },
      dotscoms: {
        title: "Agile & transparent sprints",
        desc: "4-8 weeks launch schedule utilizing weekly staging deployments, clear Kanban checklists, and direct developer communication.",
        status: true,
      },
    },
    {
      metric: "Performance & SEO",
      icon: <Award className="w-5 h-5" />,
      traditional: {
        title: "Unoptimized Templates",
        desc: "Bloated templates resulting in 40-60 Lighthouse score marks, slow mobile loading speeds, and poor search indexing.",
        status: false,
      },
      dotscoms: {
        title: "Speed-First Architecture",
        desc: "99% Lighthouse rankings, next-gen static builds, edge caching, and semantic structures that rank on search engines.",
        status: true,
      },
    },
    {
      metric: "Tech Infrastructure",
      icon: <ShieldAlert className="w-5 h-5" />,
      traditional: {
        title: "Legacy & Security Risk",
        desc: "Bloated plugins, vulnerable PHP engines, shared slow servers, and zero failover protection.",
        status: false,
      },
      dotscoms: {
        title: "Modern Multi-Cloud",
        desc: "React 19, Tailwind CSS v4, secure headless architecture, and redundant global AWS servers with auto-scaling.",
        status: true,
      },
    },
    {
      metric: "Direct Alignment",
      icon: <Compass className="w-5 h-5" />,
      traditional: {
        title: "Account Manager Gatekeepers",
        desc: "Requirements filtered through non-technical account managers, causing lost instructions and delivery lag.",
        status: false,
      },
      dotscoms: {
        title: "Direct Engineering Access",
        desc: "Direct access to lead software developers, screen-share collaborations, and transparent codebase visibility.",
        status: true,
      },
    },
  ];

  return (
    <section className="py-12 md:py-24 relative bg-[#f8fafc]/40 border-y border-slate-100">
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#dc2626]/3 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 max-w-4xl mx-auto">
          <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
            // The Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
            Traditional Agency vs. Dots and Coms
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Discover why global companies partner with us to engineer high-velocity digital growth.
          </p>
        </div>

        {/* Mobile Dropdown Tab Selector */}
        <div className="md:hidden w-full max-w-xs mx-auto mb-10 relative">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(Number(e.target.value))}
            className="w-full bg-gradient-to-r from-[#dc2626] to-[#ea580c] text-white font-extrabold uppercase tracking-wider text-xs px-5 py-4 rounded-xl shadow-md border-none focus:outline-none appearance-none cursor-pointer pr-10 text-center"
          >
            {comparisonData.map((item, idx) => (
              <option key={item.metric} value={idx} className="text-slate-800 bg-white font-bold uppercase tracking-wider text-xs">
                {item.metric}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        {/* Tab Selectors (Desktop) */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-3 mb-12">
          {comparisonData.map((item, idx) => (
            <button
              key={item.metric}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase border transition-all duration-300 ${
                activeTab === idx
                  ? "bg-[#dc2626] border-[#dc2626] text-white shadow-[0_0_20px_rgba(220,38,38,0.15)]"
                  : "border-slate-200 bg-white text-slate-650 hover:text-slate-800 hover:border-slate-350"
              }`}
            >
              {item.icon}
              <span>{item.metric}</span>
            </button>
          ))}
        </div>

        {/* Comparison Board panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <AnimatePresence mode="wait">
            {/* Traditional Card */}
            <motion.div
              key={`traditional-${activeTab}`}
              className="rounded-2xl glass-panel border border-red-500/10 p-8 flex flex-col justify-between text-left relative overflow-hidden bg-white/80"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center space-x-3 text-red-500 font-bold tracking-wide uppercase text-xs mb-6">
                  <X className="w-5 h-5" />
                  <span>Other Agencies</span>
                </div>
                
                <h3 className="text-2xl font-bold font-heading text-slate-800 mb-4">
                  {comparisonData[activeTab].traditional.title}
                </h3>
                
                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                  {comparisonData[activeTab].traditional.desc}
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center text-xs text-slate-400 font-mono tracking-widest uppercase">
                CRITICAL SYSTEM BOTTLENECK
              </div>
            </motion.div>

            {/* Dots and Coms  Card */}
            <motion.div
              key={`dotscoms-${activeTab}`}
              className="rounded-2xl glass-panel border border-red-600/20 p-8 flex flex-col justify-between text-left relative overflow-hidden bg-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center space-x-3 text-[#dc2626] font-bold tracking-wide uppercase text-xs mb-6">
                  <Check className="w-5 h-5 text-[#dc2626]" />
                  <span>Dots and Coms  Experience</span>
                </div>
                
                <h3 className="text-2xl font-bold font-heading text-slate-800 mb-4 text-gradient-blue">
                  {comparisonData[activeTab].dotscoms.title}
                </h3>
                
                <p className="text-slate-650 text-sm md:text-base leading-relaxed">
                  {comparisonData[activeTab].dotscoms.desc}
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center text-xs text-[#dc2626] font-mono tracking-widest uppercase font-semibold">
                ENGINEERED FOR VELOCITY
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
