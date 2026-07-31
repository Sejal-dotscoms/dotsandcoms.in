import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Zap, Shield, Smartphone, FileText } from "lucide-react";
import AuditModal from "./ui/AuditModal";

const features = [
  {
    icon: Search,
    title: "SEO Analysis",
    description: "Identify issues affecting your search rankings",
  },
  {
    icon: Zap,
    title: "Speed Check",
    description: "Ensure fast loading times across all devices",
  },
  {
    icon: Shield,
    title: "Security Verification",
    description: "Detect vulnerabilities before they cause damage",
  },
  {
    icon: Smartphone,
    title: "Mobile Compatibility",
    description: "Optimize for seamless mobile performance",
  },
  {
    icon: FileText,
    title: "Free Report in 48 Hours",
    description: "Detailed analysis with actionable insights",
  },
];

export function FreeAuditCTA() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section ref={ref} className="py-12 md:py-24 bg-gradient-to-br from-[#ea580c] to-[#dc2626] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          >
            Get Your Website Audit Report for{" "}
            <span className="underline decoration-white/40 decoration-4 underline-offset-4">FREE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-orange-100 text-lg sm:text-xl max-w-2xl mx-auto"
          >
            Identify performance and security issues holding your site back
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              className="flex flex-col items-center text-center p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                <feat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{feat.title}</h3>
              <p className="text-orange-100 text-xs leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            data-testid="button-audit-cta"
            className="inline-flex items-center gap-2 bg-white text-[#dc2626] hover:bg-[#fff7ed] font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 cursor-pointer active:scale-95"
          >
            Analyze My Website Now
          </button>
        </motion.div>
      </div>

      <AuditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
