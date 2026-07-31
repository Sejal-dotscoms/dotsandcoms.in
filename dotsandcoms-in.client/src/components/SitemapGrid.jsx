import { Link } from "react-router-dom";
import { 
  Home, Monitor, Smartphone, Server, Shield, Globe, Layers, 
  BookOpen, HelpCircle, FileText, Mail, Phone, MapPin, ArrowRight, ExternalLink 
} from "lucide-react";

export default function SitemapGrid() {
  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f030_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f030_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none -z-10" />

      {/* Ambient mesh lights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#dc2626]/2 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ea580c]/2 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* COLUMN 1: CORE PAGES & INFO */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
              <Layers className="w-5 h-5 text-[#dc2626]" />
              <h3 className="text-lg font-extrabold uppercase tracking-wider text-slate-800 font-mono">
                Core Navigation
              </h3>
            </div>

            {/* Home */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left">
              <Link to="/" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                <Home className="w-4 h-4" />
                <span>Home</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
              </Link>
              <p className="mt-3 text-slate-500 text-xs leading-relaxed font-normal">
                We provide services related to website design, responsive website development, mobile app development, logo and graphics designing, digital marketing, and web hosting in Vadodara. Our solutions help businesses build a strong online presence with modern technologies and creative design.
              </p>
            </div>

            {/* About Us */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left">
              <Link to="/about-web-development-company-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                <Globe className="w-4 h-4" />
                <span>About Us</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
              </Link>
              <p className="mt-3 text-slate-500 text-xs leading-relaxed font-normal">
                Established in 1999, Dots & Coms has grown into a trusted digital service provider. The company now operates in several countries and serves many satisfied clients around the world.
              </p>
            </div>

            {/* Portfolio */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left">
              <Link to="/website-mobile-app-development-company-portfolio-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                <Layers className="w-4 h-4" />
                <span>Portfolio</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
              </Link>
              <p className="mt-3 text-slate-500 text-xs leading-relaxed font-normal">
                Our portfolio showcases the work we have completed for clients in website design, web development, mobile applications, logo design, graphic design, and digital marketing. These projects highlight our creativity and technical expertise.
              </p>
            </div>

            {/* FAQs */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left">
              <Link to="/faqs-web-design-hosting-digital-marketing" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                <HelpCircle className="w-4 h-4" />
                <span>FAQs</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
              </Link>
              <p className="mt-3 text-slate-500 text-xs leading-relaxed font-normal">
                This section provides answers to frequently asked questions about web design, web hosting, and digital marketing services offered by Dots & Coms.
              </p>
            </div>

            {/* Webstories & Read More */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left space-y-4">
              <div>
                <Link to="/web-stories" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                  <BookOpen className="w-4 h-4" />
                  <span>Webstories</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
                </Link>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <a 
                  href="https://sites.google.com/view/web-design-hosting-company/home?authuser=0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full border border-slate-200 hover:border-[#dc2626] hover:bg-[#dc2626] hover:text-white transition-all text-xs font-bold text-slate-600"
                >
                  <span>Read More</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* COLUMN 2: SERVICES & DIVISIONS */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
              <Monitor className="w-5 h-5 text-[#dc2626]" />
              <h3 className="text-lg font-extrabold uppercase tracking-wider text-slate-800 font-mono">
                Services & Solutions
              </h3>
            </div>

            {/* Website Designing */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left">
              <Link to="/responsive-website-designing-company-vadodara" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                <Monitor className="w-4 h-4" />
                <span>Website Designing</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
              </Link>
              <p className="mt-3 text-slate-500 text-xs leading-relaxed font-normal">
                Web design is an art that combines creativity with functionality. Our web designers create professional and visually appealing websites that represent your brand effectively.
              </p>
            </div>

            {/* Mobile Apps */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left">
              <Link to="/android-ios-mobile-app-development-company-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                <Smartphone className="w-4 h-4" />
                <span>iOS & Android Mobile Apps</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
              </Link>
              <p className="mt-3 text-slate-500 text-xs leading-relaxed font-normal">
                We provide iOS and Android mobile application design and development services for businesses and startups. Our team handles the complete UI design, development, testing, and deployment.
              </p>
            </div>

            {/* Digital Marketing */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left">
              <Link to="/organic-seo-ppc-digital-marketing-vadodara" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                <Globe className="w-4 h-4" />
                <span>Digital Marketing</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
              </Link>
              <p className="mt-3 text-slate-500 text-xs leading-relaxed font-normal">
                Digital marketing includes online marketing strategies used to promote businesses on the internet. Services may include email marketing, pay-per-click advertising, search engine optimization, and social media marketing.
              </p>
            </div>

            {/* Case Studies */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm text-left space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h4 className="text-sm font-black uppercase tracking-wider text-[#dc2626] font-mono">
                  Case Studies
                </h4>
                <p className="mt-2 text-slate-500 text-xs leading-relaxed font-normal">
                  Explore our case studies to discover how Dots & Coms has helped businesses achieve digital growth.
                </p>
              </div>

              <div className="space-y-4">
                {/* Accutech */}
                <div className="space-y-1">
                  <Link 
                    to="/accutechlabels-case-study-traditional-to-web-business" 
                    className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-800 hover:text-[#dc2626] transition-colors duration-200"
                  >
                    <span>Accutech Labels Case Study</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Link>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Transitioning from a traditional offline business model to a modern digital presence.
                  </p>
                </div>

                {/* 1Life */}
                <div className="space-y-1">
                  <Link 
                    to="/1life-case-study-of-regional-to-national-reach" 
                    className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-800 hover:text-[#dc2626] transition-colors duration-200"
                  >
                    <span>1Life Case Study</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Link>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Expanding from a regional business into a nationally recognized brand.
                  </p>
                </div>

                {/* Kiara */}
                <div className="space-y-1">
                  <Link 
                    to="/hobby-goes-global-case-study" 
                    className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-800 hover:text-[#dc2626] transition-colors duration-200"
                  >
                    <span>Kiara Kreations Case Study</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </Link>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Transforming a passion-driven handmade business into a global digital brand.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 3: WEB HOSTING & CONTACT */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
              <Server className="w-5 h-5 text-[#dc2626]" />
              <h3 className="text-lg font-extrabold uppercase tracking-wider text-slate-800 font-mono">
                Hosting & Security
              </h3>
            </div>

            {/* Web Hosting */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left space-y-4">
              <div>
                <Link to="/windows-web-hosting-service-provider-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                  <Server className="w-4 h-4" />
                  <span>Website Hosting</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
                </Link>
                <p className="mt-2 text-slate-500 text-xs leading-relaxed font-normal">
                  Shared hosting is a practical choice for most businesses because it offers reliable performance at an affordable cost.
                </p>
              </div>
              
              <div className="pl-4 border-l-2 border-slate-100 group-hover:border-red-100 transition-colors duration-300 space-y-1">
                <h5 className="text-[13px] font-bold text-slate-800">Windows Hosting</h5>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Supports websites requiring Microsoft technologies like ASP.NET and MSSQL databases.
                </p>
              </div>
            </div>

            {/* VPS Hosting */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left space-y-4">
              <div>
                <Link to="/windows-web-hosting-service-provider-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                  <Server className="w-4 h-4" />
                  <span>VPS Hosting</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
                </Link>
                <p className="mt-2 text-slate-500 text-xs leading-relaxed font-normal">
                  Virtual Private Server hosting provides dedicated resources RAM and CPU for scalability.
                </p>
              </div>

              <div className="pl-4 border-l-2 border-slate-100 group-hover:border-red-100 transition-colors duration-300 space-y-3">
                <div className="space-y-0.5">
                  <h5 className="text-[13px] font-bold text-slate-800">VPS Server - Windows</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Reliable environment for running Windows-based apps with flexible management.
                  </p>
                </div>
                <div className="space-y-0.5">
                  <h5 className="text-[13px] font-bold text-slate-800">VPS Server - Linux</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Affordable and powerful platform supporting open-source configurations.
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated Servers */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left space-y-4">
              <div>
                <Link to="/windows-web-hosting-service-provider-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                  <Server className="w-4 h-4" />
                  <span>Dedicated Servers</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
                </Link>
                <p className="mt-2 text-slate-500 text-xs leading-relaxed font-normal">
                  Dedicated servers provide exclusive server resources for a single client or application.
                </p>
              </div>

              <div className="pl-4 border-l-2 border-slate-100 group-hover:border-red-100 transition-colors duration-300 space-y-3">
                <div className="space-y-0.5">
                  <h5 className="text-[13px] font-bold text-slate-800">Self-Managed</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Gives users complete administrative control over server setups and updates.
                  </p>
                </div>
                <div className="space-y-0.5">
                  <h5 className="text-[13px] font-bold text-slate-800">Managed</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Updates, monitoring, and server maintenance handled by technical experts.
                  </p>
                </div>
              </div>
            </div>

            {/* SSL Certificate */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-all duration-300 text-left">
              <Link to="/windows-web-hosting-service-provider-baroda" className="inline-flex items-center gap-1.5 text-base font-extrabold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-200">
                <Shield className="w-4 h-4" />
                <span>SSL Certificate</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 duration-200" />
              </Link>
              <p className="mt-3 text-slate-500 text-xs leading-relaxed font-normal">
                SSL digital security certificates encrypt data between the user and server. Implementing HTTPS improves security, protects customer transactions, and increases visitor trust.
              </p>
            </div>

          </div>

        </div>

        {/* CONTACT INFO FOOTER SECTION */}
        <div className="mt-16 bg-white p-8 rounded-3xl border border-slate-100/80 shadow-sm text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <Mail className="w-5 h-5 text-[#dc2626]" />
              <h4 className="text-base font-black text-slate-900 font-heading">
                Contact Us
              </h4>
            </div>
            <div className="space-y-1">
              <h5 className="text-sm font-extrabold text-[#dc2626] font-mono">Dots & Coms</h5>
              <p className="text-xs text-slate-500 leading-relaxed flex items-start gap-2 mt-2">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  201, Senate Square Tower B,<br />
                  Nr. Yash Complex, Gotri Road,<br />
                  Vadodara 390 021, Gujarat, India.
                </span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3 lg:pt-8">
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-700">Contact Nos:</span>
            </p>
            <div className="pl-6 space-y-1.5">
              <a href="tel:+91 8469332448" className="block text-xs font-bold text-slate-800 hover:text-[#dc2626] transition-colors duration-200">
                +91 84693 32448
              </a>
              <a href="tel:+919925072327" className="block text-xs font-bold text-slate-800 hover:text-[#dc2626] transition-colors duration-200">
                +91 99250 72327
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3 lg:pt-8">
            <p className="text-xs text-slate-550 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-700">Email Addresses:</span>
            </p>
            <div className="pl-6 space-y-1.5">
              <a href="mailto:contact@dotsandcoms.in" className="block text-xs font-bold text-slate-800 hover:text-[#dc2626] transition-colors duration-200">
                contact@dotsandcoms.in
              </a>
              <a href="mailto:parul@dotscoms.com" className="block text-xs font-bold text-slate-800 hover:text-[#dc2626] transition-colors duration-200">
                parul@dotscoms.com
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
