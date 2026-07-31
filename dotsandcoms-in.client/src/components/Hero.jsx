import { motion, useMotionValue, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Play, Smartphone, Server, Megaphone, Code2 } from "lucide-react";
import ThreeBackground from "./ThreeBackground";
import Magnetic from "./Magnetic";
import { Link } from "react-router-dom";
// Image imports removed as right-side bento collage was replaced by laptop mockup

// Services — drives both the floating rail and the scroll-cycling card
const SERVICES = [
    { label: "WEB DESIGN", icon: Code2, stat: "Responsive · Fast · On-brand" },
    { label: "MOBILE APPS", icon: Smartphone, stat: "iOS & Android" },
    { label: "WEB HOSTING", icon: Server, stat: "99.9% Uptime" },
    { label: "DIGITAL MARKETING", icon: Megaphone, stat: "SEO · PPC · Social" },
];

export default function Hero() {
    const sectionRef = useRef(null);
    const dashRef = useRef(null);

    // Detect mobile — disable all scroll-driven transforms on mobile
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth < 768 : false
    );
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Mouse position values for parallax floating dashboard
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const [hoveredCard, setHoveredCard] = useState(null); // null, 'web', 'app', 'hosting'

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left - width / 2;
        const mouseY = event.clientY - rect.top - height / 2;
        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Parallax transformations for mockups (mouse-driven)
    const imgX = useTransform(x, [-300, 300], [-8, 8]);
    const imgY = useTransform(y, [-300, 300], [-8, 8]);

    // 3D Tilt transforms for the background desk mockup
    const rotateX = useTransform(y, [-300, 300], [10, -10]);
    const rotateY = useTransform(x, [-300, 300], [-10, 10]);

    const card1X = useTransform(x, [-300, 300], [-15, 15]);
    const card1Y = useTransform(y, [-300, 300], [-15, 15]);

    const card2X = useTransform(x, [-300, 300], [20, -20]);
    const card2Y = useTransform(y, [-300, 300], [20, -20]);

    const card3X = useTransform(x, [-300, 300], [8, -8]);
    const card3Y = useTransform(y, [-300, 300], [-25, 25]);

    // Scroll-driven transforms
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const _scrollOpacity    = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const _scrollTextY      = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const _scrollMockupY    = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const _scrollMockupScale= useTransform(scrollYProgress, [0, 1], [1, 0.94]);
    const _scrollBgScale    = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

    // On mobile disable all scroll-driven motion — prevents blur/zoom effect
    const scrollOpacity     = isMobile ? 1           : _scrollOpacity;
    const scrollTextY       = isMobile ? 0           : _scrollTextY;
    const scrollMockupY     = isMobile ? 0           : _scrollMockupY;
    const scrollMockupScale = isMobile ? 1           : _scrollMockupScale;
    const scrollBgScale     = isMobile ? 1           : _scrollBgScale;

    // Headline stagger variants
    const titleContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    };

    const titleLineVariants = {
        hidden: { y: "100%", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.85,
                ease: [0.215, 0.61, 0.355, 1],
            },
        },
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-screen flex items-center justify-center pt-32 pb-28 lg:pt-44 lg:pb-32 overflow-hidden bg-transparent"
        >
            {/* Three.js Interactive 3D Background */}
            <ThreeBackground />

            {/* Background Mesh Glow Elements */}
            <motion.div
                style={{ scale: scrollBgScale, opacity: scrollOpacity }}
                className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#dc2626]/4 rounded-full blur-3xl z-0 animate-glow-mesh-1 pointer-events-none"
            />
            <motion.div
                style={{ scale: scrollBgScale, opacity: scrollOpacity }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ea580c]/4 rounded-full blur-3xl z-0 animate-glow-mesh-2 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                {/* Left Side: Headlines */}
                <motion.div
                    style={{ y: scrollTextY, opacity: scrollOpacity }}
                    className="lg:col-span-6 flex flex-col text-left space-y-6 lg:pr-6"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-red-500/10 bg-red-500/5 w-fit"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#dc2626]">Since 1999</span>
                    </motion.div>

                    {/* Staggered Text Reveal Headline */}
                    <motion.h1
                        className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1.08] flex flex-col"
                        variants={titleContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <span className="block overflow-hidden py-1">
                            <motion.span variants={titleLineVariants} className="block">
                                Turning  <span className="text-gradient-blue">Vision</span>
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden py-1">
                            <motion.span variants={titleLineVariants} className="block">
                                Into Impactful
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden py-1">
                            <motion.span variants={titleLineVariants} className="block">
                                <span className="text-gradient-orange">Digital Experiences</span>
                            </motion.span>
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-slate-600 text-base md:text-lg font-normal leading-relaxed max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        We design websites, build mobile apps, host them reliably, and market them —
                        for ambitious businesses across Vadodara and beyond.
                    </motion.p>

                    {/* Magnetic CTA Buttons */}
                    <motion.div
                        className="flex flex-wrap items-center gap-4 pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    >
                        <Magnetic>
                            <Link
                                to="/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
                                className="group inline-flex items-center space-x-2 px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase bg-[#dc2626] text-white hover:bg-red-700 transition-all duration-300 border border-red-500/10 shadow-[0_0_30px_rgba(220,38,38,0.12)] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                            >
                                <span>Start Your Project</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Magnetic>

                        <Magnetic>
                            <Link
                                to="/website-mobile-app-development-company-portfolio-baroda"
                                className="inline-flex items-center space-x-3 px-8 py-4 rounded-full text-sm font-bold tracking-wider uppercase border border-slate-200 hover:border-slate-300 text-slate-800 hover:bg-slate-50 transition-all duration-300"
                            >
                                <Play className="w-3.5 h-3.5 fill-current text-slate-800" />
                                <span>View Portfolio</span>
                            </Link>
                        </Magnetic>
                    </motion.div>
                </motion.div>

                {/* Right Side: Laptop desk mockup with interactive floating cards */}
                <motion.div
                    className="lg:col-span-6 relative w-full aspect-[4/3] flex items-center justify-center animate-fade-in"
                    style={{
                        y: scrollMockupY,
                        scale: scrollMockupScale,
                        opacity: scrollOpacity,
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    {/* Inner Parallax Wrapper (Handles 2D slide and sets up 3D perspective) */}
                    <motion.div
                        className="relative w-full h-full"
                        style={{
                            x: imgX,
                            y: imgY,
                            perspective: 1200,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* The photorealistic desk background frame (with sharp 3D Tilt) */}
                        <motion.div
                            ref={dashRef}
                            className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl border border-slate-200/80 bg-cover bg-center bg-no-repeat aspect-[4/3] w-full"
                            style={{
                                backgroundImage: `url(/hero-banner-image.png)`,
                                rotateX: rotateX,
                                rotateY: rotateY,
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                willChange: "transform",
                            }}
                        />

                        {/* Floating Card 1: Web Design (Middle-Left) */}
                        <motion.div
                            className="absolute w-[110px] xs:w-[155px] sm:w-[215px] rounded-xl sm:rounded-2xl bg-white p-1.5 xs:p-2.5 sm:p-4 shadow-[0_15px_30px_rgba(0,0,0,0.06)] border border-slate-100/80 flex items-start space-x-1 xs:space-x-1.5 sm:space-x-3.5 hover:shadow-[0_20px_40px_rgba(220,38,38,0.1)] transition-all duration-355 cursor-pointer select-none top-[20%] left-[2%] xs:left-0 sm:left-[-8%] lg:left-[-12%]"
                            style={{
                                x: card1X,
                                y: card1Y,
                                z: 80, // Float above the 3D-rotated background mockup
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                willChange: "transform",
                            }}
                            onMouseEnter={() => setHoveredCard("web")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="w-5 h-5 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-[#dc2626] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(220,38,38,0.2)]">
                                <Code2 className="w-2.5 h-2.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="flex flex-col text-left antialiased">
                                <span className="text-[8px] xs:text-[10px] sm:text-sm font-bold text-slate-800 leading-tight">Web Design</span>
                                <span className="text-[6px] xs:text-[8px] sm:text-xs text-slate-500 font-medium leading-relaxed mt-0.5 sm:mt-1">Modern, Responsive<br className="hidden sm:inline" />& User Friendly</span>
                            </div>
                        </motion.div>

                        {/* Floating Card 2: Mobile Apps (Top-Right) */}
                        <motion.div
                            className="absolute w-[110px] xs:w-[155px] sm:w-[215px] rounded-xl sm:rounded-2xl bg-white p-1.5 xs:p-2.5 sm:p-4 shadow-[0_15px_30px_rgba(0,0,0,0.06)] border border-slate-100/80 flex items-start space-x-1 xs:space-x-1.5 sm:space-x-3.5 hover:shadow-[0_20px_40px_rgba(234,88,12,0.1)] transition-all duration-355 cursor-pointer select-none top-[6%] right-[2%] xs:right-0 sm:right-[-8%] lg:right-[-12%]"
                            style={{
                                x: card2X,
                                y: card2Y,
                                z: 80, // Float above the 3D-rotated background mockup
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                willChange: "transform",
                            }}
                            onMouseEnter={() => setHoveredCard("app")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="w-5 h-5 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-[#ea580c] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(234,88,12,0.2)]">
                                <Smartphone className="w-2.5 h-2.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="flex flex-col text-left antialiased">
                                <span className="text-[8px] xs:text-[10px] sm:text-sm font-bold text-slate-800 leading-tight">Mobile Apps</span>
                                <span className="text-[6px] xs:text-[8px] sm:text-xs text-slate-500 font-medium leading-relaxed mt-0.5 sm:mt-1">Powerful Apps for<br className="hidden sm:inline" />iOS & Android</span>
                            </div>
                        </motion.div>

                        {/* Floating Card 3: Web Hosting (Bottom-Center) */}
                        <motion.div
                            className="absolute w-[110px] xs:w-[155px] sm:w-[215px] rounded-xl sm:rounded-2xl bg-white p-1.5 xs:p-2.5 sm:p-4 shadow-[0_15px_30px_rgba(0,0,0,0.06)] border border-slate-100/80 flex items-start space-x-1 xs:space-x-1.5 sm:space-x-3.5 hover:shadow-[0_20px_40px_rgba(234,179,8,0.1)] transition-all duration-355 cursor-pointer select-none bottom-[-4%] left-[10%] sm:left-[15%] lg:left-[20%]"
                            style={{
                                x: card3X,
                                y: card3Y,
                                z: 80, // Float above the 3D-rotated background mockup
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                willChange: "transform",
                            }}
                            onMouseEnter={() => setHoveredCard("hosting")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="w-5 h-5 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-[#eab308] flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(234,179,8,0.2)]">
                                <Server className="w-2.5 h-2.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <div className="flex flex-col text-left antialiased">
                                <span className="text-[8px] xs:text-[10px] sm:text-sm font-bold text-slate-800 leading-tight">Web Hosting</span>
                                <span className="text-[6px] xs:text-[8px] sm:text-xs text-slate-500 font-medium leading-relaxed mt-0.5 sm:mt-1">Fast, Secure &<br className="hidden sm:inline" />Always Online</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

        </section>
    );
}