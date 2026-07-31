import { useEffect } from "react";
import AboutUs from "../components/AboutUs/AboutUs";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "About Dots & Coms – Web Development Company in Baroda",
      description: "Learn about Dots & Coms, a web development company in Baroda with 19+ years of experience in website design, mobile app development, SEO services, and web hosting solutions.",
      keywords: "web development company Baroda, website designing and development Vadodara, web hosting services Baroda, android and ios app development services, ecommerce website development, web based services, logo and brochure designing, SEO services Vadodara",
      canonical: "https://www.dotsandcoms.in/about-web-development-company-baroda",
    });
  }, []);

  return (
      <>
          <InnerBanner
              title="About Us"
              subtitle="Pioneering custom web design, mobile products, and high-speed cloud engineering since 1999."
              breadcrumbs={[{ label: "About Us" }]}
          />
          <AboutUs/>

      </>
  );
}

export default AboutPage;