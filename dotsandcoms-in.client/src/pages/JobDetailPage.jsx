import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { setPageSEO } from "../utils/seo";
import { APPLY_PATH } from "../data/careers";
import { getPublicPosition } from "../services/vacancyService";
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

  const apply = (
    <>
      {job.isVacancyOpen ? (
        <Link to={`${APPLY_PATH}/${job.slug}`} className="inline-flex rounded-full bg-[#dc2626] px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
          Apply Now (Job | Internship)
        </Link>
      ) : (
        <span className="inline-flex rounded-full bg-slate-400 px-5 py-3 text-sm font-semibold text-white">No Vacancies</span>
      )}
      {job.freshersCanApply && <p className="mt-2 text-sm font-semibold text-[#d32f2f]">*FRESHERS CAN ALSO APPLY</p>}
    </>
  );

  return (
    <section className="bg-white pb-20 pt-36 sm:pt-44">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className={job.skillIcons?.length ? "lg:col-span-8" : "lg:col-span-12"}>
            <div className="flex flex-col gap-6 border-b border-slate-100 pb-8 md:flex-row md:items-start md:justify-between">
              <div className="text-left">
                <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{job.pageHeading}</h1>
                {job.summary && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">{job.summary}</p>}
              </div>
              <div className="shrink-0 text-left md:text-right">{apply}</div>
            </div>

            <div
              className="job-body mt-8 text-left text-[15px] leading-relaxed text-slate-600 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-800 [&_li]:mt-2 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: job.bodyHtml || "" }}
            />

            <div className="mt-10">{apply}</div>
          </div>

          {job.skillIcons?.length > 0 && (
            <aside className="lg:col-span-4">
              <div className="flex flex-col gap-4">
                {job.skillIcons.map((icon) => (
                  <div key={icon.url} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <img src={icon.url} alt={icon.alt} className="mx-auto h-16 w-auto object-contain" />
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
