import seoStrategyImg        from "../assets/images/SEO-strategy-Vadodara-content-marketing.png";
import webDesignImg           from "../assets/images/web-design-principles-Baroda-user-experience.png";
import websiteOptimImg        from "../assets/images/website-optimization-Vadodara-performance-growth.png";
import mobileAppImg           from "../assets/images/mobile-app-solutions-Baroda-business-growth.png";
import hostingImg             from "../assets/images/hosting-services-Vadodara-secure-servers.png";
import websiteAuditImg        from "../assets/images/website-audit-Baroda-technical-analysis.png";

export const bannerData = {
  title: "Web Stories",
  subtitle: "Explore quick, visual guides on search optimization, web technologies, hosting infrastructure, and mobile architecture.",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Web Stories" }
  ]
};

export const introData = {
  title: "Visual Stories on SEO, Web Development, Hosting & Digital Marketing",
  badge: "Visual Learning",
  description: "Raising Digital Presence through Expert SEO Solutions. Dots & Coms was founded in the height of the dotcom boom and has persevered through the ups and downs of technological advancement to become stronger than before. Established by the dynamic team of Kishore & Bharat, we set out on this adventure with the goal of using technology to create significant change. We have not only welcomed every technical advancement over the years, but we have also influenced its direction. With a team of driven people and a global presence today, we are at the forefront of innovation, consistently pushing the envelope and going above and beyond expectations."
};

export const webStories = [
  {
    id: 1,
    title: "Raising Digital Presence through Expert SEO Solutions",
    image: seoStrategyImg,
    url: "https://webstories.dotsandcoms.in/?web-story=seo-experts-social-media-marketing-company-vadodara",
    category: "SEO",
    accentColor: "#dc2626", // Red
    description: "Learn how expert search engine optimization can transform search rankings, drive organic reach, and improve brand visibility."
  },
  {
    id: 2,
    title: "Core principles of web design and their impact on user experience",
    image: webDesignImg,
    url: "https://webstories.dotsandcoms.in/?post_type=web-story&p=72",
    category: "Web Design",
      accentColor: "#dc2626", // Orange
    description: "Explore the fundamental design conventions, typography guidelines, and layout patterns that enhance user engagement."
  },
  {
    id: 3,
    title: "Maximise Your Website’s Potential with DotsandComs",
    image: websiteOptimImg,
    url: "https://webstories.dotsandcoms.in/?post_type=web-story&p=110",
    category: "Optimization",
      accentColor: "#dc2626", // Green
    description: "Discover actionable optimization strategies, cache controls, and hosting configs that yield ultra-fast page response times."
  },
  {
    id: 4,
    title: "Core Principles of Mobile App Development and Their Impact on User Experience",
    image: mobileAppImg,
    url: "https://webstories.dotsandcoms.in/?post_type=web-story&p=146",
    category: "Mobile Apps",
      accentColor: "#dc2626", // Blue
    description: "Understand the differences between native and hybrid workflows, multithreaded runtime pools, and responsive screens."
  },
  {
    id: 5,
    title: "Discovering Dedicated Web Hosting and Expert Support",
    image: hostingImg,
    url: "https://webstories.dotsandcoms.in/?post_type=web-story&p=329",
    category: "Web Hosting",
      accentColor: "#dc2626", // Purple
    description: "Unveil how dedicated hardware configurations, low tenant density ratios, and proactive monitoring keep your site online 24/7."
  },
  {
    id: 6,
    title: "Turns Missed Opportunities into Leads with a Free Website Audit",
    image: websiteAuditImg,
    url: "https://webstories.dotsandcoms.in/?post_type=web-story&p=6",
    category: "Marketing",
      accentColor: "#dc2626", // Pink
    description: "Find layout gaps, broken links, crawl errors, and slow performance bottlenecks by executing our detailed website health audits."
  }
];
