import { useEffect } from "react";
import InnerBanner from "../components/ui/InnerBanner";
import SitemapGrid from "../components/SitemapGrid";
import { setPageSEO } from "../utils/seo";

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "404 - Page Not Found | Dots & Coms",
      description: "The page you are looking for does not exist. Navigate using our sitemap below to find what you are looking for.",
      keywords: "404 error, page not found, error page, Dots and Coms",
      canonical: "https://www.dotsandcoms.in/404"
    });
  }, []);

  return (
    <>
      <InnerBanner
        title="404 - Page Not Found"
        subtitle="The page you are looking for might have been moved, deleted, or doesn't exist. Find your way using our sitemap directory below."
        breadcrumbs={[{ label: "Page Not Found" }]}
      />
      <h2 className="sr-only">Explore Pages and Links</h2>
      <SitemapGrid />
    </>
  );
}
