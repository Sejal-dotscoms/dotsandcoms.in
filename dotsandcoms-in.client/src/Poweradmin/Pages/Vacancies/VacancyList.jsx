import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteVacancy, getVacancies, updateVacancyFlags } from "../../../services/vacancyService";
import { ActionNotice, BusyButton, useActionNotices } from "../../components/AdminFeedback";

function FlagSwitch({ checked, disabled, label, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-green-600" : "bg-red-600"} ${disabled ? "cursor-wait opacity-60" : "cursor-pointer"}`}
    >
      <span className={`absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : ""}`} />
    </button>
  );
}

export default function VacancyList() {
  const navigate = useNavigate();
  const actions = useActionNotices();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [savingId, setSavingId] = useState(0);

  useEffect(() => {
    let alive = true;
    getVacancies()
      .then((data) => { if (alive) setRows(data); })
      .catch((err) => { if (alive) setError(err.message); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  async function toggleFlag(row, field) {
    if (savingId) return;
    const next = { ...row, [field]: !row[field] };
    setSavingId(row.id);
    setRows((current) => current.map((item) => item.id === row.id ? next : item));
    setError("");
    try {
      await updateVacancyFlags(row.id, {
        isVacancyOpen: next.isVacancyOpen,
        freshersCanApply: next.freshersCanApply,
      });
    } catch (err) {
      setRows((current) => current.map((item) => item.id === row.id ? row : item));
      setError(err.message);
    } finally {
      setSavingId(0);
    }
  }

  async function handleDelete(row) {
    if (!window.confirm(`Delete “${row.cardTitle}”? Past applications are kept.`)) return;
    actions.begin(`delete-${row.id}`);
    try {
      await deleteVacancy(row.id);
      setRows((current) => current.filter((item) => item.id !== row.id));
      setNotice("Position deleted.");
      actions.finish(`delete-${row.id}`, "Position deleted.", "success", { inline: false });
    } catch (err) {
      actions.finish(`delete-${row.id}`, err.message, "error");
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Vacancy Management</h2>
          <p className="mt-1 text-sm text-gray-500">Add and update openings on the vacancy board.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/poweradmin/vacancies/new")}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white shadow"
          style={{ background: "linear-gradient(90deg,#dc2626,#f87171)" }}
        >
          Add position
        </button>
      </div>

      {(notice || error) && (
        <div className="mb-4 space-y-2">
          <ActionNotice notice={notice ? { type: "success", message: notice } : null} onClose={() => setNotice("")} className="" />
          <ActionNotice notice={error ? { type: "error", message: error } : null} onClose={() => setError("")} className="" />
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-sm text-gray-400">Loading positions…</div>
        ) : rows.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">No positions yet. Click Add position to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Card title</th>
                  <th className="px-4 py-3">Vacancy</th>
                  <th className="px-4 py-3">Freshers</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600">{row.sortOrder}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{row.cardTitle}</div>
                      <div className="text-xs text-gray-400">/{row.slug}</div>
                    </td>
                    <td className="px-4 py-3">
                      <FlagSwitch checked={row.isVacancyOpen} disabled={savingId === row.id} label={`Vacancy for ${row.cardTitle}`} onChange={() => toggleFlag(row, "isVacancyOpen")} />
                    </td>
                    <td className="px-4 py-3">
                      <FlagSwitch checked={row.freshersCanApply} disabled={savingId === row.id} label={`Freshers for ${row.cardTitle}`} onChange={() => toggleFlag(row, "freshersCanApply")} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                          <a href={`/${row.slug}`} target="_blank" rel="noreferrer" className="rounded-md bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100">View</a>
                          <button type="button" onClick={() => navigate(`/poweradmin/vacancies/edit/${row.id}`)} className="rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">Edit</button>
                          <BusyButton busy={actions.isBusy(`delete-${row.id}`)} busyLabel="Deleting…" onClick={() => handleDelete(row)} className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100">Delete</BusyButton>
                        </div>
                        <ActionNotice notice={actions.notices[`delete-${row.id}`]} onClose={() => actions.dismiss(`delete-${row.id}`)} className="mt-0" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
