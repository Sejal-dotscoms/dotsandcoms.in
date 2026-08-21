import { useEffect } from "react";
import TechnicalSupport from "../components/TechnicalSupport/TechnicalSupport";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";

function TechnicalSupportPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Tech Support for Web Hosting & Cloud Hosting Vadodara",
      description: "Technical support for Windows and Linux web hosting, VPS, cloud hosting, and dedicated servers in Vadodara with secure infrastructure management.",
      keywords: "web hosting Vadodara, windows hosting Vadodara, linux hosting Vadodara, VPS hosting Vadodara, cloud hosting Vadodara, dedicated server Vadodara, VPS provider India, secure hosting provider",
      canonical: "https://www.dotsandcoms.in/webhosting-vps-dedicated-server-support-baroda"
    });
  }, []);

  return (
      <>
          <InnerBanner
              title="Technical Support"
              subtitle={<>Submit <strong>server maintenance requests</strong>, track domain ticket statuses, or initiate troubleshooting protocols for <strong>cloud hosting</strong>.</>}
              breadcrumbs={[{ label: "Technical Support" }]}
          />
          <TechnicalSupport/>
      </>
  );
}

export default TechnicalSupportPage;