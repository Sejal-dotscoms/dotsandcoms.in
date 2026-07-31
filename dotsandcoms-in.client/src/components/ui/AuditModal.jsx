import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Search, Gauge, Link2, ShieldAlert, RefreshCw, Sparkles, Loader2, ArrowRight } from "lucide-react";
import axios from "axios";
 

export default function AuditModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");   
    const previousOverflow = useRef("");
    const API_URL = "https://www.dotsandcoms.in/api/audit/send";
    const [error, setError] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");
    const [captchaNum1, setCaptchaNum1] = useState(0);
    const [captchaNum2, setCaptchaNum2] = useState(0);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [captchaError, setCaptchaError] = useState("");
  // Lock/unlock background scroll whenever isOpen changes.
  useEffect(() => {
    if (!isOpen) return;

    // Save whatever the body's overflow was before we touched it.
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow.current;
      window.removeEventListener("keydown", handleEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // NOTE: intentionally NOT depending on onClose.


    const generateCaptcha = () => {
        setCaptchaNum1(Math.floor(Math.random() * 9) + 1);
        setCaptchaNum2(Math.floor(Math.random() * 9) + 1);
        setCaptchaAnswer("");
        setCaptchaError("");
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!name || !email || !url)
            return;
        //if (!captchaToken) {
        //    setError("Please verify the captcha.");
        //    return;
        //}

        setCaptchaError("");

        // Validate Math Captcha
        const expected = captchaNum1 + captchaNum2;
        if (parseInt(captchaAnswer) !== expected) {
            setCaptchaError("Incorrect captcha numeric value. Please try again.");
            return;
        }


        try {

            setStatus("loading");

            //if (!executeRecaptcha) {
            //    setError(

            //        error.response?.data ||

            //        "Unable to submit."

            //    );

            //    setStatus("idle");

            //    return;
            //}

            //--------------------------------
            // Generate Captcha Token
            //--------------------------------

          

            //--------------------------------
            // API
            //--------------------------------

            await axios.post(API_URL,
                {

                    name,

                    email,

                    websiteUrl: url

                    

                });

            //--------------------------------

            setStatus("success");

            setName("");

            setEmail("");

            setUrl("");

        }
        catch (error) {
            console.log(error);

            const data = error.response?.data;
            let msg = "Unable to submit.";

            if (typeof data === "string") {
                msg = data;
            } else if (data?.errors) {
                // ValidationProblemDetails -> errors: { Field: ["msg1","msg2"] }
                msg = Object.values(data.errors).flat().join(" ");
            } else if (data?.title) {
                msg = data.title;
            }

            setError(msg);
            setStatus("idle");
        }
        //catch (error) {

        //    console.log(error);

        //    setError(

        //        error.response?.data ||

        //        "Unable to submit."

        //    );

        //    setStatus("idle");

        //}

    };
 
  const handleReset = () => {
    setStatus("idle");
    onClose();
  };

    return (
 
        <AnimatePresence>
            {
                error &&

                <div
                    className="bg-red-50
border
border-red-200
text-red-700
rounded-xl
p-3
text-sm">

                    {error}

                </div>

            }   
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">

          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 min-h-[500px]"
          >

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* LEFT COLUMN: Content Column (5 cols on md+) */}
            <div className="md:col-span-6 bg-gradient-to-br from-[#ea580c] to-[#dc2626] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-left">
              {/* Dots grid texture */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: "30px 30px",
                }} />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-orange-200 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-200">
                    Free SEO Audit
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight leading-tight">
                  Get a Free Website Audit for Your Business
                </h3>

                <p className="text-orange-100 text-xs sm:text-sm leading-relaxed">
                  The first logical step toward a successful digital marketing investment is to evaluate your current position and determine whether your website is truly ready to attract and retain visitors.
                </p>

                {/* Styled quote callout */}
                <div className="border-l-4 border-orange-300 bg-white/10 p-4 rounded-r-xl italic text-xs leading-relaxed text-orange-50 font-medium">
                  "Spending on marketing without having the foundational elements in place is like giving away money without purpose."
                </div>

                {/* Audit Items */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-200 font-mono">
                    What we will do:
                  </h4>
                  <ul className="space-y-2 text-xs text-orange-50">
                    <li className="flex items-center space-x-2.5">
                      <Gauge className="w-4 h-4 text-orange-300 shrink-0" />
                      <span>Analyze website speed and performance</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Search className="w-4 h-4 text-orange-300 shrink-0" />
                      <span>Conduct keyword research and analysis</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <Link2 className="w-4 h-4 text-orange-300 shrink-0" />
                      <span>Identify and report dead links</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <ShieldAlert className="w-4 h-4 text-orange-300 shrink-0" />
                      <span>Perform SEO audit (manual & pro tools)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative z-10 pt-8 border-t border-white/10 mt-8 text-[10px] text-orange-200 font-mono">
                ⚡ Response in &lt; 48 hours • 100% Free
              </div>
            </div>

            {/* RIGHT COLUMN: Form Column (6 cols on md+) */}
            <div className="md:col-span-6 bg-white p-8 sm:p-10 flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center space-y-4 py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 font-heading">
                      Request Submitted!
                    </h4>
                    <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                      Thank you! Our technical team will analyze your website and email your free audit report within 48 hours.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-6 px-6 py-2.5 rounded-full border border-slate-200 hover:border-slate-350 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-all active:scale-95"
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
                      <h4 className="text-lg font-black text-slate-800 font-heading">
                        Get Your Website Audit Report
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Enter your details below to request your free detailed assessment.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name input */}
                      <div className="space-y-1">
                        <label htmlFor="modal-name" className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold block">
                          Your Name
                        </label>
                        <input
                          id="modal-name"
                          type="text"
                          required
                          disabled={status === "loading"}
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-250 focus:border-[#dc2626] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-all duration-300 disabled:opacity-50"
                        />
                      </div>

                      {/* URL input */}
                      <div className="space-y-1">
                        <label htmlFor="modal-url" className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold block">
                          Your Website URL
                        </label>
                        <input
                          id="modal-url"
                          type="url"
                          required
                          disabled={status === "loading"}
                          placeholder="https://yourwebsite.com"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-250 focus:border-[#dc2626] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-all duration-300 disabled:opacity-50"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1">
                        <label htmlFor="modal-email" className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold block">
                          Your Email Address
                        </label>
                        <input
                          id="modal-email"
                          type="email"
                          required
                          disabled={status === "loading"}
                          placeholder="john@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-250 focus:border-[#dc2626] focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-all duration-300 disabled:opacity-50"
                        />
                                                </div>
                                                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-6">
                                                    <div className="w-full sm:w-auto flex flex-col gap-1.5">
                                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                            *Verify Math Check
                                                        </label>
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center justify-center gap-1.5 px-4 h-11 rounded-lg bg-slate-800 text-white font-mono font-black text-sm tracking-wide select-none">
                                                                <span>{captchaNum1}</span>
                                                                <span>+</span>

                                                                <span>{captchaNum2}</span>
                                                                <span>=</span>
                                                            </div>
                                                            <input
                                                                type="number"

                                                                placeholder="Answer"
                                                                value={captchaAnswer}
                                                                onChange={(e) => setCaptchaAnswer(e.target.value)}
                                                                className="w-28 h-11 text-center bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] transition-all duration-200 font-mono font-bold"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={generateCaptcha}
                                                                className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                                                                title="Refresh Captcha"
                                                            >
                                                                <RefreshCw className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 font-mono">
                                                            capcha verification
                                                        </span>
                                                    </div>

                                                    
                                                </div>
                                                <div className="space-y-1">
                                                    {captchaError && (
                                                        <p className="text-xs text-[#dc2626] font-semibold mb-2">{captchaError}</p>
                                                    )}


                                                </div>
                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white hover:brightness-110 active:scale-95 shadow-md hover:shadow-lg disabled:opacity-75 transition-all duration-300"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Processing Audit Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Get Free Audit Report</span>
                            <ArrowRight className="w-4 h-4" />
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