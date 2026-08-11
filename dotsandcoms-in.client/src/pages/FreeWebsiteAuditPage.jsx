import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Gauge,
  Search,
  Link2,
  ShieldCheck,
  CheckCircle,
  RefreshCw,
  ArrowRight,
  Loader2,
  Globe,
  User,
  AtSign,
  Zap,
  Clock,
  Shield,
  Quote,
  ChevronRight,
  Home,
  CheckCheck
} from "lucide-react";
import axios from "axios";
import ThreeBackground3 from "../components/Threebackground3";
import { setPageSEO } from "../utils/seo";

export default function FreeWebsiteAuditPage() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // Math Captcha state
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const API_URL = "https://www.dotsandcoms.in/api/audit/send";

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaAnswer("");
    setCaptchaError("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Free Website Audit & SEO Performance Analysis Vadodara | Dots & Coms",
      description:
        "Request a 100% free website audit report from Dots & Coms Vadodara. We analyze website speed, SEO rankings, dead links, and keyword performance within 48 hours.",
      keywords:
        "free website audit Baroda, SEO performance audit Vadodara, free SEO analysis Gujarat, website speed check Baroda, technical SEO audit Vadodara, keyword analysis Baroda, website evaluation Dots and Coms",
      canonical: "https://www.dotsandcoms.in/fee-seo-performance-website-audit"
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCaptchaError("");

    if (!name || !email || !url) return;

    // Validate Math Captcha
    const expected = captchaNum1 + captchaNum2;
    if (parseInt(captchaAnswer) !== expected) {
      setCaptchaError("Incorrect captcha numeric value. Please try again.");
      return;
    }

    try {
      setStatus("loading");
      await axios.post(API_URL, {
        name,
        email,
        websiteUrl: url
      });

      setStatus("success");
      setName("");
      setEmail("");
      setUrl("");
      setCaptchaAnswer("");
    } catch (err) {
      console.error(err);
      const data = err.response?.data;
      let msg = "Unable to submit your audit request. Please try again or contact us directly.";

      if (typeof data === "string") {
        msg = data;
      } else if (data?.errors) {
        msg = Object.values(data.errors).flat().join(" ");
      } else if (data?.title) {
        msg = data.title;
      }

      setError(msg);
      setStatus("idle");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setError("");
    generateCaptcha();
  };

  const whatWeWillDoItems = [
    {
      icon: Gauge,
      title: "Speed & Performance",
      desc: "Analyze website speed and performance across devices",
      color: "text-[#dc2626]",
      bg: "bg-red-50",
      border: "border-red-100/80 hover:border-red-300",
      tag: "Core Web Vitals"
    },
    {
      icon: Search,
      title: "Keyword & Rankings",
      desc: "Conduct keyword research and search ranking analysis",
      color: "text-[#ea580c]",
      bg: "bg-orange-50",
      border: "border-orange-100/80 hover:border-orange-300",
      tag: "Search Visibility"
    },
    {
      icon: Link2,
      title: "Link Integrity",
      desc: "Identify and report dead links, 404s, and redirect errors",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100/80 hover:border-amber-300",
      tag: "Broken Links"
    },
    {
      icon: ShieldCheck,
      title: "SEO Health Audit",
      desc: "Perform SEO audit using manual checks & pro diagnostic tools",
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100/80 hover:border-rose-300",
      tag: "Manual & Pro Tools"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-700">
      
      {/* ============================================================
          1. BRIGHT LIGHT HERO & BANNER SECTION
          ============================================================ */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white pt-4 pb-14 sm:pt-44 md:pt-44">
        {/* Interactive 3D Canvas Background in soft opacity */}
        <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-screen -translate-x-1/2 scale-110 opacity-20">
          <ThreeBackground3 />
        </div>

        {/* Ambient soft red/orange glowing mesh orbs on light background */}
        <div className="pointer-events-none absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#dc2626]/5 blur-[140px]" />
        <div className="pointer-events-none absolute top-10 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#ea580c]/5 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-12">
          
          {/* Top Pill Badges */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-red-50 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase shadow-sm">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#ea580c]" />
              Free SEO Audit Report
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3.5 py-1.5 font-mono text-xs font-bold text-emerald-700 shadow-sm">
              <Zap className="h-3.5 w-3.5 text-emerald-600" />
              100% Free • No Obligation
            </span>
          </motion.div>

          {/* Main Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading mx-auto max-w-4xl text-3xl leading-[1.1] font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Get a Free Website Audit for{" "}
            <span className="bg-gradient-to-r from-[#dc2626] via-[#ea580c] to-[#f59e0b] bg-clip-text text-transparent">
              Your Business
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg"
          >
            The first logical step toward a successful digital marketing investment is to evaluate your current position
            and determine whether your website is truly ready to attract and retain visitors.
          </motion.p>

          {/* Breadcrumb Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-500"
          >
            <Link to="/" className="flex items-center gap-1 transition-colors hover:text-[#dc2626]">
              <Home className="h-3.5 w-3.5 text-slate-400" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link to="/services" className="transition-colors hover:text-[#dc2626]">
              Services
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-bold text-[#dc2626]">Free Website Audit</span>
          </motion.nav>

        </div>
      </section>

      {/* ============================================================
          2. LIGHT-THEME FORM SPOTLIGHT SECTION
          ============================================================ */}
      <section className="relative px-4 py-16 sm:px-6 md:py-24 lg:px-12">
        {/* Soft grid texture */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f040_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f040_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="mx-auto max-w-7xl">
          
          {/* Main 2-Column Grid: Left Content (6 cols), Right Form (6 cols) */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* ── LEFT COLUMN: POPUP CONTENT PRESENTATION (6 cols on lg) ── */}
            <div className="space-y-7 text-left lg:col-span-6">
              
              {/* Light Styled Quote Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden rounded-3xl border-y border-r border-l-4 border-red-100 border-l-[#dc2626] bg-gradient-to-br from-red-50/90 via-orange-50/50 to-white p-6 shadow-sm sm:p-8"
              >
                <Quote className="pointer-events-none absolute right-4 bottom-3 h-16 w-16 text-red-500/10 select-none" />

                <div className="relative z-10 space-y-3">
                  <p className="text-sm leading-relaxed font-medium text-slate-800 italic sm:text-base md:text-lg">
                    "Spending on marketing without having the foundational elements in place is like giving away money
                    without purpose."
                  </p>
                  <div className="flex items-center gap-2 font-mono font-bold tracking-wider text-[11px] text-[#ea580c] uppercase">
                    <Sparkles className="h-3.5 w-3.5 text-[#ea580c]" />
                    <span>Foundational Marketing Principle</span>
                  </div>
                </div>
              </motion.div>

              {/* WHAT WE WILL DO - 4 Clean Bento Deliverable Cards */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h3 className="flex items-center gap-2 font-mono text-xs font-black tracking-widest text-slate-800 uppercase sm:text-sm">
                    <span className="h-2 w-2 rounded-full bg-[#dc2626]" />
                    WHAT WE WILL DO:
                  </h3>
                  <span className="font-mono font-semibold text-[14px] text-slate-400">
                    4-Point Technical Scan
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3.5 pt-1 sm:grid-cols-2">
                  {whatWeWillDoItems.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2 }}
                        className={`p-5 rounded-2xl bg-white border ${item.border} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3`}
                      >
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center font-bold shadow-sm`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <span className="rounded bg-slate-50 px-2 py-0.5 font-mono font-bold text-[14px] text-slate-400 uppercase">
                            {item.tag}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-heading text-md font-bold text-slate-900">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed text-slate-500">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Trust Indicators Bar in Light Theme */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 font-mono text-xs text-slate-600 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#dc2626]" />
                  <span><strong>⚡ Response in &lt; 48 hours</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#ea580c]" />
                  <span>No server passwords needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-emerald-600" />
                  <span className="font-bold text-slate-900">100% Free</span>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN: HIGH-FOCUS GLOWING FORM (6 cols on lg) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative lg:sticky lg:top-28 lg:col-span-6"
            >
              {/* Soft warm glowing background halo */}
              <div className="absolute -inset-1.5 -z-10 rounded-3xl bg-gradient-to-r from-[#ea580c]/20 via-[#f43f5e]/20 to-[#fbbf24]/20 opacity-70 blur-xl" />

              {/* Form Container Card */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 text-left shadow-2xl sm:p-10">
                
                {/* 3-Color Top Accent Ribbon */}
                <div className="absolute top-0 left-0 h-[4px] w-full bg-gradient-to-r from-[#dc2626] via-[#ea580c] to-[#fbbf24]" />

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center space-y-6 py-10 text-center"
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-300 bg-emerald-50 text-emerald-600 shadow-xl shadow-emerald-100">
                        <CheckCircle className="h-10 w-10" />
                      </div>

                      <div className="space-y-2">
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 font-mono text-xs font-bold tracking-widest text-emerald-700 uppercase">
                          // Audit Request Confirmed
                        </span>
                        <h3 className="font-heading text-2xl font-black text-slate-900 sm:text-3xl">
                          Request Submitted!
                        </h3>
                        <p className="mx-auto max-w-sm text-sm leading-relaxed text-slate-600 sm:text-base">
                          Thank you! Our technical team will analyze your website and email your free audit report within{" "}
                          <strong className="font-bold text-slate-900">48 hours</strong>.
                        </p>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={handleReset}
                          className="cursor-pointer rounded-full bg-slate-900 px-8 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl active:scale-95"
                        >
                          Submit Another Website
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Form Header */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 animate-ping rounded-full bg-emerald-500" />
                          <span className="font-mono font-bold tracking-widest text-[11px] text-[#dc2626] uppercase">
                            Free Technical Assessment
                          </span>
                        </div>
                        <h2 className="font-heading text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                          Get Your Website Audit Report
                        </h2>
                        <p className="text-xs text-slate-500 sm:text-sm">
                          Enter your details below to request your free detailed assessment.
                        </p>
                      </div>

                      {/* Error Banner */}
                      {error && (
                        <div className="flex items-start space-x-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
                          <span className="font-bold">Error:</span>
                          <span>{error}</span>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="audit-user-name"
                            className="block font-mono font-bold tracking-wider text-[11px] text-slate-700 uppercase"
                          >
                            YOUR NAME <span className="text-[#dc2626]">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                              id="audit-user-name"
                              type="text"
                              required
                              disabled={status === "loading"}
                              placeholder="John Doe"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 focus:border-[#dc2626] focus:bg-white focus:ring-4 focus:ring-red-500/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-900 font-medium focus:outline-none transition-all duration-200 disabled:opacity-50"
                            />
                          </div>
                        </div>

                        {/* URL Input */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="audit-website-url"
                            className="block font-mono font-bold tracking-wider text-[11px] text-slate-700 uppercase"
                          >
                            YOUR WEBSITE URL <span className="text-[#dc2626]">*</span>
                          </label>
                          <div className="relative">
                            <Globe className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                              id="audit-website-url"
                              type="text"
                              required
                              disabled={status === "loading"}
                              placeholder="https://yourwebsite.com"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 focus:border-[#dc2626] focus:bg-white focus:ring-4 focus:ring-red-500/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-900 font-medium focus:outline-none transition-all duration-200 disabled:opacity-50"
                            />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="audit-user-email"
                            className="block font-mono font-bold tracking-wider text-[11px] text-slate-700 uppercase"
                          >
                            YOUR EMAIL ADDRESS <span className="text-[#dc2626]">*</span>
                          </label>
                          <div className="relative">
                            <AtSign className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                              id="audit-user-email"
                              type="email"
                              required
                              disabled={status === "loading"}
                              placeholder="john@company.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 focus:border-[#dc2626] focus:bg-white focus:ring-4 focus:ring-red-500/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-900 font-medium focus:outline-none transition-all duration-200 disabled:opacity-50"
                            />
                          </div>
                        </div>

                        {/* Math Captcha Verification */}
                        <div className="space-y-2 border-t border-slate-100 pt-3">
                          <label className="block font-mono font-bold tracking-wider text-[11px] text-slate-700 uppercase">
                            *VERIFY MATH CHECK
                          </label>
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-11 shrink-0 items-center justify-center gap-1 rounded-xl bg-slate-900 px-3.5 font-mono text-sm font-black tracking-wide text-white shadow-inner select-none">
                              <span>{captchaNum1}</span>
                              <span>+</span>
                              <span>{captchaNum2}</span>
                              <span>=</span>
                            </div>
                            <input
                              type="number"
                              required
                              placeholder="Answer"
                              value={captchaAnswer}
                              onChange={(e) => setCaptchaAnswer(e.target.value)}
                              className="w-24 h-11 text-center bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-bold outline-none focus:bg-white focus:border-[#dc2626] focus:ring-4 focus:ring-red-500/10 transition-all duration-200 font-mono"
                            />
                            <button
                              type="button"
                              onClick={generateCaptcha}
                              className="shrink-0 cursor-pointer rounded-xl p-2.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-800"
                              title="Refresh Captcha"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="block font-mono text-[10px] text-slate-400">
                            captcha verification
                          </span>

                          {captchaError && (
                            <p className="mt-1 text-xs font-semibold text-[#dc2626]">{captchaError}</p>
                          )}
                        </div>

                        {/* Submit Action Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={status === "loading"}
                            className="inline-flex w-full cursor-pointer items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#ea580c] via-[#f43f5e] to-[#dc2626] px-6 py-4 text-xs font-black tracking-wider text-white uppercase shadow-xl shadow-red-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/40 hover:brightness-110 active:scale-98 disabled:opacity-75 sm:text-sm"
                          >
                            {status === "loading" ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Processing Audit Request...</span>
                              </>
                            ) : (
                              <>
                                <span>GET FREE AUDIT REPORT</span>
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>

          </div>

        </div>
      </section>

    </div>
  );
}
