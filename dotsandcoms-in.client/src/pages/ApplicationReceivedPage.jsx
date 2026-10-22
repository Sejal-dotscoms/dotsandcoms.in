import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { STATUS_PATH, VACANCY_PATH } from "../data/careers";

function noIndex() {
  let el = document.querySelector("meta[name='robots']");
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "robots");
    document.head.appendChild(el);
  }
  el.setAttribute("content", "noindex, nofollow");
}

export default function ApplicationReceivedPage() {
  const location = useLocation();
  const [result, setResult] = useState(location.state);

  useEffect(() => {
    document.title = "Application Received | Dots and Coms Careers";
    noIndex();
    window.scrollTo(0, 0);
    if (!location.state) {
      try {
        const saved = sessionStorage.getItem("careerReference");
        if (saved) setResult(JSON.parse(saved));
      } catch { /* ignore */ }
    }
  }, [location.state]);

  return (
    <section className="bg-[#f8fafc] pb-20 pt-36 sm:pt-44">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="font-heading text-3xl font-extrabold text-slate-900">Application received</h1>
          <p className="mt-4 text-slate-600">
            {result?.jobTitle
              ? `Your application for ${result.jobTitle} is with the team.`
              : "Your application is with the team."}
          </p>
          {result?.referenceCode && (
            <p className="mt-6 text-sm text-slate-500">
              Application reference code
              <span className="mt-1 block text-2xl font-extrabold text-[#dc2626]">{result.referenceCode}</span>
            </p>
          )}
          <p className="mt-4 text-sm text-slate-600">The same code has been emailed to you. Use it when you check your status.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to={STATUS_PATH} className="rounded-full bg-[#dc2626] px-5 py-2.5 text-sm font-semibold text-white">Check status</Link>
            <Link to={VACANCY_PATH} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">Vacancies</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
