import { useEffect } from "react";
import TechnicalSupport from "../components/TechnicalSupport/TechnicalSupport";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";
import { getRouteSEO } from "../seo/publicRoutes";

function TechnicalSupportPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO(getRouteSEO("/webhosting-vps-dedicated-server-support-baroda"));
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