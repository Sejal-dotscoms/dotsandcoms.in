import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";
import { getRouteSEO } from "../seo/publicRoutes";

// Case study image assets
import accutechImg from "/case_study_accutech.webp";
import onelifeImg from "/case_study_onelife.webp";
import auroImg from "/case_study_auropumps.webp";
import himileImg from "/case_study_himile.webp";

export const caseStudiesList = [
  {
    id: "accutech-labels",
    title: "Accutech Labels",
    industry: "B2B Manufacturing & Packaging",
    tagline: "From Traditional Offline Business to a Digital Lead Engine",
    headline: "How Dots and Coms Transformed Accutech Labels From a Traditional Business Into a Digital Lead Generation Engine",
    challenge: "Accutech Labels operated primarily on a traditional, offline-first model, leaving them vulnerable to digital-first competitors and missing out on valuable national B2B search traffic.",
    solution: "We designed a high-converting B2B website architecture, optimized product landed pages, structured lead forms, and implemented target B2B search engine optimization.",
    results: [
      "Shifted 100% into a 24/7 digital lead engine",
      "Over 400% increase in qualified B2B inquiries",
      "Dominant organic search ranking for industrial label keywords",
      "National brand visibility across major Indian markets"
    ],
    stats: [
      { label: "Inquiry Growth", value: "+400%" },
      { label: "Search Visibility", value: "#1 Rank" },
      { label: "Lead Velocity", value: "24/7 Automated" }
    ],
    tech: ["React JS", "Tailwind CSS", "Industrial SEO", "Google Ads Network"],
    link: "/accutechlabels-case-study-traditional-to-web-business",
    image: accutechImg,
    badgeColor: "bg-red-500/10 text-[#dc2626] border-red-500/20"
  },
  {
    id: "1life",
    title: "1Life Health & Wellness",
    industry: "Healthcare & Brand Expansion",
    tagline: "Regional to National Brand Reach Expansion",
    headline: "Scaling a Regional Brand into a Recognized National Healthcare & Wellness Leader",
    challenge: "Expanding a regional health and wellness brand into a national footprint while maintaining unified brand identity, scaling digital operations, and driving regional adoption.",
    solution: "We built a unified multi-channel digital platform, established scalable brand guidelines, optimized web performance, and integrated automated customer lead distribution.",
    results: [
      "Achieved rapid nationwide brand scaling",
      "Consistent cross-platform identity and customer trust",
      "Data-driven marketing architecture for scalable customer acquisition",
      "Enhanced digital interaction and booking user experience"
    ],
    stats: [
      { label: "Market Reach", value: "Pan-India" },
      { label: "Brand Scale", value: "National" },
      { label: "Platform Speed", value: "<1.2s Load" }
    ],
    tech: ["Branding Suite", "React JS", "Node.js", "AWS Cloud Services", "CRM Solutions"],
    link: "/1life-case-study-of-regional-to-national-reach",
    image: onelifeImg,
    badgeColor: "bg-orange-500/10 text-[#ea580c] border-orange-500/20"
  },
  {
    id: "auro-pumps",
    title: "Auro Pumps",
    industry: "Industrial Machinery & Engineering",
    tagline: "40-Year Traditional Manufacturer to Digital Lead Generator",
    headline: "Turning a 40-Year-Old Traditional Industrial Manufacturer Into a 24/7 Digital Lead Engine",
    challenge: "Communicating 40+ years of deep engineering expertise and certified industrial manufacturing to modern B2B buyers who demand instant technical documentation and online quote requests.",
    solution: "Constructed a comprehensive industrial product catalog with searchable technical specifications, interactive inquiry forms, and strategic B2B search optimization.",
    results: [
      "Transformed physical brochures into a 24/7 global lead generator",
      "Streamlined technical specification search for engineering buyers",
      "Consistent high-ticket B2B inquiries from across India & abroad",
      "Higher conversion rate on custom industrial pump quote requests"
    ],
    stats: [
      { label: "B2B Enquiries", value: "24/7 Inbound" },
      { label: "Legacy Trust", value: "40+ Years" },
      { label: "Catalog Scale", value: "100+ Specs" }
    ],
    tech: ["React JS", "Tailwind CSS", "Industrial SEO", "Lead Gen Strategy", "Google Ads"],
    link: "/auro-pumps-case-study-traditional-to-digital-lead-engine",
    image: auroImg,
    badgeColor: "bg-sky-500/10 text-[#0284c7] border-sky-500/20"
  },
  {
    id: "himile-india",
    title: "Himile India",
    industry: "Multinational Heavy Manufacturing",
    tagline: "Global Manufacturing Corporate Voice & Ecosystem",
    headline: "Building a Structured Digital Corporate Ecosystem for a Global Industrial Giant",
    challenge: "Structuring and communicating complex machinery lines across tire molds, CNC machinery, gas compressors, and heat exchangers for a global manufacturing leader without confusing visitors.",
    solution: "Created a structured digital corporate ecosystem with page-by-page information architecture, vertical-segmented product categories, and automated multi-department contact routing.",
    results: [
      "Streamlined multi-vertical product catalog for international buyers",
      "Established authoritative global digital brand voice",
      "Simplified complex technical information architecture",
      "Accelerated direct inquiry routing to regional sales teams"
    ],
    stats: [
      { label: "Global Reach", value: "Multinational" },
      { label: "Verticals", value: "4 Big Sectors" },
      { label: "Architecture", value: "Modular" }
    ],
    tech: ["Information Architecture", "React JS", "Tailwind CSS", "SEO Strategy", "UX Design"],
    link: "/himile-india-case-study-global-manufacturing-digital-voice",
    image: himileImg,
    badgeColor: "bg-indigo-500/10 text-[#4f46e5] border-indigo-500/20"
  }
];

