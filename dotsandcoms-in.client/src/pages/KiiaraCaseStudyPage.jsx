import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Target, AlertTriangle, Lightbulb, Heart, ChevronRight, ArrowUpRight, Award, Zap, Sparkles, ShoppingBag, Globe, Eye } from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { Link } from "react-router-dom";
import { setPageSEO } from "../utils/seo";

// Image imports
import imgBanner from "../assets/images/kiiara-kreations-creative-handmade-brand-built-around-passion-img.png";
import imgChallenge from "../assets/images/kiiara-kreations-creative-handmade-products-img.png";
import imgApproach from "../assets/images/our-approach-at-dots-and-coms-img.png";
import imgWebDesign from "../assets/images/affordable-web-design-Baroda-corporate-solutions.jpg";
import imgSeo from "../assets/images/seo-and-search-visibility-strategy-img.png";
import imgLeadGen from "../assets/images/from-traditional-sales-to-digital-lead-generation-img.png";

export default function KiiaraCaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Kiiara Kreations Case Study – Hobby Goes Global | Dots & Coms",
      description: "Discover how Dots & Coms helped Kiiara Kreations turn a handmade craft hobby into a globally visible brand through eCommerce web design, SEO, and digital marketing.",
      keywords: "Kiiara Kreations case study, handmade products website Baroda, ecommerce website design Vadodara, hobby to business web design, craft brand digital marketing Gujarat",
      canonical: "https://www.dotsandcoms.in/hobby-goes-global-case-study",
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
        title="Case Study: Kiiara Kreations"
        subtitle="How Dots & Coms helped Kiiara Kreations transform from a passion project into a fast-growing brand."
        breadcrumbs={[
          { label: "Kiiara Kreations Case Study" }
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
                // ECOMMERCE BRAND ELEVATION
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                How Dots & Coms Helped Kiiara Kreations Transform From a Passion Project Into a Fast-Growing Brand
              </h2>
              
              {/* Mobile Only Image */}
              <div className="lg:hidden w-full my-6 rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                <img 
                  src={imgBanner} 
                  alt="Kiiara Kreations Handmade Passion Brand" 
                  className="w-full h-auto object-cover"
                  width="1024"
                  height="1024"
                />
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <p>
                  In today’s digital world, countless creative businesses start with talent and passion — but very few successfully scale beyond their immediate network.
                </p>
                <p className="font-semibold text-slate-805">
                  Most remain dependent on:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-600 font-semibold pt-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600" />
                    <span>Friends and family referrals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600" />
                    <span>Instagram DMs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600" />
                    <span>Word-of-mouth sales</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600" />
                    <span>Small local audiences</span>
                  </div>
                </div>

                <p className="pt-2">
                  That was the situation with Kiiara Kreations, a creative handmade brand built around passion, craftsmanship, and artistic expression.
                </p>
                <p className="border-l-4 border-amber-500 pl-4 italic text-slate-800 font-medium py-1">
                  The products had quality.<br />
                  The creativity was exceptional.<br />
                  The potential was massive.
                </p>
                <p>
                  But the brand lacked one thing: A scalable digital ecosystem.
                </p>
                <p className="font-bold text-slate-900">
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
                  alt="Kiiara Kreations Handmade Passion Brand" 
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
              Transforming From Hobbyist to Brand
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
                  alt="Kiiara Kreations Creative Handmade Products" 
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
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Before partnering with Dots & Coms, Kiiara Kreations operated largely as a hobby-driven business. Most sales came from:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs md:text-sm text-slate-600 font-semibold">
                {["Friends", "Family", "Existing social circles", "Personal references", "Limited Instagram visibility"].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-red-500/5 px-3 py-2 rounded-lg border border-red-500/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed pt-2">
                While the products received appreciation, the business lacked:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-medium">
                {[
                  "National visibility",
                  "Professional brand positioning",
                  "Strong digital credibility",
                  "Structured eCommerce systems",
                  "SEO discoverability",
                  "Scalable order generation",
                  "Conversion-focused customer journeys"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed pt-2">
                The brand had talent, but not enough reach. The biggest challenge was transforming a passion-based creative hobby into a professionally positioned business capable of scaling across India — and eventually internationally.
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
              <div className="flex items-center space-x-3 text-[#ea580c]">
                <Heart className="w-6 h-6 animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800">
                  Understanding the Brand
                </h3>
              </div>
              
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                <p>
                  At Dots & Coms, we understood immediately that Kiiara Kreations was not just selling products.
                </p>
                <p className="font-semibold text-slate-805">
                  It was selling:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-semibold">
                  {["Creativity", "Handmade craftsmanship", "Personal expression", "Emotional value", "Art-driven experiences"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="pt-2">
                  That required a very different design philosophy. The website needed to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-medium">
                  {[
                    "Feel premium yet personal",
                    "Build trust instantly",
                    "Highlight craftsmanship beautifully",
                    "Create emotional connection",
                    "Simplify online purchasing",
                    "Position the brand professionally",
                    "Expand beyond local audiences"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#ea580c] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="font-semibold text-slate-800 pt-2">
                  Most importantly, it needed to help the founder transition from “doing it as a hobby” to running it like a real business.
                </p>
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
                  At Dots & Coms, we don’t believe websites should simply “exist.” We believe they should create business transformation.
                </p>
                <p className="font-semibold text-slate-805">
                  What makes our approach different is that we combine:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-semibold">
                  {[
                    "Branding psychology",
                    "UI/UX strategy",
                    "SEO systems",
                    "Conversion optimization",
                    "Storytelling",
                    "Customer behavior analysis",
                    "Scalable growth architecture"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="pt-2">
                  For Kiiara Kreations, we focused on building a digital experience that elevated the perceived value of the brand.
                </p>
                <p className="font-semibold text-slate-800">
                  We poured 20+ years of combined digital expertise into creating a platform designed not just to showcase products — but to build a scalable online business.
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
              // SERVICES & TRANSFORMATION
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 mt-2">
              Website & E-Commerce Rebuild
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
                  <img src={imgWebDesign} alt="Custom Premium E-Commerce Website Design for Kiiara Kreations Handmade Products in Vadodara" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" loading="lazy" width="1500" height="938" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="space-y-3 text-left">
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-800 group-hover:text-[#dc2626] transition-colors">
                    Website Transformation
                  </h3>
                  <div className="w-8 h-0.5 bg-[#dc2626]" />
                  <p className="text-slate-650 text-xs md:text-sm font-semibold pt-1">
                    The website was strategically designed to:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-550 font-medium">
                    {[
                      "Create a premium first impression",
                      "Showcase products elegantly",
                      "Improve trust and professionalism",
                      "Simplify shopping experiences",
                      "Increase conversion rates",
                      "Improve mobile shopping usability",
                      "Enhance brand storytelling",
                      "Create emotional engagement"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-650 text-xs md:text-sm font-semibold pt-3">
                    We carefully optimized:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-550 font-medium">
                    {[
                      "Product presentation",
                      "Navigation flow",
                      "Checkout experience",
                      "Visual hierarchy",
                      "User journey",
                      "Mobile responsiveness",
                      "Loading performance",
                      "Conversion pathways"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-3 border-t border-slate-50">
                    The result was a website experience that felt polished, trustworthy, and professionally branded.
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
                  <img src={imgSeo} alt="E-Commerce Brand Organic SEO Growth and Client Acquisition Expansion Strategy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" loading="lazy" width="1502" height="1002" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="space-y-3 text-left">
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-800 group-hover:text-[#dc2626] transition-colors">
                    Expanding Beyond Friends & Family
                  </h3>
                  <div className="w-8 h-0.5 bg-[#dc2626]" />
                  
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                    One of the biggest turning points for the business came after the website launch and SEO implementation. Previously, most purchases came from people who already knew the founder personally.
                  </p>
                  
                  <p className="text-slate-650 text-xs md:text-sm font-semibold pt-2">
                    After the transformation:
                  </p>
                  <ul className="space-y-2 text-xs md:text-sm text-slate-600 font-medium">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>The brand started attracting completely new customers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>Orders began coming from across India</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>The business reached audiences outside its local network</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>Organic discovery improved significantly</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>Customer trust increased dramatically</span>
                    </li>
                  </ul>

                  <p className="text-slate-700 text-xs md:text-sm font-semibold pt-3 border-t border-slate-50">
                    The business was no longer dependent on personal circles for survival. It had become discoverable.
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
                <img src={imgLeadGen} alt="Global E-Commerce Logistics and International Customer Reach Expansion for Indian Brand" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" loading="lazy" width="1024" height="1024" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="space-y-4 text-left">
                <h3 className="text-xl md:text-2xl font-bold font-heading text-slate-800 group-hover:text-[#dc2626] transition-colors">
                  National & International Reach
                </h3>
                <div className="w-8 h-0.5 bg-[#dc2626]" />
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  The improved digital presence helped Kiiara Kreations unlock entirely new markets.
                </p>
                <p className="text-slate-650 text-xs md:text-sm font-semibold">
                  The brand started receiving:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-655 font-bold">
                  {["Pan-India orders", "Interest from multiple cities", "International inquiries", "Overseas customer purchases"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-2">
                  The transition from local visibility to broader market reach fundamentally changed the scale of the business. For a creative handmade brand, this shift was massive. The website became more than just a storefront. It became a gateway to global visibility.
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
              The Outcomes of Transformation
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
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold font-heading text-slate-800">
                  400% Growth in Sales Within 2 Years
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  One of the most impactful outcomes of the collaboration was the dramatic increase in sales. Within just two years:
                </p>
                <ul className="list-unstyled text-xs md:text-sm text-slate-650 font-bold">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600" />
                    <span>Sales increased by over 400%</span>
                  </li>
                </ul>
                <p className="text-slate-550 text-xs font-semibold pt-1">
                  The combination of: Better branding, Professional digital presence, Improved customer trust, Enhanced product presentation, SEO visibility, and Better shopping experience created consistent business growth.
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
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold font-heading text-slate-800">
                  Hobby Turned Into Profession
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  Perhaps the most meaningful transformation was personal. What started as a creative hobby gradually evolved into a serious professional business.
                </p>
                <p className="text-slate-650 text-xs md:text-sm font-semibold">
                  The website helped:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 font-medium">
                  {["Build business credibility", "Create consistent order flow", "Increase customer confidence", "Position the brand professionally", "Generate scalable opportunities"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-2 border-t border-slate-100">
                  This allowed the founder to transition from passion-based selling into running a growing full-time brand. That transformation goes far beyond numbers.
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
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold font-heading text-slate-800">
                  Expanded Customer Base
                </h3>
                <p className="text-slate-600 text-xs md:text-sm font-semibold">
                  Before:
                </p>
                <ul className="list-unstyled text-xs text-slate-550 font-medium">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                    <span>Orders mainly came from familiar circles</span>
                  </li>
                </ul>
                <p className="text-slate-600 text-xs md:text-sm font-semibold pt-1">
                  After:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Customers came from across India</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>New audiences discovered the brand organically</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>International orders started arriving</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>The customer base diversified significantly</span>
                  </li>
                </ul>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-2 border-t border-slate-100">
                  The business was finally reaching people who had never heard of the brand before.
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
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold font-heading text-slate-800">
                  Improved Brand Perception
                </h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                  The upgraded digital experience elevated the brand positioning entirely. The business started being perceived as:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-bold text-slate-650">
                  {["Professional", "Trustworthy", "Premium", "Established", "Scalable", "Modern"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed pt-2 border-t border-slate-100">
                  For creative brands, perception directly affects conversion rates. The stronger branding experience created higher buyer confidence and improved purchase intent.
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
                  Why This Project Matters
                </h3>
                <div className="w-12 h-1 bg-[#ea580c] rounded-full" />
                <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
                  Many small creative businesses underestimate the power of professional digital positioning. They believe: “If the product is good enough, people will eventually buy.”
                </p>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-md text-left space-y-4">
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed">
                  But in reality: Presentation influences trust. Trust influences conversions. Conversions influence growth. That’s why strategic design matters. At Dots & Coms, we specialize in helping businesses bridge the gap between:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-sm text-slate-600 font-semibold pt-2 border-t border-slate-50">
                  <span className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c]" />
                    <span>Creativity and scalability</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c]" />
                    <span>Passion and profitability</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ea580c]" />
                    <span>Talent and visibility</span>
                  </span>
                </div>
                <p className="text-slate-700 text-xs md:text-sm font-semibold pt-1">
                  Kiiara Kreations is a perfect example of that transformation.
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
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-850 tracking-tight leading-tight">
                  What Makes Dots & Coms Different
                </h3>
                <div className="w-12 h-1 bg-[#dc2626] rounded-full" />
                <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
                  Most agencies build websites. We build growth ecosystems.
                </p>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-md text-left space-y-4 lg:order-1">
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed">
                  Our approach combines: Strategic branding, Conversion-focused UI/UX, SEO-driven discoverability, Customer psychology, Premium visual storytelling, Performance optimization, and Long-term scalability.
                </p>
                <p className="text-slate-650 text-xs font-semibold">
                  Every project is engineered around measurable impact. Whether the goal is:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-slate-600 font-semibold border-t border-slate-50 pt-3">
                  {["More sales", "Better reach", "Higher engagement", "Stronger branding", "Improved conversions", "National visibility", "International expansion"].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 text-xs md:text-sm pt-2">
                  We build with growth in mind from day one. And we bring over 20+ years of combined industry experience into every digital experience we create.
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
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-850 tracking-tight leading-tight">
                  Final Outcome
                </h3>
                <div className="w-12 h-1 bg-[#dc2626] rounded-full" />
                <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
                  The collaboration between Dots & Coms and Kiiara Kreations demonstrates how the right digital strategy can completely transform a small creative business.
                </p>
              </div>

              <div className="lg:col-span-7 p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-md text-left space-y-4">
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  What began as a hobby-driven venture supported mostly by friends and family evolved into a professionally positioned brand with:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm text-slate-600 font-semibold border-t border-slate-50 pt-3">
                  {[
                    "Pan-India reach",
                    "International orders",
                    "Stronger credibility",
                    "Consistent growth",
                    "Increased conversions",
                    "Expanded visibility",
                    "400% sales growth in just two years"
                  ].map((item, idx) => (
                    <span key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
                <p className="text-slate-650 text-xs md:text-sm leading-relaxed pt-3 border-t border-slate-100">
                  Most importantly, the brand evolved from being a passion project into a real profession. That is the power of strategic branding, intelligent web design, and scalable digital growth.
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
                Ready to Turn Your Passion into a Global Venture?
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Let's discuss how we can build an optimized e-commerce engine, structure your product catalog, and craft a brand story that drives worldwide sales.
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
