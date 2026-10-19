import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { HEARD_FROM, INTERNSHIP_NOTE, JOB_NOTE, SCHOOL_MEDIUMS, STATUS_PATH, VACANCY_PATH } from "../data/careers";
import { getPublicPosition } from "../services/vacancyService";
import { getCareerDraft, resendCareerOtp, revealCareerOtp, saveCareerStep, sendCareerOtp, submitCareerApplication, verifyCareerOtp } from "../services/careerService";
import { ActionNotice, AdminFeedbackProvider, BusyButton, useActionNotices } from "../Poweradmin/components/AdminFeedback";
import FileBox from "../components/ui/FileBox";

const inputClass = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#dc2626] focus:ring-2 focus:ring-red-100";
const labelClass = "mb-1 block text-sm font-semibold text-slate-700";

function Field({ label, children }) {
  return (
    <label className="block text-left">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function noIndex() {
  let el = document.querySelector("meta[name='robots']");
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "robots");
    document.head.appendChild(el);
  }
  el.setAttribute("content", "noindex, nofollow");
}

const STEPS = ["Personal details", "Education", "Experience", "Resume"];

function StepProgress({ step }) {
  return (
    <ol aria-label="Application progress" className="grid grid-cols-4">
      {STEPS.map((name, index) => {
        const number = index + 1;
        const reached = step >= number;
        const current = step === number;
        return (
          <li key={name} className="relative flex flex-col items-center text-center" aria-current={current ? "step" : undefined}>
            {index > 0 && (
              <span aria-hidden="true" className={`absolute right-1/2 left-0 top-4 h-0.5 -translate-y-1/2 ${reached ? "bg-[#dc2626]" : "bg-slate-200"}`} />
            )}
            {index < STEPS.length - 1 && (
              <span aria-hidden="true" className={`absolute right-0 left-1/2 top-4 h-0.5 -translate-y-1/2 ${step > number ? "bg-[#dc2626]" : "bg-slate-200"}`} />
            )}
            <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${reached ? "bg-[#dc2626] text-white" : "border border-slate-300 bg-white text-slate-500"} ${current ? "ring-4 ring-red-100" : ""}`}>
              {number}
            </span>
            <span className={`mt-2 px-1 text-xs font-semibold leading-tight ${current ? "text-slate-900" : "text-slate-500"}`}>
              {name}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

const empty = {
  firstName: "", surname: "", email: "", mobile: "", registrationType: "Job",
  countryCode: "+91", birthDate: "", gender: "Male", schoolMedium: "",
  facebook: "", linkedIn: "", twitter: "",
  schoolName: "", schoolCity: "",
  graduationDegree: "", graduationInstitute: "", graduationCity: "",
  postGraduationDegree: "", postGraduationInstitute: "", postGraduationCity: "",
  experienceChoice: "", experienceYears: "0", experienceMonths: "0", currentlyWorking: "Yes",
  currentCompany: "", currentCity: "", currentDesignation: "", currentDurationMonths: "", currentProfile: "",
  lastCompany: "", lastCity: "", lastDesignation: "", lastDurationMonths: "", lastProfile: "",
  secondCompany: "", secondCity: "", secondDesignation: "", secondDurationMonths: "", secondProfile: "",
  joinDays: "", heardFrom: "A Friend", heardFromNote: "",
};

function ApplyForm() {
  const { slug } = useParams();
  const [job, setJob] = useState(undefined);
  const navigate = useNavigate();
  const [phase, setPhase] = useState("gate");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(empty);
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasResume, setHasResume] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [revealOn, setRevealOn] = useState(false);
  const actions = useActionNotices();
  const locked = ["send", "verify", "resend", "reveal", "next", "previous"].some((key) => actions.isBusy(key));

  useEffect(() => {
    let alive = true;
    getPublicPosition(slug)
      .then((data) => { if (alive) setJob(data); })
      .catch(() => { if (alive) setJob(null); });
    return () => { alive = false; };
  }, [slug]);

  useEffect(() => {
    document.title = job ? `Apply Now | ${job.pageHeading}` : "Apply Now";
    noIndex();
    window.scrollTo(0, 0);
  }, [job]);

  useEffect(() => {
    if (!job) return;
    const saved = sessionStorage.getItem(`careerDraft:${job.slug}`);
    if (!saved) return;
    getCareerDraft(saved).then((draft) => {
      setToken(saved);
      setForm((current) => ({
        ...current,
        ...draft,
        experienceChoice: draft.completedStep >= 3 ? (draft.isFresher ? "fresher" : "experienced") : "",
        currentlyWorking: draft.currentlyWorking ? "Yes" : "No",
        experienceYears: String(draft.experienceYears ?? 0),
        experienceMonths: String(draft.experienceMonths ?? 0),
        joinDays: draft.joinDays ?? "",
        birthDate: draft.birthDate || "",
      }));
      setHasPhoto(draft.hasPhoto);
      setHasResume(draft.hasResume);
      setStep(Math.min(4, (draft.completedStep || 0) + 1));
      setPhase("wizard");
    }).catch(() => sessionStorage.removeItem(`careerDraft:${job.slug}`));
  }, [job]);

  if (job === undefined) return null;
  if (!job || !job.isVacancyOpen) return <Navigate to={VACANCY_PATH} replace />;

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const letters = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value.replace(/[^A-Za-z]/g, "") }));
  const digits = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value.replace(/\D/g, "") }));

  async function onSendOtp(event) {
    event.preventDefault();
    actions.begin("send");
    try {
      await sendCareerOtp({
        purpose: "apply",
        email: form.email,
        firstName: form.firstName,
        surname: form.surname,
        mobile: form.mobile,
        registrationType: form.registrationType,
        jobSlug: job.slug,
      });
      setRevealOn(false);
      setPhase("otp");
      actions.finish("send", `OTP sent to ${form.email}. Check your inbox, and the spam folder if it is not there.`, "success");
    } catch (err) {
      actions.finish("send", err.message, "error");
    }
  }

  async function onVerify(event) {
    event.preventDefault();
    actions.begin("verify");
    try {
      const result = await verifyCareerOtp({ purpose: "apply", email: form.email, code });
      if (result.outcome === "existing") {
        sessionStorage.setItem("careerStatusToken", result.statusToken);
        const message = "We found your existing application.";
        actions.finish("verify", message, "success");
        navigate(STATUS_PATH, { state: { notice: message } });
        return;
      }
      sessionStorage.setItem(`careerDraft:${job.slug}`, result.draftToken);
      setToken(result.draftToken);
      setPhase("wizard");
      setStep(1);
      actions.finish("verify", "Email verified.", "success");
    } catch (err) {
      actions.finish("verify", err.message, "error");
    }
  }

  async function onResend() {
    actions.begin("resend");
    try {
      await resendCareerOtp(form.email, "apply");
      setRevealOn(true);
      actions.finish("resend", `A new OTP was sent to ${form.email}.`, "success");
    } catch (err) {
      actions.finish("resend", err.message, "error");
    }
  }

  async function onReveal() {
    actions.begin("reveal");
    try {
      const result = await revealCareerOtp(form.email, "apply");
      setCode(result.code || "");
      actions.finish("reveal", result.message || "Try using this OTP, or attempt again later.", "success");
    } catch (err) {
      actions.finish("reveal", err.message, "error");
    }
  }

  function stepPayload(current) {
    if (current === 1) {
      return {
        fields: {
          countryCode: form.countryCode, mobile: form.mobile, birthDate: form.birthDate, gender: form.gender,
          schoolMedium: form.schoolMedium, facebook: form.facebook, linkedIn: form.linkedIn, twitter: form.twitter,
        },
        file: { photo },
      };
    }
    if (current === 2) {
      return {
        fields: {
          schoolName: form.schoolName, schoolCity: form.schoolCity, schoolMedium: form.schoolMedium,
          graduationDegree: form.graduationDegree, graduationInstitute: form.graduationInstitute, graduationCity: form.graduationCity,
          postGraduationDegree: form.postGraduationDegree, postGraduationInstitute: form.postGraduationInstitute, postGraduationCity: form.postGraduationCity,
        },
      };
    }
    if (current === 3) {
      const fresher = form.experienceChoice === "fresher";
      return {
        fields: {
          isFresher: fresher, experienceYears: form.experienceYears, experienceMonths: form.experienceMonths,
          currentlyWorking: form.currentlyWorking === "Yes", joinDays: form.joinDays,
          currentCompany: form.currentCompany, currentCity: form.currentCity, currentDesignation: form.currentDesignation,
          currentDurationMonths: form.currentDurationMonths, currentProfile: form.currentProfile,
          lastCompany: form.lastCompany, lastCity: form.lastCity, lastDesignation: form.lastDesignation,
          lastDurationMonths: form.lastDurationMonths, lastProfile: form.lastProfile,
          secondCompany: form.secondCompany, secondCity: form.secondCity, secondDesignation: form.secondDesignation,
          secondDurationMonths: form.secondDurationMonths, secondProfile: form.secondProfile,
        },
      };
    }
    return { fields: { heardFrom: form.heardFrom, heardFromNote: form.heardFromNote }, file: { resume } };
  }

  async function onPrevious() {
    actions.begin("previous");
    await new Promise((resolve) => setTimeout(resolve, 250));
    setStep((current) => Math.max(1, current - 1));
    actions.finish("previous", "", "success", { inline: false });
  }

  async function onNext(event) {
    event.preventDefault();
    actions.begin("next");
    if (step === 3 && !form.experienceChoice) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      actions.finish("next", "Select fresher or job experience.", "error");
      return;
    }
    try {
      const payload = stepPayload(step);
      await saveCareerStep(token, step, payload.fields, payload.file);
      if (step === 1 && photo) setHasPhoto(true);
      if (step < 4) {
        setStep(step + 1);
        actions.finish("next", "Details saved.", "success");
      } else {
        const result = await submitCareerApplication(token);
        sessionStorage.removeItem(`careerDraft:${job.slug}`);
        sessionStorage.setItem("careerReference", JSON.stringify(result));
        actions.finish("next", "Application submitted.", "success");
        navigate("/application-received", { state: result });
      }
    } catch (err) {
      actions.finish("next", err.message, "error");
    }
  }

  return (
    <section className="apply-form bg-[#f8fafc] pb-20 pt-36 sm:pt-44">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 text-left">
          <h1 className="font-heading text-3xl font-extrabold text-slate-900">Apply Now</h1>
          <p className="text-lg font-semibold text-[#dc2626]">{job.pageHeading}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {phase === "gate" && (
            <form className="space-y-4" onSubmit={onSendOtp}>
              <Field label="Name *"><input className={inputClass} value={form.firstName} onChange={letters("firstName")} required /></Field>
              <Field label="Surname *"><input className={inputClass} value={form.surname} onChange={letters("surname")} required /></Field>
              <Field label="Email Address *"><input type="email" className={inputClass} value={form.email} onChange={set("email")} required /></Field>
              <Field label="Mobile Number *"><input className={inputClass} value={form.mobile} onChange={digits("mobile")} inputMode="numeric" required /></Field>
              <fieldset className="space-y-3 text-left text-sm text-slate-700">
                <label className="flex items-start gap-2">
                  <input type="radio" name="type" className="mt-1" checked={form.registrationType === "Job"} onChange={() => setForm({ ...form, registrationType: "Job" })} />
                  <span><strong>JOB</strong><br />{JOB_NOTE}</span>
                </label>
                <label className="flex items-start gap-2">
                  <input type="radio" name="type" className="mt-1" checked={form.registrationType === "Internship"} onChange={() => setForm({ ...form, registrationType: "Internship" })} />
                  <span><strong>INTERNSHIP</strong><br />{INTERNSHIP_NOTE}</span>
                </label>
              </fieldset>
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
                Your OTP (One Time Password) has been sent to <strong>{form.email}</strong>. If you don’t see it in your inbox, please check your spam or junk folder.
              </p>
              <Field label="OTP (One Time Password) *">
                <input className={inputClass} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} required />
              </Field>
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

          {phase === "wizard" && (
            <form className="space-y-4" onSubmit={onNext}>
              <ActionNotice notice={actions.notices.verify} onClose={() => actions.dismiss("verify")} className="mb-1" />
              <StepProgress step={step} />
              {step === 1 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
                    <Field label="Country code *"><input className={inputClass} value={form.countryCode} onChange={set("countryCode")} required /></Field>
                    <Field label="Mobile *"><input className={inputClass} value={form.mobile} onChange={digits("mobile")} required /></Field>
                  </div>
                  <p className="text-left text-xs text-slate-500">Enter numbers only. Example: +91-0000000000</p>
                  <Field label="Birthdate *"><input type="date" className={inputClass} value={form.birthDate} onChange={set("birthDate")} required /></Field>
                  <Field label="Gender *">
                    <select className={inputClass} value={form.gender} onChange={set("gender")}>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </Field>
                  <FileBox label="Upload Photo *" accept=".jpg,.jpeg,.png,.gif" required={!hasPhoto} file={photo} onChange={setPhoto} />
                  <p className="text-left text-xs text-slate-500">jpg, jpeg, png, or gif. Max. File Size : 5MB. {hasPhoto ? "A photo is already saved." : ""}</p>
                  <Field label="Medium of School *">
                    <select className={inputClass} value={form.schoolMedium} onChange={set("schoolMedium")} required>
                      <option value="">Select Language</option>
                      {SCHOOL_MEDIUMS.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </Field>
                  <Field label="Facebook"><input className={inputClass} value={form.facebook} onChange={set("facebook")} /></Field>
                  <Field label="Linked In"><input className={inputClass} value={form.linkedIn} onChange={set("linkedIn")} /></Field>
                  <Field label="Twitter"><input className={inputClass} value={form.twitter} onChange={set("twitter")} /></Field>
                </>
              )}
              {step === 2 && (
                <>
                  <h2 className="text-left text-base font-bold text-slate-800">School Information *</h2>
                  <Field label="School Name *"><input className={inputClass} value={form.schoolName} onChange={set("schoolName")} required /></Field>
                  <Field label="City *"><input className={inputClass} value={form.schoolCity} onChange={set("schoolCity")} required /></Field>
                  <Field label="Medium of School *">
                    <select className={inputClass} value={form.schoolMedium} onChange={set("schoolMedium")} required>
                      <option value="">Select Language</option>
                      {SCHOOL_MEDIUMS.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </Field>
                  <h2 className="text-left text-base font-bold text-slate-800">Graduation *</h2>
                  <Field label="Obtained Degree *"><input className={inputClass} value={form.graduationDegree} onChange={set("graduationDegree")} required /></Field>
                  <Field label="Institute Name *"><input className={inputClass} value={form.graduationInstitute} onChange={set("graduationInstitute")} required /></Field>
                  <p className="text-left text-xs text-slate-500">College + University</p>
                  <Field label="City *"><input className={inputClass} value={form.graduationCity} onChange={set("graduationCity")} required /></Field>
                  <h2 className="text-left text-base font-bold text-slate-800">Post-Graduation</h2>
                  <Field label="Obtained Degree"><input className={inputClass} value={form.postGraduationDegree} onChange={set("postGraduationDegree")} /></Field>
                  <Field label="Institute Name"><input className={inputClass} value={form.postGraduationInstitute} onChange={set("postGraduationInstitute")} /></Field>
                  <Field label="City"><input className={inputClass} value={form.postGraduationCity} onChange={set("postGraduationCity")} /></Field>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-800">
                    <label className="flex items-center gap-2"><input type="radio" checked={form.experienceChoice === "fresher"} onChange={() => setForm({ ...form, experienceChoice: "fresher" })} /> I am a fresher.</label>
                    <label className="flex items-center gap-2"><input type="radio" checked={form.experienceChoice === "experienced"} onChange={() => setForm({ ...form, experienceChoice: "experienced" })} /> I have job experience.</label>
                  </div>
                  {form.experienceChoice === "experienced" && (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Total Experience Years">
                          <select className={inputClass} value={form.experienceYears} onChange={set("experienceYears")}>
                            {Array.from({ length: 16 }, (_, year) => <option key={year} value={year}>{year} Year{year === 1 ? "" : "s"}</option>)}
                          </select>
                        </Field>
                        <Field label="Months">
                          <select className={inputClass} value={form.experienceMonths} onChange={set("experienceMonths")}>
                            {Array.from({ length: 12 }, (_, month) => <option key={month} value={month}>{month} Month{month === 1 ? "" : "s"}</option>)}
                          </select>
                        </Field>
                      </div>
                      <Field label="Currently working ?">
                        <select className={inputClass} value={form.currentlyWorking} onChange={set("currentlyWorking")}>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </Field>
                      {form.currentlyWorking === "Yes" && (
                        <>
                          <h2 className="text-left font-bold">Current job</h2>
                          <Field label="Name of Company *"><input className={inputClass} value={form.currentCompany} onChange={set("currentCompany")} required /></Field>
                          <Field label="City *"><input className={inputClass} value={form.currentCity} onChange={set("currentCity")} required /></Field>
                          <Field label="Designation *"><input className={inputClass} value={form.currentDesignation} onChange={set("currentDesignation")} required /></Field>
                          <Field label="Duration of Job (Month(s)) *"><input className={inputClass} value={form.currentDurationMonths} onChange={set("currentDurationMonths")} required /></Field>
                          <Field label="Job Profile *"><textarea className={inputClass} rows={4} value={form.currentProfile} onChange={set("currentProfile")} required /></Field>
                        </>
                      )}
                      <h2 className="text-left font-bold">Last Job attended *</h2>
                      <Field label="Name of Company *"><input className={inputClass} value={form.lastCompany} onChange={set("lastCompany")} required /></Field>
                      <Field label="City *"><input className={inputClass} value={form.lastCity} onChange={set("lastCity")} required /></Field>
                      <Field label="Designation *"><input className={inputClass} value={form.lastDesignation} onChange={set("lastDesignation")} required /></Field>
                      <Field label="Duration of Job (Month(s)) *"><input className={inputClass} value={form.lastDurationMonths} onChange={set("lastDurationMonths")} required /></Field>
                      <Field label="Job Profile *"><textarea className={inputClass} rows={4} value={form.lastProfile} onChange={set("lastProfile")} required /></Field>
                      <h2 className="text-left font-bold">Second Last Job attended</h2>
                      <Field label="Name of Company"><input className={inputClass} value={form.secondCompany} onChange={set("secondCompany")} /></Field>
                      <Field label="City"><input className={inputClass} value={form.secondCity} onChange={set("secondCity")} /></Field>
                      <Field label="Designation"><input className={inputClass} value={form.secondDesignation} onChange={set("secondDesignation")} /></Field>
                      <Field label="Duration of Job (Month(s))"><input className={inputClass} value={form.secondDurationMonths} onChange={set("secondDurationMonths")} /></Field>
                      <Field label="Job Profile"><textarea className={inputClass} rows={3} value={form.secondProfile} onChange={set("secondProfile")} /></Field>
                    </>
                  )}
                  <Field label="Able to join in how many days ? *">
                    <input className={inputClass} value={form.joinDays} onChange={digits("joinDays")} required />
                  </Field>
                  <p className="text-left text-xs text-slate-500">Enter 0 for immediate joining.</p>
                </>
              )}
              {step === 4 && (
                <>
                  <FileBox label="Upload Resume *" accept=".pdf,.doc,.docx" required={!hasResume} file={resume} onChange={setResume} />
                  <p className="text-left text-xs text-slate-500">pdf, doc, or docx. Max. File Size : 5MB. {hasResume ? "A resume is already saved." : ""}</p>
                  <Field label="How did you hear about us *">
                    <select className={inputClass} value={form.heardFrom} onChange={set("heardFrom")}>
                      {HEARD_FROM.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </Field>
                  <Field label="More info"><input className={inputClass} value={form.heardFromNote} onChange={set("heardFromNote")} /></Field>
                </>
              )}
              <div className="flex flex-wrap gap-3 pt-2">
                {step > 1 && (
                  <BusyButton type="button" busy={actions.isBusy("previous")} busyLabel="Going back…" disabled={locked && !actions.isBusy("previous")} onClick={onPrevious} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">
                    Previous
                  </BusyButton>
                )}
                <BusyButton type="submit" busy={actions.isBusy("next")} busyLabel={step === 4 ? "Submitting…" : "Saving…"} disabled={locked && !actions.isBusy("next")} className="rounded-full bg-[#dc2626] px-6 py-2.5 text-sm font-semibold text-white">
                  {step === 4 ? "Submit" : "Next"}
                </BusyButton>
              </div>
              <ActionNotice notice={actions.notices.next} onClose={() => actions.dismiss("next")} />
            </form>
          )}
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          <Link to={VACANCY_PATH} className="font-semibold text-[#dc2626]">Back to vacancies</Link>
        </p>
      </div>
    </section>
  );
}

export default function ApplyPage() {
  return (
    <AdminFeedbackProvider>
      <ApplyForm />
    </AdminFeedbackProvider>
  );
}
