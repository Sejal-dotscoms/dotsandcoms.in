import designImg from "../assets/images/affordable-web-design-Baroda-corporate-solutions.jpg";
import ecommerceImg from "../assets/images/ecommerce-website-development-Vadodara-custom.jpg";
import customImg from "../assets/images/custom-web-applications-Baroda-enterprise-solutions.jpg";

export const bannerData = {
  title: "Website Design",
  subtitle: "Custom, responsive, and conversion-focused web layouts designed to reflect your brand identity.",
  breadcrumbs: [
    { label: "Services", href: "/services" },
    { label: "Web Design" }
  ]
};

export const subServices = [
  {
    id: "website-design",
    num: "01",
    title: "Custom Website Design",
    subtitle: "Website Design & UI/UX",
    desc: "We create visually appealing, user-friendly websites focused on seamless navigation and strong UI/UX. Our designs are fully responsive, brand-consistent, and optimized for performance. By understanding user behavior, we build digital experiences that improve engagement and conversions.",
    features: [
      "Custom UI/UX & Responsive Layouts",
      "Brand-Consistent Visual Architecture",
      "Performance & Loading Speed Optimization",
      "User Behavior-Focused Navigation Flow",
      "Conversion Rate Optimization (CRO)"
    ],
    image: designImg,
    width: 1500,
    height: 938,
    glowColor: "bg-[#dc2626]/8",
    offsetBorder: "border-[#dc2626]/30"
  },
  {
    id: "ecommerce-development",
    num: "02",
    title: "Ecommerce Web & Mobile Applications",
    subtitle: "Ecommerce Web & Mobile Applications",
    desc: "We develop secure and scalable eCommerce platforms for web and mobile. Our solutions include payment gateway integration, product and order management, and stock control. With enterprise integrations and robust backend systems, we ensure smooth and reliable commerce operations.",
    features: [
      "Secure Payment Gateway Integration",
      "Robust Product & Order Management Systems",
      "Real-Time Stock & Inventory Control",
      "Enterprise ERP & CRM Integrations",
      "Scalable Backend Architectures"
    ],
    image: ecommerceImg,
    width: 1500,
    height: 1000,
    glowColor: "bg-[#ea580c]/8",
    offsetBorder: "border-[#ea580c]/30"
  },
  {
    id: "custom-applications",
    num: "03",
    title: "Custom Web & Mobile Application Development",
    subtitle: "Custom Web & Mobile Application Development",
    desc: "We build tailor-made web and mobile applications designed to meet specific business needs. Our applications focus on scalability, security, and seamless user experience. From UI/UX design to backend architecture, we deliver efficient, future-ready digital solutions.",
    features: [
      "Tailor-Made Web & Mobile Application Design",
      "Highly Secure & Scalable Frameworks",
      "Future-Ready Backend Architecture",
      "Fluid UI/UX & Interactive User Interface",
      "API Integrations & Custom Web Services"
    ],
    image: customImg,
    width: 1500,
    height: 1000,
    glowColor: "bg-[#eab308]/6",
    offsetBorder: "border-[#eab308]/30"
  }
];

export const ctaData = {
  badge: "Get Started",
  title: "Let’s Build Something Great Together!",
  description: "Let us bring your vision to life! Contact us today to receive a free, personalized web design quote tailored to your company's specific requirements. Our team is ready to provide a digital solution that will improve your online presence and produce results.",
  ctaText: "Get A Free Quote",
  ctaLink: "/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
};
