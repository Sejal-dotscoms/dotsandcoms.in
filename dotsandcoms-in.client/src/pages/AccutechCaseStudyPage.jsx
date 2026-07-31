import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Target, AlertTriangle, Lightbulb, Heart, ChevronRight, ArrowUpRight, Award, Zap, Globe, Shield } from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { Link } from "react-router-dom";
import { setPageSEO } from "../utils/seo";

// Image imports
import imgPackaging from "../assets/images/accutechlabels-packaging-labels-and-customized-labeling-solutions.png";
import imgChallenge from "../assets/images/accutech-label-labelling-img.png";
import imgLeadGen from "../assets/images/from-traditional-sales-to-digital-lead-generation-img.png";
import imgWebDesign from "../assets/images/affordable-web-design-Baroda-corporate-solutions.jpg";
import imgSeo from "../assets/images/seo-and-search-visibility-strategy-img.png";

export default function AccutechCaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Accutech Labels Case Study – Traditional to Digital Business | Dots & Coms",
      description: "How Dots & Coms transformed Accutech Labels from a traditional business into a digital lead generation engine using web design, SEO, and digital marketing strategies.",
      keywords: "Accutech Labels case study, digital transformation Baroda, web design case study Vadodara, SEO case study Gujarat, lead generation website, packaging company website design",
      canonical: "https://www.dotsandcoms.in/accutechlabels-case-study-traditional-to-web-business",
      ogImage: "https://www.dotsandcoms.in/og-image.png",
    });
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
        title="Case Study: Accutech Labels"
        subtitle="How Dots & Coms Transformed Accutech Labels From a Traditional Business Into a Digital Lead Generation Engine."
        breadcrumbs={[
          { label: "Accutech Labels Case Study" }
        ]}
      />

      {/* Intro Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-white">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#dc2626]/3 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-7 text-left space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase bg-red-500/5 border border-red-500/10 px-3 py-1.5 rounded-full w-fit">
                // B2B DIGITAL TRANSFORMATION
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                How Dots & Coms Transformed Accutech Labels From a Traditional Business Into a Digital Lead Generation Engine
              </h2>
              
              {/* Mobile Only Image */}
              <div className="lg:hidden w-full my-6 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img 
                  src={imgPackaging} 
                  alt="Accutech Labels B2B Transformation" 
                  className="w-full h-auto object-cover"
                  width="1024"
                  height="1024"
                />
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <p>
                  In many traditional manufacturing industries, growth has historically depended on offline sales channels.
                </p>
                <p>
                  Cold calls. Newspaper advertisements. Distributor networks. Word-of-mouth referrals.
                </p>
                <p>
                  For years, this was exactly how Accutech Labels operated.
                </p>
                <p>
                  As a business specializing in industrial labels, barcode labels, packaging labels, and customized labeling solutions, the company had built a strong reputation through traditional B2B sales methods. However, their digital presence was not contributing to their business growth.
                </p>
                <p>
                  Their website existed — but it was not performing.
                </p>
                <p className="font-bold text-slate-800">
                  That’s when Dots & Coms stepped in.
                </p>
              </div>
            </motion.div>

            {/* Right Image (Desktop) */}
            <motion.div 
              className="hidden lg:block lg:col-span-5"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 group">
                <img 
                  src={imgPackaging} 
                  alt="Accutech Labels B2B Transformation" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  width="1024"
                  height="1024"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 md:py-24 bg-[#f8fafc]/60 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            {...fadeInUp}
          >
            <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
              // THE CHALLENGE
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 mt-2">
              The Challenge
            </h2>
            <div className="w-12 h-1 bg-[#dc2626] mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 group">
                <img 
                  src={imgChallenge} 
                  alt="Accutech Labels Challenges" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width="1024"
                  height="1024"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              className="lg:col-span-7 text-left space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-slate-650 text-sm md:text-base leading-relaxed">
                Before partnering with Dots & Coms, Accutech Labels relied heavily on traditional business development methods. Most of their leads came from:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs md:text-sm text-slate-600 font-semibold">
                {[
                  "Cold calling",
                  "Newspaper advertising",
                  "Offline networking",
                  "Traditional B2B sales",
                  "Referrals from existing clients"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-red-500/5 px-3 py-2 rounded-lg border border-red-500/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-slate-650 text-sm md:text-base leading-relaxed pt-2">
                Their existing website was essentially a digital brochure rather than a sales tool. The platform suffered from several issues:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-medium">
                {[
                  "Outdated design",
                  "Weak user experience",
                  "Poor SEO visibility",
                  "Low search engine rankings",
                  "No clear conversion strategy",
                  "Minimal inquiry generation",
                  "No structured lead funnel",
                  "Weak trust-building elements"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-slate-700 text-sm md:text-base leading-relaxed pt-2 font-semibold">
                As a result, the website generated only 4 to 6 leads per year.
              </p>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                For a business with high production capabilities, this was a massive missed opportunity, especially when national B2B search traffic was growing rapidly.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Vision & Brand Approach Section */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              className="lg:col-span-6 text-left space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800">
                Our Vision for the Project
              </h2>
              
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <p>
                  At Dots & Coms, we realized that Accutech Labels had:
                </p>
                <div className="grid grid-cols-1 gap-2 text-xs md:text-sm text-slate-600 font-semibold">
                  {[
                    "Strong operational capabilities",
                    "Proven manufacturing experience",
                    "High-quality products",
                    "Strong industry credibility",
                    "Potential for national B2B sales growth"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="pt-2">
                  The problem was not their business capability. The problem was how their business was positioned online.
                </p>
                <p className="font-semibold text-slate-800">
                  Our vision was to:
                </p>
                <div className="grid grid-cols-1 gap-2 text-xs md:text-sm text-slate-600 font-semibold">
                  {[
                    "Rebuild their digital presence from scratch",
                    "Position the brand as a modern, reliable, and professional B2B partner",
                    "Turn their website from a digital brochure into a lead generation machine",
                    "Establish search engine visibility for critical industry keywords",
                    "Build a scalable system for long-term growth"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              className="lg:col-span-6 text-left space-y-6 p-8 rounded-2xl border border-slate-100 bg-[#f8fafc]/50 shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 text-[#dc2626]">
                <Target className="w-6 h-6" />
                <h3 className="text-2xl font-extrabold font-heading text-slate-800">
                  The Dots & Coms Approach
                </h3>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <p>
                  What makes Dots & Coms different from traditional design agencies is our approach. We don’t just build templates. We build strategy.
                </p>
                <p className="font-semibold text-slate-805">
                  For this project, we combined:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-semibold">
                  {[
                    "User psychology",
                    "SEO strategy",
                    "Conversion optimization",
                    "Trust-building design",
                    "B2B sales funnel structure",
                    "Long-term scalability"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="pt-2">
                  By bringing together strategy, design, content, and search visibility, we aimed to create a digital experience that did more than look professional. We wanted to build a business asset that generated measurable return on investment.
                </p>
                <p className="font-semibold text-slate-800">
                  We applied our 20+ years of digital experience to create a custom platform built for results.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Website Transformation Grid */}
      <section className="py-16 md:py-24 bg-[#f8fafc]/40 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            {...fadeInUp}
          >
            <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
              // METHODOLOGY & SOLUTIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 mt-2">
              Transformational Solutions Implemented
            </h2>
            <div className="w-12 h-1 bg-[#dc2626] mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Solution 1 */}
            <motion.div 
              className="lg:col-span-6 flex flex-col justify-between p-6 md:p-8 rounded-2xl glass-panel border border-slate-100 bg-white shadow-lg group hover:border-[#dc2626]/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden aspect-[16/10] border border-slate-100 relative">
                  <img src={imgWebDesign} alt="B2B E-commerce Custom Web Design and User Interface for Accutech Labels in Vadodara" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" loading="lazy" width="1500" height="938" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="space-y-3 text-left">
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-800 group-hover:text-[#dc2626] transition-colors">
                    Website Transformation
                  </h3>
                  <div className="w-8 h-0.5 bg-[#dc2626]" />
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    The original website was outdated and failed to communicate the company's capabilities.
                  </p>
                  
                  <p className="text-slate-650 text-xs md:text-sm font-semibold pt-1">
                    We redesigned the website to:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-550 font-medium">
                    {[
                      "Build trust instantly",
                      "Simplify inquiry pathways",
                      "Improve product discoverability",
                      "Increase user engagement",
                      "Enhance brand perception",
                      "Provide smooth mobile experiences",
                      "Place call-to-actions strategically",
                      "Create a highly professional impression"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-3 border-t border-slate-50">
                    We structured the user journey to ensure visitors could easily understand the product range, explore application areas, build trust through content, and submit inquiry forms within seconds. The redesign transformed the platform into a modern business asset.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Solution 2 */}
            <motion.div 
              className="lg:col-span-6 flex flex-col justify-between p-6 md:p-8 rounded-2xl glass-panel border border-slate-100 bg-white shadow-lg group hover:border-[#dc2626]/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden aspect-[16/10] border border-slate-100 relative">
                  <img src={imgSeo} alt="Google Search Engine Optimization and B2B Keyword Strategy for Accutech Labels" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" loading="lazy" width="1502" height="1002" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="space-y-3 text-left">
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-800 group-hover:text-[#dc2626] transition-colors">
                    SEO & Search Visibility Strategy
                  </h3>
                  <div className="w-8 h-0.5 bg-[#dc2626]" />
                  
                  <p className="text-slate-550 text-xs md:text-sm leading-relaxed">
                    Having a modern website is meaningless if no one can find it.
                  </p>
                  
                  <p className="text-slate-650 text-xs md:text-sm font-semibold pt-2">
                    Our SEO team restructured the website architecture around search intent:
                  </p>
                  <ul className="space-y-2 text-xs md:text-sm text-slate-600 font-medium">
                    {[
                      "Targeted high-intent B2B keywords",
                      "Created optimized product and category pages",
                      "Implemented technical SEO improvements",
                      "Mapped content to customer search queries",
                      "Accelerated website loading speed",
                      "Ensured proper search engine indexing"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-slate-550 text-xs md:text-sm leading-relaxed pt-3 border-t border-slate-50">
                    This strategy helped Accutech Labels rank on Google for critical searches, ensuring consistent organic traffic from businesses looking for labeling solutions.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Solution 3 */}
            <motion.div 
              className="lg:col-span-12 flex flex-col md:flex-row items-center p-6 md:p-8 rounded-2xl glass-panel border border-slate-100 bg-white shadow-lg group hover:border-[#dc2626]/20 transition-all duration-300 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-full md:w-5/12 rounded-xl overflow-hidden aspect-[16/10] border border-slate-100 relative shrink-0">
                <img src={imgLeadGen} alt="Digital Lead Generation and B2B Customer Acquisition funnels for manufacturing company" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" loading="lazy" width="1024" height="1024" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="space-y-4 text-left">
                <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-800 group-hover:text-[#dc2626] transition-colors">
                  From Traditional Sales to Digital Lead Generation
                </h3>
                <div className="w-8 h-0.5 bg-[#dc2626]" />
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Before the project, the company's B2B sales development relied entirely on manual outreach.
                </p>
                <p className="text-slate-650 text-xs md:text-sm font-semibold">
                  Today, their digital presence works 24/7 as their primary lead source.
                </p>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-2">
                  Instead of chasing clients, the client receives inbound organic inquiries from businesses actively searching for customized labeling products. This transition shifted their marketing strategy, making lead acquisition far more efficient and scalable.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Results Achieved Section */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            {...fadeInUp}
          >
            <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
              // RESULTS ACHIEVED
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 mt-2">
              Results Achieved
            </h2>
            <div className="w-12 h-1 bg-[#dc2626] mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Result 1 */}
            <motion.div 
              className="p-6 md:p-8 rounded-2xl glass-panel border border-slate-100 bg-[#f8fafc]/50 shadow-lg text-left flex gap-6 group hover:border-[#dc2626]/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl font-extrabold font-heading text-[#dc2626]/10 group-hover:text-[#dc2626]/20 transition-colors shrink-0">
                01
              </div>
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-bold font-heading text-slate-800">
                  Website Became Primary Lead Source
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  The website transitioned from an inactive brochure to the company's most productive business development channel.
                </p>
                <p className="text-slate-655 text-xs md:text-sm font-semibold border-t border-slate-100 pt-2">
                  Today, the majority of their new customer acquisitions begin with an organic Google search and an online inquiry form submission.
                </p>
              </div>
            </motion.div>

            {/* Result 2 */}
            <motion.div 
              className="p-6 md:p-8 rounded-2xl glass-panel border border-slate-100 bg-[#f8fafc]/50 shadow-lg text-left flex gap-6 group hover:border-[#dc2626]/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div className="text-4xl font-extrabold font-heading text-[#dc2626]/10 group-hover:text-[#dc2626]/20 transition-colors shrink-0">
                02
              </div>
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-bold font-heading text-slate-800">
                  Lead Generation Increased Massively
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Before the project, the website generated only 4 to 6 leads per year.
                </p>
                <p className="text-slate-650 text-xs md:text-sm font-semibold pt-1">
                  After the launch of the new platform and execution of the SEO strategy:
                </p>
                <ul className="list-unstyled text-xs md:text-sm text-slate-650 font-bold">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Inbound inquiries grew to 3 to 4 qualified B2B leads per month</span>
                  </li>
                </ul>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-2 border-t border-slate-100">
                  This represents a consistent stream of new business opportunities without additional marketing costs.
                </p>
              </div>
            </motion.div>

            {/* Result 3 */}
            <motion.div 
              className="p-6 md:p-8 rounded-2xl glass-panel border border-slate-100 bg-[#f8fafc]/50 shadow-lg text-left flex gap-6 group hover:border-[#dc2626]/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl font-extrabold font-heading text-[#dc2626]/10 group-hover:text-[#dc2626]/20 transition-colors shrink-0">
                03
              </div>
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-bold font-heading text-slate-800">
                  Stronger Brand Positioning
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  The upgraded visual identity and professional user experience immediately established credibility with large B2B buyers.
                </p>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-2 border-t border-slate-100">
                  The brand is now perceived as a modern, reliable, and capable industrial manufacturing partner, allowing them to compete effectively with larger players.
                </p>
              </div>
            </motion.div>

            {/* Result 4 */}
            <motion.div 
              className="p-6 md:p-8 rounded-2xl glass-panel border border-slate-100 bg-[#f8fafc]/50 shadow-lg text-left flex gap-6 group hover:border-[#dc2626]/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="text-4xl font-extrabold font-heading text-[#dc2626]/10 group-hover:text-[#dc2626]/20 transition-colors shrink-0">
                04
              </div>
              <div className="space-y-3">
                <h3 className="text-lg md:text-xl font-bold font-heading text-slate-800">
                  Reduced Dependence on Traditional Marketing
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  With a steady stream of organic inbound inquiries, the company has reduced its reliance on manual business development methods.
                </p>
                <p className="text-slate-655 text-xs md:text-sm font-bold italic pt-2 border-t border-slate-100">
                  The inbound lead engine has allowed the sales team to focus on closing deals rather than cold prospecting.
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-[#f8fafc]/60 border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="space-y-16">
            
            {/* Impact 1 */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="lg:col-span-5 text-left space-y-4">
                <span className="text-4xl font-extrabold font-heading text-[#ea580c]/10">01</span>
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-855 tracking-tight leading-tight">
                  Why This Project Matters
                </h3>
                <div className="w-12 h-1 bg-[#ea580c] rounded-full" />
                <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
                  Many traditional manufacturing businesses view websites as an expense rather than an investment. They believe B2B clients don't buy online. This project proves that view wrong.
                </p>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-md text-left space-y-4">
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed">
                  Even in traditional, industrial sectors, decision-makers use search engines to find suppliers. Having a professional digital presence is not just about looks. It's about:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-semibold border-t border-slate-50 pt-3">
                  {["Building immediate trust", "Creating scalable sales systems", "Establishing organic visibility", "Generating long-term ROI"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-705 text-xs md:text-sm font-bold pt-2 border-t border-slate-100">
                  A high-performance website is a business asset that appreciates in value over time.
                </p>
              </div>
            </motion.div>

            {/* Impact 2 */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="lg:col-span-5 text-left space-y-4 lg:order-2">
                <span className="text-4xl font-extrabold font-heading text-[#dc2626]/10">02</span>
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-855 tracking-tight leading-tight">
                  What Makes Dots & Coms Different
                </h3>
                <div className="w-12 h-1 bg-[#dc2626] rounded-full" />
                <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
                  Most design agencies build websites. We build growth ecosystems.
                </p>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-md text-left space-y-4 lg:order-1">
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed">
                  What makes our approach unique is that we combine:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs md:text-sm text-slate-600 font-semibold border-t border-slate-50 pt-3">
                  {[
                    "Strategy-first design",
                    "Technical SEO excellence",
                    "Conversion optimization",
                    "Customer behavior analysis",
                    "Scalable technology architecture",
                    "Premium visual storytelling"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed pt-2 border-t border-slate-100">
                  Every project we build is engineered around your business objectives. Whether the goal is:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 text-xs text-slate-600 font-semibold pt-1">
                  {["More leads", "More sales", "Better reach", "Stronger branding", "Increased trust", "Higher conversions"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-655 text-xs md:text-sm font-semibold pt-2 border-t border-slate-100">
                  We bring our 20+ years of digital experience to every project we touch.
                </p>
              </div>
            </motion.div>

            {/* Impact 3 */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="lg:col-span-5 text-left space-y-4">
                <span className="text-4xl font-extrabold font-heading text-[#dc2626]/10">03</span>
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-855 tracking-tight leading-tight">
                  Final Outcome
                </h3>
                <div className="w-12 h-1 bg-[#dc2626] rounded-full" />
                <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
                  The collaboration between Dots & Coms and Accutech Labels transformed a traditional, offline-reliant manufacturing business into a digital lead generation engine.
                </p>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-md text-left space-y-4">
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  The numbers speak for themselves.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-semibold border-t border-slate-50 pt-3">
                  {[
                    "Website became primary lead source",
                    "Inbound leads increased from 4-6 per year to 3-4 per month",
                    "Established organic rankings for B2B search queries",
                    "Reduced dependence on manual marketing methods",
                    "Positioned the brand as a modern manufacturing partner"
                  ].map((item, idx) => (
                    <span key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
                <p className="text-slate-655 text-xs md:text-sm leading-relaxed pt-3 border-t border-slate-100">
                  This is what happens when strategy, design, technology, and search visibility come together.
                </p>
              </div>
            </motion.div>

          </div>

          {/* CTA Footer Block */}
          <motion.div 
            className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white text-center space-y-6 shadow-xl relative overflow-hidden border border-white/5"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#ea580c]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#dc2626]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl md:text-3xl font-extrabold font-heading">
                Ready to Amplify Your Brand's Digital Impact?
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Let's discuss how we can restructure your web application layout, position your products, and build a high-performance conversion strategy.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link
                  to="/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full text-xs font-bold tracking-wider uppercase bg-[#dc2626] hover:bg-red-700 text-white transition-all shadow-[0_0_20px_rgba(220,38,38,0.15)] hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] hover:-translate-y-0.5"
                >
                  <span>Start Your Project</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/website-mobile-app-development-company-portfolio-baroda"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full text-xs font-bold tracking-wider uppercase border border-white/20 hover:border-white/40 text-white hover:bg-white/5 transition-all hover:-translate-y-0.5"
                >
                  <span>Explore Portfolio</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
