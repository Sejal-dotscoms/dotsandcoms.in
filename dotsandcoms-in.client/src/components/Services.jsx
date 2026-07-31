import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Monitor, Smartphone, Cloud, Target, Palette, Users } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Monitor className="w-8 h-8 text-[#dc2626]" />,
      title: "Web Design",
      desc: "Pixel-perfect, custom layouts tailored for maximum user retention, modern visual storytelling, and responsive layouts across all viewports.",
      span: "md:col-span-7",
      link: "/responsive-website-designing-company-vadodara"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-emerald-600" />,
      title: "Mobile App Development",
      desc: "Native iOS/Android applications built with Flutter and React Native, ensuring fluid micro-interactions and performance.",
      span: "md:col-span-5",
      link: "/android-ios-mobile-app-development-company-baroda"
    },
    {
      icon: <Cloud className="w-8 h-8 text-cyan-600" />,
      title: "Domains & Web Hosting",
      desc: "High-performance SSD cloud web hosting with 99.9% uptime guarantees, domains management, and enterprise-grade security structures.",
      span: "md:col-span-5",
      link: "/windows-web-hosting-service-provider-baroda"
    },
    {
      icon: <Target className="w-8 h-8 text-rose-600" />,
      title: "Digital Marketing",
      desc: "SEO audits, Google Ads, Meta campaigns, and high-conversion PPC structures designed to capture organic search traffic and scale sales.",
      span: "md:col-span-7",
      link: "/organic-seo-ppc-digital-marketing-vadodara"
    },
    {
      icon: <Palette className="w-8 h-8 text-indigo-600" />,
      title: "Graphic Design",
      desc: "Creative brand guidelines, corporate identity style scales, print media, social assets, and unified visual guidelines that dictate brand presence.",
      span: "md:col-span-7",
      link: "https://brochuredesigncompany.com/"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Remote IT Workforce",
      desc: "Bespoke dedicated developers, engineers, and digital experts integrated seamlessly to scale your internal technical resources and accelerate delivery.",
      span: "md:col-span-5",
      link: "https://remoteitworkforce.in/"
    },
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="services" className="pt-6 pb-6 md:py-24 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#dc2626]/3 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-left space-y-4 mb-16 max-w-2xl">
          <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
            // Core Offerings
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
            Our Expertise. Your Growth.
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            We provide comprehensive digital solutions that combine aesthetic beauty with rock-solid software infrastructure.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((service, index) => {
            const isExternal = service.link.startsWith("http");
            const CardComponent = isExternal ? motion.a : motion(Link);
            const cardProps = isExternal 
              ? { href: service.link, target: "_blank", rel: "noopener noreferrer" }
              : { to: service.link };

            return (
              <CardComponent
                key={service.title}
                onMouseMove={handleMouseMove}
                {...cardProps}
                className={`bento-card group p-6 md:p-8 rounded-2xl glass-panel border border-slate-100 flex flex-col justify-between items-start transition-all duration-300 hover:border-[#dc2626]/20 hover:scale-[1.01] bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.015)] cursor-pointer ${service.span}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {/* Subtle diagonal tech lines pattern inside the card - transitions on hover */}
                <div 
                  className="absolute inset-0 opacity-[0.25] group-hover:opacity-[0.4] transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    backgroundImage: "repeating-linear-gradient(-45deg, rgba(220, 38, 38, 0.15) 0px, rgba(220, 38, 38, 0.15) 1px, transparent 1px, transparent 10px)"
                  }}
                />

                <div className="flex flex-col space-y-4 items-start w-full relative z-10">
                  {/* Icon Circle */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:border-slate-200 group-hover:bg-slate-100 transition-colors duration-300">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-800 group-hover:text-[#dc2626] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed max-w-md">
                    {service.desc}
                  </p>
                </div>

                {/* Action link */}
                <div className="mt-8 flex items-center space-x-1.5 text-xs font-bold text-slate-400 group-hover:text-[#dc2626] transition-colors duration-300 relative z-10">
                  <span>Discover More</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </CardComponent>
            );
          })}
        </div>

      </div>
    </section>
  );
}
