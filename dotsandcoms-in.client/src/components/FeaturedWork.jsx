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
      alt: "Accutech Labels B2B Web Design & Digital Transformation Case Study",
      challenge: "Accutech Labels operated primarily on a traditional, offline-first model, leaving them vulnerable to digital-first competitors and missing valuable B2B search traffic.",
      result: "Shifted from an offline-first approach to a powerful digital lead engine, unlocking massive national B2B growth and consistent high-quality lead streams.",
      tech: ["React JS", "Tailwind CSS", "SEO Strategy", "Google Ads Network"],
      link: "/accutechlabels-case-study-traditional-to-web-business",
    },
    {
      title: "1Life",
      industry: "Brand Expansion",
      image: "/case_study_onelife.webp",
      alt: "1Life Health & Wellness National Brand Expansion Case Study",
      challenge: "Expanding a regional health and wellness brand into a national footprint while maintaining unified branding, scaling digital operations, and driving regional adoption.",
      result: "Achieved rapid nationwide scaling, establishing a cohesive national identity and data-driven marketing systems that accelerated customer acquisition.",
      tech: ["Branding Suite", "React JS", "Node.js", "AWS Cloud Services", "CRM Solutions"],
      link: "/1life-case-study-of-regional-to-national-reach",
    },
    {
      title: "Auro Pumps",
      industry: "Industrial Lead Engine",
      image: "/case_study_auropumps.webp",
      alt: "Auro Pumps Industrial Web Design & Digital Lead Engine Case Study",
      challenge: "Communicating the deep technical expertise, specialized manufacturing, and certified engineering of a 40-year-old industrial pump manufacturer to modern digital buyers.",
      result: "Turned the website from an offline brochure into an active 24/7 lead-generation engine, delivering consistent high-value B2B industrial enquiries.",
      tech: ["React JS", "Tailwind CSS", "Industrial SEO", "Lead Gen Strategy", "Google Ads"],
      link: "/auro-pumps-case-study-traditional-to-digital-lead-engine",
    },
    {
      title: "Himile India",
      industry: "Multinational Corporate Website",
      image: "/case_study_himile.webp",
      alt: "Himile India Industrial Corporate Web Design & Digital Strategy Case Study",
      challenge: "Structuring and communicating complex technology across tire molds, CNC machines, compressors, and heat exchangers for a global manufacturing giant without confusing visitors.",
      result: "Created a structured digital corporate ecosystem with page-by-page information architecture, vertical-segmented contact routing, and global credibility.",
      tech: ["Information Architecture", "React JS", "Tailwind CSS", "SEO Strategy", "UX Design"],
      link: "/himile-india-case-study-global-manufacturing-digital-voice",
    },
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollWrapper = scrollWrapperRef.current;
    if (!scrollContainer || !scrollWrapper) return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    let ctx;
    const initScroll = () => {
      if (ctx) ctx.revert();
      if (mediaQuery.matches) {
        ctx = gsap.context(() => {
          const getHorizontalLength = () => {
            const scrollW = scrollWrapper.scrollWidth;
            const winW = window.innerWidth;
            return Math.max(0, scrollW - winW + 400);
          };

          gsap.to(scrollWrapper, {
            x: () => -getHorizontalLength(),
            ease: "none",
            scrollTrigger: {
              trigger: scrollContainer,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${getHorizontalLength()}`,
              invalidateOnRefresh: true,
            },
          });
        }, scrollContainerRef);
      }
    };

    initScroll();

    // Force ScrollTrigger refresh as layout, images, and fonts settle
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 500);

    const handleResize = () => {
      initScroll();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
      if (ctx) ctx.revert();
    };
  }, [projects.length]);

  return (
    <div ref={scrollContainerRef} id="work" className="relative bg-[#f8fafc]">
      {/* Glow mesh behind pinned section */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 -z-10 h-[300px] w-[600px] -translate-y-1/2 rounded-full bg-[#dc2626]/3 blur-[120px]" />

      {/* Outer section wrapper */}
      <div className="flex flex-col justify-between pt-12 pb-8 md:pt-16 md:pb-12 lg:h-screen lg:overflow-hidden lg:py-10">
        
        {/* Intro header block */}
        <div className="mx-auto mb-6 flex w-full max-w-7xl shrink-0 flex-col justify-between gap-4 px-6 text-left md:flex-row md:items-center md:px-12">
          <div className="space-y-2.5">
            <span className="font-mono text-xs font-bold tracking-widest text-[#ea580c] uppercase">
              // CASE STUDIES
            </span>
            <h2 className="font-heading pt-1 text-3xl leading-tight font-extrabold tracking-tight text-slate-800 sm:text-4xl md:leading-snug lg:text-5xl lg:whitespace-nowrap">
              Impact of Our Digital Strategy in Action
            </h2>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end md:justify-end shrink-0">
            <Link
              to="/case-studies"
              className="group inline-flex items-center space-x-2 rounded-full bg-[#dc2626] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-red-500/20 transition-all hover:-translate-y-0.5 hover:bg-[#b91c1c] hover:shadow-red-500/30"
            >
              <span>View All Case Studies</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <span className="hidden font-mono text-xs tracking-widest text-slate-400 uppercase lg:block">
              SCROLL DOWN FOR SIDEWAYS MOTION →
            </span>
          </div>
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
                    aria-label={`Read ${project.title} Case Study & Web Design Solution`}
                    title={`Read ${project.title} Case Study`}
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
                  alt={project.alt || `${project.title} - ${project.category} Portfolio | Dots and Coms Web Design Company Vadodara`}
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

        {/* View All Case Studies Bottom CTA Bar */}
        <div className="mt-4 flex shrink-0 justify-center px-6 md:px-12 lg:mt-6">
          <Link
            to="/case-studies"
            className="group inline-flex items-center space-x-3 rounded-full bg-slate-900 px-8 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-xl transition-all duration-300 hover:bg-[#dc2626] hover:shadow-red-500/20"
          >
            <span>Explore All Client Case Studies</span>
            <ArrowUpRight className="h-4 w-4 text-[#ea580c] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
