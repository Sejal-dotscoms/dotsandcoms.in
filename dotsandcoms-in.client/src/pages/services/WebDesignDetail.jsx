import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import InnerBanner from "../../components/ui/InnerBanner";
import FAQSection from "../../components/FAQ/FAQSection";
import { subServices, bannerData, ctaData, webDesignFaqData } from "../../data/webDesign";
import { setPageSEO } from "../../utils/seo";
import { getRouteSEO } from "../../seo/publicRoutes";

// Reusable 3D Tilt Card component with layered offset backing
function TiltCard({ src, alt, offsetBorder, glowColor, width, height }) {
  return (
    <div className="relative w-full px-6 py-6" style={{ perspective: 1200 }}>
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
        className="w-full overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-2xl"
      >
        <img 
          src={src} 
          alt={alt}
          className="block h-auto w-full object-cover select-none"
          loading="lazy"
          decoding="async"
          width={width}
          height={height}
          style={{ transform: "translateZ(20px)" }}
        />
        {/* Soft gloss hover highlight */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
      </motion.div>
    </div>
  );
}

export default function WebDesignDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO(getRouteSEO("/responsive-website-designing-company-vadodara"));
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
              <div className="mx-auto max-w-7xl px-6 lg:px-12">
                
                {/* Parent grid aligned to start to enable independent column heights and sticky tracking */}
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
                  
                  {/* Text Column (Alternating placement) - col-span-7 */}
                  <div className={`lg:col-span-6 flex flex-col space-y-6 text-left relative ${!isEven ? "lg:order-2" : ""}`}>
                    
                    {/* Giant Watermark Background Number */}
                    <div className="text-slate-150/40 absolute -top-12 -left-6 -z-10 font-mono leading-none font-black tracking-tighter text-[110px] select-none md:text-[140px]">
                      {sub.num}
                    </div>

                    <div className="mb-0 flex items-center space-x-1 pt-4">
                      <span className="font-mono text-xs font-bold tracking-widest text-[#ea580c] uppercase">
                        {sub.subtitle}
                      </span>
                    </div>

                    <h2 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-slate-800 md:text-4xl lg:text-5xl">
                      {sub.title}
                    </h2>

                    <p className="text-slate-650 text-base leading-relaxed">
                      {sub.desc}
                    </p>

                    {/* Features list in a SINGLE vertical column with increased font-size & vertical spacing */}
                    <ul className="flex flex-col space-y-5 pt-4 pl-1">
                      {sub.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3.5 leading-relaxed text-slate-700 text-[15px] md:text-[16.5px]">
                          {/* Modern stroke double chevron >> */}
                          <svg className="mt-1.5 h-4 w-4 flex-shrink-0 text-[#dc2626]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m13 5 7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                          <span className="pt-0.5 leading-snug font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                  {/* 3D Tilt Image Column (Alternating placement) - col-span-5 with sticky constraints directly on grid child */}
                  <div className={`lg:col-span-6 w-full lg:sticky lg:top-32 self-start ${!isEven ? "lg:order-1" : ""}`}>
                    <div className="w-full max-w-2xl">
                      <TiltCard 
                        src={sub.image} 
                        alt={sub.alt || `${sub.title} - Custom Website Design and Development Vadodara | Dots and Coms`} 
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ea580c] to-[#dc2626] py-12 text-white md:py-16">
        {/* Background texture overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }} />
        </div>
        
        {/* Abstract vector glowing lights */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl space-y-4 px-6 text-center">
          <span className="inline-block rounded-full border border-white/25 bg-white/15 px-3 py-1.5 font-mono font-bold tracking-widest text-white text-[10px] uppercase">
            {ctaData.badge}
          </span>
          <h2 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-white md:text-4xl">
            {ctaData.title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-orange-100 md:text-base">
            {ctaData.description}
          </p>

          <div className="pt-2">
            <Link 
              to={ctaData.ctaLink}
              className="group inline-flex transform items-center space-x-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#dc2626] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff7ed] hover:shadow-lg active:scale-95"
            >
              <span>{ctaData.ctaText}</span>
              <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
          </section>

          {/* Website Design FAQ Section */}
          <FAQSection
              label={webDesignFaqData.label}
              title={webDesignFaqData.title}
              items={webDesignFaqData.items}
              id="web-design-faq"
          />
    </>
  );
}
