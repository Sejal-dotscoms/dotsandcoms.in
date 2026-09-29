import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, TrendingUp, Target, Lightbulb, 
  ChevronRight, ArrowUpRight, Globe, Shield, Factory, 
  Cog, Wrench, Users, PhoneCall, Star, Building2, Cpu, HelpCircle, Layers, Mail
} from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { Link } from "react-router-dom";
import { setPageSEO } from "../utils/seo";
import { getRouteSEO } from "../seo/publicRoutes";

// Image imports
import imgBanner from "../assets/images/himile-india-case-study-banner.jpg";

export default function HimileIndiaCaseStudyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO(getRouteSEO("/himile-india-case-study-global-manufacturing-digital-voice"));
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
        title="Case Study: Himile India"
        subtitle="Giving a Global Manufacturing Giant a Digital Voice: The Himile India Story"
        breadcrumbs={[
          { label: "Himile India Case Study" }
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
                // MULTINATIONAL INDUSTRIAL CORPORATE WEBSITE
              </span>
              <h2 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-slate-800 md:text-4xl">
                How Dots and Coms Helped Himile India Communicate Complex Technology, Multiple Businesses, and Global Capabilities Clearly
              </h2>
              
              {/* Mobile Only Image */}
              <div className="my-6 w-full overflow-hidden rounded-2xl border border-slate-100 shadow-xl lg:hidden">
                <img 
                  src={imgBanner} 
                  alt="Himile India Corporate Website Design & Industrial Branding Case Study Mobile Mockup" 
                  className="h-auto w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="1024"
                />
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-slate-600 md:text-base">
                <p>
                  Designing a website for a small business is one thing. Designing a website for a multinational industrial group is an entirely different challenge.
                </p>
                <p className="font-semibold text-slate-800">
                  The website has to look impressive, communicate credibility, explain highly technical products, speak to different industries and decision-makers, and make a very large organization easy to understand.
                </p>
                <p>
                  That was the challenge when Dots and Coms worked with <strong>Himile India</strong>.
                </p>
                <p>
                  <strong>Himile India</strong> is part of Himile Group, a major international industrial group established in 1995 and operating across a wide range of high-end mechanical and industrial businesses. The group serves global customers across more than 80 countries, maintaining long-term relationships with numerous Fortune 500 corporations.
                </p>
                <p className="border-l-4 border-[#dc2626] py-1 pl-4 font-medium italic text-slate-800">
                  Incorporated in 2016 in Vadodara, Himile India started with tire mold manufacturing and expanded into additional high-tech verticals including CNC machine tools, compressors, and heat exchangers.
                </p>
                <p className="font-bold text-slate-900">
                  The central challenge: How do you explain all of this complex technology without overwhelming the visitor?
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
                  alt="Himile India Corporate Website Design & Industrial Digital Transformation Desktop Mockup" 
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
              <span className="block font-mono text-2xl font-black text-[#dc2626] md:text-3xl">2016</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Established in India</span>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-5 text-center shadow-sm">
              <span className="block font-mono text-2xl font-black text-[#dc2626] md:text-3xl">3,874+</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Molds Manufactured</span>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-5 text-center shadow-sm">
              <span className="block font-mono text-2xl font-black text-[#dc2626] md:text-3xl">400+</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Workforce Professionals</span>
            </div>
            <div className="rounded-xl border border-slate-200/60 bg-white p-5 text-center shadow-sm">
              <span className="block font-mono text-2xl font-black text-[#dc2626] md:text-3xl">80+</span>
              <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-slate-500">Global Countries Exported</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            <motion.div className="space-y-6 lg:col-span-6" {...fadeInUp}>
              <span className="font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase">
                // THE CHALLENGE
              </span>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
                The Challenge Was Bigger Than Website Design
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-slate-600 md:text-base">
                <p>
                  At first glance, a website project can sound simple: <em>"We need a modern corporate website."</em> But for a company like Himile, the real requirement was far more complex.
                </p>
                <p>
                  Himile India operates across multiple business verticals:
                </p>
                <ul className="space-y-2 font-medium text-slate-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#dc2626]" />
                    <span>Tire Molds Manufacturing (PCR, LTR, TBR, 2-Wheeler, Solid Industrial)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#dc2626]" />
                    <span>CNC Machine Tools & Precision Machining</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#dc2626]" />
                    <span>Compressors (Diaphragm, Reciprocating, Centrifugal)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#dc2626]" />
                    <span>Heat Exchangers & Industrial Energy Solutions</span>
                  </li>
                </ul>
                <p>
                  Each vertical has completely different products, specifications, and target industries. A tire manufacturer looking for tire molds does not need to read about compressors. An engineering team evaluating CNC machine tools has distinct requirements from a client sourcing heat exchangers.
                </p>
                <p className="font-semibold text-slate-800">
                  The website therefore needed to work almost like a digital corporate ecosystem, guiding diverse visitors to exact solutions seamlessly.
                </p>
              </div>
            </motion.div>

            {/* Vertical Cards */}
            <motion.div className="lg:col-span-6" {...fadeInUp}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:border-red-200 hover:bg-white hover:shadow-md">
                  <Factory className="mb-3 h-8 w-8 text-[#dc2626]" />
                  <h3 className="font-heading text-base font-bold text-slate-800">Tire Molds</h3>
                  <p className="mt-1 text-xs text-slate-500">Segmented & 2-piece tire molds for PCR, LTR, TBR, and solid industrial tires.</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:border-red-200 hover:bg-white hover:shadow-md">
                  <Cpu className="mb-3 h-8 w-8 text-[#dc2626]" />
                  <h3 className="font-heading text-base font-bold text-slate-800">CNC Machine Tools</h3>
                  <p className="mt-1 text-xs text-slate-500">High-precision CNC equipment engineered for demanding manufacturing standards.</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:border-red-200 hover:bg-white hover:shadow-md">
                  <Cog className="mb-3 h-8 w-8 text-[#dc2626]" />
                  <h3 className="font-heading text-base font-bold text-slate-800">Compressors</h3>
                  <p className="mt-1 text-xs text-slate-500">Advanced diaphragm, reciprocating, and centrifugal compressor technologies.</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-all hover:border-red-200 hover:bg-white hover:shadow-md">
                  <Wrench className="mb-3 h-8 w-8 text-[#dc2626]" />
                  <h3 className="font-heading text-base font-bold text-slate-800">Heat Exchangers</h3>
                  <p className="mt-1 text-xs text-slate-500">Industrial heat exchangers built for critical chemical, oil, and gas applications.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Information Architecture & Content Strategy Section */}
      <section className="relative border-t border-slate-100 bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div className="mx-auto max-w-3xl text-center space-y-4" {...fadeInUp}>
            <span className="font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase">
              // CONTENT & STRATEGY
            </span>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
              The Most Important Part Was Not the Design — It Was Guiding Content Page by Page
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              One of the biggest contributions Dots and Coms made was something visitors may never consciously notice: <strong>We helped determine what each page should say.</strong>
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex items-center space-x-2 rounded-lg bg-red-50 px-3 py-1.5 font-mono text-xs font-bold text-[#dc2626]">
                <HelpCircle className="h-4 w-4" />
                <span>The Engineering Dilemma</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-800">Translating Technical Knowledge into Clarity</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                When a company possesses vast internal engineering knowledge, team members often struggle to decide what information an outside visitor actually needs. Engineers want to explain everything, marketing wants to highlight everything, and management wants to showcase scale.
              </p>
              <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs space-y-2 font-medium text-slate-700">
                <p className="font-bold text-slate-900">Customers come asking 6 fundamental questions:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>What do you make?</li>
                  <li>Can you solve my specific problem?</li>
                  <li>Do you have experience in my industry?</li>
                  <li>Why should I trust your engineering?</li>
                  <li>What are your exact manufacturing capabilities?</li>
                  <li>How can I reach the right contact person directly?</li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex items-center space-x-2 rounded-lg bg-red-50 px-3 py-1.5 font-mono text-xs font-bold text-[#dc2626]">
                <Target className="h-4 w-4" />
                <span>Page-by-Page Guidance</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-800">Structured Customer Journeys</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                We worked methodically page by page, defining page objectives, immediate visual priorities, technical specification depth, and primary conversion paths.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-slate-100 p-4 bg-slate-50 text-xs">
                  <span className="font-bold text-slate-900">Tire Molds Architecture:</span> Defined PCR, LTR, TBR, 2-wheeler, and solid tire molds across segmented and 2-piece formats with material selections.
                </div>
                <div className="rounded-xl border border-slate-100 p-4 bg-slate-50 text-xs">
                  <span className="font-bold text-slate-900">Compressors Architecture:</span> Separated diaphragm, reciprocating, and centrifugal compressors into clear application-driven sub-sections.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Scale + Local Strength & Multi-Audience Features */}
      <section className="relative bg-slate-900 py-16 text-white md:py-24">
        <div className="pointer-events-none absolute top-1/2 left-1/4 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#dc2626]/10 blur-[160px]" />
        
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <motion.div className="mx-auto mb-16 max-w-3xl text-center" {...fadeInUp}>
            <span className="font-mono text-xs font-bold tracking-widest text-red-400 uppercase">
              // BALANCING SCALE & USER EXPERIENCE
            </span>
            <h2 className="font-heading mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Building the Story of a Global Organization with Smart UX
            </h2>
            <p className="mt-4 text-slate-300 text-sm md:text-base">
              Himile India needed to present two truths simultaneously: Being a strong local manufacturing facility in Vadodara, and being backed by a global industrial power serving Fortune 500 companies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Global Heritage & Credibility</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
                Integrated group-wide international reach (80+ countries, Fortune 500 relationships) to build immediate confidence for international and domestic procurement teams.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Vertical Contact Routing</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
                Instead of a generic inquiry form, contact options are route-segmented by business vertical (Heat Exchangers, Compressors, Tire Molds, CNC Tools) for direct engineer communication.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-8 backdrop-blur-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Multi-Audience Portals</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
                Dedicated sections built for prospective buyers, job seekers (careers portal), business partners, suppliers, and industrial researchers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where Dots and Coms' Experience Made a Difference */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-red-50/30 p-8 shadow-xl md:p-14">
            <div className="mx-auto max-w-4xl text-left space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full border border-red-300 bg-red-50 px-4 py-1.5 text-xs font-bold text-[#dc2626]">
                <Star className="h-4 w-4 fill-red-500 text-red-500" />
                <span>25+ Years of Web Engineering Experience (Since 1999)</span>
              </div>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
                Where Dots and Coms' Experience Made the Difference
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                Projects like Himile demonstrate why website development is not simply about knowing how to code or creating attractive layouts — it requires deep industry experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Active Sitemap Guidance</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We don't expect clients to arrive with a finished sitemap or perfectly structured content. We guide them step by step.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Industrial Product Comprehension</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We take time to understand complex manufacturing processes, technical specs, and buyer intentions before designing.
                  </p>
                </div>
              </div>
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
            A Great Corporate Website Does Not Begin With Design. It Begins With Understanding.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            For a multinational manufacturing organization like Himile, structured clarity turns engineering complexity into visitor trust. We helped turn multiple industrial businesses into a seamless, logical digital journey.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
              className="inline-flex items-center space-x-2 rounded-full bg-[#dc2626] px-8 py-4 font-heading text-sm font-extrabold uppercase tracking-wider text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-700 hover:shadow-red-500/40"
            >
              <span>Build Your Corporate Website</span>
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
