import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Smartphone, ExternalLink, Monitor, Layers } from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { projects } from "../data/projects";
import { setPageSEO } from "../utils/seo";

const categories = [
  { id: "All", label: "All Work", icon: Layers },
  { id: "Web Design", label: "Web Design", icon: Monitor },
  { id: "Mobile Apps", label: "Mobile Apps", icon: Smartphone }
];

// Interactive 3D Card wrapper with cursor glow spotlight and magnetic translation layers
function TiltCard({ children }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse coordinates relative to card center (-0.5 to 0.5)
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Spotlight coordinates (percentage from 0% to 100%)
  const spotlightX = useMotionValue("50%");
  const spotlightY = useMotionValue("50%");

  // Spring physics configuration for snappy 3D movement
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };

  // Calculate 3D rotations based on coordinates
  const rotateXRaw = useTransform(y, [0, 1], [12, -12]);
  const rotateYRaw = useTransform(x, [0, 1], [-12, 12]);

  // Apply spring physics to smooth the rotation
  const rotateX = useSpring(rotateXRaw, springConfig);
  const rotateY = useSpring(rotateYRaw, springConfig);

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Local cursor position relative to card boundaries
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    // Normalizing coordinates from 0 to 1
    const normX = localX / width;
    const normY = localY / height;

    x.set(normX);
    y.set(normY);

    // Update spotlight custom properties
    spotlightX.set(`${normX * 100}%`);
    spotlightY.set(`${normY * 100}%`);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    // Reset spring value to center
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: isMobile ? "flat" : "preserve-3d",
        boxShadow: hovered && !isMobile
          ? "0 20px 45px rgba(220, 38, 38, 0.12), 0 -10px 35px rgba(220, 38, 38, 0.06)"
          : "0 4px 20px rgba(0,0,0,0.03)"
      }}
      className="relative w-full h-full rounded-3xl bg-white border border-slate-100/80 transition-shadow duration-500 overflow-hidden group select-none cursor-pointer flex flex-col"
    >
      {/* 3D Spotlight Dynamic Reflective Flare overlay */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(280px circle at ${spotlightX.get()} ${spotlightY.get()}, rgba(220, 38, 38, 0.14), rgba(220, 38, 38, 0.02) 40%, transparent 80%)`,
          }}
        />
      )}

      {/* Cyber/Tech accented neon brackets and indicators */}
      {!isMobile && (
        <>
          <div 
            className="absolute top-4 left-4 w-2 h-2 border-t-2 border-l-2 border-transparent transition-all duration-300 z-20"
            style={{ borderColor: hovered ? "#dc2626" : "transparent" }}
          />
          <div 
            className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-transparent transition-all duration-300 z-20"
            style={{ borderColor: hovered ? "#dc2626" : "transparent" }}
          />
          <div 
            className="absolute bottom-4 left-4 w-2 h-2 border-b-2 border-l-2 border-transparent transition-all duration-300 z-20"
            style={{ borderColor: hovered ? "#dc2626" : "transparent" }}
          />
          <div 
            className="absolute bottom-4 right-4 w-2 h-2 border-b-2 border-r-2 border-transparent transition-all duration-300 z-20"
            style={{ borderColor: hovered ? "#dc2626" : "transparent" }}
          />
        </>
      )}

      {/* Neon border strip at the bottom of the card */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" 
        style={{
          background: "linear-gradient(to right, transparent, #dc2626, transparent)"
        }}
      />

      {/* Layer Content */}
      {children}
    </motion.div>
  );
}

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch((err) => {
        console.log("Play interrupted or autoplay policy restriction:", err);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isHovered]);

  const isMobileApp = project.category === "Mobile Apps";
  const isExternal = project.link.startsWith("http");
  const LinkComp = isExternal ? "a" : Link;
  const linkProps = isExternal 
    ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
    : { to: project.link };

  return (
    <LinkComp
      {...linkProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full block no-underline text-inherit"
    >
      <TiltCard>
        {/* Image Layer - Nested inside overflow hidden */}
        <div 
          className={`w-full overflow-hidden relative z-0 flex items-center justify-center ${
            isMobileApp
              ? "aspect-[16/11] pt-8 pb-4 px-4 bg-slate-50"
              : "p-0 bg-white"
          }`}
          style={isMobileApp ? {} : { aspectRatio: "1900 / 906" }}
        >
          {project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              className={isMobileApp
                ? "max-w-full max-h-full object-contain"
                : "w-full h-full object-contain object-top block bg-white"
              }
            />
          ) : (
            <picture className={isMobileApp ? "h-full w-full flex items-center justify-center" : "w-full h-full block"}>
              <source srcSet={project.webp} type="image/webp" />
              <source srcSet={project.png} type="image/png" />
              <img
                src={project.png}
                alt={project.alt || `${project.title} - ${project.category} Portfolio | Dots & Coms Web Design Company Vadodara`}
                className={`transition-transform duration-700 ease-out group-hover:scale-102 ${
                  isMobileApp
                    ? "max-w-full max-h-full object-contain"
                    : "w-full h-full object-contain object-top block bg-white"
                }`}
                loading="lazy"
                width={isMobileApp ? 1000 : 1500}
                height={isMobileApp ? 1000 : 1000}
              />
            </picture>
          )}

          {/* Floating Action Link Badge - Video remains completely visible on hover! */}
          <div
            className="absolute top-6 right-4 z-20 px-3.5 py-1.5 rounded-full bg-[#dc2626] text-white text-[10px] font-extrabold uppercase tracking-widest flex items-center space-x-1.5 shadow-lg shadow-red-500/30 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-red-700 hover:scale-105"
          >
            <span>
              {isExternal 
                ? (project.category === "Mobile Apps" ? "View App" : "Live Site") 
                : "Case Study"}
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Meta Card Details */}
        <div 
          style={isMobile ? {} : { transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
          className={`${
            isMobileApp 
              ? "pt-6 pb-4 px-5 md:pt-6 md:pb-5 md:px-6"
              : "pt-3.5 pb-4 px-5 md:pt-4 md:pb-5 md:px-6"
          } flex-1 flex flex-col justify-between items-start text-left z-10`}
        >
          <div className="space-y-2.5 w-full" style={isMobile ? {} : { transformStyle: "preserve-3d" }}>
            {/* Unified Dynamic Label Badge */}
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-slate-200/60 bg-slate-50 text-slate-500 text-[9px] font-extrabold uppercase tracking-widest font-mono relative">
                <span className="relative flex h-1.5 w-1.5">
                  <span 
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#dc2626]"
                  ></span>
                  <span 
                    className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#dc2626]"
                  ></span>
                </span>
                <span>{project.isEcommerce ? "E-commerce" : project.category}</span>
              </span>
            </div>

            {/* Title Header */}
            <div style={isMobile ? {} : { transform: "translateZ(10px)" }}>
              <h3 
                className="text-xl md:text-2xl font-extrabold font-heading text-slate-800 transition-colors duration-300 line-clamp-1 leading-snug"
                style={{ color: isHovered ? "#dc2626" : "#1e293b" }}
              >
                {project.title}
              </h3>
              {project.location && (
                <p className="text-slate-400 text-xs font-bold mt-1.5 flex items-center">
                  <span>{project.location}</span>
                </p>
              )}
            </div>
          </div>

          {/* Card Footer Detail Link */}
          <div 
            style={isMobile ? {} : { transform: "translateZ(15px)" }}
            className="w-full pt-4 mt-4 border-t border-slate-100 flex items-center justify-between"
          >
            <div
              className="inline-flex items-center space-x-2 text-xs font-extrabold uppercase tracking-widest transition-colors duration-300"
              style={{
                color: isHovered ? "#b91c1c" : "#dc2626"
              }}
            >
              <span>
                {isExternal 
                  ? (project.category === "Mobile Apps" ? "Get App" : "Explore Project") 
                  : "Read Case Study"}
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </TiltCard>
    </LinkComp>
  );
}

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Portfolio – Web Designing & Mobile App Development Services | Dots & Coms",
      description: "Portfolio showcasing responsive website design, web application development, eCommerce websites, mobile app development, domain registration, and SEO project work.",
      keywords: "web design portfolio Vadodara, responsive website design and development, web application development, ecommerce website development, mobile app development portfolio, iPad mobile application development, website design projects",
      canonical: "https://www.dotsandcoms.in/website-mobile-app-development-company-portfolio-baroda"
    });
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    if (activeTab === "Web Design") return project.category === "Web Design";
    if (activeTab === "E-commerce") return project.isEcommerce === true;
    if (activeTab === "Mobile Apps") return project.category === "Mobile Apps";
    return true;
  });

  return (
    <>
      <InnerBanner
        title="Our Work"
        subtitle="Explore our comprehensive portfolio of web design projects, e-commerce applications, and mobile products."
        breadcrumbs={[{ label: "Our Work" }]}
      />

      <section className="py-12 md:py-24 bg-[#f8fafc] relative overflow-hidden">
        {/* Subtle Tech Grids background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f030_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f030_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none -z-10" />

        {/* Dynamic mesh lights floating behind layout */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#dc2626]/2 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#ea580c]/2 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Centered filter tabs and stats panel */}
          <div className="flex flex-col items-center justify-center space-y-8 mb-10 md:mb-20">
            <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800 text-center tracking-tight">
              Featured Web Design and Mobile App Development Projects
            </h2>

            {/* Mobile Dropdown Category Selector */}
            <div className="md:hidden w-full max-w-xs mx-auto relative">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full bg-gradient-to-r from-[#dc2626] to-[#ea580c] text-white font-extrabold uppercase tracking-wider text-xs px-5 py-4 rounded-xl shadow-md border-none focus:outline-none appearance-none cursor-pointer pr-10 text-center"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="text-slate-800 bg-white font-bold uppercase tracking-wider text-xs">
                    {cat.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            {/* Filter Navigation Tabs - Match Hosting Tab style */}
            <div className="hidden md:inline-flex flex-wrap md:flex-nowrap p-1.5 bg-slate-50/80 backdrop-blur-md border border-slate-200/80 rounded-2xl md:rounded-full shadow-lg shadow-slate-100/50 gap-1.5 max-w-full overflow-x-auto horizontal-scroll-container">
              {categories.map((cat) => {
                const isActive = activeTab === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className="group relative px-6 md:px-8 py-3 md:py-3.5 rounded-xl md:rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap outline-none border-none"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeWorkTabBackground"
                        className="absolute inset-0 bg-gradient-to-r from-[#dc2626] via-red-500 to-[#ea580c] rounded-xl md:rounded-full shadow-md shadow-red-500/20 border border-red-600/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 md:w-4.5 md:h-4.5 relative z-10 transition-colors duration-300 ${
                      isActive 
                        ? "text-white" 
                        : "text-slate-450 group-hover:text-[#dc2626]"
                    }`} />
                    <span className={`relative z-10 font-extrabold transition-colors duration-300 ${
                      isActive 
                        ? "text-white" 
                        : "text-slate-500 group-hover:text-slate-800"
                    }`}>
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Dynamic Grid Layout */}
          <motion.div
            layout
            className={`grid gap-10 lg:gap-12 md:perspective-1000 ${
              activeTab === "Mobile Apps"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.5, delay: idx * 0.03, ease: [0.215, 0.61, 0.355, 1] }}
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
