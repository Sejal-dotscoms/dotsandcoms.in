import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getCareerPositions, getCareerStatuses, hideApplication, listApplications } from "../../../services/careerService";
import { ActionNotice, BusyButton, useActionNotices, useAdminFeedback } from "../../components/AdminFeedback";

const LISTS = {
  active: "Resume Management",
  old: "Old resumes",
  hidden: "Hidden resumes",
};

export default function ApplicationList() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { notify } = useAdminFeedback();
  const actions = useActionNotices();
  const list = params.get("list") || "active";
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [positions, setPositions] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(params.get("notice") || "");
  const toastedNotice = useRef(false);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const filters = {
    name: params.get("name") || "",
    gender: params.get("gender") || "",
    medium: params.get("medium") || "",
    position: params.get("position") || "",
    location: params.get("location") || "",
    registrationType: params.get("registrationType") || "",
    statusId: params.get("statusId") || "",
    experienceSort: params.get("experienceSort") || "desc",
    pageSize: params.get("pageSize") || "100",
    page: params.get("page") || "1",
  };

  useEffect(() => {
    getCareerPositions().then(setPositions).catch(() => {});
    getCareerStatuses(false).then(setStatuses).catch(() => {});
  }, []);

  useEffect(() => {
    const text = params.get("notice");
    if (!text || location.state?.toastShown || toastedNotice.current) return;
    toastedNotice.current = true;
    notify(text, "success");
  }, [location.state, notify, params]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    listApplications({ list, ...filters, pageSize: Number(filters.pageSize), page: Number(filters.page), statusId: filters.statusId || undefined })
      .then((data) => {
        if (!alive) return;
        setRows(data.items || []);
        setTotal(data.totalCount || 0);
        setError("");
      })
      .catch((err) => { if (alive) setError(err.message); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [params, reloadKey]);

  function update(next) {
    const merged = { ...filters, list, ...next };
    Object.keys(merged).forEach((key) => { if (!merged[key]) delete merged[key]; });
    if (merged.list === "active") delete merged.list;
    if (merged.experienceSort === "desc") delete merged.experienceSort;
    if (merged.pageSize === "100") delete merged.pageSize;
    if (merged.page === "1") delete merged.page;
    setParams(merged);
  }

  async function onDelete(id) {
    if (!window.confirm("Delete this resume?")) return;
    setNotice("");
    setError("");
    actions.begin(`delete-${id}`);
    try {
      const message = await hideApplication(id);
      const text = message || "Resume has been successfully deleted.";
      setNotice(text);
      actions.finish(`delete-${id}`, text, "success", { inline: false });
      setReloadKey((key) => key + 1);
    } catch (err) {
      actions.finish(`delete-${id}`, err.message, "error");
    }
  }

  const query = params.toString();

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{LISTS[list] || LISTS.active}</h1>
          <p className="text-sm text-gray-500">{total} resume{total === 1 ? "" : "s"}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          <Link className="text-red-600" to="/poweradmin/applications?list=old">Old resumes</Link>
          <Link className="text-red-600" to="/poweradmin/applications?list=hidden">Hidden resumes</Link>
          <Link className="text-red-600" to="/poweradmin/applications/mass-email">Send mass email</Link>
          {list !== "active" && <Link className="text-gray-600" to="/poweradmin/applications">Current resumes</Link>}
        </div>
      </div>
      {(notice || error) && (
        <div className="sticky top-0 z-20 mb-3 space-y-2 bg-gray-100">
          <ActionNotice notice={notice ? { type: "success", message: notice } : null} onClose={() => setNotice("")} className="" />
          <ActionNotice notice={error ? { type: "error", message: error } : null} onClose={() => setError("")} className="" />
        </div>
      )}

      <div className="mb-4 grid gap-2 rounded-xl border bg-white p-4 md:grid-cols-4">
        <input className="rounded-lg border px-3 py-2 text-sm" placeholder="Name" value={filters.name} onChange={(e) => update({ name: e.target.value, page: "1" })} />
        <select className="rounded-lg border px-3 py-2 text-sm" value={filters.experienceSort} onChange={(e) => update({ experienceSort: e.target.value, page: "1" })}>
          <option value="desc">Experience high to low</option>
          <option value="asc">Experience low to high</option>
        </select>
        <select className="rounded-lg border px-3 py-2 text-sm" value={filters.gender} onChange={(e) => update({ gender: e.target.value, page: "1" })}>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <select className="rounded-lg border px-3 py-2 text-sm" value={filters.medium} onChange={(e) => update({ medium: e.target.value, page: "1" })}>
          <option value="">School medium</option>
          {["English", "Gujarati", "Hindi", "Others"].map((item) => <option key={item}>{item}</option>)}
        </select>
        <select className="rounded-lg border px-3 py-2 text-sm" value={filters.position} onChange={(e) => update({ position: e.target.value, page: "1" })}>
          <option value="">Position</option>
          {positions.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
        </select>
        <select className="rounded-lg border px-3 py-2 text-sm" value={filters.location} onChange={(e) => update({ location: e.target.value, page: "1" })}>
          <option value="">Location</option>
          <option>Vadodara, India</option>
        </select>
        <select className="rounded-lg border px-3 py-2 text-sm" value={filters.registrationType} onChange={(e) => update({ registrationType: e.target.value, page: "1" })}>
          <option value="">Job or Internship</option>
          <option>Job</option>
          <option>Internship</option>
        </select>
        <select className="rounded-lg border px-3 py-2 text-sm" value={filters.statusId} onChange={(e) => update({ statusId: e.target.value, page: "1" })}>
          <option value="">Status</option>
          {statuses.map((item) => <option key={item.id} value={item.id}>{item.shortLabel}</option>)}
        </select>
        <select className="rounded-lg border px-3 py-2 text-sm" value={filters.pageSize} onChange={(e) => update({ pageSize: e.target.value, page: "1" })}>
          {["25", "50", "100", "200"].map((size) => <option key={size} value={size}>{size} / page</option>)}
        </select>
      </div>

      <div className="mb-4 flex flex-wrap gap-3 text-xs text-gray-600">
        {statuses.map((item) => (
          <span key={item.id} className="inline-flex items-center gap-1">
            <img src={`/careers/status/${item.icon}`} alt="" className="h-4 w-4" />
            {item.shortLabel}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              {["Name", "Experience", "Gender", "Medium", "Position", "Location", "Type", "Status", "Actions"].map((heading) => (
                <th key={heading} className={`px-3 py-3 font-medium ${heading === "Actions" ? "text-center" : ""}`}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td className="px-3 py-6 text-gray-400" colSpan={9}>Loading…</td></tr>}
            {!loading && rows.length === 0 && <tr><td className="px-3 py-6 text-gray-400" colSpan={9}>No resumes.</td></tr>}
            {rows.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="px-3 py-3">
                  <button type="button" className="font-medium text-red-600" onClick={() => navigate(`/poweradmin/applications/${row.id}?return=${encodeURIComponent(query)}`)}>{row.name}</button>
                </td>
                <td className="px-3 py-3">{row.experience}</td>
                <td className="px-3 py-3">{row.gender}</td>
                <td className="px-3 py-3">{row.schoolMedium}</td>
                <td className="px-3 py-3">{row.position}</td>
                <td className="px-3 py-3">{row.location}</td>
                <td className="px-3 py-3">{row.registrationType}</td>
                <td className="px-3 py-3" title={row.statusLabel}>
                  <img src={`/careers/status/${row.statusIcon}`} alt={row.statusLabel} className="h-5 w-5" />
                </td>
                <td className="px-3 py-3 text-center">
                  {list !== "hidden" && (
                    <div className="inline-flex flex-col items-center gap-2">
                      <BusyButton
                        busy={actions.isBusy(`delete-${row.id}`)}
                        busyLabel="Deleting…"
                        className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                        onClick={() => onDelete(row.id)}
                      >
                        Delete
                      </BusyButton>
                      <ActionNotice notice={actions.notices[`delete-${row.id}`]} onClose={() => actions.dismiss(`delete-${row.id}`)} className="mt-0" />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Page {filters.page}</span>
        <div className="flex gap-2">
          <button type="button" disabled={filters.page === "1"} className="rounded border px-3 py-1 disabled:opacity-40" onClick={() => update({ page: String(Number(filters.page) - 1) })}>Previous</button>
          <button type="button" disabled={Number(filters.page) * Number(filters.pageSize) >= total} className="rounded border px-3 py-1 disabled:opacity-40" onClick={() => update({ page: String(Number(filters.page) + 1) })}>Next</button>
        </div>
      </div>
    </div>
  );
}
