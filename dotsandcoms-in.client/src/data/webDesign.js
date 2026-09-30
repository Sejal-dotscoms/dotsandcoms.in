import designImg from "../assets/images/affordable-web-design-Baroda-corporate-solutions.jpg";
import ecommerceImg from "../assets/images/ecommerce-website-development-Vadodara-custom.jpg";
import customImg from "../assets/images/custom-web-applications-Baroda-enterprise-solutions.jpg";

export const bannerData = {
  title: "Website Design",
  subtitle: "Custom, <strong>responsive web design</strong>, and conversion-focused layouts designed to reflect your brand identity in <strong>Vadodara</strong>.",
  breadcrumbs: [
    { label: "Services", href: "/services" },
    { label: "Web Design" }
  ]
};

export const subServices = [
  {
    id: "website-design",
    num: "01",
        title: "Custom Website Design in Vadodara",
        subtitle: "Website Design & UI/UX",
        desc: "Dots and Coms designs custom, responsive websites for businesses in Vadodara and across India. Every site is built around how your customers browse, so it loads fast, is easy to navigate on any device, and turns visitors into enquiries.",
        features: [
            "Custom UI/UX design and responsive layouts",
            "Consistent branding across every page",
            "Fast loading speed and performance optimization",
            "Navigation planned around real user behaviour",
            "Conversion rate optimization (CRO)"
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
    title: "eCommerce Websites & Mobile Apps",
      subtitle: "eCommerce Development",
      desc: "We build secure, scalable online stores for web and mobile. Each store includes payment gateway integration, product and order management and stock control, connected to your existing business systems where needed.",
      features: [
      "Secure payment gateway integration",
          "Product and order management system",
      "Real-time stock and inventory control",
          "ERP and CRM integration",
      "Scalable backend that grows with your sales"
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
      title: "Custom Web & Mobile App Development",
      subtitle: "Custom Application Development",
      desc: "We build web and mobile applications tailored to how your business works, from UI/UX design to backend and API development. They are made to be secure, easy to use and ready to scale as you grow.",
      features: [
      "Custom web and mobile app design",
          "Secure, scalable frameworks",
      "Future-ready backend architecture",
      "Smooth, interactive user interface",
      "API integrations and custom web services"
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
    title: "Let's Build Your Website Together!",
    description: "Tell us what you need and we will send you a free, personalised website quote based on your requirements. Our team will suggest the right solution for your business and your budget.",
    ctaText: "Get a Free Quote",
  ctaLink: "/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
};
