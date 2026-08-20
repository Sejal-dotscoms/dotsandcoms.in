import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/authService";

export default function ForgotPassword() {
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState("");
  const [sent, setSent]         = useState(false);

  const navigate = useNavigate();

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!emailIsValid) return;

    setLoading(true);
    setApiError("");
    try {
      await forgotPassword(email);
      setSent(true);
      // Redirect to sign-in after 3 seconds with success message
      setTimeout(() => {
        navigate("/poweradmin", {
          state: { successMsg: `Credentials sent to ${email}. Please check your inbox.` },
        });
      }, 3000);
    } catch (err) {
      setApiError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-100 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg mx-auto shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-white bg-opacity-90 backdrop-blur py-12 px-6 sm:px-10">

          {/* Logo / heading */}
          <div className="flex flex-col items-center mb-8 gap-3">
            <img
              src="https://www.dotsandcoms.in/assets/dots-and-coms-logo.webp"
              alt="Dots & Coms"
              className="h-20 w-auto object-contain"
              draggable={false}
              loading="lazy"
              decoding="async"
              width="94"
              height="98"
            />
            <h1 className="text-2xl font-bold" style={{ color: "#cf1f1f" }}>
              Forgot Password
            </h1>
            <p className="text-sm text-gray-500 text-center max-w-xs">
              Enter your registered email address and we'll send you a temporary password.
            </p>
          </div>

          {sent ? (
            /* Success state */
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#dc2626,#f87171)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-gray-900">Credentials Sent!</p>
                <p className="text-sm text-gray-500 mt-1">
                  A temporary password has been sent to <span className="font-medium text-gray-700">{email}</span>.
                  Redirecting to sign-in…
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Error banner */}
              {apiError && (
                <div
                  role="alert"
                  className="flex items-center gap-2 p-3 rounded-lg border text-sm font-medium"
                  style={{ background: "#fef2f2", borderColor: "#fca5a5", color: "#b91c1c" }}
                >
                  <svg height="18" width="18" fill="none" viewBox="0 0 24 24" className="shrink-0">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M12 7.5v4m0 2.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {apiError}
                </div>
              )}

              {/* Email field */}
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setApiError(""); }}
                  required
                  className="block w-full px-4 py-2.5 rounded-lg border-2 text-sm focus:outline-none focus:ring-4 transition"
                  style={{
                    background:  "#fff",
                    borderColor: email.length === 0 ? "#e5e7eb" : emailIsValid ? "#86efac" : "#fca5a5",
                  }}
                />
                {email.length > 0 && !emailIsValid && (
                  <p className="text-xs text-red-600 font-medium mt-1">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!emailIsValid || loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-base font-bold shadow focus:outline-none focus:ring-4 focus:ring-red-200 transition disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(90deg, #dc2626 0%, #ef4444 50%, #f87171 100%)",
                  boxShadow:  "0 2px 10px #f87171aa",
                  opacity:    !emailIsValid || loading ? 0.55 : 1,
                }}
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5 text-white shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75" />
                  </svg>
                )}
                {loading ? "Submitting…" : "Submit"}
              </button>

              {/* Back to login */}
              <p className="text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link
                  to="/poweradmin"
                  className="font-medium hover:underline"
                  style={{ color: "#cf1f1f" }}
                >
                  Sign in
                </Link>
              </p>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
