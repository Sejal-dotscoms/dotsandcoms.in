import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Cloud, Target, ArrowRight } from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";

import { setPageSEO } from "../utils/seo";

const servicesHub = [
  {
    path: "/responsive-website-designing-company-vadodara",
    title: "Web Design & UI/UX",
    desc: "Bespoke corporate website designs, wireframing, content management systems, and user interfaces tailored to drive high visitor retention.",
    icon: Monitor,
    color: "bg-red-50 text-[#dc2626] border-red-100/50 hover:bg-[#dc2626] hover:text-white",
    bgGlow: "bg-red-500/5"
  },
  {
    path: "/android-ios-mobile-app-development-company-baroda",
    title: "Mobile App Development",
    desc: "Cross-platform mobile applications for iOS & Android built with Flutter and React Native, incorporating fluid integrations and sync APIs.",
    icon: Smartphone,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100/50 hover:bg-emerald-600 hover:text-white",
    bgGlow: "bg-emerald-500/5"
  },
  {
    path: "/windows-web-hosting-service-provider-baroda",
    title: "Web Hosting & Cloud Servers",
    desc: "High-performance SSD cloud server configurations, secure domain portfolio hosting, and 99.9% uptime SLA assurances.",
    icon: Cloud,
    color: "bg-cyan-50 text-cyan-600 border-cyan-100/50 hover:bg-cyan-600 hover:text-white",
    bgGlow: "bg-cyan-500/5"
  },
  {
    path: "/organic-seo-ppc-digital-marketing-vadodara",
    title: "Digital Marketing & SEO",
    desc: "Keyword research optimization, organic SEO audits, paid search Google AdWords setup, and multi-channel marketing campaigns.",
    icon: Target,
    color: "bg-rose-50 text-rose-600 border-rose-100/50 hover:bg-rose-600 hover:text-white",
    bgGlow: "bg-rose-500/5"
  }
];

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Web Design, Mobile App & Digital Marketing Services | Dots & Coms Baroda",
      description: "Explore full-service digital solutions from Dots & Coms including responsive web design, Android & iOS app development, cloud hosting, SEO, and digital marketing services in Baroda.",
      keywords: "web design services Baroda, mobile app development services Vadodara, cloud hosting services Baroda, SEO services Vadodara, digital marketing agency Baroda, website development company Gujarat, IT services Baroda",
      canonical: "https://www.dotsandcoms.in/services",
    });
  }, []);

  return (
    <>
      <InnerBanner 
        title="Our Services" 
        subtitle="We combine award-winning designs with high-performance software infrastructure to power your digital growth."
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#dc2626]/3 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[#ea580c]/3 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#dc2626] font-bold text-xs uppercase tracking-widest font-mono border border-red-100/50">
              // Core Offerings
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight mt-4">
              What We Do Best
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mt-4 max-w-xl mx-auto">
              Select one of our core divisions below to explore detailed capabilities, features lists, and platform solutions.
            </p>
          </div>

          {/* Minimal 2x2 Bento Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesHub.map((service, index) => {
              const IconComponent = service.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative p-8 md:p-10 rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 flex flex-col justify-between items-start text-left overflow-hidden cursor-pointer"
                >
                  {/* Subtle hover background highlight */}
                  <div className={`absolute inset-0 ${service.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  <div className="space-y-6 relative z-10 w-full">
                    {/* Dynamic Icon box */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 ${service.color}`}>
                      <IconComponent className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-800 group-hover:text-[#dc2626] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 relative z-10 w-full border-t border-slate-50 mt-6 flex justify-between items-center text-slate-400 group-hover:text-[#dc2626] transition-colors duration-300">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase">
                      Explore Service
                    </span>
                    <Link
                      to={service.path}
                      className="w-10 h-10 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#dc2626] group-hover:text-white group-hover:border-transparent transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Consult CTA */}
      <section className="py-20 bg-slate-50 border-t border-slate-100 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#dc2626]/3 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#dc2626] font-bold text-xs uppercase tracking-widest font-mono border border-red-100/50">
            // Start Your Project
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight max-w-2xl mx-auto">
            Ready to Build Your Next Digital System?
          </h2>
          <p className="text-slate-600 text-[15px] leading-relaxed max-w-md mx-auto">
            Let's collaborate to build high-performance software tailored to your goals.
          </p>
          <div className="pt-2">
            <Link
              to="/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#dc2626] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer active:scale-95"
            >
              Get Free Consulting <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
