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
      <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-[1.2] fill-none pointer-events-none -z-10" aria-hidden="true">
        <path d="M-50 40h150l30 30h250l20-20h150" />
        <path d="M200 120h100l20 20h200" />
        <circle cx="100" cy="40" r="2.5" className="fill-[#dc2626]/30 stroke-none" />
        <circle cx="380" cy="70" r="2.5" className="fill-[#ea580c]/30 stroke-none" />
      </svg>

      {/* Watermark logo in the background */}
      <div className="absolute right-[6%] bottom-[8%] w-[260px] md:w-[330px] opacity-[0.045] pointer-events-none select-none -z-10 transform -rotate-6 filter brightness-0 invert">
        <img src={logoImg} alt="Dots & Coms Footer Navigation Brand Logo" className="w-full h-auto object-contain" loading="lazy" decoding="async" width="94" height="98" />
      </div>

      {/* Glowing gradient mesh accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#dc2626]/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#ea580c]/4 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 text-left">
        
        {/* Column 1: Info */}
        <div className="lg:col-span-3 space-y-3">
          <Link to="/" aria-label="Dots & Coms Web Development Agency Home" className="flex items-center">
            <div className="brightness-110">
              <Logo size="lg" />
            </div>
          </Link>

          <div className="space-y-2.5 mt-6">
            <div className="flex items-start space-x-2 text-[14px]">
              <Mail className="w-3.5 h-3.5 text-[#dc2626] mt-0.5 flex-shrink-0" />
              <div className="flex flex-col space-y-1 leading-tight">
                <a href="mailto:parul@dotscoms.com" aria-label="Send email to Parul at Dots & Coms" className="text-slate-300 hover:text-[#dc2626] transition-colors duration-300">parul@dotscoms.com</a>
                <a href="mailto:contact@dotsandcoms.in" aria-label="Send email to Contact at Dots & Coms" className="text-slate-300 hover:text-[#dc2626] transition-colors duration-300">contact@dotsandcoms.in</a>
              </div>
            </div>
            <div className="flex items-start space-x-2 text-[14px]">
              <Phone className="w-3.5 h-3.5 text-[#dc2626] mt-0.5 flex-shrink-0" />
              <div className="flex flex-col space-y-1 leading-tight">
                <a href="tel:+918469332448" aria-label="Call Dots & Coms phone number +91 84693 32448" className="text-slate-300 hover:text-[#dc2626] transition-colors duration-300">+91 84693 32448</a>
                <a href="tel:+919925072327" aria-label="Call Dots & Coms phone number +91 99250 72327" className="text-slate-300 hover:text-[#dc2626] transition-colors duration-300">+91 99250 72327</a>
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
            <p className="text-slate-100 font-bold font-heading text-sm uppercase tracking-wider mb-4">
              Quick Links
            </p>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link to="/#hero" aria-label="Dots & Coms Home Page Section" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Home</Link>
              </li>
              <li>
                <Link to="/about-web-development-company-baroda" aria-label="About Dots & Coms Web Development Company Vadodara" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">About Us</Link>
              </li>
              <li>
                <Link to="/services" aria-label="All Digital & Development Services" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Services</Link>
              </li>
              <li>
                <Link to="/website-mobile-app-development-company-portfolio-baroda" aria-label="Dots & Coms Web Design Portfolio and Work" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Our Work</Link>
              </li>
              <li>
                <Link to="/faqs-web-design-hosting-digital-marketing" aria-label="Frequently Asked Questions on Web Design and Hosting" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">FAQs</Link>
              </li>
              <li>
                <Link to="/webhosting-vps-dedicated-server-support-baroda" aria-label="Technical Support Services Baroda" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Technical Support</Link>
              </li>
              <li>
                <Link to="/blogs" aria-label="Dots & Coms Technology and Digital Marketing Blogs" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Blogs</Link>
              </li>
              <li>
                <Link to="/web-stories" aria-label="Dots & Coms Visual Web Stories" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Webstories</Link>
              </li>
              <li>
                <Link to="/contact-webdesign-mobileapp-socialmedia-marketing-baroda" aria-label="Contact Dots & Coms Web Development Team" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Contact Us</Link>
              </li>
              <li>
                <Link to="/free-seo-performance-website-audit" aria-label="Free Website SEO & Performance Audit" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Free SEO Audit</Link>
              </li>
              <li>
                <a href="https://www.dotscoms.com/training-and-job-vacancy-at-dots-coms-vadodara.html" target="_blank" rel="noopener noreferrer" aria-label="Careers and Vacancies at Dots & Coms Vadodara" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Careers</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3: Website Design & Mobile Apps */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <div className="min-h-[140px]">
            <p className="text-slate-100 font-bold font-heading text-sm uppercase tracking-wider mb-4">
              Website Design
            </p>
            <ul className="space-y-2 text-[14px] pl-2.5 border-l border-slate-800">
              <li>
                <Link to="/responsive-website-designing-company-vadodara" aria-label="Responsive Website Designing Company Vadodara Service Page" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Responsive Web Design</Link>
              </li>
              <li>
                <Link to="/responsive-website-designing-company-vadodara#website-design" aria-label="Custom Website Design & Development Solutions" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Custom Website</Link>
              </li>
              <li>
                <Link to="/responsive-website-designing-company-vadodara#ecommerce-development" aria-label="Ecommerce Website Development & Online Store Design" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Ecommerce Website</Link>
              </li>
              <li>
                <Link to="/responsive-website-designing-company-vadodara#custom-applications" aria-label="Content Management Systems & CMS Development" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Content Management System</Link>
              </li>
              <li>
                <Link to="/accutechlabels-case-study-traditional-to-web-business" aria-label="Accutech Labels Case Study - B2B Website Redesign" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Accutech Case Study</Link>
              </li>
              <li>
                <Link to="/1life-case-study-of-regional-to-national-reach" aria-label="1Life NGO Case Study - National Outreach Web Design" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">1Life Case Study</Link>
              </li>
              <li>
                <Link to="/hobby-goes-global-case-study" aria-label="Kiiara Kreations Case Study - Global Ecommerce Web Design" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Kiiara Case Study</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-slate-100 font-bold font-heading text-sm uppercase tracking-wider mb-4">
              Mobile Apps
            </p>
            <ul className="space-y-2 text-[14px] pl-2.5 border-l border-slate-800">
              <li>
                <Link to="/android-ios-mobile-app-development-company-baroda" aria-label="Android & iOS Mobile App Development Company Baroda Service Page" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Mobile App Development</Link>
              </li>
              <li>
                <Link to="/android-ios-mobile-app-development-company-baroda#android-development" aria-label="Android Mobile App Development Services Baroda" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Android Mobile Apps</Link>
              </li>
              <li>
                <Link to="/android-ios-mobile-app-development-company-baroda#ios-development" aria-label="iOS Mobile App Development Services Baroda" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">iOS Mobile Apps</Link>
              </li>
              <li>
                <Link to="/android-ios-mobile-app-development-company-baroda#flutter-development" aria-label="Cross Platform Flutter App Development Services" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Flutter Apps</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 4: Web Hosting & Digital Marketing */}
        <div className="lg:col-span-3 space-y-4 text-left">
          <div className="min-h-[140px]">
            <p className="text-slate-100 font-bold font-heading text-sm uppercase tracking-wider mb-4">
              Web Hosting
            </p>
            <ul className="space-y-2 text-[14px] pl-2.5 border-l border-slate-800">
              <li>
                <Link to="/windows-web-hosting-service-provider-baroda" aria-label="Windows Web Hosting Service Provider Baroda Main Page" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Web Hosting Services</Link>
              </li>
              <li>
                <Link to="/windows-web-hosting-service-provider-baroda#vps-hosting" aria-label="Windows and Linux VPS Server Hosting Solutions" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">VPS Hosting</Link>
              </li>
              <li>
                <Link to="/windows-web-hosting-service-provider-baroda#dedicated-servers" aria-label="Dedicated Server Cloud Hosting Vadodara" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Dedicated Server</Link>
              </li>
              <li>
                <Link to="/windows-web-hosting-service-provider-baroda#ssl-certificate" aria-label="SSL Security Certificate Installation Services" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">SSL Certificate</Link>
              </li>
              <li>
                <Link to="/web-hosting-details" aria-label="Web Hosting Server Specifications & Details" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Hosting Details</Link>
              </li>
              <li>
                <Link to="/order-now" aria-label="Order Hosting Plans & Web Services Online" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Order Now</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-slate-100 font-bold font-heading text-sm uppercase tracking-wider mb-4">
              Digital Marketing
            </p>
            <ul className="space-y-2 text-[14px] pl-2.5 border-l border-slate-800 mb-2.5">
              <li>
                <Link to="/organic-seo-ppc-digital-marketing-vadodara" aria-label="Organic SEO & PPC Digital Marketing Agency Vadodara Service Page" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Digital Marketing Agency</Link>
              </li>
              <li>
                <Link to="/organic-seo-ppc-digital-marketing-vadodara#organic-seo" aria-label="Organic SEO Search Engine Optimization Vadodara" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Organic SEO</Link>
              </li>
              <li>
                <Link to="/organic-seo-ppc-digital-marketing-vadodara#social-media" aria-label="Social Media Marketing and Branding Vadodara" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Social Media Marketing</Link>
              </li>
              <li>
                <Link to="/organic-seo-ppc-digital-marketing-vadodara#google-adwords" aria-label="Google AdWords PPC Advertising Campaign Management" className="text-slate-400 hover:text-white transition-colors duration-300 font-normal">Google AdWords</Link>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Copyright panel */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-sm mt-8 pt-5 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-slate-500 gap-4 text-left">
        <div>
          © {currentYear} Dots and Coms. All rights reserved. | <Link to="/sitemap" aria-label="Dots & Coms Complete HTML Sitemap Page" className="hover:text-slate-300 transition-colors text-sm">Sitemap</Link>
        </div>
        <div className="flex space-x-6">
          <Link to="/terms-and-conditions#terms" aria-label="Dots & Coms Terms of Service and Conditions" className="hover:text-slate-300 transition-colors text-sm">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
