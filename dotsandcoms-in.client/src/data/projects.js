import { Globe, Smartphone, ShoppingBag } from "lucide-react";
import rubaminVideo   from "../assets/videos/rubamin-website-design.mp4";
import alembicVideo   from "../assets/videos/alembic-video-webdesign.mp4";
import fujiVideo      from "../assets/videos/fuji-robotics-web-design.mp4";
import bookprathaVideo from "../assets/videos/bookpratha-ecommerce.mp4";
import quickCabVideo  from "../assets/videos/quick-cab-web-design.mp4";
import tclVideo       from "../assets/videos/tcl-web-design.mp4";
import absoluteVideo  from "../assets/videos/absolute-scale-web-design.mp4";
import technoVideo    from "../assets/videos/techno-chemicals-web-design.mp4";
import khatuVideo     from "../assets/videos/khatu-tmt-web-design.mp4";
import customLogo     from "../assets/videos/custom-logo-design.mp4";

// Mobile app images — all now available locally
import androidAppImg  from "../assets/images/Android-application-Vadodara-smart-solutions.png";
import iosAppImg      from "../assets/images/iOS-mobile-app-Baroda-user-friendly-design.png";
import flutterAppImg  from "../assets/images/Flutter-mobile-app-Vadodara-cross-platform-ui.png";
import hybridAppImg   from "../assets/images/hybrid-app-development-Baroda-scalable-apps.png";
import mobileEntImg   from "../assets/images/mobile-software-solutions-Vadodara-enterprise.png";
import vpsHostImg     from "../assets/images/VPS-hosting-Vadodara-high-speed-servers.png";

// Web design thumbnails — must be placed in public/assets/ on the server
// (these are screenshot images from the live site, not stored locally)
const webThumb = (name) => `/assets/${name}`;

