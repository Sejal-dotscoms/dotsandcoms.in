import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import ThreeBackground3 from "../Threebackground3";


export default function InnerBanner({ title, subtitle, breadcrumbs = [] }) {
    return (
        <section className="relative w-full  flex items-center justify-center pt-30 sm:pt-40 pb-10 overflow-hidden bg-transparent">
            {/* Same interactive 3D background as Hero, for visual continuity.
                Forced to a full-bleed absolute layer so it always spans the
                entire section width, regardless of ThreeBackground's own sizing. */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full z-0 scale-125 sm:scale-110 md:scale-100 origin-center">
                <ThreeBackground3 />
            </div>

            {/* Mesh Glow Elements — identical recipe to Hero, repositioned for a shorter section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-[#dc2626]/4 rounded-full blur-3xl z-0 animate-glow-mesh-1 pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute bottom-0 right-1/3 w-[420px] h-[420px] bg-[#ea580c]/4 rounded-full blur-3xl z-0 animate-glow-mesh-2 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col items-center text-center space-y-5">
                

                {/* Title — staggered reveal, same overflow-hidden line-mask technique as Hero headline */}
                <span className="block overflow-hidden py-1">
                    <motion.h1
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.85, ease: [0.215, 0.61, 0.355, 1] }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1]"
                    >
                        {title}
                    </motion.h1>
                </span>

                {/* Subtitle */}
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-xl"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Breadcrumbs */}
                <motion.nav
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    aria-label="Breadcrumb"
                    className="flex items-center flex-wrap justify-center gap-1.5 text-sm font-medium pt-1"
                >
                    <Link
                        to="/"
                        className="flex items-center gap-1 text-slate-500 hover:text-[#dc2626] transition-colors duration-200"
                    >
                        <Home className="w-3.5 h-3.5" />
                        <span>Home</span>
                    </Link>

                    {breadcrumbs.map((crumb, idx) => {
                        const isLast = idx === breadcrumbs.length - 1;
                        return (
                            <span key={idx} className="flex items-center gap-1.5">
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                {isLast || !crumb.href ? (
                                    <span className="text-[#dc2626] font-semibold">{crumb.label}</span>
                                ) : (
                                    <Link
                                        to={crumb.href}
                                        className="text-slate-500 hover:text-[#dc2626] transition-colors duration-200"
                                    >
                                        {crumb.label}
                                    </Link>
                                )}
                            </span>
                        );
                    })}
                </motion.nav>
            </div>
        </section>
    );
}