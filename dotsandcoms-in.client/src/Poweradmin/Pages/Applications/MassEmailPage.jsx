import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cancelMassEmail, createMassEmail, getCareerPositions, getCareerStatuses, listMassEmails, sendMassEmail } from "../../../services/careerService";
import { ActionNotice, BusyButton, useActionNotices } from "../../components/AdminFeedback";

const field = "w-full rounded-lg border px-3 py-2 text-sm";

export default function MassEmailPage() {
  const [positions, setPositions] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [pending, setPending] = useState([]);
  const [sent, setSent] = useState([]);
  const [banner, setBanner] = useState(null);
  const actions = useActionNotices();
  const [form, setForm] = useState({
    position: "All",
    resumeSet: "All",
    statusIds: [],
    fromAddress: "",
    subject: "",
    htmlBody: "",
  });

  async function reload() {
    const [pendingRows, sentRows] = await Promise.all([
      listMassEmails("Pending"),
      listMassEmails("Sent"),
    ]);
    setPending(pendingRows || []);
    setSent(sentRows || []);
  }

  useEffect(() => {
    getCareerPositions().then(setPositions).catch((err) => {
      setBanner({ type: "error", message: err.message });
    });
    getCareerStatuses(false).then(setStatuses).catch(() => {});
    reload().catch((err) => {
      setBanner({ type: "error", message: err.message });
    });
  }, []);

  function toggleStatus(id) {
    setForm((current) => ({
      ...current,
      statusIds: current.statusIds.includes(id)
        ? current.statusIds.filter((item) => item !== id)
        : [...current.statusIds, id],
    }));
  }

  function sentMessage(result) {
    if (result?.error && !result.recipientCount) return { type: "error", message: result.error };
    if (result?.error) return { type: "success", message: `Email sent to ${result.recipientCount}. ${result.error}` };
    const count = result?.recipientCount;
    return { type: "success", message: count ? `Email sent to ${count} ${count === 1 ? "person" : "people"}.` : "Email sent." };
  }

  async function onCreate(event) {
    event.preventDefault();
    setBanner(null);
    actions.begin("create");
    try {
      await createMassEmail({ ...form, sendNow: false });
      setForm({ ...form, subject: "", htmlBody: "" });
      await reload();
      actions.finish("create", "Email saved to pending.", "success");
    } catch (err) {
      actions.finish("create", err.message, "error");
    }
  }

  async function onSend(id) {
    setBanner(null);
    actions.begin(`send-${id}`);
    try {
      const result = await sendMassEmail(id);
      await reload();
      const outcome = sentMessage(result);
      if (outcome.type === "error") {
        actions.finish(`send-${id}`, outcome.message, "error");
      } else {
        setBanner(outcome);
        actions.finish(`send-${id}`, outcome.message, outcome.type, { inline: false });
      }
    } catch (err) {
      actions.finish(`send-${id}`, err.message, "error");
    }
  }

  async function onCancel(id) {
    if (!window.confirm("Cancel this email?")) return;
    setBanner(null);
    actions.begin(`cancel-${id}`);
    try {
      await cancelMassEmail(id);
      await reload();
      setBanner({ type: "success", message: "Email cancelled." });
      actions.finish(`cancel-${id}`, "Email cancelled.", "success", { inline: false });
    } catch (err) {
      actions.finish(`cancel-${id}`, err.message, "error");
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Send mass email</h1>
        <Link to="/poweradmin/applications" className="text-sm text-red-600">Back to listing</Link>
      </div>
      <div className="sticky top-0 z-20 bg-gray-100">
        <ActionNotice notice={banner} onClose={() => setBanner(null)} className="" />
      </div>
      <form className="space-y-3 rounded-xl border bg-white p-5" onSubmit={onCreate}>
        <label className="block text-sm">Position
          <select className={`${field} mt-1`} value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}>
            <option value="All">All</option>
            {positions.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
          </select>
        </label>
        <label className="block text-sm">Resumes
          <select className={`${field} mt-1`} value={form.resumeSet} onChange={(e) => setForm({ ...form, resumeSet: e.target.value })}>
            <option>All</option>
            <option>Old</option>
            <option>New</option>
          </select>
        </label>
        <fieldset>
          <legend className="text-sm font-medium">Statuses</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {statuses.map((item) => (
              <label key={item.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.statusIds.includes(item.id)} onChange={() => toggleStatus(item.id)} />
                {item.shortLabel}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm">From address
          <input className={`${field} mt-1`} value={form.fromAddress} onChange={(e) => setForm({ ...form, fromAddress: e.target.value })} />
        </label>
        <label className="block text-sm">Subject
          <input className={`${field} mt-1`} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
        </label>
        <label className="block text-sm">HTML body
          <textarea className={`${field} mt-1`} rows={8} value={form.htmlBody} onChange={(e) => setForm({ ...form, htmlBody: e.target.value })} required />
        </label>
        <BusyButton type="submit" busy={actions.isBusy("create")} busyLabel="Saving…" className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white">
          Save to pending
        </BusyButton>
        <ActionNotice notice={actions.notices.create} onClose={() => actions.dismiss("create")} />
      </form>

      <section>
        <h2 className="mb-2 font-semibold">Pending</h2>
        <ul className="space-y-2">
          {pending.map((item) => (
            <li key={item.id} className="rounded-lg border bg-white px-3 py-2 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span>{item.subject} · {item.position} · {item.resumeSet}</span>
                <span className="flex gap-3">
                  <BusyButton busy={actions.isBusy(`send-${item.id}`)} busyLabel="Sending…" className="font-semibold text-red-600" onClick={() => onSend(item.id)}>Send</BusyButton>
                  <BusyButton busy={actions.isBusy(`cancel-${item.id}`)} busyLabel="Cancelling…" className="text-gray-500" onClick={() => onCancel(item.id)}>Cancel</BusyButton>
                </span>
              </div>
              <ActionNotice
                notice={actions.notices[`send-${item.id}`] || actions.notices[`cancel-${item.id}`]}
                onClose={() => {
                  actions.dismiss(`send-${item.id}`);
                  actions.dismiss(`cancel-${item.id}`);
                }}
              />
            </li>
          ))}
          {pending.length === 0 && <li className="text-sm text-gray-400">No pending emails.</li>}
        </ul>
      </section>
      <section>
        <h2 className="mb-2 font-semibold">Sent</h2>
        <ul className="space-y-2">
          {sent.map((item) => (
            <li key={item.id} className="rounded-lg border bg-white px-3 py-2 text-sm">
              {item.subject} · {item.recipientCount} sent · {item.sentAt}
              {item.error && <span className="text-red-600"> · {item.error}</span>}
            </li>
          ))}
          {sent.length === 0 && <li className="text-sm text-gray-400">No sent emails.</li>}
        </ul>
      </section>
    </div>
  );
}