export const projects = [
  {
    id: 1,
    title: "Rubamin",
    location: "Vadodara, India",
    category: "Web Design",
    link: "https://www.rubamin.com/",
    webp: webThumb("search-engine-optimization-Vadodara-ranking-growth.webp"),
    png:  webThumb("search-engine-optimization-Vadodara-ranking-growth.png"),
    video: rubaminVideo,
    accent: "#dc2626",
    icon: Globe
  },
  {
    id: 3,
    title: "Alembic Pharmaceuticals",
    location: "Vadodara, India",
    category: "Web Design",
    link: "https://alembicpharmaceuticals.com/",
    webp: webThumb("responsive-design-Vadodara-modern-websites.webp"),
    png:  webThumb("responsive-design-Vadodara-modern-websites.png"),
    video: alembicVideo,
    accent: "#059669",
    icon: Globe
  },
  {
    id: 6,
    title: "Book Pratha E-Commerce",
    location: "Bhavnagar, India",
    category: "Web Design",
    link: "https://www.bookpratha.com/",
    webp: webThumb("domain-registration-Baroda-secure-services.webp"),
    png:  webThumb("domain-registration-Baroda-secure-services.png"),
    video: bookprathaVideo,
    accent: "#db2777",
    icon: ShoppingBag
  },
  {
    id: 7,
    title: "The Quick Cab Intercity Expert",
    location: "Vadodara, India",
    category: "Web Design",
    link: "https://www.thequickcab.com/",
    webp: webThumb("SSL-certificates-Vadodara-website-security.webp"),
    png:  webThumb("SSL-certificates-Vadodara-website-security.png"),
    video: quickCabVideo,
    accent: "#eab308",
    icon: Globe
  },
  {
    id: 2,
    title: "Custom Logo Design",
    location: "Vadodara, India",
    category: "Web Design",
    link: "https://www.customlogodesigner.com/",
    webp: webThumb("PPC-management-Baroda-google-ads-experts.webp"),
    png:  webThumb("PPC-management-Baroda-google-ads-experts.png"),
    video: customLogo,
    accent: "#0284c7",
    icon: ShoppingBag
  },
  {
    id: 10,
    title: "Techno Chemicals",
    location: "Vadodara, India",
    category: "Web Design",
    link: "https://www.technochemicals.in/",
    webp: webThumb("corporate-branding-Vadodara-digital-identity.webp"),
    png:  webThumb("corporate-branding-Vadodara-digital-identity.png"),
    video: technoVideo,
    accent: "#0891b2",
    icon: Globe
  },
  {
    id: 8,
    title: "Khatu TMT",
    location: "Vadodara, India",
    category: "Web Design",
    link: "http://khatutmt.com/",
    webp: webThumb("CMS-website-development-Baroda-dynamic-sites.webp"),
    png:  webThumb("CMS-website-development-Baroda-dynamic-sites.png"),
    video: khatuVideo,
    accent: "#7c3aed",
    icon: Globe
  },
  {
    id: 12,
    title: "Absolute Entertainment",
    location: "Ronkonkoma, New York",
    category: "Web Design",
    link: "https://absolutedjs.com/",
    webp: webThumb("Google-Ads-services-Baroda-campaign-management.webp"),
    png:  webThumb("Google-Ads-services-Baroda-campaign-management.png"),
    video: absoluteVideo,
    accent: "#c026d3",
    icon: Globe
  },
  {
    id: 9,
    title: "Tamboli Castings Limited",
    location: "Bhavnagar, India",
    category: "Web Design",
    link: "https://www.tambolicastingslimited.com/",
    webp: webThumb("corporate-branding-Vadodara-digital-identity.webp"),
    png:  webThumb("corporate-branding-Vadodara-digital-identity.png"),
    video: tclVideo,
    accent: "#0891b2",
    icon: Globe
  },
  {
    id: 5,
    title: "Fuji Robotics",
    location: "Ahmedabad, India",
    category: "Web Design",
    link: "https://www.fujiroboticsindia.com/",
    webp: webThumb("cloud-hosting-Vadodara-scalable-infrastructure.webp"),
    png:  webThumb("cloud-hosting-Vadodara-scalable-infrastructure.png"),
    video: fujiVideo,
    accent: "#2563eb",
    icon: Globe
  },

  // ── Mobile Apps ──────────────────────────────────────────────────────────
  {
    id: 13,
    title: "The Quick Cab",
    category: "Mobile Apps",
    link: "https://play.google.com/store/apps/details?id=com.dotsandcoms.the_quick_cab&pcampaignid=web_share",
    webp: androidAppImg,
    png:  androidAppImg,
    accent: "#dc2626",
    icon: Smartphone
  },
  {
    id: 14,
    title: "Book Pratha App",
    category: "Mobile Apps",
    link: "https://play.google.com/store/apps/details?id=prathambooks.bookpratha&pcampaignid=web_share",
    webp: iosAppImg,
    png:  iosAppImg,
    accent: "#2563eb",
    icon: Smartphone
  },
  {
    id: 15,
    title: "Suposhan",
    category: "Mobile Apps",
    link: "https://play.google.com/store/apps/details?id=com.dnc.suposhan&pcampaignid=web_share",
    webp: flutterAppImg,
    png:  flutterAppImg,
    accent: "#059669",
    icon: Smartphone
  },
  {
    id: 16,
    title: "Sarjan",
    category: "Mobile Apps",
    link: "https://play.google.com/store/apps/details?id=com.dotsandcoms.sarjan",
    webp: hybridAppImg,
    png:  hybridAppImg,
    accent: "#4f46e5",
    icon: Smartphone
  },
  {
    id: 17,
    title: "JMS Enterprise",
    category: "Mobile Apps",
    link: "https://play.google.com/store/apps/details?id=com.dnc.jms",
    webp: mobileEntImg,
    png:  mobileEntImg,
    accent: "#0d9488",
    icon: Smartphone
  },
  {
    id: 18,
    title: "All My Stuff",
    category: "Mobile Apps",
    link: "https://play.google.com/store/apps/details?id=com.dnc.all_my_stuff",
    webp: vpsHostImg,
    png:  vpsHostImg,
    accent: "#06b6d4",
    icon: Smartphone
  }
];
