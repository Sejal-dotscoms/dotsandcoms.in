import { useState, useEffect, useRef } from "react"; // Fixed: Added useEffect here
import { useNavigate } from "react-router-dom";
import { Phone, Send, User, AtSign, Globe, Building2, MessageSquare, RefreshCw } from "lucide-react";
import axios from "axios";

/* ============================================================
   1) FloatingField — compact input wrapper with floating label
   ============================================================ */
function FloatingField({ icon: Icon, label, type = "text", required, value, onChange, textarea = false }) {
    const [focused, setFocused] = useState(false);
    const hasValue = value && value.length > 0;
    const floated = focused || hasValue;

    const Tag = textarea ? "textarea" : "input";

    return (
        <div className="relative">
            {Icon && (
                <Icon
                    size={16}
                    className={`absolute left-3.5 z-10 text-slate-400 transition-all duration-200 ${textarea ? "top-3.5" : "top-1/2 -translate-y-1/2"
                        }`}
                />
            )}
            <Tag
                type={textarea ? undefined : type}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                rows={textarea ? 3 : undefined}
                placeholder=" "
                className={`w-full rounded-lg border border-slate-200 bg-slate-50/60 pl-9 pr-3 text-sm text-slate-800 outline-none focus:bg-white focus:border-[#dc2626] focus:ring-2 focus:ring-red-100 transition-all duration-200 ${textarea ? "pt-6 pb-2 resize-none" : "pt-5 pb-1 h-12"
                    }`}
            />
            <span
                className={`absolute left-9 pointer-events-none text-slate-400 transition-all duration-200 ${floated
                        ? "top-1 text-[10px] font-medium text-[#dc2626]"
                        : `text-sm ${textarea ? "top-3.5" : "top-1/2 -translate-y-1/2"}`
                    }`}
            >
                {label} {required && <span className="text-[#dc2626]">*</span>}
            </span>
        </div>
    );
}

/* ============================================================
   2) ContactForm — the main message form (compact, floating labels)
   ============================================================ */
export function ContactForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "", email: "", phone: "", country: "", city: "", message: "",
    });

    const [error, setError] = useState("");
    const captchaRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);

    // Fixed: Removed duplicate captchaToken lines
    const [captchaToken, setCaptchaToken] = useState("");
    const [captchaNum1, setCaptchaNum1] = useState(0);
    const [captchaNum2, setCaptchaNum2] = useState(0);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [captchaError, setCaptchaError] = useState("");

    const API_URL = "https://www.dotsandcoms.in/api/Contact/send";
    const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

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
        setError("");
        setCaptchaError("");

        // Validate Math Captcha
        const expected = captchaNum1 + captchaNum2;
        if (parseInt(captchaAnswer) !== expected) {
            setCaptchaError("Incorrect captcha numeric value. Please try again.");
            return;
        }

        try {
            setSubmitted(true);
            await axios.post(API_URL, {
                name: form.name,
                email: form.email,
                phone: form.phone,
                country: form.country,
                city: form.city,
                message: form.message,
                recaptchaToken: captchaToken
            });

            navigate("/thank-you", { state: { from: "contact" } });

            setForm({
                name: "", email: "", phone: "", country: "", city: "", message: ""
            });

            captchaRef.current?.reset();
            setCaptchaToken("");
        } catch (err) {
            setSubmitted(false);
            console.log(err.response?.data);

            if (err.response?.data?.errors) {
                const validationErrors = Object.values(err.response.data.errors)
                    .flat()
                    .join(", ");
                setError(validationErrors);
            } else {
                setError(
                    err.response?.data?.message ||
                    err.response?.data?.title ||
                    "Unable to submit."
                );
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-7">
            {error && (
                <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg text-sm mb-4">
                    {error}
                </div>
            )}

            {/* Section Header */}
            <div className="mb-5">
                <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
                    // Get in Touch
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800 tracking-tight mt-1">
                    Send a Message
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                    <FloatingField icon={User} label="Your Name" required value={form.name} onChange={set("name")} />
                    <FloatingField icon={AtSign} label="Your Email" type="email" required value={form.email} onChange={set("email")} />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                    <FloatingField icon={Phone} label="Phone No" type="tel" required value={form.phone} onChange={set("phone")} />
                    <FloatingField icon={Globe} label="Country" required value={form.country} onChange={set("country")} />
                </div>

                <FloatingField icon={Building2} label="City" required value={form.city} onChange={set("city")} />
                <FloatingField icon={MessageSquare} label="Your Message" required textarea value={form.message} onChange={set("message")} />

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
                                required
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
                            captcha verification
                        </span>
                    </div>
                </div>

                <div className="space-y-1">
                    {captchaError && (
                        <p className="text-xs text-[#dc2626] font-semibold mb-2">{captchaError}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={submitted}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-red-700 text-white font-semibold px-7 py-3 rounded-lg shadow-lg shadow-red-200 transition-all duration-300 hover:shadow-red-300 hover:-translate-y-0.5 text-sm disabled:bg-slate-400 disabled:pointer-events-none"
                >
                    {submitted ? "Sending..." : "Send Message"}
                    {!submitted && <Send size={16} />}
                </button>
            </form>
        </div>
    );
}