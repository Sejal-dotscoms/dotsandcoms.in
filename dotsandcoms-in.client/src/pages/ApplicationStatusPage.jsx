import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";
import { getRouteSEO } from "../seo/publicRoutes";
import { STATUS_PATH, VACANCY_PATH } from "../data/careers";
import { getCareerStatus, replaceCareerResume, resendCareerOtp, revealCareerOtp, sendCareerOtp, verifyCareerOtp } from "../services/careerService";
import { ActionNotice, AdminFeedbackProvider, BusyButton, useActionNotices, useAdminFeedback } from "../Poweradmin/components/AdminFeedback";
import FileBox from "../components/ui/FileBox";

const inputClass = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-red-100";

function StatusForm() {
  const location = useLocation();
  const { notify } = useAdminFeedback();
  const actions = useActionNotices();
  const locked = ["send", "verify", "resend", "reveal", "resume"].some((key) => actions.isBusy(key));
  const toasted = useRef(false);
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState("email");
  const [code, setCode] = useState("");
  const [revealOn, setRevealOn] = useState(false);
  const [status, setStatus] = useState(null);
  const [missing, setMissing] = useState(false);
  const [resume, setResume] = useState(null);
  const [arrived, setArrived] = useState(() => location.state?.notice || "");

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = setPageSEO(getRouteSEO(STATUS_PATH));
    document.querySelector("meta[name='robots']")?.setAttribute("content", "noindex, nofollow");
    const token = sessionStorage.getItem("careerStatusToken");
    if (token) {
      getCareerStatus(token).then((data) => {
        setStatus(data);
        setPhase("result");
      }).catch(() => sessionStorage.removeItem("careerStatusToken"));
    }
    if (location.state?.notice && !toasted.current) {
      toasted.current = true;
      notify(location.state.notice, "success");
    }
    return cleanup;
  }, []);

  async function onEmail(event) {
    event.preventDefault();
    setArrived("");
    actions.begin("send");
    try {
      await sendCareerOtp({ purpose: "status", email });
      setRevealOn(false);
      setPhase("otp");
      actions.finish("send", `OTP sent to ${email}. Check your inbox, and the spam folder if it is not there.`, "success");
    } catch (err) {
      actions.finish("send", err.message, "error");
    }
  }

  async function onVerify(event) {
    event.preventDefault();
    actions.begin("verify");
    try {
      const result = await verifyCareerOtp({ purpose: "status", email, code });
      if (result.outcome === "missing") {
        setMissing(true);
        setPhase("result");
        actions.finish("verify", "It seems you have not applied for the job before.", "error");
        return;
      }
      sessionStorage.setItem("careerStatusToken", result.statusToken);
      setStatus(await getCareerStatus(result.statusToken));
      setPhase("result");
      actions.finish("verify", "Application status loaded.", "success");
    } catch (err) {
      actions.finish("verify", err.message, "error");
    }
  }

  async function onResend() {
    actions.begin("resend");
    try {
      await resendCareerOtp(email, "status");
      setRevealOn(true);
      actions.finish("resend", `A new OTP was sent to ${email}.`, "success");
    } catch (err) {
      actions.finish("resend", err.message, "error");
    }
  }

  async function onReveal() {
    actions.begin("reveal");
    try {
      const result = await revealCareerOtp(email, "status");
      setCode(result.code || "");
      actions.finish("reveal", result.message || "Try using this OTP, or attempt again later.", "success");
    } catch (err) {
      actions.finish("reveal", err.message, "error");
    }
  }

  async function onReplace(event) {
    event.preventDefault();
    const token = sessionStorage.getItem("careerStatusToken");
    actions.begin("resume");
    if (!resume || !token) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      actions.finish("resume", !token ? "Your session expired. Request a new OTP." : "Choose a resume file.", "error");
      return;
    }
    try {
      await replaceCareerResume(token, resume);
      setResume(null);
      actions.finish("resume", "Resume updated.", "success");
    } catch (err) {
      actions.finish("resume", err.message, "error");
    }
  }

  return (
    <div className="apply-form">
      <InnerBanner title="Application Status" breadcrumbs={[{ label: "Career", href: "/training-and-job-vacancy-at-dots-coms-vadodara" }, { label: "Status" }]} />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-2xl px-6">
          <ActionNotice notice={arrived ? { type: "success", message: arrived } : null} onClose={() => setArrived("")} className="mb-4" />
          {phase === "email" && (
            <form className="space-y-4 text-left" onSubmit={onEmail}>
              <label className="block text-sm font-semibold text-slate-700">
                Email Address *
                <input type="email" required className={`${inputClass} mt-1`} value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <BusyButton type="submit" busy={actions.isBusy("send")} busyLabel="Sending…" disabled={locked && !actions.isBusy("send")} className="rounded-full bg-[#dc2626] px-6 py-2.5 text-sm font-semibold text-white">
                Send OTP
              </BusyButton>
              <ActionNotice notice={actions.notices.send} onClose={() => actions.dismiss("send")} />
            </form>
          )}
          {phase === "otp" && (
            <form className="space-y-4 text-left" onSubmit={onVerify}>
              <ActionNotice notice={actions.notices.send} onClose={() => actions.dismiss("send")} className="mb-1" />
              <p className="text-sm text-slate-600">
                Your OTP (One Time Password) has been sent to <strong>{email}</strong>. If you don’t see it in your inbox, please check your spam or junk folder.
              </p>
              <label className="block text-sm font-semibold text-slate-700">
                OTP (One Time Password) *
                <input required className={`${inputClass} mt-1`} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} />
              </label>
              <div className="flex flex-wrap gap-3">
                <BusyButton type="submit" busy={actions.isBusy("verify")} busyLabel="Checking…" disabled={locked && !actions.isBusy("verify")} className="rounded-full bg-[#dc2626] px-6 py-2.5 text-sm font-semibold text-white">
                  Next
                </BusyButton>
                <BusyButton type="button" busy={actions.isBusy("resend")} busyLabel="Sending…" disabled={locked && !actions.isBusy("resend")} onClick={onResend} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">
                  Resend OTP
                </BusyButton>
              </div>
              <ActionNotice notice={actions.notices.verify || actions.notices.resend} onClose={() => { actions.dismiss("verify"); actions.dismiss("resend"); }} />
              <BusyButton type="button" busy={actions.isBusy("reveal")} busyLabel="Checking…" disabled={!revealOn || (locked && !actions.isBusy("reveal"))} onClick={onReveal} className="text-sm font-semibold text-[#dc2626] disabled:text-slate-400">
                If you haven’t received it, click here
              </BusyButton>
              <ActionNotice notice={actions.notices.reveal} onClose={() => actions.dismiss("reveal")} />
            </form>
          )}
          {phase === "result" && missing && (
            <div className="space-y-3 text-left">
              <ActionNotice notice={actions.notices.verify} onClose={() => actions.dismiss("verify")} className="" />
              <p className="text-slate-700">
                <Link className="font-semibold text-[#dc2626]" to={VACANCY_PATH}>Click here</Link> to apply for a job.
              </p>
            </div>
          )}
          {phase === "result" && status && (
            <div className="space-y-3 text-left text-sm text-slate-700">
              <ActionNotice notice={actions.notices.verify} onClose={() => actions.dismiss("verify")} className="mb-2" />
              <p><strong>Application Reference Code:</strong> {status.referenceCode}</p>
              <p><strong>Position Applied:</strong> {status.position}</p>
              <p><strong>Job or Internship:</strong> {status.registrationType}</p>
              <p><strong>Application Last Updated:</strong> {status.applicationUpdated}</p>
              <p><strong>Status Updated on:</strong> {status.statusUpdated}</p>
              <hr />
              <p><strong>Status:</strong> {status.statusLabel}</p>
              <p>{status.statusDetails}</p>
              {status.reapplyAfter && <p><strong>Next Action:</strong> You can Re-apply after {status.reapplyAfter}.</p>}
              {status.canReplaceResume && !status.reapplyAfter && (
                <form className="space-y-3 pt-4" onSubmit={onReplace}>
                  <p>If you want to update your resume, choose a file and submit.</p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <FileBox className="min-w-0 flex-1" accept=".pdf,.doc,.docx" required file={resume} onChange={setResume} />
                    <BusyButton type="submit" busy={actions.isBusy("resume")} busyLabel="Updating…" disabled={locked && !actions.isBusy("resume")} className="shrink-0 rounded-full bg-[#dc2626] px-5 py-2.5 text-sm font-semibold text-white">
                      Update My Resume
                    </BusyButton>
                  </div>
                  <ActionNotice notice={actions.notices.resume} onClose={() => actions.dismiss("resume")} />
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ApplicationStatusPage() {
  return (
    <AdminFeedbackProvider>
      <StatusForm />
    </AdminFeedbackProvider>
  );
}
