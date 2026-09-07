import { useEffect } from "react";
import AboutUs from "../components/AboutUs/AboutUs";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";
import { getRouteSEO } from "../seo/publicRoutes";

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO(getRouteSEO("/about-web-development-company-baroda"));
  }, []);

  return (
      <>
          <InnerBanner
              title="About Us"
              subtitle={<>Pioneering custom <strong>web design</strong>, <strong>mobile products</strong>, and high-speed <strong>cloud engineering</strong> since 1999.</>}
              breadcrumbs={[{ label: "About Us" }]}
          />
          <AboutUs/>

      </>
  );
}

export default AboutPage;