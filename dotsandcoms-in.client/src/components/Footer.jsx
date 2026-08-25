import Logo from "./Logo";
import { Mail, Phone, MapPin } from "lucide-react";
import logoImg from "../assets/images/dots-and-coms-logo.webp";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative overflow-hidden bg-[#0b0f19] pt-14 pb-8 text-slate-400"
      style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.01) 0px, rgba(255, 255, 255, 0.01) 1px, transparent 1px, transparent 12px)
        `,
        backgroundSize: '100% 100%'
      }}
    >
      {/* Glowing top accent border */}
      <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-red-500/30 via-orange-500/50 to-yellow-500/30" />

      {/* Tech lines decoration */}
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full fill-none stroke-slate-800 stroke-[1.2]" aria-hidden="true">
        <path d="M-50 40h150l30 30h250l20-20h150" />
        <path d="M200 120h100l20 20h200" />
        <circle cx="100" cy="40" r="2.5" className="fill-[#dc2626]/30 stroke-none" />
        <circle cx="380" cy="70" r="2.5" className="fill-[#ea580c]/30 stroke-none" />
      </svg>

      {/* Watermark logo in the background */}
      <div className="pointer-events-none absolute right-[6%] bottom-[8%] -z-10 w-[260px] -rotate-6 transform opacity-[0.045] brightness-0 invert filter select-none md:w-[330px]">
        <img src={logoImg} alt="Dots & Coms Footer Navigation Brand Logo" className="h-auto w-full object-contain" loading="lazy" decoding="async" width="94" height="98" />
      </div>

      {/* Glowing gradient mesh accents */}
      <div className="pointer-events-none absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-[#dc2626]/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 -z-10 h-80 w-80 rounded-full bg-[#ea580c]/4 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 text-left md:grid-cols-2 md:px-12 lg:grid-cols-12 lg:gap-8">
        
        {/* Column 1: Info */}
        <div className="space-y-3 lg:col-span-3">
          <Link to="/" aria-label="Dots & Coms Web Development Agency Home" className="flex items-center">
            <div className="brightness-110">
              <Logo size="lg" />
            </div>
          </Link>

          <div className="mt-6 space-y-2.5">
            <div className="flex items-start space-x-2 text-[14px]">
              <Mail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#dc2626]" />
              <div className="flex flex-col space-y-1 leading-tight">
                 {/* <a href="mailto:parul@dotscoms.com" aria-label="Send email to Parul at Dots & Coms" className="text-slate-300 transition-colors duration-300 hover:text-[#dc2626]">parul@dotscoms.com</a> */}
                <a href="mailto:contact@dotsandcoms.in" aria-label="Send email to Contact at Dots & Coms" className="text-slate-300 transition-colors duration-300 hover:text-[#dc2626]">contact@dotsandcoms.in</a>
              </div>
            </div>
            <div className="flex items-start space-x-2 text-[14px]">
              <Phone className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#dc2626]" />
              <div className="flex flex-col space-y-1 leading-tight">
                <a href="tel:+918469332448" aria-label="Call Dots & Coms phone number +91 84693 32448" className="text-slate-300 transition-colors duration-300 hover:text-[#dc2626]">+91 84693 32448</a> 
               {/* <a href="tel:+919925072327" aria-label="Call Dots & Coms phone number +91 99250 72327" className="text-slate-300 transition-colors duration-300 hover:text-[#dc2626]">+91 99250 72327</a> */}
              </div>
            </div>
            <div className="flex items-start space-x-2 text-[14px]">
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#dc2626]" />
              <div className="flex flex-col space-y-0.5 leading-tight text-slate-300">
                <span className="font-semibold text-slate-100">Dots and Coms</span>
                <span>201, Senate Square Tower B,</span>
                <span>Nr. Yash Complex, Gotri Road,</span>
                <span>Vadodara 390021, Gujarat, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Company & Quick Links */}
        <div className="space-y-4 text-left lg:col-span-3">
          <div>
            <p className="font-heading mb-4 text-sm font-bold tracking-wider text-slate-100 uppercase">
              Quick Links
            </p>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link to="/#hero" aria-label="Dots & Coms Home Page Section" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/about-web-development-company-baroda" aria-label="About Dots & Coms Web Development Company Vadodara" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/services" aria-label="All Digital & Development Services" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Services</Link>
              </li>
              <li>
                <Link to="/website-mobile-app-development-company-portfolio-baroda" aria-label="Dots & Coms Web Design Portfolio and Work" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Our Work</Link>
              </li>
              <li>
                <Link to="/faqs-web-design-hosting-digital-marketing" aria-label="Frequently Asked Questions on Web Design and Hosting" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">FAQs</Link>
              </li>
              <li>
                <Link to="/webhosting-vps-dedicated-server-support-baroda" aria-label="Technical Support Services Baroda" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Technical Support</Link>
              </li>
              <li>
                <Link to="/blogs" aria-label="Dots & Coms Technology and Digital Marketing Blogs" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Blogs</Link>
              </li>
              <li>
                <Link to="/web-stories" aria-label="Dots & Coms Visual Web Stories" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Webstories</Link>
              </li>
              <li>
                <Link to="/contact-webdesign-mobileapp-socialmedia-marketing-baroda" aria-label="Contact Dots & Coms Web Development Team" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <a href="https://www.dotscoms.com/training-and-job-vacancy-at-dots-coms-vadodara.html" target="_blank" rel="noopener noreferrer" aria-label="Careers and Vacancies at Dots & Coms Vadodara" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Careers</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3: Website Design & Mobile Apps */}
        <div className="space-y-4 text-left lg:col-span-3">
          <div className="min-h-[140px]">
            <p className="font-heading mb-4 text-sm font-bold tracking-wider text-slate-100 uppercase">
              Website Design
            </p>
            <ul className="space-y-2 border-l border-slate-800 pl-2.5 text-[14px]">
             
              <li>
                <Link to="/responsive-website-designing-company-vadodara#website-design" aria-label="Custom Website Design & Development Solutions" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Custom Website</Link>
              </li>
              <li>
                <Link to="/responsive-website-designing-company-vadodara#ecommerce-development" aria-label="Ecommerce Website Development & Online Store Design" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Ecommerce Website</Link>
              </li>
              <li>
                <Link to="/responsive-website-designing-company-vadodara#custom-applications" aria-label="Content Management Systems & CMS Development" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Content Management System</Link>
              </li>
           
            </ul>
          </div>
          <div>
            <p className="font-heading mb-4 text-sm font-bold tracking-wider text-slate-100 uppercase">
              Mobile Apps
            </p>
            <ul className="space-y-2 border-l border-slate-800 pl-2.5 text-[14px]">
           
              <li>
                <Link to="/android-ios-mobile-app-development-company-baroda#android-development" aria-label="Android Mobile App Development Services Baroda" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Android Mobile Apps</Link>
              </li>
              <li>
                <Link to="/android-ios-mobile-app-development-company-baroda#ios-development" aria-label="iOS Mobile App Development Services Baroda" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">iOS Mobile Apps</Link>
              </li>
              <li>
                <Link to="/android-ios-mobile-app-development-company-baroda#flutter-development" aria-label="Cross Platform Flutter App Development Services" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Flutter Apps</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 4: Web Hosting & Digital Marketing */}
        <div className="space-y-4 text-left lg:col-span-3">
          <div className="min-h-[140px]">
            <p className="font-heading mb-4 text-sm font-bold tracking-wider text-slate-100 uppercase">
              Web Hosting
            </p>
            <ul className="space-y-2 border-l border-slate-800 pl-2.5 text-[14px]">
             
              <li>
                <Link to="/windows-web-hosting-service-provider-baroda#vps-hosting" aria-label="Windows and Linux VPS Server Hosting Solutions" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">VPS Hosting</Link>
              </li>
              <li>
                <Link to="/windows-web-hosting-service-provider-baroda#dedicated-servers" aria-label="Dedicated Server Cloud Hosting Vadodara" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Dedicated Server</Link>
              </li>
              <li>
                <Link to="/windows-web-hosting-service-provider-baroda#ssl-certificate" aria-label="SSL Security Certificate Installation Services" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">SSL Certificate</Link>
              </li>
              
            </ul>
          </div>
          <div>
            <p className="font-heading mb-4 text-sm font-bold tracking-wider text-slate-100 uppercase">
              Digital Marketing
            </p>
            <ul className="mb-2.5 space-y-2 border-l border-slate-800 pl-2.5 text-[14px]">
            
              <li>
                <Link to="/organic-seo-ppc-digital-marketing-vadodara#organic-seo" aria-label="Organic SEO Search Engine Optimization Vadodara" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Organic SEO</Link>
              </li>
              <li>
                <Link to="/organic-seo-ppc-digital-marketing-vadodara#social-media" aria-label="Social Media Marketing and Branding Vadodara" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Social Media Marketing</Link>
              </li>
              <li>
                <Link to="/organic-seo-ppc-digital-marketing-vadodara#google-adwords" aria-label="Google AdWords PPC Advertising Campaign Management" className="font-normal text-slate-400 transition-colors duration-300 hover:text-white">Google AdWords</Link>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Copyright panel */}
      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-800 px-6 pt-5 text-left text-sm text-slate-500 md:flex-row md:px-12">
        <div>
          © {currentYear} Dots and Coms. All rights reserved. | <Link to="/sitemap" aria-label="Dots & Coms Complete HTML Sitemap Page" className="text-sm transition-colors hover:text-slate-300">Sitemap</Link>
        </div>
        <div className="flex space-x-6">
          <Link to="/terms-and-conditions#terms" aria-label="Dots & Coms Terms of Service and Conditions" className="text-sm transition-colors hover:text-slate-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
