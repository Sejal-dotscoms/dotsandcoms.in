import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Calendar,
    Search,
    Check,
    TrendingUp,
    Gauge,
    ShieldCheck,
    Smartphone,
    Clock3,
    ArrowRight,
} from "lucide-react";

const AUDIT_FEATURES = [
    {
        icon: TrendingUp,
        title: "SEO Analysis",
        description: "Identify issues affecting your search engine rankings.",
    },
    {
        icon: Gauge,
        title: "Speed Check",
        description: "Ensure fast loading times for a better user experience.",
    },
    {
        icon: ShieldCheck,
        title: "Security Verification",
        description: "Detect vulnerabilities and enhance website security.",
    },
    {
        icon: Smartphone,
        title: "Mobile Compatibility Test",
        description: "Optimize your site for seamless mobile performance.",
    },
];

export default function ContactCTA() {
    const [auditMode, setAuditMode] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [details, setDetails] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setEmail("");
            setDetails("");
        }, 4000);
    };

    return (
        <section id="contact" className="py-12 lg:py-16 relative overflow-hidden bg-[#f8fafc]">
            {/* Dynamic Glowing Mesh Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#dc2626]/5 to-[#ea580c]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Decorative Badge */}
                <motion.div
                    className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 w-fit mx-auto cursor-pointer mb-6"
                    style={{ display: "flex" }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setAuditMode(!auditMode)}
                >
                    <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-spin" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ea580c]">
                        {auditMode ? "Switch to Consultation" : "Need a Performance Audit?"}
                    </span>
                </motion.div>

                {/* Title */}
                <div className="text-center space-y-3 mb-10 lg:mb-12">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold font-heading text-slate-800 tracking-tight leading-[1.05]">
                        Ready to Build <span className="text-gradient-mixed">Extraordinary?</span>
                    </h2>
                    <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Let's construct next-generation web designs, database layers, and search-optimized systems that unlock digital growth.
                    </p>
                </div>

                {/* Left / Right Split — content 8 cols, form 4 cols at xl. Fits one viewport on desktop. */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10 items-stretch">

                    {/* LEFT: Audit Features — 8/12 on xl */}
                    <div className="order-1 xl:col-span-8 rounded-2xl border border-orange-500/15 bg-gradient-to-b from-orange-500/[0.04] to-transparent p-6 md:p-7 flex flex-col">
                        <h3 className="text-lg md:text-xl font-bold font-heading text-slate-800 mb-1 text-left">
                            Get Your Website Audit Report — Free
                        </h3>
                        <p className="text-xs md:text-sm text-slate-500 mb-5 text-left">
                            Identify performance and security issues before they cost you visitors.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left flex-1">
                            {AUDIT_FEATURES.map(({ icon: Icon, title, description }) => (
                                <motion.div
                                    key={title}
                                    whileHover={{ y: -2 }}
                                    className="flex items-start gap-3 rounded-xl bg-white border border-slate-100 p-3.5 shadow-sm hover:shadow-md hover:border-orange-500/20 transition-all duration-300"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#dc2626]/8 text-[#dc2626] flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800 leading-tight">{title}</p>
                                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Turnaround callout — the clincher that makes "free" feel credible */}
                        <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-slate-100">
                            <Clock3 className="w-3.5 h-3.5 text-[#ea580c]" />
                            <span className="text-xs font-semibold text-slate-600">
                                Receive your detailed, actionable report within 48 hours
                            </span>
                        </div>
                    </div>

                    {/* RIGHT: Form Container — 4/12 on xl */}
                    <div className="order-2 xl:col-span-4 rounded-2xl glass-panel border border-slate-100 p-6 md:p-7 bg-white shadow-xl relative flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    className="flex flex-col items-center justify-center py-8 space-y-4 text-center"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                >
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                                        <Check className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-800 font-heading">Inquiry Received</h4>
                                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                                        Thank you! An engineer from our Mumbai team will contact you at <span className="text-[#dc2626] font-semibold">{email}</span> within 4 business hours.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key={auditMode ? "audit" : "consult"}
                                    onSubmit={handleSubmit}
                                    className="space-y-4 text-left"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div>
                                        <label htmlFor="user-email" className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            id="user-email"
                                            type="email"
                                            required
                                            placeholder="name@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-[#dc2626] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-all duration-300"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="user-details" className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-2">
                                            {auditMode ? "Website URL to Audit" : "Project Details"}
                                        </label>
                                        <textarea
                                            id="user-details"
                                            required
                                            rows={3}
                                            placeholder={auditMode ? "https://yourwebsite.com" : "Briefly describe your objectives..."}
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-[#dc2626] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-all duration-300 resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase bg-[#dc2626] text-white hover:bg-red-700 border border-red-500/10 shadow-[0_0_20px_rgba(220,38,38,0.12)] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300"
                                    >
                                        {auditMode ? (
                                            <>
                                                <Search className="w-4 h-4" />
                                                <span>Request Free Website Audit</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </>
                                        ) : (
                                            <>
                                                <Calendar className="w-4 h-4" />
                                                <span>Book Free Consultation</span>
                                            </>
                                        )}
                                    </button>

                                    {/* Support badges moved inline under the form to save vertical space */}
                                    <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 text-[10px] font-mono tracking-wider pt-3">
                                        <span>✓ Response in &lt; 48 hours</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                                        <span>✓ Zero Commitment</span>
                                        
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}