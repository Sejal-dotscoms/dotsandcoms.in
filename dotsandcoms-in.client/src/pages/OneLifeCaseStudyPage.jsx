import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Target, AlertTriangle, Lightbulb, Heart, ChevronRight, ArrowUpRight, Award, Zap, PhoneCall, Users, Users2 } from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { Link } from "react-router-dom";
import { setPageSEO } from "../utils/seo";

// Image imports
import imgBanner from "../assets/images/1life-expand-from-regional-impact-to-national-reach-img.png";
import imgChallenge from "../assets/images/1life-regional-digital-footprint-img.png";
import imgApproach from "../assets/images/our-approach-at-dots-and-coms-img.png";
import imgAudience from "../assets/images/understanding-the-audience-img.png";
import imgWebDesign from "../assets/images/affordable-web-design-Baroda-corporate-solutions.jpg";
import imgSeo from "../assets/images/seo-and-search-visibility-strategy-img.png";

export default function OneLifeCaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "1Life Case Study – Regional to National Digital Reach | Dots & Coms",
      description: "See how Dots & Coms helped 1Life expand from a regional presence to national digital reach through strategic website design, SEO, and performance marketing campaigns.",
      keywords: "1Life case study, regional to national digital marketing, website design case study Gujarat, national SEO campaign India, business growth digital marketing Baroda",
      canonical: "https://www.dotsandcoms.in/1life-case-study-of-regional-to-national-reach",
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
        title="Case Study: 1Life"
        subtitle="How Dots & Coms helped 1Life expand their suicide prevention and crisis support from regional impact to national reach."
        breadcrumbs={[
          { label: "1Life Case Study" }
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
                // SOCIAL IMPACT & REACH
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                How Dots & Coms Helped 1Life Expand From Regional Impact to National Reach
              </h2>
              
              {/* Mobile Only Image */}
              <div className="lg:hidden w-full my-6 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img 
                  src={imgBanner} 
                  alt="1Life Expand From Regional Impact to National Reach" 
                  className="w-full h-auto object-cover"
                  width="1024"
                  height="1024"
                />
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <p>
                  Mental health support is no longer optional in India. The demand for accessible crisis counselling, suicide prevention support, and emotional wellbeing services has grown massively over the last few years. Yet, many organizations doing meaningful work still struggle with one major problem — visibility.
                </p>
                <p>
                  That was the exact challenge faced by 1Life, a non-profit suicide prevention and crisis support organization based in India. The organization provides counselling support, tele-counselling, volunteer-driven crisis assistance, and mental health awareness initiatives across the country.
                </p>
                <p>
                  For years, this was exactly how 1Life operated.
                </p>
                <p>
                  Despite the incredible impact they were creating on the ground, their digital presence was not reflecting the scale of their mission.
                </p>
                <p className="font-bold text-slate-800">
                  That’s where Dots & Coms stepped in.
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
                  src={imgBanner} 
                  alt="1Life Expand From Regional Impact to National Reach" 
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
                  alt="1Life Regional Digital Footprint" 
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
                Before partnering with Dots & Coms, 1Life primarily had a regional digital footprint. Most website traffic, enquiries, and volunteer registrations were concentrated within a limited geographic audience.
              </p>

              <p className="text-slate-800 font-semibold text-sm md:text-base">
                The organization faced several major challenges:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-medium">
                {[
                  "Limited national discoverability on Google",
                  "Low conversion rates from website visitors",
                  "Weak SEO structure and poor keyword targeting",
                  "Outdated user journey and navigation flow",
                  "Lack of multilingual and geographically diversified reach",
                  "Inconsistent volunteer registrations",
                  "Low inbound call volumes despite increasing demand for mental health support"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-slate-650 text-sm md:text-base leading-relaxed pt-2">
                For an organization handling sensitive and urgent human conversations, the website needed to do much more than “look good.”
              </p>

              <p className="text-slate-800 font-semibold text-sm md:text-base">
                It needed to:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-slate-650 font-bold">
                {["Build trust instantly", "Make help accessible within seconds", "Simplify volunteer onboarding", "Increase awareness nationwide", "Encourage people to take action without hesitation"].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-2 border-t border-slate-100">
                The existing digital ecosystem was not optimized for any of this.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-24 bg-white relative">
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
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                Our Approach at Dots & Coms
              </h2>
              
              {/* Mobile Only Image */}
              <div className="lg:hidden w-full my-6 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img 
                  src={imgApproach} 
                  alt="Our Approach at Dots & Coms" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  width="1024"
                  height="1024"
                />
              </div>

              <div className="space-y-4 text-slate-655 leading-relaxed text-sm md:text-base">
                <p>
                  At Dots & Coms, we don’t believe websites are just design projects.
                </p>
                <p>
                  We believe they are business and impact engines.
                </p>
                <p>
                  What makes Dots & Coms different from traditional web agencies is our approach toward strategy-first execution. Every pixel, section, CTA, SEO structure, and content hierarchy is designed with one objective — measurable growth.
                </p>
                <p>
                  For the 1Life project, we combined:
                </p>

                <div className="grid grid-cols-2 gap-2.5 text-xs md:text-sm text-slate-600 font-semibold">
                  {[
                    "Strategic web design",
                    "SEO architecture",
                    "Conversion-focused UX",
                    "Behavioral psychology",
                    "Content optimization",
                    "Trust-building interface systems",
                    "Accessibility-focused layouts"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <p className="pt-2">
                  Our team poured 20+ years of collective digital experience into creating a platform that could scale alongside the organization’s mission.
                </p>
                <p className="font-semibold text-slate-800">
                  We didn’t just redesign a website. We rebuilt the entire digital experience around empathy, accessibility, discoverability, and conversions.
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
                  src={imgApproach} 
                  alt="Our Approach at Dots & Coms" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width="1024"
                  height="1024"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
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
              Website Transformation & Reach
            </h2>
            <div className="w-12 h-1 bg-[#dc2626] mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Service 1 */}
            <motion.div 
              className="lg:col-span-6 flex flex-col justify-between p-6 md:p-8 rounded-2xl glass-panel border border-slate-100 bg-white shadow-lg group hover:border-[#dc2626]/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden aspect-[16/10] border border-slate-100 relative">
                  <img src={imgAudience} alt="User Persona Research and Target Audience mapping for Mental Health Organization" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" loading="lazy" width="1024" height="1024" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="space-y-3 text-left">
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-800 group-hover:text-[#dc2626] transition-colors">
                    Understanding the Audience
                  </h3>
                  <div className="w-8 h-0.5 bg-[#dc2626]" />
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    One of the first things we realized was that the audience visiting the website was emotionally vulnerable. Unlike traditional businesses, users were not casually browsing.
                  </p>
                  <p className="text-slate-650 text-xs md:text-sm font-semibold pt-2">
                    Visitors included:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-550 font-medium">
                    {[
                      "Individuals in emotional distress",
                      "Families seeking support",
                      "Potential volunteers",
                      "Mental health advocates",
                      "Corporate wellness partners",
                      "Donors and contributors"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-3 border-t border-slate-50">
                    This required a completely different UX strategy. We carefully structured the interface to reduce friction, simplify communication pathways, and create a calm, trustworthy digital experience. The result was a website experience that felt human instead of corporate.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Service 2 */}
            <motion.div 
              className="lg:col-span-6 flex flex-col justify-between p-6 md:p-8 rounded-2xl glass-panel border border-slate-100 bg-white shadow-lg group hover:border-[#dc2626]/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden aspect-[16/10] border border-slate-100 relative">
                  <img src={imgWebDesign} alt="Non-Profit Custom Web Redesign and Accessible User Interface by Dots & Coms" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" loading="lazy" width="1500" height="938" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="space-y-3 text-left">
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-800 group-hover:text-[#dc2626] transition-colors">
                    Website Transformation
                  </h3>
                  <div className="w-8 h-0.5 bg-[#dc2626]" />
                  <p className="text-slate-650 text-xs md:text-sm font-semibold pt-1">
                    The new platform was designed to immediately communicate:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-550 font-medium">
                    {["Credibility", "Safety", "Accessibility", "Emotional reassurance", "Professional support availability"].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-655 text-xs md:text-sm font-semibold pt-3">
                    We optimized:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-550 font-medium">
                    {[
                      "Navigation hierarchy",
                      "Mobile responsiveness",
                      "Speed and loading performance",
                      "CTA placements",
                      "Volunteer registration funnels",
                      "SEO landing pages",
                      "Support pathways",
                      "Content readability",
                      "Conversion-oriented page structure"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-3 border-t border-slate-50">
                    The website was also strategically optimized to improve discoverability for high-intent mental health and counselling-related search queries in India.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Service 3 */}
            <motion.div 
              className="lg:col-span-12 flex flex-col md:flex-row items-center p-6 md:p-8 rounded-2xl glass-panel border border-slate-100 bg-white shadow-lg group hover:border-[#dc2626]/20 transition-all duration-300 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-full md:w-5/12 rounded-xl overflow-hidden aspect-[16/10] border border-slate-100 relative shrink-0">
                <img src={imgSeo} alt="National Organic SEO Campaign and Content Strategy for Counseling NGO" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" loading="lazy" width="1502" height="1002" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="space-y-4 text-left">
                <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-800 group-hover:text-[#dc2626] transition-colors">
                  SEO & Digital Reach Expansion
                </h3>
                <div className="w-8 h-0.5 bg-[#dc2626]" />
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  One of the biggest breakthroughs came through our SEO execution strategy. Previously, the organization had very limited visibility outside its immediate region.
                </p>
                <p className="text-slate-650 text-xs md:text-sm font-semibold">
                  Our SEO team restructured the website architecture around:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-655 font-bold">
                  {[
                    "Search intent mapping",
                    "Mental health support keywords",
                    "Crisis counselling searches",
                    "Volunteer-related queries",
                    "Local + national discoverability",
                    "Long-tail informational searches",
                    "Technical SEO improvements"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-550 text-xs md:text-sm leading-relaxed pt-2">
                  This allowed the organization to gradually expand from a regional audience to a national digital presence. Today, enquiries, calls, volunteer registrations, and support requests come from multiple Indian states and across different language demographics. That shift alone fundamentally changed the scale of the organization’s outreach capabilities.
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
            <p className="mt-3 text-center text-slate-600 font-semibold italic text-sm md:text-base">
              The transformation produced significant measurable outcomes.
            </p>
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
                  340% Increase in Incoming Calls
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  One of the strongest indicators of impact was the increase in direct support calls. The improved website experience, faster accessibility, and better search visibility resulted in a 340% increase in incoming calls from people seeking help.
                </p>
                <p className="text-slate-650 text-xs md:text-sm font-semibold border-t border-slate-100 pt-2">
                  More importantly, these calls were no longer concentrated in a single region. The organization started receiving enquiries from multiple states across India, with users speaking different languages and coming from completely different demographics.
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
                  200% Increase in Leads
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  The optimized website structure and strategic conversion pathways led to a dramatic increase in enquiries, support requests, and contact form submissions.
                </p>
                <p className="text-slate-650 text-xs md:text-sm font-semibold">
                  Within months:
                </p>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 font-semibold">
                  {["Lead generation increased by over 200%", "User engagement improved significantly", "Website retention improved", "Bounce rates reduced substantially"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-2 border-t border-slate-100">
                  The platform started functioning as a real growth channel instead of just an informational website.
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
                  300% Increase in Overall Growth & Conversions
                </h3>
                <p className="text-slate-550 text-xs md:text-sm font-semibold">
                  From volunteer registrations to partnership enquiries and counselling requests, overall digital conversions grew by more than 300%.
                </p>
                <p className="text-slate-650 text-xs md:text-sm font-semibold">
                  The organization witnessed:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 font-medium">
                  {[
                    "Higher trust from first-time visitors",
                    "Increased awareness",
                    "Better engagement rates",
                    "More volunteer signups",
                    "Improved campaign performance",
                    "Stronger online credibility"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
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
                  Volunteer Registrations Increased Significantly
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Volunteer onboarding became far more streamlined and accessible. By simplifying forms, improving page experience, and strengthening visibility, the organization experienced a major increase in volunteer applications.
                </p>
                <p className="text-slate-650 text-xs md:text-sm font-semibold border-t border-slate-100 pt-2">
                  This was particularly important because volunteer counsellors form a critical part of the organization’s support ecosystem. The digital platform became a recruitment engine for social impact.
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
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-850 tracking-tight leading-tight">
                  Regional Presence to National Reach
                </h3>
                <div className="w-12 h-1 bg-[#ea580c] rounded-full" />
                <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
                  Perhaps the most meaningful outcome of this collaboration was the transition from regional awareness to national visibility.
                </p>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-md text-left space-y-4">
                <p className="text-slate-600 text-xs md:text-sm font-semibold">
                  Before the project:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-500 font-medium">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full shrink-0" />
                    <span>Most engagement came from a limited geographic area</span>
                  </li>
                </ul>

                <p className="text-slate-600 text-xs md:text-sm font-semibold pt-2 border-t border-slate-100">
                  After the transformation:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-semibold pt-1">
                  {[
                    "Website traffic diversified nationally",
                    "Calls came from multiple Indian states",
                    "Users across different languages started engaging",
                    "Organic reach expanded significantly",
                    "The organization established stronger national credibility"
                  ].map((item, idx) => (
                    <span key={idx} className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
                <p className="text-slate-700 text-xs md:text-sm font-bold pt-2 border-t border-slate-50">
                  This was not just digital growth. It was mission amplification.
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
                  Why This Project Matters
                </h3>
                <div className="w-12 h-1 bg-[#dc2626] rounded-full" />
                <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
                  Mental health platforms require a very different design philosophy. You are not optimizing for clicks alone. You are optimizing for trust, comfort, urgency, emotional clarity, and accessibility.
                </p>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-md text-left space-y-4 lg:order-1">
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed">
                  At Dots & Coms, we understand that. Our approach combines:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-semibold border-t border-slate-50 pt-3">
                  {["Psychology-driven UX", "Strategic SEO", "High-conversion web architecture", "Brand positioning", "Long-term scalability"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-655 text-xs md:text-sm font-semibold pt-2 border-t border-slate-100">
                  That’s why our projects don’t just “look modern.” They perform.
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
                  What Makes Dots & Coms Different
                </h3>
                <div className="w-12 h-1 bg-[#dc2626] rounded-full" />
                <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
                  Most agencies focus only on aesthetics. We focus on outcomes. Our philosophy is simple: A website should generate measurable impact.
                </p>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-md text-left space-y-4">
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed">
                  Whether it’s:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 text-xs text-slate-600 font-semibold">
                  {["More leads", "More sales", "Better discoverability", "Higher engagement", "Improved trust", "Increased conversions", "Stronger branding", "Greater reach"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <p className="text-slate-650 text-xs md:text-sm leading-relaxed pt-2 border-t border-slate-100">
                  Every project we build is engineered around growth. We bring together:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 text-xs text-slate-600 font-semibold">
                  {["Strategy", "UI/UX", "SEO", "Performance optimization", "Consumer psychology", "Conversion systems", "Brand storytelling"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-655 text-xs md:text-sm font-semibold pt-2 border-t border-slate-100">
                  And we apply our 20+ years of combined industry experience to every single project.
                </p>
              </div>
            </motion.div>

            {/* Impact 4 */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="lg:col-span-5 text-left space-y-4 lg:order-2">
                <span className="text-4xl font-extrabold font-heading text-[#dc2626]/10">04</span>
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-855 tracking-tight leading-tight">
                  Final Outcome
                </h3>
                <div className="w-12 h-1 bg-[#dc2626] rounded-full" />
                <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
                  The collaboration between Dots & Coms and 1Life demonstrates how the right digital strategy can amplify real-world impact.
                </p>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-md text-left space-y-4 lg:order-1">
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed">
                  From a limited regional footprint to a nationally discoverable platform, the transformation helped the organization:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-semibold border-t border-slate-50 pt-3">
                  {[
                    "Reach more people",
                    "Save more lives",
                    "Recruit more volunteers",
                    "Increase accessibility",
                    "Build stronger trust online",
                    "Expand support systems across India"
                  ].map((item, idx) => (
                    <span key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
                <p className="text-slate-655 text-xs md:text-sm font-semibold pt-2 border-t border-slate-100">
                  The numbers speak for themselves:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 font-semibold">
                  {[
                    "340% increase in incoming calls",
                    "200% increase in leads",
                    "300% growth in conversions and engagement",
                    "Significant rise in volunteer registrations",
                    "Expansion from regional reach to national visibility"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-700 text-xs md:text-sm font-bold pt-2 border-t border-slate-50">
                  This is what happens when strategy, design, SEO, and purpose come together.
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
