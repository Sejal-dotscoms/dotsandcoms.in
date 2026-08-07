import Logo from "./Logo";
import { Mail, Phone, MapPin } from "lucide-react";
import logoImg from "../assets/images/dots-and-coms-logo.webp";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-[#0b0f19] text-slate-400 pt-14 pb-8 relative overflow-hidden"
      style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.01) 0px, rgba(255, 255, 255, 0.01) 1px, transparent 1px, transparent 12px)
        `,
        backgroundSize: '100% 100%'
      }}
    >
      {/* Glowing top accent border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500/30 via-orange-500/50 to-yellow-500/30" />

      {/* Tech lines decoration */}
      <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-[1.2] fill-none pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <path d="M-50 40h150l30 30h250l20-20h150" />
        <path d="M200 120h100l20 20h200" />
        <circle cx="100" cy="40" r="2.5" className="fill-[#dc2626]/30 stroke-none" />
        <circle cx="380" cy="70" r="2.5" className="fill-[#ea580c]/30 stroke-none" />
      </svg>

      {/* Watermark logo in the background */}
      <div className="absolute right-[6%] bottom-[8%] w-[260px] md:w-[330px] opacity-[0.045] pointer-events-none select-none -z-10 transform -rotate-6 filter brightness-0 invert">
        <img src={logoImg} alt="Dots & Coms Logo - Professional Website Design and Mobile App Development Company in Vadodara" className="w-full h-auto object-contain" loading="lazy" width="94" height="98" />
      </div>

      {/* Glowing gradient mesh accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#dc2626]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#ea580c]/4 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 text-left">
        
        {/* Column 1: Info */}
        <div className="lg:col-span-3 space-y-3">
          <Link to="/" className="flex items-center">
            <div className="brightness-110">
              <Logo size="lg" />
            </div>
          </Link>

          <div className="space-y-2.5 mt-6">
            <div className="flex items-start space-x-2 text-[14px]">
              <Mail className="w-3.5 h-3.5 text-[#dc2626] mt-0.5 flex-shrink-0" />
              <div className="flex flex-col space-y-1 leading-tight">
                <a href="mailto:parul@dotscoms.com" className="text-slate-300 hover:text-[#dc2626] transition-colors duration-300">parul@dotscoms.com</a>
                <a href="mailto:contact@dotsandcoms.in" className="text-slate-300 hover:text-[#dc2626] transition-colors duration-300">contact@dotsandcoms.in</a>
              </div>
            </div>
            <div className="flex items-start space-x-2 text-[14px]">
              <Phone className="w-3.5 h-3.5 text-[#dc2626] mt-0.5 flex-shrink-0" />
              <div className="flex flex-col space-y-1 leading-tight">
                <a href="tel:+918469332448" className="text-slate-300 hover:text-[#dc2626] transition-colors duration-300">+91 84693 32448</a>
                <a href="tel:+919925072327" className="text-slate-300 hover:text-[#dc2626] transition-colors duration-300">+91 99250 72327</a>
              </div>
            </div>
            <div className="flex items-start space-x-2 text-[14px]">
              <MapPin className="w-3.5 h-3.5 text-[#dc2626] mt-0.5 flex-shrink-0" />
              <div className="flex flex-col space-y-0.5 text-slate-300 leading-tight">
                <span className="font-semibold text-slate-100">Dots and Coms</span>
                <span>201, Senate Square Tower B,</span>
                <span>Nr. Yash Complex, Gotri Road,</span>
                <span>Vadodara 390021, Gujarat, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Company & Quick Links */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <div>
            <h4 className="text-slate-100 font-bold font-heading text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link to="/#hero" aria-label="Dots and Coms Main Homepage" title="Dots and Coms Homepage" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Home Page</Link>
              </li>
              <li>
                <Link to="/#about" aria-label="About Dots and Coms Web Development Company" title="About Dots and Coms" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">About Us</Link>
              </li>
              <li>
                <Link to="/website-mobile-app-development-company-portfolio-baroda" aria-label="Our Web Design and App Development Portfolio" title="Our Work Portfolio" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Our Portfolio & Work</Link>
              </li>
              <li>
                <Link to="/accutechlabels-case-study-traditional-to-web-business" aria-label="Accutech Labels B2B E-Commerce Case Study" title="Accutech Case Study" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Accutech Case Study</Link>
              </li>
              <li>
                <Link to="/1life-case-study-of-regional-to-national-reach" aria-label="1Life NGO National SEO Expansion Case Study" title="1Life Case Study" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">1Life NGO Case Study</Link>
              </li>
              <li>
                <Link to="/hobby-goes-global-case-study" aria-label="Kiiara Kreations Global E-Commerce Case Study" title="Kiiara Case Study" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Kiiara Case Study</Link>
              </li>
              <li>
                <Link to="/faqs-web-design-hosting-digital-marketing" aria-label="Frequently Asked Questions about Website Design and Hosting" title="Web Design FAQs" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">FAQs & Knowledge</Link>
              </li>
              <li>
                <Link to="/webhosting-vps-dedicated-server-support-baroda" aria-label="Technical Support for Web Hosting and Servers" title="Technical Support" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Technical Support</Link>
              </li>
              <li>
                <Link to="/blogs" aria-label="Read Latest Web Development and SEO Blogs" title="Web Development Blogs" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Latest Tech Blogs</Link>
              </li>
              <li>
                <Link to="/web-stories" aria-label="Visual Web Stories and Digital Insights" title="Web Stories" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Visual Web Stories</Link>
              </li>
              <li>
                <Link to="/contact-webdesign-mobileapp-socialmedia-marketing-baroda" aria-label="Contact Dots and Coms Team in Vadodara" title="Contact Us" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Contact Us Now</Link>
              </li>
              <li>
                <a href="https://www.dotscoms.com/training-and-job-vacancy-at-dots-coms-vadodara.html" target="_blank" rel="noopener noreferrer" aria-label="Explore Careers and Job Openings at Dots and Coms" title="Careers" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Careers & Vacancies</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3: Website Design & Mobile Apps */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <div className="min-h-[140px]">
            <h4 className="text-slate-100 font-bold font-heading text-sm uppercase tracking-wider mb-4">
              Website Design
            </h4>
            <ul className="space-y-2 text-[14px] pl-2.5 border-l border-slate-800">
              <li>
                <Link to="/responsive-website-designing-company-vadodara#website-design" aria-label="Custom Website Design Services in Vadodara" title="Custom Website Design" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Custom Website Design</Link>
              </li>
              <li>
                <Link to="/responsive-website-designing-company-vadodara#ecommerce-development" aria-label="Ecommerce Website Development Solutions" title="Ecommerce Website Development" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Ecommerce Website Development</Link>
              </li>
              <li>
                <Link to="/responsive-website-designing-company-vadodara#custom-applications" aria-label="Content Management Systems and CMS Web Solutions" title="CMS Development" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Content Management Systems</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-100 font-bold font-heading text-sm uppercase tracking-wider mb-4">
              Mobile Apps
            </h4>
            <ul className="space-y-2 text-[14px] pl-2.5 border-l border-slate-800">
              <li>
                <Link to="/android-ios-mobile-app-development-company-baroda#android-development" aria-label="Android Mobile Application Development" title="Android Mobile Apps" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Android Mobile Applications</Link>
              </li>
              <li>
                <Link to="/android-ios-mobile-app-development-company-baroda#ios-development" aria-label="iOS Mobile Application Development" title="iOS Mobile Apps" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">iOS Mobile Applications</Link>
              </li>
              <li>
                <Link to="/android-ios-mobile-app-development-company-baroda#flutter-development" aria-label="Cross Platform Flutter App Development" title="Flutter App Development" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Flutter App Development</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 4: Web Hosting & Digital Marketing */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <div className="min-h-[140px]">
            <h4 className="text-slate-100 font-bold font-heading text-sm uppercase tracking-wider mb-4">
              Web Hosting
            </h4>
            <ul className="space-y-2 text-[14px] pl-2.5 border-l border-slate-800">
              <li>
                <Link to="/windows-web-hosting-service-provider-baroda#vps-hosting" aria-label="Windows and Linux VPS Server Hosting" title="VPS Hosting" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">VPS Server Hosting</Link>
              </li>
              <li>
                <Link to="/windows-web-hosting-service-provider-baroda#dedicated-servers" aria-label="Dedicated Server Hosting Solutions" title="Dedicated Servers" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Dedicated Server Hosting</Link>
              </li>
              <li>
                <Link to="/windows-web-hosting-service-provider-baroda#ssl-certificate" aria-label="SSL Security Certificate Installation" title="SSL Certificates" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">SSL Security Certificates</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-100 font-bold font-heading text-sm uppercase tracking-wider mb-4">
              Digital Marketing
            </h4>
            <ul className="space-y-2 text-[14px] pl-2.5 border-l border-slate-800 mb-2.5">
              <li>
                <Link to="/organic-seo-ppc-digital-marketing-vadodara#organic-seo" aria-label="Organic SEO Search Engine Optimization Services" title="Organic SEO" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Organic SEO Services</Link>
              </li>
              <li>
                <Link to="/organic-seo-ppc-digital-marketing-vadodara#social-media" aria-label="Social Media Marketing and Management" title="Social Media Marketing" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Social Media Marketing</Link>
              </li>
              <li>
                <Link to="/organic-seo-ppc-digital-marketing-vadodara#google-adwords" aria-label="Google AdWords PPC Advertising Campaigns" title="Google AdWords" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Google AdWords PPC</Link>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Copyright panel */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-sm mt-8 pt-5 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-slate-500 gap-4 text-left">
        <div>
          © {currentYear} Dots and Coms. All rights reserved. | <Link to="/sitemap" aria-label="Website HTML Sitemap Directory" title="HTML Sitemap" className="hover:text-slate-300 transition-colors text-sm">Website Sitemap</Link>
        </div>
        <div className="flex space-x-6">
          <Link to="/terms-and-conditions#terms" aria-label="Terms of Service and Privacy Policy" title="Terms of Service" className="hover:text-slate-300 transition-colors text-sm">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
