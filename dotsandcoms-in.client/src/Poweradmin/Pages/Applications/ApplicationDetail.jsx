import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { changeApplicationStatus, downloadApplicationFile, getApplication, getCareerStatuses, saveApplicationNote } from "../../../services/careerService";
import { ActionNotice, BusyButton, ButtonSpinner, useActionNotices } from "../../components/AdminFeedback";

function Block({ title, job }) {
  if (!job) return null;
  return (
    <div className="rounded-lg border p-3 text-sm">
      <p className="font-semibold text-gray-800">{title}</p>
      <p>{job.company}{job.city ? `, ${job.city}` : ""}</p>
      <p>{job.designation}</p>
      {job.durationMonths && <p>Duration: {job.durationMonths} month(s)</p>}
      {job.profile && <p className="whitespace-pre-wrap text-gray-600">{job.profile}</p>}
    </div>
  );
}

export default function ApplicationDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const back = `/poweradmin/applications${params.get("return") ? `?${params.get("return")}` : ""}`;
  const [row, setRow] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [note, setNote] = useState("");
  const [statusId, setStatusId] = useState("");
  const [isOld, setIsOld] = useState(false);
  const [sendMail, setSendMail] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const actions = useActionNotices();

  useEffect(() => {
    let url = "";
    getApplication(id).then((data) => {
      setRow(data);
      setNote(data.officeNote || "");
      setIsOld(data.isOldResume);
    }).catch((err) => setError(err.message));
    getCareerStatuses(true).then(setStatuses).catch(() => {});
    downloadApplicationFile(id, "photo").then((blob) => {
      url = URL.createObjectURL(blob);
      setPhotoUrl(url);
    }).catch(() => {});
    return () => { if (url) URL.revokeObjectURL(url); };
  }, [id]);

  async function onSaveNote() {
    actions.begin("note");
    try {
      await saveApplicationNote(id, note);
      actions.finish("note", "Note saved.", "success");
    } catch (err) {
      actions.finish("note", err.message, "error");
    }
  }

  async function onStatus(event) {
    event.preventDefault();
    if (!statusId) {
      actions.finish("status", "Select an application status.", "error");
      return;
    }
    actions.begin("status");
    try {
      const result = await changeApplicationStatus(id, {
        statusId: Number(statusId),
        officeNote: note,
        isOldResume: isOld,
        sendMail,
      });
      if (result.hidden) {
        actions.finish("status", result.message, "success");
        navigate(`/poweradmin/applications?notice=${encodeURIComponent(result.message)}`, { state: { toastShown: true } });
        return;
      }
      try {
        const fresh = await getApplication(id);
        setRow(fresh);
      } catch {
        /* Status is already saved. Keep the success message if the refresh fails. */
      }
      actions.finish("status", result.message || "Status updated.", "success");
    } catch (err) {
      actions.finish("status", err.message, "error");
    }
  }

  async function onResume() {
    actions.begin("resume");
    try {
      const blob = await downloadApplicationFile(id, "resume");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = row?.resumeOriginalName || "resume";
      link.click();
      URL.revokeObjectURL(url);
      actions.finish("resume", "Resume downloaded.", "success");
    } catch (err) {
      actions.finish("resume", err.message, "error");
    }
  }

  if (!row) {
    return (
      <div className="flex items-center gap-3 p-6 text-sm text-gray-600">
        {error ? (
          <ActionNotice notice={{ type: "error", message: error }} className="w-full" />
        ) : (
          <>
            <ButtonSpinner className="h-5 w-5 text-red-600" />
            Loading resume…
          </>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Resume</h1>
        <Link to={back} className="text-sm font-medium text-red-600">Back to listing</Link>
      </div>
      <section className="rounded-xl border bg-white p-5">
        <h2 className="font-semibold text-gray-900">{row.jobTitle}</h2>
        <p className="text-sm text-gray-500">{row.location}</p>
      </section>

      <section className="rounded-xl border bg-white p-5">
        <h2 className="mb-3 font-semibold">Personal information</h2>
        <div className="flex flex-wrap gap-6">
          {photoUrl && <img src={photoUrl} alt="" className="h-28 w-28 rounded-lg object-cover" />}
          <div className="space-y-1 text-sm text-gray-700">
            <p className="text-base font-semibold text-gray-900">{row.firstName} {row.surname} <span className="font-normal text-gray-500">{row.referenceCode}</span></p>
            <p>{row.ageLabel}</p>
            <p>{row.gender}</p>
            <p>{row.email}</p>
            <p>{row.countryCode} {row.mobile}</p>
            {row.linkedIn && <p>LinkedIn: {row.linkedIn}</p>}
            {row.facebook && <p>Facebook: {row.facebook}</p>}
            {row.twitter && <p>Twitter: {row.twitter}</p>}
            <p>{row.registrationType}</p>
            {row.hasResume && (
              <div>
                <BusyButton busy={actions.isBusy("resume")} busyLabel="Downloading…" onClick={onResume} className="font-semibold text-red-600">
                  Download resume
                </BusyButton>
                <ActionNotice notice={actions.notices.resume} onClose={() => actions.dismiss("resume")} />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-5">
        <h2 className="mb-2 font-semibold">Office notes</h2>
        <textarea className="w-full rounded-lg border px-3 py-2 text-sm" rows={4} value={note} onChange={(e) => setNote(e.target.value)} />
        <BusyButton busy={actions.isBusy("note")} busyLabel="Saving…" onClick={onSaveNote} className="mt-2 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white">
          Save note
        </BusyButton>
        <ActionNotice notice={actions.notices.note} onClose={() => actions.dismiss("note")} />
      </section>

      <section className="rounded-xl border bg-white p-5">
        <h2 className="mb-3 font-semibold">Employment</h2>
        {row.isFresher ? <p className="text-sm">Fresher candidate</p> : (
          <div className="space-y-3">
            <p className="text-sm">Total experience: {row.experience}</p>
            <Block title="Current job" job={row.currentJob} />
            <Block title="Last job" job={row.lastJob} />
            <Block title="Second last job" job={row.secondJob} />
          </div>
        )}
        <p className="mt-3 text-sm">Days until they can join: {row.joinDays ?? "—"}</p>
      </section>

      <section className="rounded-xl border bg-white p-5 text-sm">
        <h2 className="mb-2 font-semibold">Education</h2>
        <p>School: {row.schoolName}, {row.schoolCity} ({row.schoolMedium})</p>
        <p>Graduation: {row.graduationDegree}, {row.graduationInstitute}, {row.graduationCity}</p>
        {row.postGraduationDegree && <p>Post-graduation: {row.postGraduationDegree}, {row.postGraduationInstitute}, {row.postGraduationCity}</p>}
        <p className="mt-2">Heard from: {row.heardFrom}{row.heardFromNote ? ` — ${row.heardFromNote}` : ""}</p>
      </section>

      <form className="rounded-xl border bg-white p-5" onSubmit={onStatus}>
        <h2 className="font-semibold">Application status {row.statusUpdated ? <span className="font-normal text-gray-500">· {row.statusUpdated}</span> : null}</h2>
        <p className="mt-2 text-sm">Current status: {row.statusLabel}</p>
        <div className="mt-4 space-y-3">
          {statuses.map((item) => (
            <label key={item.id} className="flex items-start gap-3 text-sm">
              <input type="radio" name="status" className="mt-1" checked={String(statusId) === String(item.id)} onChange={() => setStatusId(String(item.id))} />
              <span>
                <span className="font-semibold">{item.shortLabel}</span>
                <span className="mt-1 block text-gray-600">{item.summary}</span>
              </span>
            </label>
          ))}
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isOld} onChange={(e) => setIsOld(e.target.checked)} /> Is old resume
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={sendMail} onChange={(e) => setSendMail(e.target.checked)} /> Send mail to candidate
        </label>
        <BusyButton type="submit" busy={actions.isBusy("status")} busyLabel="Updating…" className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white">
          Change status
        </BusyButton>
        <ActionNotice notice={actions.notices.status} onClose={() => actions.dismiss("status")} />
      </form>
    </div>
  );
}
