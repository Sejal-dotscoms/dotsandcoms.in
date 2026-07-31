import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import InnerBanner from "../../components/ui/InnerBanner";
import { subServices, bannerData, ctaData } from "../../data/webDesign";
import { setPageSEO } from "../../utils/seo";

// Reusable 3D Tilt Card component with layered offset backing
function TiltCard({ src, alt, offsetBorder, glowColor, width, height }) {
  return (
    <div className="w-full relative py-6 px-6" style={{ perspective: 1200 }}>
      {/* Decorative Offset Backing Card */}
      <div className={`absolute inset-0 m-6 border-2 border-dashed ${offsetBorder} rounded-3xl translate-x-4 translate-y-4 -z-10`} />
      
      {/* Blur background sphere */}
      <div className={`absolute -inset-4 rounded-full ${glowColor} blur-[60px] pointer-events-none -z-20`} />

      <motion.div
        whileHover={{
          rotateY: 10,
          rotateX: -6,
          scale: 1.03,
          z: 30
        }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 bg-white"
      >
        <img 
          src={src} 
          alt={alt}
          className="w-full h-auto object-cover select-none block"
          loading="lazy"
          width={width}
          height={height}
          style={{ transform: "translateZ(20px)" }}
        />
        {/* Soft gloss hover highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>
    </div>
  );
}

export default function WebDesignDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Responsive Website Designing Company in Vadodara | Dots & Coms",
      description: "Responsive website designing company in Vadodara providing custom web design, website development, mobile app development, hosting, and web-based application solutions for businesses.",
      keywords: "responsive website designing Vadodara, web design company Vadodara, website development Baroda, responsive web design Baroda, mobile app development Vadodara, website redesign company, web-based application development, website design services Vadodara",
      canonical: "https://www.dotsandcoms.in/responsive-website-designing-company-vadodara"
    });
  }, []);

  return (
    <>
      <InnerBanner 
        title={bannerData.title} 
        subtitle={bannerData.subtitle}
        breadcrumbs={bannerData.breadcrumbs}
      />

      <div className="bg-white">
        {subServices.map((sub, index) => {
          const isEven = index % 2 === 0;

          return (
            <section 
              id={sub.id} 
              key={sub.id} 
              className={`scroll-mt-10 py-12 md:py-28 relative ${
                !isEven ? "bg-slate-50/50 border-y border-slate-100" : "bg-white"
              }`}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                
                {/* Parent grid aligned to start to enable independent column heights and sticky tracking */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                  
                  {/* Text Column (Alternating placement) - col-span-7 */}
                  <div className={`lg:col-span-6 flex flex-col space-y-6 text-left relative ${!isEven ? "lg:order-2" : ""}`}>
                    
                    {/* Giant Watermark Background Number */}
                    <div className="absolute -top-12 -left-6 text-[110px] md:text-[140px] font-black text-slate-150/40 select-none -z-10 font-mono tracking-tighter leading-none">
                      {sub.num}
                    </div>

                    <div className="flex items-center space-x-1 pt-4 mb-0">
                      <span className="text-xs font-bold font-mono tracking-widest text-[#ea580c] uppercase">
                        {sub.subtitle}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                      {sub.title}
                    </h2>

                    <p className="text-slate-650 text-base leading-relaxed">
                      {sub.desc}
                    </p>

                    {/* Features list in a SINGLE vertical column with increased font-size & vertical spacing */}
                    <ul className="pl-1 pt-4 flex flex-col space-y-5">
                      {sub.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3.5 text-slate-700 text-[15px] md:text-[16.5px] leading-relaxed">
                          {/* Modern stroke double chevron >> */}
                          <svg className="w-4 h-4 text-[#dc2626] flex-shrink-0 mt-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m13 5 7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                          <span className="leading-snug pt-0.5 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                  {/* 3D Tilt Image Column (Alternating placement) - col-span-5 with sticky constraints directly on grid child */}
                  <div className={`lg:col-span-6 w-full lg:sticky lg:top-32 self-start ${!isEven ? "lg:order-1" : ""}`}>
                    <div className="w-full max-w-2xl">
                      <TiltCard 
                        src={sub.image} 
                        alt={sub.alt || `${sub.title} - Custom Website Design and Development Vadodara | Dots & Coms`} 
                        offsetBorder={sub.offsetBorder}
                        glowColor={sub.glowColor}
                        width={sub.width}
                        height={sub.height}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Premium CTA Section: Let's Build Something Great Together! */}
      <section className="bg-gradient-to-br from-[#ea580c] to-[#dc2626] text-white py-12 md:py-16 relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }} />
        </div>
        
        {/* Abstract vector glowing lights */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-orange-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
          <span className="inline-block px-3 py-1.5 rounded-full bg-white/15 text-white border border-white/25 text-[10px] font-bold uppercase tracking-widest font-mono">
            {ctaData.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight text-white leading-tight">
            {ctaData.title}
          </h2>
          <p className="text-orange-100 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {ctaData.description}
          </p>

          <div className="pt-2">
            <Link 
              to={ctaData.ctaLink}
              className="inline-flex items-center space-x-2 bg-white text-[#dc2626] hover:bg-[#fff7ed] font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-md hover:shadow-lg group"
            >
              <span>{ctaData.ctaText}</span>
              <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
