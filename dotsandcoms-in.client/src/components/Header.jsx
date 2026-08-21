import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuditModal from "./ui/AuditModal";

import {
  Menu,
  X,
  ArrowUpRight,
  LifeBuoy,
  Briefcase,
  Globe,
  ChevronRight,
  Mail,
  Phone
} from "lucide-react";
import Logo from "./Logo";

// Create animated Framer Motion router link
const MotionLink = motion(Link);

// Custom SVG Social Icons (Lucide-react brand icons are deprecated in newer versions)
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Subcomponent for premium sliding nav link
function SlidingNavLink({ link, index, hoveredIdx, setHoveredIdx }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={link.href}
      aria-label={`Dots & Coms ${link.label} ${link.label2} Page`}
      onMouseEnter={() => {
        setIsHovered(true);
        setHoveredIdx(index);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredIdx(null);
      }}
      className="group relative px-3 py-2.5 rounded-full text-sm font-bold text-slate-700 hover:text-[#dc2626] transition-colors duration-300 flex items-center select-none"
    >
      {/* Sliding Pill Background Indicator */}
      {hoveredIdx === index && (
        <motion.span
          layoutId="navHoverPill"
          className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-full -z-10 border border-red-500/10"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Text Container with combined label and label2 */}
      <span className="relative overflow-hidden inline-block h-[20px] leading-[20px]">
        <motion.span
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="block"
        >
          {link.label} {link.label2}
        </motion.span>
        <motion.span
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="block absolute top-full left-0 text-[#dc2626]"
        >
          {link.label} <span className="text-[#ea580c]">{link.label2}</span>
        </motion.span>
      </span>

      {/* Sliding Hover Arrow */}
      <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-[#ea580c] transition-all duration-300 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0" />
    </Link>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Freeze scroll when mega menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [isOpen]);

  const navLinks = [
    { label: "Web", label2: "Design", href: "/responsive-website-designing-company-vadodara", desc: "Award-winning creative website and UI/UX design" },
    { label: "Mobile", label2: "Apps", href: "/android-ios-mobile-app-development-company-baroda", desc: "Cross-platform mobile applications for iOS & Android" },
    { label: "Web", label2: "Hosting", href: "/windows-web-hosting-service-provider-baroda", desc: "High-performance SSD cloud server architectures" },
    { label: "Digital", label2: "Marketing", href: "/organic-seo-ppc-digital-marketing-vadodara", desc: "Performance marketing, SEO and branding solutions" },
    { label: "Our", label2: "Work", href: "/website-mobile-app-development-company-portfolio-baroda", desc: "Our portfolio of enterprise systems and branding projects" },
    //{ label: "Blog", label2: "", href: "/blogs", desc: "Insights, tips and updates from the Dots & Coms team" },
    { label: "About", label2: "Us", href: "/about-web-development-company-baroda", desc: "25+ years of digital agency legacy and expert team details" },
    { label: "Contact", label2: "Us", href: "/contact-webdesign-mobileapp-socialmedia-marketing-baroda", desc: "Drop by our office or write to us for free consulting" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: <FacebookIcon className="w-3.5 h-3.5" />, href: "https://www.facebook.com/dedicated.developers.india/", color: "hover:bg-blue-600" },
    { name: "Twitter", icon: <TwitterIcon className="w-3.5 h-3.5" />, href: "https://x.com/dotsandcoms", color: "hover:bg-sky-505" },
    { name: "LinkedIn", icon: <LinkedinIcon className="w-3.5 h-3.5" />, href: "https://www.linkedin.com/company/dots-&-coms/", color: "hover:bg-blue-700" },
    { name: "Instagram", icon: <InstagramIcon className="w-3.5 h-3.5" />, href: "https://www.instagram.com/dotsandcoms/?hl=en", color: "hover:bg-pink-655" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "pointer-events-none" : ""
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Tier 1: Slanted Top Utility Bar (Disappears on Scroll, Container Fluid) */}
        <div
          className={`hidden xl:block transition-all duration-500 ease-in-out border-b border-slate-100 bg-[#f8fafc] ${
            scrolled ? "h-0 overflow-hidden opacity-0 pointer-events-none" : "opacity-100 h-[38px]"
          }`}
        >
          <div className="w-full flex justify-between items-center h-full relative">
            {/* Left side empty space to match design grid */}
            <div className="px-6 md:px-12 text-slate-400 text-[10px] font-bold uppercase tracking-wider font-sans select-none flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span> Creative & Digital Agency • Vadodara, India</span>
            </div>

            {/* Right Slanted Dark Grey bar */}
            <div className="h-full bg-slate-900 text-slate-300 flex items-center space-x-6 px-12 slant-clip-right min-w-[55%] justify-end relative shadow-inner select-none pr-12">
              {/* Divider lines decoration */}
              <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 to-transparent" />
              
              {/* Social Accounts */}
              <div className="flex items-center space-x-2">
                {socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit Dots & Coms on ${s.name}`}
                    className={`p-1.5 rounded-full hover:text-white transition-all duration-300 ${s.color}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />

              {/* Utility Pages */}
              <div className="flex items-center space-x-5 text-xs font-semibold">
                <a
                  href="https://www.dotscoms.com/training-and-job-vacancy-at-dots-coms-vadodara.html" target="_blank" rel="noopener noreferrer"
                  aria-label="Career and Job Opportunities at Dots & Coms Vadodara"
                  className="flex items-center space-x-1.5 hover:text-[#ea580c] transition-colors duration-300"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#ea580c]" />
                  <span>Career</span>
                </a>
                <Link
                  to="/webhosting-vps-dedicated-server-support-baroda"
                  aria-label="Technical Support Services Baroda Header Link"
                  className="flex items-center space-x-1.5 hover:text-[#dc2626] transition-colors duration-300"
                >
                  <LifeBuoy className="w-3.5 h-3.5 text-[#dc2626]" />
                  <span>Technical Support</span>
                </Link>
              </div>
            </div>

            {/* Glowing accent border underneath slanted container */}
            <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#ea580c]/50 to-[#dc2626] opacity-70" />
          </div>
        </div>

        {/* Tier 2: Main Floating Dock Container (Container Fluid) */}
        <div className={`w-full transition-all duration-500 ease-in-out ${scrolled ? "px-6 md:px-12 pt-4" : "px-0 pt-0"}`}>
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`pointer-events-auto transition-all duration-500 ease-in-out ${
              scrolled
                ? "w-full rounded-full glass-panel border border-slate-200/50 shadow-xl px-8 py-2.5 floating-header-glow"
                : "w-full bg-white border border-slate-100 rounded-none shadow-sm px-6 md:px-12 py-4"
            }`}
          >
            <div className="w-full flex items-center justify-between relative">
              
              {/* Logo */}
              <Link to="/" aria-label="Dots & Coms Web Development Agency Header Logo Link" className="flex items-center shrink-0 hover:scale-[1.02] transition-transform duration-300">
                <Logo size={scrolled ? "sm" : "md"} />
              </Link>

              {/* Premium Nav Links - Hidden on screens below 1280px (xl) to prevent layout break */}
              <nav className="hidden xl:flex items-center relative space-x-0.5">
                {navLinks.map((link, idx) => (
                  <SlidingNavLink
                    key={idx}
                    link={link}
                    index={idx}
                    hoveredIdx={hoveredIdx}
                    setHoveredIdx={setHoveredIdx}
                  />
                ))}
              </nav>

              {/* Actions & Responsive Toggle */}
              <div className="flex items-center space-x-4 shrink-0">
                
                              <button
                                  onClick={() => setIsModalOpen(true)}
                                  data-testid="button-audit-cta"
                                  aria-label="Request Free SEO & Website Performance Audit Report"
                                  title="Request Free Audit Report"
                  className="hidden md:inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#dc2626] text-white hover:bg-red-700 transition-all duration-300 border border-red-500/10 shadow-[0_0_20px_rgba(220,38,38,0.12)] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:-translate-y-0.5"
                >
                  <span>Free Audit Report</span>
                                  <ArrowUpRight className="w-4 h-4" />
                              </button>
                {/* Main Burger Button / Command Center Toggle - Visible on all viewports */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2.5 rounded-full border transition-all duration-300 bg-slate-50 hover:bg-slate-100 ${
                    isOpen
                      ? "border-red-500/20 text-[#dc2626]"
                      : "border-slate-200 text-slate-700 hover:border-slate-[#350]"
                  }`}
                  aria-label="Toggle Navigation Menu"
                  title="Toggle Navigation Menu"
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>

              {/* Bottom decorative color ribbon (Only visible when flat and unscrolled) */}
              {!scrolled && (
                <div className="absolute bottom-[-17px] left-0 w-full h-[1.5px] bg-gradient-to-r from-[#dc2626] via-[#ea580c] to-[#eab308] opacity-80" />
              )}
            </div>
          </motion.div>
        </div>
      </motion.header>

      <AuditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Modern Command Center Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent
            style={{ 
              paddingTop: scrolled ? "80px" : "130px",
              transition: "padding-top 300ms cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            className="fixed inset-0 bg-slate-950 z-40 flex flex-col justify-between overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Tech grid mesh background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#dc2626]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#ea580c]/5 rounded-full blur-[100px] pointer-events-none" />
           {/* Central Content Grid */}
            <div 
              data-lenis-prevent
              className="max-w-7xl mx-auto px-6 md:px-12 flex-1 min-h-0 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 pt-4 pb-12 lg:py-3 overflow-y-auto dark-scrollbar menu-grid"
            >
              
              {/* Left Column: Huge Navigation Menu */}
              <div className="lg:col-span-7 flex flex-col space-y-3 text-left">
                {navLinks.map((link, i) => (
                  <MotionLink
                    key={i}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex flex-col items-start border-b border-white/5 pb-3 hover:border-[#dc2626]/30 transition-colors"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex items-center space-x-2.5 text-white group-hover:text-[#dc2626] transition-colors">
                      <span className="text-[11px] font-mono text-white/20 group-hover:text-[#dc2626] transition-colors">0{i + 1}</span>
                      <div className="text-xl lg:text-[28px] font-extrabold font-heading tracking-tight flex items-center leading-none">
                        <span>{link.label} {link.label2}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#dc2626]" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-5 group-hover:text-slate-300 transition-colors leading-normal">
                      {link.desc}
                    </p>
                  </MotionLink>
                ))}
              </div>

              {/* Right Column: HQ Time and Sister Sites Panel */}
              <div className="lg:col-span-5 flex flex-col space-y-2.5">
                
                {/* Our Network / Other Websites Card */}
                <motion.div
                  className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md text-left relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="absolute top-[-20%] right-[-20%] w-[120px] h-[120px] bg-[#dc2626]/5 rounded-full blur-2xl" />
                  <div className="text-white text-[16px] font-mono uppercase tracking-widest border-b border-white/10 pb-1.5 mb-2 flex items-center justify-between">
                    <span>Our Ventures</span>
                    <Globe className="w-3 h-3 text-[#ea580c] animate-pulse" />
                  </div>

                  <div className="space-y-1">
                    <a
                      href="https://www.customlogodesigner.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-1 rounded-lg bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 group"
                    >
                      <div>
                        <div className="text-white text-[14px] font-bold group-hover:text-[#dc2626] transition-colors">Logo Design</div>
                                              <p className="text-[11px] text-slate-400 mt-0.5">customlogodesigner.com</p>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-slate-505 group-hover:text-[#dc2626] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>

                    <a
                      href="https://brochuredesigncompany.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-1 rounded-lg bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 group"
                    >
                      <div>
                        <div className="text-white text-[14px] font-bold group-hover:text-[#dc2626] transition-colors">Graphic design</div>
                        <p className="text-[11px] text-slate-400 mt-0.5">brochuredesigncompany.com</p>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-slate-505 group-hover:text-[#dc2626] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>

                    <a
                      href="https://remoteitworkforce.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-1 rounded-lg bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 group"
                    >
                      <div className="max-w-[85%]">
                                              <div className="text-white text-[14px] font-bold group-hover:text-[#dc2626] transition-colors truncate"> Remote IT Workforce </div>
                                              <p className="text-[11px] text-slate-400 mt-0.5">remoteitworkforce.in</p>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-slate-505 group-hover:text-[#dc2626] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                    </a>

                    <a
                      href="https://www.dotsandcoms.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-1 rounded-lg bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 group"
                    >
                      <div>
                                              <div className="text-white text-[14px] font-bold group-hover:text-[#dc2626] transition-colors">For international</div>
                                              <p className="text-[11px] text-slate-400 mt-0.5">dotsandcoms.com</p>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-slate-505 group-hover:text-[#dc2626] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  </div>
                </motion.div>

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