export default function CaseStudiesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO(getRouteSEO("/case-studies"));
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <InnerBanner
        title="Client Case Studies"
        subtitle="Discover how Dots and Coms transforms traditional businesses and industrial brands into digital lead generation powerhouses."
        breadcrumbs={[{ label: "Case Studies" }]}
      />



      {/* Main Case Studies Listing */}
      <section className="py-16 md:py-24 bg-[#f8fafc] relative">
        {/* Glow ambient meshes */}
        <div className="pointer-events-none absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#dc2626]/3 rounded-full blur-[140px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#ea580c]/3 rounded-full blur-[140px]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold font-mono tracking-widest text-[#ea580c] uppercase">
              // REAL PROVEN RESULTS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Featured Case Studies & Transformations
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Explore how we solved critical digital challenges, built high-converting website architectures, and delivered measurable business ROI for leading Indian & global companies.
            </p>
          </div>

          {/* Cards List */}
          <div className="space-y-12">
            {caseStudiesList.map((cs, idx) => (
              <motion.div
                key={cs.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 group transition-all duration-300 hover:border-[#dc2626]/30 hover:shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Image Section */}
                <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-slate-900 overflow-hidden">
                  <img
                    src={cs.image}
                    alt={`${cs.title} Case Study - Dots and Coms`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  
                  {/* Badge on Image */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`text-xs font-bold font-mono uppercase px-3 py-1.5 rounded-full border backdrop-blur-md bg-white/90 ${cs.badgeColor}`}>
                      {cs.industry}
                    </span>
                  </div>

                  {/* Quick stats floating bar */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 grid grid-cols-3 gap-2 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-white text-center">
                    {cs.stats.map((s, i) => (
                      <div key={i} className="space-y-0.5">
                        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">{s.label}</div>
                        <div className="text-sm font-extrabold text-white font-heading">{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between space-y-6 text-left">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
                        {cs.tagline}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 group-hover:text-[#dc2626] transition-colors">
                        {cs.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-sm md:text-base font-semibold leading-relaxed">
                      {cs.headline}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="text-xs font-bold font-mono uppercase text-slate-400 block mb-1">
                          The Challenge
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {cs.challenge}
                        </p>
                      </div>

                      <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                        <span className="text-xs font-bold font-mono uppercase text-[#dc2626] block mb-1">
                          The Strategy
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {cs.solution}
                        </p>
                      </div>
                    </div>

                    {/* Key Results */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold font-mono uppercase text-slate-400 block">
                        Key Deliverables & Growth Impact
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {cs.results.map((r, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs font-medium text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tech stack & Action CTA */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {cs.tech.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 font-mono text-[11px] rounded-md font-medium">
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={cs.link}
                      className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-[#dc2626] transition-all shadow-md hover:shadow-red-500/20 group/btn shrink-0"
                    >
                      <span>Read Full Case Study</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-[#ea580c] group-hover/btn:text-white" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-[#0b0f19] text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#dc2626]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10">
          <span className="text-xs font-bold font-mono tracking-widest text-[#ea580c] uppercase">
            // READY TO BE OUR NEXT CASE STUDY?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight">
            Ready to Turn Your Website Into a Digital Lead Generator?
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Get a free SEO & website performance audit to see how we can transform your business online.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#dc2626] text-white font-bold text-sm uppercase tracking-wider hover:bg-red-700 transition-all shadow-lg shadow-red-500/25"
            >
              <span>Get Free Consulting</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/free-seo-performance-website-audit"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-slate-800 text-slate-200 font-bold text-sm uppercase tracking-wider hover:bg-slate-700 transition-all border border-slate-700"
            >
              <span>Request Free Audit</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
