import { Link } from "react-router-dom";
import { APPLY_PATH } from "../data/careers";

const APPLY_OPEN = "inline-flex rounded-full bg-[#dc2626] px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700";
const APPLY_CLOSED = "inline-flex rounded-full bg-slate-400 px-5 py-3 text-sm font-semibold text-white";
const BODY_CLASS = "job-body mt-8 text-left text-[15px] leading-relaxed text-slate-600 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-slate-800 [&_li]:mt-2 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6";

export default function JobDetailArticle({ job, interactive = true, contained = false }) {
  const icons = (job.skillIcons || []).filter((icon) => icon?.url);
  const heading = job.pageHeading?.trim();
  const gridClass = contained
    ? "grid items-start gap-8 @min-[680px]:grid-cols-12"
    : "grid items-start gap-8 lg:grid-cols-12";
  const mainClass = contained
    ? (icons.length ? "@min-[680px]:col-span-8" : "@min-[680px]:col-span-12")
    : (icons.length ? "lg:col-span-8" : "lg:col-span-12");
  const rowClass = contained
    ? "flex flex-col gap-6 border-b border-slate-100 pb-8 @min-[520px]:flex-row @min-[520px]:items-start @min-[520px]:justify-between"
    : "flex flex-col gap-6 border-b border-slate-100 pb-8 md:flex-row md:items-start md:justify-between";
  const headingClass = contained
    ? "font-heading text-3xl font-extrabold tracking-tight text-slate-900 @min-[520px]:text-4xl"
    : "font-heading text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl";
  const applyClass = contained ? "shrink-0 text-left @min-[520px]:text-right" : "shrink-0 text-left md:text-right";
  const asideClass = contained ? "@min-[680px]:col-span-4" : "lg:col-span-4";

  const apply = (
    <>
      {job.isVacancyOpen ? (
        interactive ? (
          <Link to={`${APPLY_PATH}/${job.slug}`} className={APPLY_OPEN}>
            Apply Now (Job | Internship)
          </Link>
        ) : (
          <span className={APPLY_OPEN}>Apply Now (Job | Internship)</span>
        )
      ) : (
        <span className={APPLY_CLOSED}>No Vacancies</span>
      )}
      {job.freshersCanApply && <p className="mt-2 text-sm font-semibold text-[#d32f2f]">*FRESHERS CAN ALSO APPLY</p>}
    </>
  );

  return (
    <div className={gridClass}>
      <div className={mainClass}>
        <div className={rowClass}>
          <div className="min-w-0 flex-1 text-left">
            <h1 className={headingClass}>
              {heading || (!interactive && <span className="text-slate-300">Page heading</span>)}
            </h1>
            {job.summary?.trim() && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">{job.summary}</p>}
          </div>
          <div className={applyClass}>{apply}</div>
        </div>

        {job.bodyHtml?.trim() ? (
          <div className={BODY_CLASS} dangerouslySetInnerHTML={{ __html: job.bodyHtml }} />
        ) : (
          !interactive && <p className="mt-8 text-[15px] text-slate-300">Inner page content appears here.</p>
        )}

        <div className="mt-10">{apply}</div>
      </div>

      {icons.length > 0 && (
        <aside className={asideClass}>
          <div className="flex flex-col gap-4">
            {icons.map((icon, index) => (
              <div key={`${icon.url}-${index}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <img src={icon.url} alt={icon.alt || ""} className="mx-auto h-16 w-auto object-contain" />
              </div>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
