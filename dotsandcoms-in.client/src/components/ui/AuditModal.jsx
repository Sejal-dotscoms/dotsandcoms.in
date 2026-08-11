import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  Search,
  Gauge,
  Link2,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Loader2,
  ArrowRight
} from "lucide-react";
import axios from "axios";

export default function AuditModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const previousOverflow = useRef("");
  const API_URL = "https://www.dotsandcoms.in/api/audit/send";

  // Math Captcha state
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Lock/unlock background scroll whenever isOpen changes.
  useEffect(() => {
    if (!isOpen) return;

    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow.current;
      window.removeEventListener("keydown", handleEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const generateCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
    setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaAnswer("");
    setErrors((prev) => ({ ...prev, captcha: "" }));
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const validateField = (field, value) => {
    let errorMsg = "";
    if (field === "name") {
      if (!value || !value.trim()) {
        errorMsg = "Please enter your name.";
      }
    } else if (field === "url") {
      if (!value || !value.trim()) {
        errorMsg = "Please enter your website URL.";
      } else {
        const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i;
        if (!urlPattern.test(value.trim())) {
          errorMsg = "Please enter a valid website URL (e.g. yourwebsite.com).";
        }
      }
    } else if (field === "email") {
      if (!value || !value.trim()) {
        errorMsg = "Please enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        errorMsg = "Please enter a valid email address.";
      }
    } else if (field === "captcha") {
      if (value === "" || value === undefined || value === null) {
        errorMsg = "Please enter the math check answer.";
      } else if (parseInt(value, 10) !== captchaNum1 + captchaNum2) {
        errorMsg = "Incorrect math check value. Please try again.";
      }
    }
    return errorMsg;
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: validateField("name", val) }));
    }
  };

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    if (errors.url) {
      setErrors((prev) => ({ ...prev, url: validateField("url", val) }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: validateField("email", val) }));
    }
  };

  const handleCaptchaChange = (e) => {
    const val = e.target.value;
    setCaptchaAnswer(val);
    if (errors.captcha) {
      setErrors((prev) => ({ ...prev, captcha: "" }));
    }
  };

  const handleBlur = (field, val) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, val);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nameErr = validateField("name", name);
    const urlErr = validateField("url", url);
    const emailErr = validateField("email", email);
    const captchaErr = validateField("captcha", captchaAnswer);

    const newErrors = {
      name: nameErr,
      url: urlErr,
      email: emailErr,
      captcha: captchaErr
    };

    setErrors(newErrors);
    setTouched({ name: true, url: true, email: true, captcha: true });

    if (nameErr || urlErr || emailErr || captchaErr) {
      if (nameErr) {
        document.getElementById("audit-modal-name")?.focus();
      } else if (urlErr) {
        document.getElementById("audit-modal-url")?.focus();
      } else if (emailErr) {
        document.getElementById("audit-modal-email")?.focus();
      } else if (captchaErr) {
        document.getElementById("audit-modal-captcha")?.focus();
      }
      return;
    }

    try {
      setStatus("loading");
      await axios.post(API_URL, {
        name: name.trim(),
        email: email.trim(),
        websiteUrl: url.trim()
      });

      setStatus("success");
      setName("");
      setEmail("");
      setUrl("");
      setCaptchaAnswer("");
      setErrors({});
      setTouched({});
    } catch (err) {
      console.error(err);
      const data = err.response?.data;
      let msg = "Unable to submit your audit request. Please try again or contact us directly.";

      if (typeof data === "string") {
        msg = data;
      } else if (data?.errors) {
        msg = Object.values(data.errors).flat().join(" ");
      } else if (data?.title) {
        msg = data.title;
      }

      setError(msg);
      setStatus("idle");
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setError("");
    setErrors({});
    setTouched({});
    onClose();
  };

  const handleReset = () => {
    setStatus("idle");
    setError("");
    setErrors({});
    setTouched({});
    generateCaptcha();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 grid min-h-[500px] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-12"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 cursor-pointer rounded-full bg-slate-100 p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800"
              aria-label="Close modal"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* LEFT COLUMN: Content Column (6 cols on md+) */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#ea580c] to-[#dc2626] p-8 text-left text-white sm:p-10 md:col-span-6">
              {/* Dots grid texture */}
              <div className="pointer-events-none absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: "30px 30px"
                  }}
                />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 animate-pulse text-orange-200" />
                  <span className="font-mono font-bold tracking-widest text-[10px] text-orange-200 uppercase">
                    Free SEO Audit
                  </span>
                </div>

                <h3 className="font-heading text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl">
                  Get a Free Website Audit for Your Business
                </h3>

                <p className="text-xs leading-relaxed text-orange-100 sm:text-sm">
                  The first logical step toward a successful digital marketing investment is to evaluate your current position and determine whether your website is truly ready to attract and retain visitors.
                </p>

                {/* Styled quote callout */}
                <div className="rounded-r-xl border-l-4 border-orange-300 bg-white/10 p-4 text-xs leading-relaxed font-medium text-orange-50 italic">
                  "Spending on marketing without having the foundational elements in place is like giving away money without purpose."
                </div>

                {/* Audit Items */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-mono text-xs font-bold tracking-wider text-orange-200 uppercase">
                    What we will do:
                  </h4>
                  <ul className="space-y-2 text-xs text-orange-50">
                    <li className="flex items-center space-x-2.5">
                      <Gauge className="h-4 w-4 shrink-0 text-orange-300" />
                      <span>Analyze website speed and performance</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Search className="h-4 w-4 shrink-0 text-orange-300" />
                      <span>Conduct keyword research and analysis</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Link2 className="h-4 w-4 shrink-0 text-orange-300" />
                      <span>Identify and report dead links</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-orange-300" />
                      <span>Perform SEO audit (manual & pro tools)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative z-10 mt-8 border-t border-white/10 pt-8 font-mono text-[10px] text-orange-200">
                ⚡ Response in &lt; 48 hours • 100% Free
              </div>
            </div>

            {/* RIGHT COLUMN: Form Column (6 cols on md+) */}
            <div className="relative flex flex-col justify-center bg-white p-8 text-left sm:p-10 md:col-span-6">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center space-y-4 py-8 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600 shadow-sm">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h4 className="font-heading text-xl font-bold text-slate-800">
                      Request Submitted!
                    </h4>
                    <p className="max-w-xs text-sm leading-relaxed text-slate-500">
                      Thank you! Our technical team will analyze your website and email your free audit report within 48 hours.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-6 cursor-pointer rounded-full border border-slate-200 px-6 py-2.5 text-xs font-semibold text-slate-600 transition-all hover:border-slate-350 hover:text-slate-800 active:scale-95"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-left"
                  >
                    <div>
                      <h4 className="font-heading text-lg font-black text-slate-800">
                        Get Your Website Audit Report
                      </h4>
                      <p className="mt-1 text-xs text-slate-500">
                        Enter your details below to request your free detailed assessment.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      {/* Name input */}
                      <div className="space-y-1">
                        <label
                          htmlFor="audit-modal-name"
                          className="block font-mono font-bold tracking-widest text-[10px] text-slate-500 uppercase"
                        >
                          Your Name <span className="text-[#dc2626] font-bold">*</span>
                        </label>
                        <input
                          id="audit-modal-name"
                          type="text"
                          disabled={status === "loading"}
                          placeholder="John Doe"
                          value={name}
                          onChange={handleNameChange}
                          onBlur={() => handleBlur("name", name)}
                          className={`w-full rounded-xl px-4 py-3 text-sm text-slate-800 transition-all duration-200 disabled:opacity-50 ${
                            errors.name
                              ? "border border-red-500 bg-red-50/40 focus:border-red-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
                              : "border border-slate-250 bg-slate-50 focus:border-[#dc2626] focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100/50"
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-600">
                            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* URL input */}
                      <div className="space-y-1">
                        <label
                          htmlFor="audit-modal-url"
                          className="block font-mono font-bold tracking-widest text-[10px] text-slate-500 uppercase"
                        >
                          Your Website URL <span className="text-[#dc2626] font-bold">*</span>
                        </label>
                        <input
                          id="audit-modal-url"
                          type="text"
                          disabled={status === "loading"}
                          placeholder="https://yourwebsite.com"
                          value={url}
                          onChange={handleUrlChange}
                          onBlur={() => handleBlur("url", url)}
                          className={`w-full rounded-xl px-4 py-3 text-sm text-slate-800 transition-all duration-200 disabled:opacity-50 ${
                            errors.url
                              ? "border border-red-500 bg-red-50/40 focus:border-red-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
                              : "border border-slate-250 bg-slate-50 focus:border-[#dc2626] focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100/50"
                          }`}
                        />
                        {errors.url && (
                          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-600">
                            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                            <span>{errors.url}</span>
                          </p>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="space-y-1">
                        <label
                          htmlFor="audit-modal-email"
                          className="block font-mono font-bold tracking-widest text-[10px] text-slate-500 uppercase"
                        >
                          Your Email Address <span className="text-[#dc2626] font-bold">*</span>
                        </label>
                        <input
                          id="audit-modal-email"
                          type="email"
                          disabled={status === "loading"}
                          placeholder="john@company.com"
                          value={email}
                          onChange={handleEmailChange}
                          onBlur={() => handleBlur("email", email)}
                          className={`w-full rounded-xl px-4 py-3 text-sm text-slate-800 transition-all duration-200 disabled:opacity-50 ${
                            errors.email
                              ? "border border-red-500 bg-red-50/40 focus:border-red-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
                              : "border border-slate-250 bg-slate-50 focus:border-[#dc2626] focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-100/50"
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-red-600">
                            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Math Captcha */}
                      <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-6">
                        <label
                          htmlFor="audit-modal-captcha"
                          className="block text-xs font-bold tracking-wider text-slate-500 uppercase"
                        >
                          *Verify Math Check <span className="text-[#dc2626] font-bold">*</span>
                        </label>
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 items-center justify-center gap-1.5 rounded-lg bg-slate-800 px-4 font-mono text-sm font-black tracking-wide text-white select-none">
                            <span>{captchaNum1}</span>
                            <span>+</span>
                            <span>{captchaNum2}</span>
                            <span>=</span>
                          </div>
                          <input
                            id="audit-modal-captcha"
                            type="number"
                            placeholder="Answer"
                            value={captchaAnswer}
                            onChange={handleCaptchaChange}
                            onBlur={() => handleBlur("captcha", captchaAnswer)}
                            disabled={status === "loading"}
                            className={`h-11 w-28 rounded-lg text-center font-mono text-sm font-bold text-slate-800 transition-all duration-200 outline-none ${
                              errors.captcha
                                ? "border border-red-500 bg-red-50/40 focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100"
                                : "border border-slate-200 bg-slate-50 focus:border-[#dc2626] focus:bg-white focus:ring-2 focus:ring-red-100/50"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={generateCaptcha}
                            className="cursor-pointer rounded-lg p-2.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
                            title="Refresh Captcha"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">
                          captcha verification
                        </span>
                        {errors.captcha && (
                          <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-red-600">
                            <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                            <span>{errors.captcha}</span>
                          </p>
                        )}
                      </div>

                      {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                          {error}
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex w-full cursor-pointer items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#dc2626] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95 disabled:opacity-75"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Processing Audit Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Get Free Audit Report</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}