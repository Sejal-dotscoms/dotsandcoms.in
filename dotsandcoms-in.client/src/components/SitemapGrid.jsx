import { Link } from "react-router-dom";
import { 
  Home, Monitor, Smartphone, Server, Shield, Globe, Layers, 
  BookOpen, HelpCircle, FileText, Mail, Phone, MapPin, ArrowRight, ExternalLink 
} from "lucide-react";

export default function SitemapGrid() {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-24">
      {/* Decorative Grid background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f030_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f030_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* Ambient mesh lights */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#dc2626]/2 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#ea580c]/2 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          
          {/* COLUMN 1: CORE PAGES & INFO */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
              <Layers className="h-5 w-5 text-[#dc2626]" />
              <h3 className="font-mono text-lg font-extrabold tracking-wider text-slate-800 uppercase">
                Core Navigation
              </h3>
            </div>

            {/* Home */}
            <div className="group rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <Link to="/" aria-label="Dots & Coms Agency Home Page Overview" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                <Home className="h-4 w-4" />
                <span>Home</span>
                <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
                          <p className="mt-3 text-xs leading-relaxed font-normal text-slate-500">
                              Dots & Coms is a website design and web development company in Vadodara, offering mobile app development, logo and graphics designing, digital marketing, and web hosting services. Our solutions help Gujarat and India-based businesses build a strong online presence with modern technologies and creative design.

              </p>
            </div>

            {/* About Us */}
            <div className="group rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <Link to="/about-web-development-company-baroda" aria-label="About Dots & Coms Web Development Company Vadodara" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                <Globe className="h-4 w-4" />
                <span>About Us</span>
                <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed font-normal text-slate-500">
                              Established in 1999, Dots & Coms is a Vadodara-based digital service provider trusted by businesses across Gujarat, India, and abroad. The web development and digital marketing company now serves clients across several countries worldwide.

              </p>
            </div>

            {/* Portfolio */}
            <div className="group rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <Link to="/website-mobile-app-development-company-portfolio-baroda" aria-label="Dots & Coms Web Design Portfolio & Case Studies" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                <Layers className="h-4 w-4" />
                <span>Portfolio</span>
                <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed font-normal text-slate-500">
                              Dots & Coms, a Vadodara-based website design and mobile app development company, delivers website design, web development, mobile applications, logo design, graphic design, and digital marketing projects for clients across Gujarat, India, and beyond.
              </p>
            </div>

            {/* Blogs */}
            <div className="group rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <Link to="/blogs" aria-label="Dots & Coms Technology and Business Blogs List" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                <FileText className="h-4 w-4" />
                <span>Blogs</span>
                <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed font-normal text-slate-500">
                Dots & Coms, a Vadodara-based website design and web development company, publishes expert articles on website designing, mobile app development, SEO optimization, web hosting, and digital marketing to help businesses across Gujarat and India build a successful online presence.
              </p>
            </div>

            {/* FAQs */}
            <div className="group rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <Link to="/faqs-web-design-hosting-digital-marketing" aria-label="Frequently Asked Questions Web Design and Hosting Page" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                <HelpCircle className="h-4 w-4" />
                <span>FAQs</span>
                <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed font-normal text-slate-500">
                              Dots & Coms, a Vadodara web design and web hosting company, answers common questions on website design, hosting, and digital marketing to help India-based businesses make informed decisions.

              </p>
            </div>

            {/* Webstories & Read More */}
            <div className="group space-y-4 rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <div>
                <Link to="/web-stories" aria-label="Dots & Coms Interactive Web Stories Gallery" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                  <BookOpen className="h-4 w-4" />
                  <span>Webstories</span>
                  <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </div>
              <div className="border-t border-slate-100 pt-2">
                <a 
                  href="https://sites.google.com/view/web-design-hosting-company/home?authuser=0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Read More about Web Design and Hosting on Google Sites"
                  className="inline-flex items-center space-x-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-all hover:border-[#dc2626] hover:bg-[#dc2626] hover:text-white"
                >
                  <span>Read More</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* COLUMN 2: SERVICES & DIVISIONS */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
              <Monitor className="h-5 w-5 text-[#dc2626]" />
              <h3 className="font-mono text-lg font-extrabold tracking-wider text-slate-800 uppercase">
                Services & Solutions
              </h3>
            </div>

            {/* Website Designing */}
            <div className="group rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <Link to="/responsive-website-designing-company-vadodara" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                <Monitor className="h-4 w-4" />
                <span>Website Designing</span>
                <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed font-normal text-slate-500">
                              Web design is an art that combines creativity with functionality. As a website design company in Vadodara, our designers create professional, visually appealing websites that represent your brand effectively.

              </p>
            </div>

            {/* Mobile Apps */}
            <div className="group rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <Link to="/android-ios-mobile-app-development-company-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                <Smartphone className="h-4 w-4" />
                <span>iOS & Android Mobile Apps</span>
                <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed font-normal text-slate-500">
                              As a mobile app development company in Baroda, we provide iOS and Android app design and development services for businesses and startups. Our team handles complete UI design, development, testing, and deployment.

              </p>
            </div>

            {/* Digital Marketing */}
            <div className="group rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <Link to="/organic-seo-ppc-digital-marketing-vadodara" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                <Globe className="h-4 w-4" />
                <span>Digital Marketing</span>
                <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed font-normal text-slate-500">
                              Dots & Coms, a digital marketing agency in Vadodara, uses online marketing strategies to promote businesses across India. Services include email marketing, pay-per-click advertising, search engine optimization, and social media marketing.

              </p>
            </div>

            {/* Free Website Audit */}
            <div className="group rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <Link to="/free-seo-performance-website-audit" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                <Shield className="h-4 w-4" />
                <span>Free Website Audit & SEO</span>
                <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed font-normal text-slate-500">
                Request a comprehensive free website audit report to evaluate page speed, Core Web Vitals, technical SEO, mobile responsiveness, and dead links within 48 hours.
              </p>
            </div>

            {/* Case Studies */}
            <div className="space-y-6 rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm">
              <div className="border-b border-slate-100 pb-3">
                <h4 className="font-mono text-sm font-black tracking-wider text-[#dc2626] uppercase">
                  Case Studies
                </h4>
                <p className="mt-2 text-xs leading-relaxed font-normal text-slate-500">
                  Explore our case studies to discover how Dots & Coms has helped businesses achieve digital growth.
                </p>
              </div>

              <div className="space-y-4">
                {/* Accutech */}
                <div className="space-y-1">
                  <Link 
                    to="/accutechlabels-case-study-traditional-to-web-business" 
                    className="inline-flex items-center gap-1 font-bold text-[13px] text-slate-800 transition-colors duration-200 hover:text-[#dc2626]"
                  >
                    <span>Accutech Labels Case Study</span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </Link>
                  <p className="leading-relaxed text-slate-400 text-[11px]">
                    Transitioning from a traditional offline business model to a modern digital presence.
                  </p>
                </div>

                {/* 1Life */}
                <div className="space-y-1">
                  <Link 
                    to="/1life-case-study-of-regional-to-national-reach" 
                    className="inline-flex items-center gap-1 font-bold text-[13px] text-slate-800 transition-colors duration-200 hover:text-[#dc2626]"
                  >
                    <span>1Life Case Study</span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </Link>
                  <p className="leading-relaxed text-slate-400 text-[11px]">
                    Expanding from a regional business into a nationally recognized brand.
                  </p>
                </div>

                {/* Kiara */}
                <div className="space-y-1">
                  <Link 
                    to="/hobby-goes-global-case-study" 
                    className="inline-flex items-center gap-1 font-bold text-[13px] text-slate-800 transition-colors duration-200 hover:text-[#dc2626]"
                  >
                    <span>Kiara Kreations Case Study</span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </Link>
                  <p className="leading-relaxed text-slate-400 text-[11px]">
                    Transforming a passion-driven handmade business into a global digital brand.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 3: WEB HOSTING & CONTACT */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
              <Server className="h-5 w-5 text-[#dc2626]" />
              <h3 className="font-mono text-lg font-extrabold tracking-wider text-slate-800 uppercase">
                Hosting & Security
              </h3>
            </div>

            {/* Web Hosting */}
            <div className="group space-y-4 rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <div>
                <Link to="/windows-web-hosting-service-provider-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                  <Server className="h-4 w-4" />
                  <span>Website Hosting</span>
                  <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
                <p className="mt-2 text-xs leading-relaxed font-normal text-slate-500">
                                  Shared hosting from our Vadodara-based web hosting company is a practical choice for most businesses, offering reliable performance at an affordable cost.
                                  <br />
                                  Windows Hosting Supports websites requiring Microsoft technologies like ASP.NET and MSSQL databases.

                </p>
              </div>
              
              <div className="space-y-1 border-l-2 border-slate-100 pl-4 transition-colors duration-300 group-hover:border-red-100">
                <h5 className="font-bold text-[13px] text-slate-800">Windows Hosting</h5>
                <p className="leading-relaxed text-slate-400 text-[11px]">
                  Supports websites requiring Microsoft technologies like ASP.NET and MSSQL databases.
                </p>
              </div>
            </div>

            {/* VPS Hosting */}
            <div className="group space-y-4 rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <div>
                <Link to="/windows-web-hosting-service-provider-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                  <Server className="h-4 w-4" />
                  <span>VPS Hosting</span>
                  <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
                <p className="mt-2 text-xs leading-relaxed font-normal text-slate-500">
                                  Our Gujarat-based VPS hosting provides dedicated resources, RAM and CPU, for scalability.


                </p>
              </div>

              <div className="space-y-3 border-l-2 border-slate-100 pl-4 transition-colors duration-300 group-hover:border-red-100">
                <div className="space-y-0.5">
                  <h5 className="font-bold text-[13px] text-slate-800">VPS Server - Windows</h5>
                  <p className="leading-relaxed text-slate-400 text-[11px]">
                                     Reliable environment for running Windows-based apps with flexible management.

                  </p>
                </div>
                <div className="space-y-0.5">
                  <h5 className="font-bold text-[13px] text-slate-800">VPS Server - Linux</h5>
                  <p className="leading-relaxed text-slate-400 text-[11px]">
                                      Affordable and powerful platform supporting open-source configurations.
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated Servers */}
            <div className="group space-y-4 rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <div>
                <Link to="/windows-web-hosting-service-provider-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                  <Server className="h-4 w-4" />
                  <span>Dedicated Servers</span>
                  <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
                <p className="mt-2 text-xs leading-relaxed font-normal text-slate-500">
                                  Our Vadodara dedicated server hosting provides exclusive server resources for a single client or application.

                </p>
              </div>

              <div className="space-y-3 border-l-2 border-slate-100 pl-4 transition-colors duration-300 group-hover:border-red-100">
                <div className="space-y-0.5">
                  <h5 className="font-bold text-[13px] text-slate-800">Self-Managed</h5>
                  <p className="leading-relaxed text-slate-400 text-[11px]">
                                      Gives users complete administrative control over server setups and updates.
                  </p>
                </div>
                <div className="space-y-0.5">
                                  <h5 className="font-bold text-[13px] text-slate-800">Managed</h5>
                                  <p className="leading-relaxed text-slate-400 text-[11px]">
                                      Self-Managed Gives users complete administrative control over server setups and updates.Managed Updates, monitoring, and server maintenance handled by technical experts.

                  </p>
                </div>
              </div>
            </div>

            {/* SSL Certificate */}
            <div className="group rounded-2xl border border-slate-100/80 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:shadow-md">
              <Link to="/windows-web-hosting-service-provider-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 transition-colors duration-200 group-hover:text-[#dc2626]">
                <Shield className="h-4 w-4" />
                <span>SSL Certificate</span>
                <ArrowRight className="h-4 w-4 translate-x-[-4px] opacity-0 transition-opacity duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
              <p className="mt-3 text-xs leading-relaxed font-normal text-slate-500">
                              As an SSL certificate provider in Vadodara, we encrypt data between the user and server. Implementing HTTPS improves security, protects customer transactions, and increases visitor trust.

              </p>
            </div>

          </div>

        </div>

        {/* CONTACT INFO FOOTER SECTION */}
        <div className="mt-16 grid grid-cols-1 items-start gap-8 rounded-3xl border border-slate-100/80 bg-white p-8 text-left shadow-sm lg:grid-cols-12">
          
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center space-x-2.5">
              <Mail className="h-5 w-5 text-[#dc2626]" />
              <h4 className="font-heading text-base font-black text-slate-900">
                Contact Us
              </h4>
            </div>
            <div className="space-y-1">
              <h5 className="font-mono text-sm font-extrabold text-[#dc2626]">Dots & Coms</h5>
              <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                <span>
                  201, Senate Square Tower B,<br />
                  Nr. Yash Complex, Gotri Road,<br />
                  Vadodara 390 021, Gujarat, India.
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-3 lg:col-span-4 lg:pt-8">
            <p className="flex items-center gap-2 text-xs text-slate-500">
              <Phone className="h-4 w-4 text-slate-400" />
              <span className="font-semibold text-slate-700">Contact Nos:</span>
            </p>
            <div className="space-y-1.5 pl-6">
              <a href="tel:+91 8469332448" className="block text-xs font-bold text-slate-800 transition-colors duration-200 hover:text-[#dc2626]">
                +91 84693 32448
              </a>
              <a href="tel:+919925072327" className="block text-xs font-bold text-slate-800 transition-colors duration-200 hover:text-[#dc2626]">
                +91 99250 72327
              </a>
            </div>
          </div>

          <div className="space-y-3 lg:col-span-4 lg:pt-8">
            <p className="text-slate-550 flex items-center gap-2 text-xs">
              <Mail className="h-4 w-4 text-slate-400" />
              <span className="font-semibold text-slate-700">Email Addresses:</span>
            </p>
            <div className="space-y-1.5 pl-6">
              <a href="mailto:contact@dotsandcoms.in" className="block text-xs font-bold text-slate-800 transition-colors duration-200 hover:text-[#dc2626]">
                contact@dotsandcoms.in
              </a>
              <a href="mailto:parul@dotscoms.com" className="block text-xs font-bold text-slate-800 transition-colors duration-200 hover:text-[#dc2626]">
                parul@dotscoms.com
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
