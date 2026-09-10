import { useEffect } from "react";
import InnerBanner from "../components/ui/InnerBanner";
import SitemapGrid from "../components/SitemapGrid";
import { setPageSEO } from "../utils/seo";
import { getRouteSEO } from "../seo/publicRoutes";

export default function SitemapPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO(getRouteSEO("/sitemap"));
  }, []);

  return (
    <>
      <InnerBanner
        title="Sitemap"
        subtitle={<>A comprehensive directory of pages, <strong>website design services</strong>, case studies, and corporate contact details at <strong>Dots and Coms</strong>.</>}
        breadcrumbs={[{ label: "Sitemap" }]}
      />
      <h2 className="sr-only">Corporate Directory and Website Map</h2>
      <SitemapGrid />
    </>
  );
}
