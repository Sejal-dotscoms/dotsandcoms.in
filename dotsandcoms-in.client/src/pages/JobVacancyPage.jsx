import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";
import { getRouteSEO } from "../seo/publicRoutes";
import { VACANCY_PATH, jobPath } from "../data/careers";
import { getPublicPositions } from "../services/vacancyService";

function Bullet({ item }) {
  if (typeof item === "string") return <li>{item}</li>;
  return (
    <li>
      {item.text}
      {item.children?.length > 0 && (
        <ul className="mt-1 list-[circle] space-y-1 pl-5 text-[15px]">
          {item.children.map((child) => (
            <li key={child}>{child}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function JobVacancyPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO(getRouteSEO(VACANCY_PATH));
  }, []);

  useEffect(() => {
    let alive = true;
    getPublicPositions()
      .then((data) => { if (alive) setJobs(data); })
      .catch((err) => { if (alive) setError(err.message || "The vacancy board could not be loaded."); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return (
    <>
      <InnerBanner
        title="Explore by positions - Location : Vadodara, Gujarat - India"
        breadcrumbs={[{ label: "Career", href: "/training-and-job-vacancy-at-dots-coms-vadodara" }, { label: "Vacancies" }]}
      />
      <section className="bg-[#f8fafc] py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="mx-auto mb-10 max-w-4xl text-center text-[15px] leading-relaxed text-slate-600">
            To achieve our vision, we are always looking forward to include in our team, Passionate ambitious and talented individuals. We are always on lookout for budding professionals and ready to nurture the talent of beginners.
          </p>
          {loading && <p className="text-center text-sm text-slate-500">Loading openings…</p>}
          {error && <p className="text-center text-sm text-red-600">{error}</p>}
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <article key={job.slug} className="flex h-full flex-col overflow-hidden rounded-md bg-[#333] text-white shadow-sm">
                <div className="flex h-[100px] items-center justify-center bg-[#d32f2f] px-4 text-center sm:h-[120px] xl:h-[100px]">
                  <h2 className="text-xl font-normal leading-7 text-white">
                    {job.cardTitle}
                    {(job.cardSubtitles || []).map((line) => (
                      <span key={line} className="mt-1 block text-sm font-medium leading-snug">
                        {line}
                      </span>
                    ))}
                  </h2>
                </div>
                <div className="relative flex flex-1 flex-col px-6 pb-16 pt-7 text-center">
                  <img src={job.iconUrl} alt="" className="mx-auto mb-2 h-[90px] w-[90px] rounded-full bg-white p-2" />
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-left text-base leading-6">
                    {(job.cardBullets || []).map((item) => (
                      <Bullet key={typeof item === "string" ? item : item.text} item={item} />
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    {job.isVacancyOpen ? (
                      <Link
                        to={jobPath(job.slug)}
                        className="inline-block bg-[#228B22] px-12 py-3 text-sm font-semibold text-white transition hover:bg-[#1C741C]"
                      >
                        View Details
                      </Link>
                    ) : (
                      <span className="inline-block cursor-default bg-[#D32F2F] px-8 py-3 text-sm font-semibold text-white">
                        NOT ACCEPTING APPLICATIONS
                      </span>
                    )}
                  </div>
                  {job.freshersCanApply && (
                    <div className="absolute inset-x-0 bottom-0 border border-[#d32f2f] bg-white px-3 py-3 text-center text-sm font-semibold tracking-wide text-[#d32f2f] shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
                      FRESHERS CAN ALSO APPLY
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
