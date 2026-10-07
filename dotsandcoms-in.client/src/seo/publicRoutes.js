/**
 * Single source of truth for public marketing routes (sitemap + prerender + page SEO).
 * Add new indexable pages here — do not rely on App.jsx regex scraping.
 */
export const BASE_URL = "https://www.dotsandcoms.in";

/** @typedef {{ path: string, title: string, description: string, keywords: string, canonical: string, prerender: boolean, sitemap?: boolean, changefreq?: string, priority?: string, heading: string, summary: string }} PublicRoute */

/** @type {PublicRoute[]} */
export const PUBLIC_ROUTES = [
  {
    path: "/",
    title: "Website Design, Mobile App Development & Digital Marketing Company in Vadodara",
    description:
      "Dots and Coms has built websites, apps, and digital marketing campaigns for businesses across Vadodara since 1999. See how we can help you get found online.",
    keywords:
      "website design company Vadodara, mobile app development Vadodara, digital marketing agency Vadodara, web development company Baroda, IT company Vadodara",
    canonical: `${BASE_URL}/`,
    heading: "Website Design, Mobile App Development & Digital Marketing Agency in Vadodara",
    summary:
      "Dots and Coms has designed responsive websites, engineered mobile apps, and managed digital marketing campaigns for ambitious businesses in Vadodara and globally since 1999.",
    prerender: true,
    sitemap: true,
    changefreq: "daily",
    priority: "1.0",
  },
  {
    path: "/about-web-development-company-baroda",
    title: "About Dots and Coms — 19+ Years Building Websites & Apps in Vadodara",
    description:
      "Since 1999, Dots and Coms has delivered website design, mobile apps, hosting, and SEO for clients in Vadodara and beyond. Learn about our team and approach.",
    keywords:
      "Dots and Coms company, web development company Baroda, IT company since 1999, Vadodara software company",
    canonical: `${BASE_URL}/about-web-development-company-baroda`,
    heading: "About Dots and Coms Web Solutions",
    summary:
      "Established in 1999, Dots and Coms is a premier IT and web engineering agency in Vadodara delivering high-performance websites, mobile applications, and cloud hosting.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/website-mobile-app-development-company-portfolio-baroda",
    title: "Our Work: Website & Mobile App Portfolio | Dots and Coms Vadodara",
    description:
      "Browse real websites, e-commerce stores, and mobile apps we've built for clients across branding, online marketing, and back-office systems.",
    keywords:
      "web design portfolio Vadodara, mobile app portfolio, website development case studies, Dots and Coms projects",
    canonical: `${BASE_URL}/website-mobile-app-development-company-portfolio-baroda`,
    heading: "Our Work: Website & Mobile App Portfolio",
    summary:
      "Explore real-world web applications, e-commerce platforms, and native mobile apps engineered by Dots and Coms for diverse commercial and industrial clients.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/services",
    title: "Web Design, Mobile App & Digital Marketing Services",
    description:
      "Explore full-service digital solutions from Dots and Coms including responsive web design, app development, cloud hosting, SEO, and digital marketing.",
    keywords:
      "web design services Baroda, mobile app development services Vadodara, cloud hosting services Baroda, SEO services Vadodara, digital marketing agency Baroda, website development company Gujarat, IT services Baroda",
    canonical: `${BASE_URL}/services`,
    heading: "Web Design, Mobile App & Digital Marketing Services",
    summary:
      "Comprehensive digital technology services from custom responsive UI/UX web design and mobile app development to secure cloud hosting and ROI-focused digital marketing.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/responsive-website-designing-company-vadodara",
    title: "Website Design Company in Vadodara | Dots and Coms",
    description:
      "Dots and Coms is a Vadodara website design company building custom, responsive websites, eCommerce stores and web and mobile apps. Free quote available.",
    keywords:
      "responsive website design Vadodara, custom website design Baroda, e-commerce website development, website designing company Gujarat",
    canonical: `${BASE_URL}/responsive-website-designing-company-vadodara`,
    heading: "Responsive Website Designing Company in Vadodara",
    summary:
      "Crafting tailor-made, mobile-responsive, lightning-fast corporate websites, e-commerce portals, and modern web applications that turn visitors into loyal customers.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/android-ios-mobile-app-development-company-baroda",
    title: "Android, iOS & Flutter App Development Company in Vadodara",
    description:
      "Our team builds native Android and iOS apps and cross-platform Flutter apps — from concept through Play Store and App Store launch. Based in Vadodara, working globally.",
    keywords:
      "mobile app development Vadodara, Android app developers Baroda, iOS app development company, Flutter app development India",
    canonical: `${BASE_URL}/android-ios-mobile-app-development-company-baroda`,
    heading: "Android, iOS & Flutter Mobile App Development in Vadodara",
    summary:
      "Full-lifecycle mobile app development for Android, iOS, and Flutter, featuring intuitive UI/UX, robust API backends, and end-to-end app store deployment.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/windows-web-hosting-service-provider-baroda",
    title: "Windows & Cloud Web Hosting Services in Vadodara",
    description:
      "Reliable Windows, cloud, and reseller hosting for businesses in Baroda, backed by local support. Compare hosting plans and find the right fit for your site.",
    keywords:
      "web hosting Vadodara, Windows hosting Baroda, cloud hosting company Gujarat, reseller hosting India",
    canonical: `${BASE_URL}/windows-web-hosting-service-provider-baroda`,
    heading: "Windows & Cloud Web Hosting Services in Vadodara",
    summary:
      "High-speed SSD Windows server hosting, cloud hosting, and reseller server solutions backed by 99.9% uptime, SSL security, and expert local technical support.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/organic-seo-ppc-digital-marketing-vadodara",
    title: "Organic SEO, PPC & Digital Marketing Services in Vadodara",
    description:
      "Grow your search traffic and paid ad results with SEO, Google Ads, and social media marketing built for small and mid-size businesses in Vadodara.",
    keywords:
      "SEO company Vadodara, PPC agency Baroda, digital marketing services Gujarat, Google Ads management Vadodara, social media marketing company",
    canonical: `${BASE_URL}/organic-seo-ppc-digital-marketing-vadodara`,
    heading: "Organic SEO, PPC & Digital Marketing Services in Vadodara",
    summary:
      "Data-backed organic search optimization, targeted Google Ads campaigns, and social media marketing designed to increase qualified leads and business revenues.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/contact-webdesign-mobileapp-socialmedia-marketing-baroda",
    title: "Contact Dots and Coms | Website & Digital Marketing Company in Vadodara",
    description:
      "Get in touch for a free quote on website design, app development, hosting, or digital marketing. Based on Gotri Road, Vadodara — serving clients globally.",
    keywords:
      "contact Dots and Coms, web design company Vadodara address, IT company Gotri Road",
    canonical: `${BASE_URL}/contact-webdesign-mobileapp-socialmedia-marketing-baroda`,
    heading: "Contact Dots and Coms Vadodara",
    summary:
      "Connect with our digital consultants on Gotri Road, Vadodara for website development, mobile application inquiries, cloud hosting setups, or custom project estimates.",
    prerender: true,
    sitemap: true,
    priority: "0.9",
  },
  {
    path: "/webhosting-vps-dedicated-server-support-baroda",
    title: "VPS & Dedicated Server Hosting in Vadodara | Enterprise-Grade Infrastructure",
    description:
      "Intel Xeon-powered dedicated servers and VPS hosting with 99.99% uptime and 24/7 support — built for mission-critical business applications.",
    keywords:
      "dedicated server hosting Vadodara, VPS hosting Baroda, enterprise hosting India, 99.99% uptime hosting",
    canonical: `${BASE_URL}/webhosting-vps-dedicated-server-support-baroda`,
    heading: "VPS & Dedicated Server Hosting in Vadodara",
    summary:
      "Enterprise Intel Xeon dedicated servers and scalable VPS hosting with 99.99% network uptime SLA, hardware RAID, DDOS protection, and 24/7 technical management.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/faqs-web-design-hosting-digital-marketing",
    title: "Frequently Asked Questions — Web Design, Hosting & Digital Marketing | Dots and Coms",
    description:
      "Answers to common questions about website costs, timelines, hosting, and digital marketing services from Dots and Coms in Vadodara.",
    keywords:
      "web design FAQ, website cost Vadodara, how long does website design take, digital marketing questions",
    canonical: `${BASE_URL}/faqs-web-design-hosting-digital-marketing`,
    heading: "Frequently Asked Questions — Web Design, Hosting & Digital Marketing",
    summary:
      "Answers to frequently asked questions regarding web design timelines, development pricing, responsive capabilities, web hosting configurations, and SEO strategies.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/web-stories",
    title: "Web Stories | Dots and Coms",
    description:
      "Quick visual stories on web design tips, app trends, and digital marketing from Dots and Coms.",
    keywords:
      "web stories, web design tips, Dots and Coms visual content",
    canonical: `${BASE_URL}/web-stories`,
    heading: "Web Stories | Dots and Coms",
    summary:
      "Engaging visual stories and bite-sized insights covering modern web design trends, mobile user experience, and search optimization techniques.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/terms-and-conditions",
    title: "Terms & Conditions | Privacy Policy | Dots and Coms Baroda",
    description:
      "Read the terms and conditions and privacy policy for using Dots and Coms web design, mobile app development, hosting, and digital marketing services.",
    keywords:
      "terms and conditions Dots and Coms, privacy policy web design company, website usage terms Baroda, digital agency terms Gujarat, web hosting terms Vadodara",
    canonical: `${BASE_URL}/terms-and-conditions`,
    heading: "Terms & Conditions & Privacy Policy",
    summary:
      "Our terms of service, privacy practices, data handling policies, and service level agreements for all Dots and Coms products and consulting services.",
    prerender: true,
    sitemap: true,
    priority: "0.3",
    changefreq: "monthly",
  },
  {
    path: "/sitemap",
    title: "Sitemap – Explore All Pages & Links | Dots and Coms Baroda",
    description:
      "Navigate through the corporate directory of Dots and Coms. Find links to website design, app development, blogs, hosting, and digital marketing.",
    keywords:
      "sitemap, dots and coms directory, website map, blogs directory, tech articles, navigation panel, Baroda, IT services list",
    canonical: `${BASE_URL}/sitemap`,
    heading: "Sitemap – Explore All Pages & Links",
    summary:
      "Complete navigation directory of Dots and Coms containing verified direct links to our services, industry case studies, technology stacks, and company resources.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/404",
    title: "404 - Page Not Found | Dots and Coms",
    description: "The page you requested could not be found on Dots and Coms.",
    keywords: "404, page not found, Dots and Coms",
    canonical: `${BASE_URL}/404`,
    heading: "404 - Page Not Found",
    summary:
      "The page you requested could not be found. Please check the URL or use our navigation menu to discover our web and mobile services.",
    prerender: true,
    sitemap: false,
  },
  {
    path: "/case-studies",
    title: "Client Case Studies & B2B Digital Transformation Stories | Dots and Coms Vadodara",
    description:
      "Explore real case studies showing how Dots and Coms transformed traditional businesses and industrial companies into digital lead generation engines across Vadodara and India.",
    keywords:
      "case studies, website design case studies Vadodara, B2B digital transformation, web development portfolio Gujarat, industrial lead generation case studies",
    canonical: `${BASE_URL}/case-studies`,
    heading: "Client Case Studies & B2B Digital Transformation Stories",
    summary:
      "Documented real-world case studies demonstrating how Dots and Coms engineered digital transformations, SEO pipelines, and lead generation for manufacturing and B2B leaders.",
    prerender: true,
    sitemap: true,
    priority: "0.9",
  },
  {
    path: "/accutechlabels-case-study-traditional-to-web-business",
    title: "Accutech Labels Case Study – Web Business Transformation",
    description:
      "Discover how Dots and Coms transformed Accutech Labels from a traditional business into a digital lead engine using web design, SEO, and digital marketing.",
    keywords:
      "Accutech Labels case study, digital transformation Baroda, web design case study Vadodara, SEO case study Gujarat, lead generation website, packaging company website design",
    canonical: `${BASE_URL}/accutechlabels-case-study-traditional-to-web-business`,
    heading: "Accutech Labels Case Study – Web Business Transformation",
    summary:
      "Learn how Dots and Coms modernized Accutech Labels through custom industrial web design, catalog architecture, and high-ranking technical SEO.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/1life-case-study-of-regional-to-national-reach",
    title: "1Life Case Study – Regional to National Digital Reach",
    description:
      "See how Dots and Coms helped 1Life expand from a regional presence to national reach through strategic website design, SEO, and marketing campaigns.",
    keywords:
      "1Life case study, regional to national digital marketing, website design case study Gujarat, national SEO campaign India, business growth digital marketing Baroda",
    canonical: `${BASE_URL}/1life-case-study-of-regional-to-national-reach`,
    heading: "1Life Case Study – Regional to National Digital Reach",
    summary:
      "Case study showcasing the national expansion of 1Life counseling services through responsive web restructuring and nationwide organic search campaigns.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/auro-pumps-case-study-traditional-to-digital-lead-engine",
    title: "Auro Pumps Case Study – Traditional Business to Digital Lead Engine",
    description:
      "See how Dots and Coms helped Auro Pumps transform from a traditional 40-year-old industrial pump manufacturer into a 24/7 B2B digital lead generation engine.",
    keywords:
      "Auro Pumps case study, industrial pump manufacturer website Baroda, B2B website design Vadodara, industrial lead generation Gujarat, POMPE VERGANI pumps web design",
    canonical: `${BASE_URL}/auro-pumps-case-study-traditional-to-digital-lead-engine`,
    heading: "Auro Pumps Case Study – Traditional Business to Digital Lead Engine",
    summary:
      "Discover how a 40-year industrial pump manufacturer transformed its sales pipeline into a global 24/7 B2B digital lead engine with Dots and Coms.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/himile-india-case-study-global-manufacturing-digital-voice",
    title: "Himile India Case Study – Multinational Corporate Web Design & Strategy",
    description:
      "Discover how Dots and Coms helped Himile India structure and build a multi-vertical corporate website for tire molds, CNC tools, compressors & heat exchangers.",
    keywords:
      "Himile India case study, Himile corporate website design, industrial manufacturing website Baroda, tire mold manufacturer website, CNC machine tools web design, industrial corporate website Gujarat",
    canonical: `${BASE_URL}/himile-india-case-study-global-manufacturing-digital-voice`,
    heading: "Himile India Case Study – Multinational Corporate Web Design & Strategy",
    summary:
      "Strategic case study on structuring and delivering a multi-vertical corporate web presence for multinational manufacturing leader Himile India.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/order-now",
    title: "Complete Your Order | Dots and Coms",
    description:
      "Securely order web hosting and related services. Blazing fast SSD network performance and professional support with Dots and Coms Baroda.",
    keywords:
      "web hosting order, buy ssl certificate, checkout page Dots and Coms, windows hosting Baroda, secure server purchase",
    canonical: `${BASE_URL}/order-now`,
    heading: "Complete Your Order | Dots and Coms",
    summary:
      "Order your web hosting, dedicated server, or cloud hosting solution securely through the official Dots and Coms checkout portal.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/free-seo-performance-website-audit",
    title: "Free SEO & Website Performance Audit | Dots and Coms",
    description:
      "Get a free SEO and website performance audit from Dots and Coms, Vadodara. Uncover speed, ranking & optimization issues — book your audit today.",
    keywords:
      "free SEO audit, website performance audit, SEO audit Vadodara, website speed audit, free website audit, SEO analysis tool, digital marketing audit, website health check Vadodara",
    canonical: `${BASE_URL}/free-seo-performance-website-audit`,
    heading: "Free SEO & Website Performance Audit",
    summary:
      "Request a complimentary SEO and website speed audit from Dots and Coms to identify technical indexing errors, ranking opportunities, and performance bottlenecks.",
    prerender: true,
    sitemap: true,
  },
  {
    path: "/blogs",
    title: "Blog | Web Design, App Development & Digital Marketing Insights",
    description:
      "Practical guides on website design, mobile apps, SEO, and digital marketing for businesses in Vadodara and beyond.",
    keywords:
      "web design blog, digital marketing tips Vadodara, mobile app development guides",
    canonical: `${BASE_URL}/blogs`,
    heading: "Blog | Web Design, App Development & Digital Marketing Insights",
    summary:
      "In-depth articles, development guides, and actionable marketing strategies written by experienced web and mobile engineers at Dots and Coms.",
    prerender: false,
    sitemap: true,
  },
  // Transactional: not prerendered; ASP.NET injects unique meta + minimal #seo-content from spa-shell
  {
    path: "/web-hosting-details",
    title: "Web Hosting Order Details | Dots and Coms",
    description:
      "View and process your web hosting order details. Enjoy secure transactions, 99.9% uptime, and robust cloud hosting setups with Dots and Coms Baroda.",
    keywords:
      "hosting order details, invoice tracking, web hosting setup, secure hosting payment, Dots and Coms",
    canonical: `${BASE_URL}/web-hosting-details`,
    heading: "Web Hosting Order Details",
    summary:
      "Review your server deployment parameters, billing terms, and hosting configuration details before finalizing your order.",
    prerender: false,
    sitemap: false,
  },
  {
    path: "/thank-you",
    title: "Thank You for Your Order | Dots and Coms",
    description:
      "Thank you for choosing Dots and Coms. Your order has been placed successfully. Our technical team will reach out to you shortly to assist with your setup.",
    keywords: "thank you page, order success, checkout complete, Dots and Coms",
    canonical: `${BASE_URL}/thank-you`,
    heading: "Thank You for Your Order",
    summary:
      "Thank you for your business. Your order has been logged and assigned to our systems team for rapid setup and confirmation.",
    prerender: false,
    sitemap: false,
  },
];

/** Routes that should be prerendered at build time. */
export function getPrerenderRoutes() {
  return PUBLIC_ROUTES.filter((r) => r.prerender);
}

/** Routes included in sitemap.xml / sitemap.html (static paths only). */
export function getSitemapRoutes() {
  return PUBLIC_ROUTES.filter((r) => r.sitemap !== false);
}

/**
 * @param {string} path
 * @returns {PublicRoute | undefined}
 */
export function getRouteByPath(path) {
  const normalized =
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path || "/";
  return PUBLIC_ROUTES.find((r) => r.path === normalized);
}

/**
 * SEO fields for setPageSEO() from the registry.
 * @param {string} path
 */
export function getRouteSEO(path) {
  const route = getRouteByPath(path);
  if (!route) return null;
  return {
    title: route.title,
    description: route.description,
    keywords: route.keywords,
    canonical: route.canonical,
  };
}
