import { useEffect } from "react";
import FAQSection from "../components/FAQ/FAQSection";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";

function FaqPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "FAQs – Web Design, Mobile App & Hosting Questions | Dots & Coms",
      description: "Find answers to frequently asked questions about website design, mobile app development, web hosting, SEO services, and digital marketing at Dots & Coms, Baroda.",
      keywords: "web design FAQ Vadodara, mobile app development questions, web hosting FAQ Baroda, SEO services FAQ, digital marketing questions, website development Baroda FAQ, Dots and Coms FAQ",
      canonical: "https://www.dotsandcoms.in/faqs-web-design-hosting-digital-marketing",
    });
  }, []);

  return (
      <>
          <InnerBanner
              title="Frequently Asked Questions"
              breadcrumbs={[{ label: "FAQ" }]}
          />
          <FAQSection/>
      </>
  );
}

export default FaqPage;