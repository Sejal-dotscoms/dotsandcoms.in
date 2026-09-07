import { useEffect } from "react";
import FAQSection from "../components/FAQ/FAQSection";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";
import { getRouteSEO } from "../seo/publicRoutes";

function FaqPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO(getRouteSEO("/faqs-web-design-hosting-digital-marketing"));
  }, []);

  return (
      <>
          <InnerBanner
              title="Frequently Asked Questions"
              subtitle={<>Answers to common questions about <strong>website design</strong>, <strong>mobile app development</strong>, <strong>web hosting</strong>, and <strong>SEO services</strong>.</>}
              breadcrumbs={[{ label: "FAQ" }]}
          />
          <FAQSection/>
      </>
  );
}

export default FaqPage;