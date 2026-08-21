import { useEffect } from "react";
import InnerBanner from "../components/ui/InnerBanner";
import SitemapGrid from "../components/SitemapGrid";
import { setPageSEO } from "../utils/seo";

export default function SitemapPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Sitemap – Explore All Pages & Links | Dots & Coms Baroda",
      description: "Navigate through the corporate directory of Dots & Coms. Find links to website design, app development, blogs, hosting, and digital marketing.",
      keywords: "sitemap, dots and coms directory, website map, blogs directory, tech articles, navigation panel, Baroda, IT services list",
      canonical: "https://www.dotsandcoms.in/sitemap"
    });
  }, []);

  return (
    <>
      <InnerBanner
        title="Sitemap"
        subtitle={<>A comprehensive directory of pages, <strong>website design services</strong>, case studies, and corporate contact details at <strong>Dots & Coms</strong>.</>}
        breadcrumbs={[{ label: "Sitemap" }]}
      />
      <h2 className="sr-only">Corporate Directory and Website Map</h2>
      <SitemapGrid />
    </>
  );
}
