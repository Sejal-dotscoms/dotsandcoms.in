import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { setPageSEO } from "../utils/seo";
import { getPublicPosition } from "../services/vacancyService";
import JobDetailArticle from "../components/JobDetailArticle";
import NotFoundPage from "./NotFoundPage";

export default function JobDetailPage() {
  const { pathname } = useLocation();
  const raw = pathname.replace(/^\//, "").replace(/\/$/, "");
  const [job, setJob] = useState(undefined);

  useEffect(() => {
    if (raw.endsWith(".html")) return undefined;
    let alive = true;
    setJob(undefined);
    getPublicPosition(raw)
      .then((data) => { if (alive) setJob(data); })
      .catch(() => { if (alive) setJob(null); });
    return () => { alive = false; };
  }, [raw]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!job) return undefined;
    return setPageSEO({
      title: job.seoTitle,
      description: job.seoDescription,
      keywords: job.seoKeywords,
      canonical: `https://www.dotsandcoms.in/${job.slug}`,
    });
  }, [job]);

  if (raw.endsWith(".html")) {
    return <Navigate to={`/${raw.slice(0, -5)}`} replace />;
  }
  if (job === undefined) return null;
  if (!job) return <NotFoundPage />;

  return (
    <section className="bg-white pb-20 pt-36 sm:pt-44">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <JobDetailArticle job={job} />
      </div>
    </section>
  );
}
