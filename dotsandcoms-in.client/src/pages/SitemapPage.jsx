import { useEffect } from "react";
import InnerBanner from "../components/ui/InnerBanner";
import SitemapGrid from "../components/SitemapGrid";
import { setPageSEO } from "../utils/seo";

export default function SitemapPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Sitemap – Explore All Pages & Links | Dots & Coms Baroda",
      description: "Navigate through the entire corporate directory of Dots & Coms. Find links to website design, app development, hosting, and marketing solutions.",
      keywords: "sitemap, dots and coms directory, website map, navigation panel, Baroda, IT services list",
      canonical: "https://www.dotsandcoms.in/sitemap"
    });
  }, []);

  return (
    <>
      <InnerBanner
        title="Sitemap"
        subtitle="A comprehensive directory of pages, services, case studies, and corporate contact details at Dots & Coms."
        breadcrumbs={[{ label: "Sitemap" }]}
      />
      <h2 className="sr-only">Corporate Directory and Website Map</h2>
      <SitemapGrid />
    </>
  );
}
