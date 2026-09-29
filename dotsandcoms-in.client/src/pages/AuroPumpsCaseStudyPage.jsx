import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, TrendingUp, Target, AlertTriangle, Lightbulb, 
  ChevronRight, ArrowUpRight, Award, Zap, Globe, Shield, Factory, 
  Cog, Wrench, Users, PhoneCall, Star, HelpCircle
} from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { Link } from "react-router-dom";
import { setPageSEO } from "../utils/seo";
import { getRouteSEO } from "../seo/publicRoutes";

// Image imports
import imgBanner from "../assets/images/auro-pumps-case-study-banner.jpg";
import imgApproach from "../assets/images/our-approach-at-dots-and-coms-img.png";
import imgWebDesign from "../assets/images/affordable-web-design-Baroda-corporate-solutions.jpg";
import imgSeo from "../assets/images/seo-and-search-visibility-strategy-img.png";
import imgLeadGen from "../assets/images/from-traditional-sales-to-digital-lead-generation-img.png";

export default function AuroPumpsCaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO(getRouteSEO("/auro-pumps-case-study-traditional-to-digital-lead-engine"));
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  return (
    <>
      <InnerBanner
        title="Case Study: Auro Pumps"
        subtitle="From Traditional Industrial Business to a Digital Lead Engine: The Auro Pumps Story"
        breadcrumbs={[
          { label: "Auro Pumps Case Study" }
        ]}
      />

      {/* Intro Section */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="pointer-events-none absolute top-1/3 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#dc2626]/3 blur-[120px]" />
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* Left Content */}
            <motion.div 
              className="space-y-6 text-left lg:col-span-7"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="w-fit rounded-full border border-red-500/10 bg-red-500/5 px-3 py-1.5 font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase">
                // INDUSTRIAL B2B DIGITAL TRANSFORMATION
              </span>
              <h2 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-slate-800 md:text-4xl">
                How Dots and Coms Helped Auro Pumps Turn Its Website From a Digital Brochure Into a Powerful Lead Engine
              </h2>
              
              {/* Mobile Only Image */}
              <div className="my-6 w-full overflow-hidden rounded-2xl border border-slate-100 shadow-xl lg:hidden">
                <img 
                  src={imgBanner} 
                  alt="Auro Pumps Industrial Web Design & Digital Transformation Case Study Mobile" 
                  className="h-auto w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="1024"
                />
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-slate-600 md:text-base">
                <p>
                  When people talk about digital transformation, they usually talk about technology companies, startups, e-commerce brands, and businesses born on the internet.
                </p>
                <p className="font-semibold text-slate-800">
                  But what happens when the business is completely different?
                </p>
                <p>
                  What happens when your business is manufacturing industrial pumps, your customers are engineers and industrial buyers, your products are highly specialized, and most of your business has traditionally come through relationships, references, enquiries, and years of industry experience?
                </p>
                <p>
                  That is where the story of <strong>Auro Pumps</strong> becomes interesting.
                </p>
                <p>
                  Established in 1984 through technology transfer from <strong>POMPE VERGANI SpA of Italy</strong>, Auro Pumps is a specialized industrial pump manufacturer with over four decades of experience in critical pumping applications.
                </p>
                <p className="border-l-4 border-[#dc2626] py-1 pl-4 font-medium italic text-slate-800">
                  The company possesses extensive manufacturing and engineering capability at its Palej facility — including in-house machining, fabrication, assembly, and hydraulic performance testing before dispatch.
                </p>
                <p className="font-bold text-slate-900">
                  The challenge was not the business. The challenge was communicating the strength of the business digitally.
                </p>
              </div>
            </motion.div>

            {/* Right Image (Desktop) */}
            <motion.div 
              className="hidden lg:col-span-5 lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-2xl">
                <img 
                  src={imgBanner} 
                  alt="Auro Pumps Web Design & Industrial Branding Desktop Mockup" 
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="1024"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Key Metrics / Snapshot Grid */}
      <section className="border-y border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-xl border border-slate-200/60 bg-white p-5 text-center shadow-sm">
              <span className="block font-mono text-2xl font-black text-[#dc2626] md:text-3xl">1984</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Established Year</span>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-5 text-center shadow-sm">
              <span className="block font-mono text-2xl font-black text-[#dc2626] md:text-3xl">40+ Yrs</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Industry Excellence</span>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-5 text-center shadow-sm">
              <span className="block font-mono text-2xl font-black text-[#dc2626] md:text-3xl">ISO & CE</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Certified Quality</span>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-5 text-center shadow-sm">
              <span className="block font-mono text-2xl font-black text-[#dc2626] md:text-3xl">24 / 7</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Digital Lead Engine</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Initial Reluctance Section */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div className="mx-auto mb-16 max-w-3xl text-center" {...fadeInUp}>
            <span className="rounded-full bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-600 uppercase">
              // THE INITIAL HESITATION
            </span>
            <h2 className="font-heading mt-3 text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
              "Do We Really Need a New Website?"
            </h2>
            <p className="mt-4 text-slate-600">
              Like many successful traditional businesses, Auro Pumps had grown through its products, relationships, technical knowledge, and reputation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-8 shadow-sm" {...fadeInUp}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-[#dc2626]">
                <Factory className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-800">Brick & Mortar Roots</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 md:text-sm">
                A real-world industrial business where engineering capability and product performance mattered far more than flashy digital trends.
              </p>
            </motion.div>

            <motion.div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-8 shadow-sm" {...fadeInUp}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-800">Natural Hesitation</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 md:text-sm">
                Spending money on something that cannot be physically touched or immediately measured can feel like an unnecessary expense for an established manufacturer.
              </p>
            </motion.div>

            <motion.div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-8 shadow-sm md:col-span-2 lg:col-span-1" {...fadeInUp}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-800">Dots & Coms Approach</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 md:text-sm">
                Instead of selling a generic website, we took time to understand the business first — translating technical strengths into a digital experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Technical Depth & Solutions Section */}
      <section className="relative border-t border-slate-100 bg-[#f8fafc]/80 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            <motion.div className="space-y-6 lg:col-span-6" {...fadeInUp}>
              <span className="font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase">
                // DEEP INDUSTRIAL KNOWLEDGE
              </span>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
                The Website Had to Understand the Business Before Customers Could
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                A prospective industrial buyer asks critical technical questions before picking up the phone:
              </p>
              
              <ul className="space-y-2.5 text-xs text-slate-700 md:text-sm">
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" />
                  <span>Can the company handle extreme temperatures and molten metals?</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" />
                  <span>Does the company manufacture in-house or just assemble?</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" />
                  <span>What testing facilities exist (hydraulic performance, pressure tests)?</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#dc2626]" />
                  <span>Are quality standards certified (ISO 9001:2015, CE Marking)?</span>
                </li>
              </ul>

              <p className="pt-2 text-sm leading-relaxed font-semibold text-slate-800">
                These questions cannot be answered with a generic corporate template. The new website became a <strong>digital sales and trust-building tool</strong>.
              </p>
            </motion.div>

            <motion.div className="lg:col-span-6" {...fadeInUp}>
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl md:p-8">
                <h3 className="font-heading mb-4 text-xl font-extrabold text-slate-800">
                  Specialized Solutions Highlighted:
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    "Molten Salt Pumps",
                    "Molten Zinc & Galvalume Pumps",
                    "Molten Lead Pumps",
                    "Vertical Heavy Slurry Pumps",
                    "Thermic Fluid Pumps",
                    "High-Pressure Chemical Pumps",
                    "LPG & Process Pumps",
                    "Custom Engineered Solutions"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs font-bold text-slate-700">
                      <Cog className="h-4 w-4 text-[#dc2626]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Website as Part of Sales Team */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            <motion.div className="order-2 lg:order-1 lg:col-span-6" {...fadeInUp}>
              <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-xl">
                <img 
                  src={imgLeadGen} 
                  alt="Digital Sales Lead Generation Engine Dots and Coms" 
                  className="h-auto w-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div className="order-1 space-y-6 lg:order-2 lg:col-span-6" {...fadeInUp}>
              <span className="font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase">
                // PRACTICAL BUSINESS BENEFIT
              </span>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
                The Website Became Part of the Sales Team
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                In industrial B2B sales, reps spend considerable time explaining repetitive technical details.
              </p>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                Auro Pumps’ website now communicates important technical applications, manufacturing infrastructure, ISO 9001:2015 certification, and CE credentials in a structured format.
              </p>
              <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50/50 p-4 text-xs font-medium text-emerald-900 md:text-sm">
                "The result is not simply a better-looking website. It is a better-informed prospect. And a better-informed prospect makes for a much more productive sales conversation."
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* From Website to Lead Engine Section */}
      <section className="relative bg-slate-900 py-16 text-white md:py-24">
        <div className="pointer-events-none absolute top-1/2 left-1/4 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#dc2626]/10 blur-[160px]" />
        
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div className="mx-auto mb-16 max-w-3xl text-center" {...fadeInUp}>
            <span className="font-mono text-xs font-bold tracking-widest text-red-400 uppercase">
              // LEAD GENERATION STRATEGY
            </span>
            <h2 className="font-heading mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              From "We Have a Website" to "The Website Brings Us Enquiries"
            </h2>
            <p className="mt-4 text-slate-300">
              A website by itself does not automatically generate business — it needs to be discoverable by targeted industrial buyers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Targeted Visibility</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
                Structured content and search strategy made Auro Pumps discoverable to decision-makers searching specifically for industrial pumping equipment.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Quality Over Quantity</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
                For specialized B2B industrial manufacturers, 10 relevant industrial enquiries are far more valuable than thousands of random visitors.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Instant Digital Trust</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
                Prospects immediately see an established engineering manufacturer with 4+ decades of heritage and proven technical capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Referral & Partnership Section */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-red-50/30 p-8 shadow-xl md:p-14">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-700">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>The Best Compliment of All</span>
              </div>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
                A Client Partnership Built on Trust & Results
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                The strongest endorsement of a successful client relationship is a referral. Auro Pumps has been so happy with the results and partnership with <strong>Dots and Coms</strong> that they have referred several new clients to us.
              </p>
              <p className="font-semibold text-slate-800 text-sm md:text-base">
                For us, that means far more than simply completing another website project — it demonstrates genuine trust and long-term value creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Bigger Lesson & CTA */}
      <section className="relative border-t border-slate-100 bg-[#f8fafc] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
          <span className="font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase">
            // THE BIGGER LESSON
          </span>
          <h2 className="font-heading mt-3 text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
            You Don't Have to Be a Tech Startup to Win Digitally
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            You can be a traditional manufacturer. You can have decades of offline experience. But when your real-world expertise is presented properly online, your website becomes one of your most valuable business-development assets.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
              className="inline-flex items-center space-x-2 rounded-full bg-[#dc2626] px-8 py-4 font-heading text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-700 hover:shadow-red-500/40"
            >
              <span>Transform Your Industrial Website</span>
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <Link
              to="/website-mobile-app-development-company-portfolio-baroda"
              className="inline-flex items-center space-x-2 rounded-full border border-slate-300 bg-white px-8 py-4 font-heading text-sm font-extrabold uppercase tracking-wider text-slate-700 transition-all duration-300 hover:border-slate-400 hover:bg-slate-50"
            >
              <span>Explore All Case Studies</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
