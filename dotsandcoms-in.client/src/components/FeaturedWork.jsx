import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedWork() {
  const scrollContainerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  const projects = [
    {
      title: "Accutech Labels",
      industry: "Digital Transformation",
      image: "/case_study_accutech.webp",
      challenge: "Accutech Labels operated primarily on a traditional, offline-first model, leaving them vulnerable to digital-first competitors and missing valuable B2B search traffic.",
      result: "Shifted from an offline-first approach to a powerful digital lead engine, unlocking massive national B2B growth and consistent high-quality lead streams.",
      tech: ["React JS", "Tailwind CSS", "SEO Strategy", "Google Ads Network"],
      link: "/accutechlabels-case-study-traditional-to-web-business",
    },
    {
      title: "1Life",
      industry: "Brand Expansion",
      image: "/case_study_onelife.webp",
      challenge: "Expanding a regional health and wellness brand into a national footprint while maintaining unified branding, scaling digital operations, and driving regional adoption.",
      result: "Achieved rapid nationwide scaling, establishing a cohesive national identity and data-driven marketing systems that accelerated customer acquisition.",
      tech: ["Branding Suite", "React JS", "Node.js", "AWS Cloud Services", "CRM Solutions"],
      link: "/1life-case-study-of-regional-to-national-reach",
    },
    {
      title: "Kiiara Kreations",
      industry: "Startup Growth",
      image: "/case_study_kiiara.webp",
      challenge: "Evolving Kiiara Kreations from a creative passion project into a structured startup with high conversion rates, speed-optimized storefronts, and targeted digital reach.",
      result: "Transformed into a fast-growing consumer brand, leveraging custom-designed e-commerce platforms and social marketing to reach a wider audience and accelerate order volumes.",
      tech: ["Shopify Headless API", "React 19", "Tailwind CSS", "Meta Marketing Ads", "Google Analytics"],
      link: "/hobby-goes-global-case-study",
    },
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollWrapper = scrollWrapperRef.current;
    if (!scrollContainer || !scrollWrapper) return;

    // Check if large screen to apply horizontal pinning
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    let ctx;
    if (mediaQuery.matches) {
      ctx = gsap.context(() => {
        const horizontalLength = scrollWrapper.scrollWidth - window.innerWidth;
        gsap.to(scrollWrapper, {
          x: -horizontalLength,
          ease: "none",
          scrollTrigger: {
            trigger: scrollContainer,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${horizontalLength}`,
            invalidateOnRefresh: true,
          },
        });
      }, scrollContainerRef);
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={scrollContainerRef} id="work" className="relative bg-[#f8fafc]">
      {/* Glow mesh behind pinned section */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 -z-10 h-[300px] w-[600px] -translate-y-1/2 rounded-full bg-[#dc2626]/3 blur-[120px]" />

      {/* Outer section wrapper */}
      <div className="flex flex-col justify-center pt-6 pb-6 md:py-20 lg:h-screen lg:overflow-hidden lg:py-0">
        
        {/* Intro header block */}
        <div className="mx-auto mb-12 flex w-full max-w-7xl flex-col justify-between px-6 text-left md:flex-row md:items-end md:px-12">
          <div className="space-y-4">
            <span className="font-mono text-xs font-bold tracking-widest text-[#ea580c] uppercase">
              // CASE STUDIES
            </span>
            <h2 className="font-heading text-4xl leading-tight font-extrabold tracking-tight text-slate-800 md:text-5xl">
            Impact of Our Digital Strategy in Action
            </h2>
          </div>
          <span className="hidden font-mono text-xs tracking-widest text-slate-400 uppercase lg:block">
            SCROLL DOWN FOR SIDEWAYS MOTION →
          </span>
        </div>

        {/* Horizontal flex slide element */}
        <div
          ref={scrollWrapperRef}
          className="flex w-full flex-col gap-8 px-6 md:px-12 lg:flex-row lg:gap-16 lg:pr-64 lg:pl-32"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="glass-panel group grid w-full shrink-0 grid-cols-1 items-center gap-8 rounded-2xl border border-slate-100 bg-white/95 p-6 shadow-xl transition-all duration-300 hover:border-[#dc2626]/20 md:grid-cols-12 md:p-8 lg:w-[850px]"
            >
              {/* Slide Left: Info details */}
              <div className="flex h-full flex-col justify-between space-y-6 text-left md:col-span-5">
                <div>
                  <span className="font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase">
                    {project.industry}
                  </span>
                  <h3 className="font-heading text-slate-850 mt-2 text-2xl font-extrabold transition-colors duration-300 group-hover:text-[#dc2626] md:text-3xl">
                    {project.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="block font-mono tracking-wider text-[10px] text-slate-400 uppercase">
                      The Challenge
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 md:text-sm">
                      {project.challenge}
                    </p>
                  </div>
                  <div>
                    <span className="block font-mono tracking-wider text-[10px] text-slate-400 uppercase">
                      The Result
                    </span>
                    <p className="mt-1 text-xs leading-relaxed font-semibold text-slate-700 md:text-sm">
                      {project.result}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="mb-2 block font-mono tracking-wider text-[10px] text-slate-400 uppercase">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-slate-100 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <Link
                    to={project.link || "/contact-webdesign-mobileapp-socialmedia-marketing-baroda"}
                    className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-slate-800 uppercase transition-colors duration-300 group-hover:text-[#ea580c]"
                  >
                    <span>{project.link ? "Read Case Study" : "Request Audit Info"}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Slide Right: Visual Mockup */}
              <div className="relative h-[240px] w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50 md:col-span-7 md:h-[360px]">
                <img
                  src={project.image}
                  alt={project.alt || `${project.title} - ${project.category} Portfolio | Dots & Coms Web Design Company Vadodara`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="850"
                  height="560"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
