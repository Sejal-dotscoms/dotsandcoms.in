import { useEffect, useState, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Database, Download, Check, Globe, Server, Cpu, ShieldCheck, Monitor, Terminal, Settings } from "lucide-react";
import InnerBanner from "../../components/ui/InnerBanner";
import { setPageSEO } from "../../utils/seo";
import { 
  bannerData, 
  websiteHostingData, 
  vpsHostingData, 
  dedicatedServersData, 
  sslData, 
  ctaData 
} from "../../data/webHosting";

// Icon components for clean table markup
const CheckIcon = () => (
  <Check className="w-5 h-5 text-emerald-600 mx-auto" strokeWidth={3} />
);

export default function WebHostingDetail() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("website-hosting");
  const [dedicatedSubTab, setDedicatedSubTab] = useState("managed");
  const [vpsSubTab, setVpsSubTab] = useState("windows");

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    const validTabs = ["website-hosting", "vps-hosting", "dedicated-servers", "ssl-certificate"];
    if (hash && validTabs.includes(hash)) {
      setActiveTab(hash);
      const timer = setTimeout(() => {
        const el = document.getElementById("hosting-tabs");
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el);
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Set page-specific SEO metadata on mount
  useEffect(() => {
    return setPageSEO({
      title: "Cloud Hosting Services & Windows Web Hosting Company in Baroda | Dots & Coms",
      description: "Cloud hosting services in Baroda offering Windows and Linux hosting, VPS hosting, dedicated servers, reseller hosting, and scalable infrastructure with reliable uptime.",
      keywords: "cloud hosting services Baroda, windows web hosting Baroda, Linux hosting Vadodara, VPS hosting Baroda, dedicated server provider Vadodara, reseller hosting services, server hosting Baroda, web hosting company Vadodara",
      canonical: "https://www.dotsandcoms.in/windows-web-hosting-service-provider-baroda"
    });
  }, []);

  return (
    <>
      <InnerBanner 
        title={bannerData.title} 
        subtitle={bannerData.subtitle}
        breadcrumbs={bannerData.breadcrumbs}
      />

      <section id="hosting-tabs" className="py-24 bg-white scroll-mt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Mobile Dropdown Tab Selector */}
          <div className="md:hidden w-full max-w-xs mx-auto mb-10 relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full bg-gradient-to-r from-[#dc2626] to-[#ea580c] text-white font-extrabold uppercase tracking-wider text-xs px-5 py-4 rounded-xl shadow-md border-none focus:outline-none appearance-none cursor-pointer pr-10 text-center"
            >
              {[
                { id: "website-hosting", label: "Website Hosting" },
                { id: "vps-hosting", label: "VPS Hosting" },
                { id: "dedicated-servers", label: "Dedicated Servers" },
                { id: "ssl-certificate", label: "SSL Certificate" }
              ].map((tab) => (
                <option key={tab.id} value={tab.id} className="text-slate-800 bg-white font-bold uppercase tracking-wider text-xs">
                  {tab.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          {/* Custom Tabs Navigation - Modern Premium Glassmorphic Sliding Tabs */}
          <div className="hidden md:flex justify-center mb-16 px-4">
            <div className="inline-flex flex-wrap md:flex-nowrap p-1.5 bg-slate-50/80 backdrop-blur-md border border-slate-200/80 rounded-2xl md:rounded-full shadow-lg shadow-slate-100/50 gap-1.5 max-w-full overflow-x-auto horizontal-scroll-container">
              {[
                { id: "website-hosting", label: "Website Hosting", icon: Globe },
                { id: "vps-hosting", label: "VPS Hosting", icon: Server },
                { id: "dedicated-servers", label: "Dedicated Servers", icon: Cpu },
                { id: "ssl-certificate", label: "SSL Certificate", icon: ShieldCheck }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="group relative px-6 md:px-8 py-3 md:py-3.5 rounded-xl md:rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap outline-none border-none"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBackground"
                        className="absolute inset-0 bg-gradient-to-r from-[#dc2626] via-red-500 to-[#ea580c] rounded-xl md:rounded-full shadow-md shadow-red-500/20 border border-red-600/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 md:w-4.5 md:h-4.5 relative z-10 transition-colors duration-300 ${
                      isActive 
                        ? "text-white" 
                        : "text-slate-450 group-hover:text-[#dc2626]"
                    }`} />
                    <span className={`relative z-10 font-extrabold transition-colors duration-300 ${
                      isActive 
                        ? "text-white" 
                        : "text-slate-500 group-hover:text-slate-800"
                    }`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tabs Content Sections */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="text-left"
            >
              {/* Tab 1: Website Hosting (Windows Hosting with ASP.NET & MSSQL) */}
              {activeTab === "website-hosting" && (
                <div className="space-y-12">
                  <div className="space-y-6 max-w-6xl">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                      {websiteHostingData.title}
                    </h2>
                    <div className="space-y-4 text-slate-650 text-base leading-relaxed">
                      {websiteHostingData.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Table */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-6 bg-[#dc2626] rounded-full" />
                      <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider text-[15px] font-mono">
                        {websiteHostingData.pricing.sectionTitle}
                      </h3>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xl bg-white">
                      <table className="w-full text-left border-collapse min-w-[850px]">
                        <thead>
                          <tr className="bg-gradient-to-r from-amber-400 via-orange-500 to-[#dc2626] text-white">
                            {websiteHostingData.pricing.headers.map((header, idx) => (
                              <th 
                                key={idx} 
                                className={`p-4 font-extrabold text-[12px] md:text-xs uppercase tracking-wider ${
                                  idx === 0 ? "border-r border-white/10" : idx === websiteHostingData.pricing.headers.length - 1 ? "" : "text-center border-r border-white/10"
                                }`}
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {/* Plan Pricing Row */}
                          <tr className="border-b border-slate-200 bg-slate-50/30">
                            <td className="p-4 font-bold text-slate-700 border-r border-slate-200 bg-slate-100/40 text-sm">Plan Pricing</td>
                            {websiteHostingData.pricing.plans.map((item) => (
                              <td key={item.pack} className="p-4 text-center border-r border-slate-200 last:border-r-0">
                                <Link 
                                  to={`/order-now?pack=${item.pack}`}
                                  className="group block bg-gradient-to-r from-amber-400 via-orange-500 to-[#dc2626] hover:brightness-110 text-white py-3.5 px-2 rounded-xl shadow-md border-0 text-center w-full max-w-[150px] mx-auto transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                >
                                  <div className="text-lg font-extrabold font-mono text-white transition-colors whitespace-nowrap">
                                    ₹{item.price} / Yr
                                  </div>
                                  <div className="w-full h-[1px] bg-white/20 my-2" />
                                  <div className="text-[9px] font-extrabold uppercase tracking-widest text-white/95 group-hover:text-white">
                                    order now
                                  </div>
                                </Link>
                              </td>
                            ))}
                          </tr>

                          {/* Features Groups */}
                          {websiteHostingData.pricing.features.map((group, groupIdx) => (
                            <Fragment key={groupIdx}>
                              <tr>
                                <td colSpan="6" className="bg-slate-100/80 p-3 font-extrabold text-xs uppercase tracking-widest text-[#ea580c] border-y border-slate-200">
                                  {group.group}
                                </td>
                              </tr>
                              {group.items.map((feature, featureIdx) => (
                                <tr key={featureIdx} className="border-b border-slate-200 hover:bg-slate-50/30 transition-colors">
                                  <td className="p-4 text-sm font-semibold text-slate-700 border-r border-slate-200">
                                    {feature.name}
                                    {feature.spec && <><br /><span className="text-xs font-normal text-slate-400">{feature.spec}</span></>}
                                  </td>
                                  {feature.values.map((val, vIdx) => (
                                    <td 
                                      key={vIdx} 
                                      className={`p-4 text-center text-sm border-r border-slate-200 last:border-r-0 ${
                                        vIdx % 2 === 1 ? "bg-slate-50/30" : ""
                                      }`}
                                    >
                                      {val === true ? <CheckIcon /> : val}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Additional Options Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    {/* Database Addon Card */}
                    <div className="p-6 rounded-2xl border border-slate-200 hover:border-red-500/20 bg-slate-50/40 hover:bg-red-50/5 shadow-sm transition-all duration-300 flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-50 text-[#dc2626] border border-red-100 flex-shrink-0">
                        <Database className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
                          {websiteHostingData.databaseAddon.title}
                        </h4>
                        <p className="text-slate-650 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: websiteHostingData.databaseAddon.text }} />
                      </div>
                    </div>

                    {/* Policy Card */}
                    <a 
                      href={websiteHostingData.policies.pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-6 rounded-2xl border border-slate-200 hover:border-red-500/25 bg-slate-50/40 hover:bg-red-50/5 shadow-sm transition-all duration-300 flex items-start space-x-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-50 text-[#dc2626] border border-red-100 flex-shrink-0 group-hover:bg-[#dc2626] group-hover:text-white transition-colors duration-300">
                        <Download className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider group-hover:text-[#dc2626] transition-colors">
                          {websiteHostingData.policies.title}
                        </h4>
                        <p className="text-slate-650 text-sm leading-relaxed">
                          {websiteHostingData.policies.text}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              )}

              {/* Tab 2: VPS Hosting */}
              {activeTab === "vps-hosting" && (
                <div className="space-y-12">
                  
                  {/* Top Text Details */}
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                      {vpsHostingData.title}
                    </h2>
                    <div className="space-y-4 text-slate-650 text-base leading-relaxed">
                      {vpsHostingData.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Dropdown for VPS Server Options */}
                  <div className="md:hidden w-full max-w-xs mx-auto mb-8 relative">
                    <select
                      value={vpsSubTab}
                      onChange={(e) => setVpsSubTab(e.target.value)}
                      className="w-full bg-gradient-to-r from-[#dc2626] to-[#ea580c] text-white font-extrabold uppercase tracking-wider text-xs px-5 py-3.5 rounded-xl shadow-md border-none focus:outline-none appearance-none cursor-pointer pr-10 text-center"
                    >
                      {[
                        { id: "windows", label: "VPS Servers - Windows" },
                        { id: "linux", label: "VPS Servers - Linux" }
                      ].map((tab) => (
                        <option key={tab.id} value={tab.id} className="text-slate-800 bg-white font-bold uppercase tracking-wider text-xs">
                          {tab.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Inner Sub-Tabs for VPS Server Options */}
                  <div className="hidden md:flex justify-center mb-10 pt-4 px-4">
                    <div className="inline-flex p-1 bg-slate-100/90 border border-slate-200/60 rounded-xl md:rounded-full shadow-sm gap-1 max-w-full overflow-x-auto horizontal-scroll-container">
                      {[
                        { id: "windows", label: "VPS Servers - Windows", icon: Monitor },
                        { id: "linux", label: "VPS Servers - Linux", icon: Terminal }
                      ].map((tab) => {
                        const isActive = vpsSubTab === tab.id;
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setVpsSubTab(tab.id)}
                            className="group relative px-5 md:px-7 py-2 md:py-2.5 rounded-lg md:rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap outline-none border-none"
                          >
                            {isActive && (
                              <motion.div
                                layoutId="vpsActiveBackground"
                                className="absolute inset-0 bg-gradient-to-r from-[#dc2626] to-red-500 rounded-lg md:rounded-full shadow-sm border border-red-600/25"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                              />
                            )}
                            <Icon className={`w-3.5 h-3.5 relative z-10 transition-colors duration-300 ${
                              isActive ? "text-white" : "text-slate-400 group-hover:text-[#dc2626]"
                            }`} />
                            <span className={`relative z-10 font-bold transition-colors duration-300 ${
                              isActive ? "text-white" : "text-slate-650 group-hover:text-slate-900"
                            }`}>
                              {tab.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sub-Tab Content */}
                  <div className="space-y-8 max-w-4xl mx-auto">
                    {vpsSubTab === "windows" ? (
                      <div className="space-y-6">
                        <div className="space-y-4 text-slate-650 text-base leading-relaxed text-left">
                          {vpsHostingData.subTabs.windows.paragraphs.map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                        </div>

                        {/* Windows VPS Table */}
                        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white">
                          <table className="w-full text-center border-collapse">
                            <thead>
                              <tr className="bg-gradient-to-r from-amber-400 via-orange-500 to-[#dc2626] text-white font-extrabold text-xs uppercase tracking-wider">
                                <th className="p-4 border-r border-white/10">VPS Plan</th>
                                <th className="p-4 border-r border-white/10">vCPU</th>
                                <th className="p-4 border-r border-white/10">RAM</th>
                                <th className="p-4 border-r border-white/10">Disk Space</th>
                                <th className="p-4">Cost/month</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {vpsHostingData.subTabs.windows.plans.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="p-4 text-sm font-extrabold text-slate-800 border-r border-slate-200">{row.plan}</td>
                                  <td className="p-4 text-sm font-semibold text-slate-650 border-r border-slate-200">{row.cpu}</td>
                                  <td className="p-4 text-sm font-semibold text-slate-650 bg-slate-50/30 border-r border-slate-200">{row.ram}</td>
                                  <td className="p-4 text-sm font-semibold text-slate-650 border-r border-slate-200">{row.disk}</td>
                                  <td className="p-4">
                                    <Link 
                                      to={`/order-now?type=vpsw&pack=${row.pack}`}
                                      className="group block bg-gradient-to-r from-amber-400 via-orange-500 to-[#dc2626] hover:brightness-110 text-white py-3.5 px-2.5 rounded-xl shadow-md border-0 text-center w-full max-w-[160px] mx-auto transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                    >
                                      <div className="text-lg font-extrabold font-mono text-white transition-colors whitespace-nowrap">
                                        ₹{row.price} / mo
                                      </div>
                                      <div className="w-full h-[1px] bg-white/20 my-2" />
                                      <div className="text-[9px] font-extrabold uppercase tracking-widest text-white/95 group-hover:text-white">
                                        order now
                                      </div>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-left text-sm text-slate-500 font-medium mt-3">
                          <span className="text-[#dc2626] font-bold">*</span> {vpsHostingData.managedHostingExtraNote}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-4 text-slate-650 text-base leading-relaxed text-left">
                          {vpsHostingData.subTabs.linux.paragraphs.map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                        </div>

                        {/* Linux VPS Table */}
                        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white">
                          <table className="w-full text-center border-collapse">
                            <thead>
                              <tr className="bg-gradient-to-r from-amber-400 via-orange-500 to-[#dc2626] text-white font-extrabold text-xs uppercase tracking-wider">
                                <th className="p-4 border-r border-white/10">VPS Plan</th>
                                <th className="p-4 border-r border-white/10">vCPU</th>
                                <th className="p-4 border-r border-white/10">RAM</th>
                                <th className="p-4 border-r border-white/10">Disk Space</th>
                                <th className="p-4">Cost/month</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {vpsHostingData.subTabs.linux.plans.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="p-4 text-sm font-extrabold text-slate-800 border-r border-slate-200">{row.plan}</td>
                                  <td className="p-4 text-sm font-semibold text-slate-650 border-r border-slate-200">{row.cpu}</td>
                                  <td className="p-4 text-sm font-semibold text-slate-650 bg-slate-50/30 border-r border-slate-200">{row.ram}</td>
                                  <td className="p-4 text-sm font-semibold text-slate-650 border-r border-slate-200">{row.disk}</td>
                                  <td className="p-4">
                                    <Link 
                                      to={`/order-now?type=vpsl&pack=${row.pack}`}
                                      className="group block bg-gradient-to-r from-amber-400 via-orange-500 to-[#dc2626] hover:brightness-110 text-white py-3.5 px-2.5 rounded-xl shadow-md border-0 text-center w-full max-w-[160px] mx-auto transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                                    >
                                      <div className="text-lg font-extrabold font-mono text-white transition-colors whitespace-nowrap">
                                        ₹{row.price} / mo
                                      </div>
                                      <div className="w-full h-[1px] bg-white/20 my-2" />
                                      <div className="text-[9px] font-extrabold uppercase tracking-widest text-white/95 group-hover:text-white">
                                        order now
                                      </div>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-left text-sm text-slate-500 font-medium mt-3">
                          <span className="text-[#dc2626] font-bold">*</span> {vpsHostingData.managedHostingExtraNote}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: Dedicated Servers */}
              {activeTab === "dedicated-servers" && (
                <div className="space-y-12">
                  
                  {/* Top Text Details */}
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                      {dedicatedServersData.title}
                    </h2>
                    <div className="space-y-4 text-slate-650 text-base leading-relaxed">
                      {dedicatedServersData.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                      <p>We offer:</p>
                    </div>

                    {/* Double Chevron Checklist */}
                    <ul className="pl-1 pt-2 flex flex-col space-y-4">
                      {dedicatedServersData.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3.5 text-slate-700 text-[15px] md:text-[16px] leading-relaxed">
                          <svg className="w-4 h-4 text-[#dc2626] flex-shrink-0 mt-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m13 5 7 7-7 7M5 5l7 7-7 7" />
                          </svg>
                          <span className="leading-snug pt-0.5 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-slate-650 text-base leading-relaxed pt-2">
                      {dedicatedServersData.outro}
                    </p>
                  </div>

                  {/* Mobile Dropdown for Dedicated Server Options */}
                  <div className="md:hidden w-full max-w-xs mx-auto mb-8 relative">
                    <select
                      value={dedicatedSubTab}
                      onChange={(e) => setDedicatedSubTab(e.target.value)}
                      className="w-full bg-gradient-to-r from-[#dc2626] to-[#ea580c] text-white font-extrabold uppercase tracking-wider text-xs px-5 py-3.5 rounded-xl shadow-md border-none focus:outline-none appearance-none cursor-pointer pr-10 text-center"
                    >
                      {[
                        { id: "self-managed", label: "Self-Managed" },
                        { id: "managed", label: "Managed" }
                      ].map((tab) => (
                        <option key={tab.id} value={tab.id} className="text-slate-800 bg-white font-bold uppercase tracking-wider text-xs">
                          {tab.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Inner Sub-Tabs for Dedicated Server Options */}
                  <div className="hidden md:flex justify-center mb-10 pt-4 px-4">
                    <div className="inline-flex p-1 bg-slate-100/90 border border-slate-200/60 rounded-xl md:rounded-full shadow-sm gap-1 max-w-full overflow-x-auto horizontal-scroll-container">
                      {[
                        { id: "self-managed", label: "Self-Managed", icon: Settings },
                        { id: "managed", label: "Managed", icon: ShieldCheck }
                      ].map((tab) => {
                        const isActive = dedicatedSubTab === tab.id;
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setDedicatedSubTab(tab.id)}
                            className="group relative px-5 md:px-7 py-2 md:py-2.5 rounded-lg md:rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap outline-none border-none"
                          >
                            {isActive && (
                              <motion.div
                                layoutId="dedicatedActiveBackground"
                                className="absolute inset-0 bg-gradient-to-r from-[#dc2626] to-red-500 rounded-lg md:rounded-full shadow-sm border border-red-600/25"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                              />
                            )}
                            <Icon className={`w-3.5 h-3.5 relative z-10 transition-colors duration-300 ${
                              isActive ? "text-white" : "text-slate-400 group-hover:text-[#dc2626]"
                            }`} />
                            <span className={`relative z-10 font-bold transition-colors duration-300 ${
                              isActive ? "text-white" : "text-slate-650 group-hover:text-slate-900"
                            }`}>
                              {tab.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sub-Tab Content */}
                  <div className="space-y-6 max-w-4xl mx-auto text-left">
                    <div className="space-y-4">
                      {dedicatedServersData.subTabs[dedicatedSubTab].paragraphs.map((p, idx) => (
                        <p key={idx} className="text-slate-650 text-base leading-relaxed">{p}</p>
                      ))}
                      <ul className="pl-1 flex flex-col space-y-3.5">
                        {dedicatedServersData.subTabs[dedicatedSubTab].features.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-700 text-[15px] leading-relaxed">
                            <svg className="w-4 h-4 text-[#dc2626] flex-shrink-0 mt-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m13 5 7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                            <span className="leading-snug pt-0.5 font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Plan Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                    {dedicatedServersData.plans
                      .filter(plan => plan.category === dedicatedSubTab)
                      .map((plan, pIdx) => (
                      <div key={pIdx} className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white text-slate-700 flex flex-col justify-between">
                        
                        {/* Header Gradient */}
                        <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-[#dc2626] p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/10">
                          <h4 className="font-black tracking-tight text-lg text-white font-heading">{plan.title}</h4>
                          <div className="text-white font-mono font-extrabold text-lg sm:text-xl">
                            ₹{plan.price} / Month
                          </div>
                        </div>

                        {/* Body Details */}
                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-white">
                          <div className="space-y-4">
                            <p className="text-slate-800 font-extrabold text-sm border-b border-slate-100 pb-2">
                              {plan.cpu}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                              <ul className="space-y-2 text-slate-650 text-xs sm:text-sm font-medium">
                                {plan.features.map((feat, fIdx) => (
                                  <li key={fIdx} className="flex items-center space-x-2 text-left">
                                    <span className="text-[#dc2626] font-bold">&gt;</span>
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center justify-center flex-shrink-0 self-center">
                                <img src={dedicatedServersData.logo} alt="Dots & Coms Dedicated Web Servers Infrastructure logo" className="max-w-full max-h-full object-contain" loading="lazy" width="94" height="98" />
                              </div>
                            </div>
                          </div>

                          <div className="pt-6 border-t border-slate-100">
                            <Link 
                              to={plan.link}
                              className="block w-full text-center bg-[#dc2626] hover:bg-red-700 text-white font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-md shadow-red-900/10"
                            >
                              Order Now
                            </Link>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* Tab 4: SSL Certificate */}
              {activeTab === "ssl-certificate" && (
                <div className="space-y-12">
                  
                  {/* Top Grid: Copy on Left, SSL Seal Image on Right */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Copy Column */}
                    <div className="lg:col-span-7 space-y-6">
                      <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                        {sslData.title}
                      </h2>
                      <div className="space-y-4 text-slate-650 text-base leading-relaxed">
                        {sslData.paragraphs.map((p, idx) => (
                          <p key={idx}>{p}</p>
                        ))}
                      </div>

                      {/* Chevron Bullet Checklist */}
                      <ul className="pl-1 pt-2 flex flex-col space-y-4">
                        {sslData.checklist.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3.5 text-slate-700 text-[15px] md:text-[16.5px] leading-relaxed">
                            <svg className="w-4 h-4 text-[#dc2626] flex-shrink-0 mt-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m13 5 7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                            <span className="leading-snug pt-0.5 font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Image Column */}
                    <div className="lg:col-span-5 w-full flex justify-center">
                      <div className="relative w-full max-w-sm p-4 bg-white flex justify-center">
                        <img 
                          src={sslData.image} 
                          alt="SSL Certificate Security Protection Seal - Dots & Coms Web Hosting Vadodara" 
                          className="w-full max-w-[280px] h-auto object-contain select-none block"
                          loading="lazy"
                          width="300"
                          height="220"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Pricing Grid */}
                  <div className="space-y-6 max-w-3xl mx-auto pt-6">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl bg-white">
                      
                      {/* Gradient Table Header */}
                      <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-[#dc2626] text-white p-4 grid grid-cols-2 text-center font-bold text-sm uppercase tracking-wider">
                        {sslData.pricing.headers.map((h, idx) => (
                          <div key={idx}>{h}</div>
                        ))}
                      </div>

                      {/* Table Rows */}
                      <div className="divide-y divide-slate-200">
                        {sslData.pricing.rows.map((row, idx) => (
                          <div key={idx} className="grid grid-cols-2 p-4 text-center items-center">
                            <div className="font-semibold text-slate-750 text-sm">{row.name}</div>
                            <div className="font-mono text-slate-700 font-semibold text-sm">₹{row.price}</div>
                          </div>
                        ))}
                        {/* Total Cost & Order Box */}
                        <div className="grid grid-cols-2 p-5 text-center items-center bg-slate-50/50">
                          <div className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Total Cost</div>
                          <div className="flex justify-center">
                            <Link 
                              to={sslData.pricing.orderLink}
                              className="group block bg-gradient-to-r from-amber-400 via-orange-500 to-[#dc2626] hover:brightness-110 text-white p-4 rounded-xl shadow-lg border-0 text-center w-full max-w-[180px] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                            >
                              <div className="text-2xl font-extrabold font-mono text-white transition-colors">
                                ₹{sslData.pricing.totalCost}
                              </div>
                              <div className="w-full h-[1px] bg-white/20 my-2" />
                              <div className="text-[10px] font-extrabold uppercase tracking-widest text-white/95 group-hover:text-white">
                                ORDER NOW
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Additional Inclusions Footer */}
                    <div className="rounded-2xl border border-slate-200 shadow-lg overflow-hidden bg-white">
                      
                      {/* Gradient Sub-Header */}
                      <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-[#dc2626] text-white py-3 text-center font-extrabold text-xs uppercase tracking-widest">
                        Additional
                      </div>

                      {/* Three Column Features */}
                      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 p-4 text-center">
                        {sslData.additionalInclusions.map((item, idx) => (
                          <div key={idx} className="py-2 md:py-0 flex items-center justify-center space-x-2 text-slate-700 text-sm font-semibold">
                            <span className="text-[#dc2626] font-bold">*</span>
                            <span>{item}</span>
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={3} />
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Reusable premium CTA block */}
      <section className="bg-gradient-to-br from-[#ea580c] to-[#dc2626] text-white py-12 md:py-16 relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }} />
        </div>
        
        {/* Abstract vector glowing lights */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-orange-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-4 relative z-10">
          <span className="inline-block px-3 py-1.5 rounded-full bg-white/15 text-white border border-white/25 text-[10px] font-bold uppercase tracking-widest font-mono">
            {ctaData.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight text-white leading-tight">
            {ctaData.title}
          </h2>
          <p className="text-orange-100 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {ctaData.description}
          </p>

          <div className="pt-2">
            <Link 
              to={ctaData.ctaLink}
              className="inline-flex items-center space-x-2 bg-white text-[#dc2626] hover:bg-[#fff7ed] font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-md hover:shadow-lg group"
            >
              <span>{ctaData.ctaText}</span>
              <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
