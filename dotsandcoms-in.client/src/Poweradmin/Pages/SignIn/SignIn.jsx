// src/Poweradmin/Pages/SignIn/SignIn.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signIn, getStoredToken, validateToken, signOut } from "../../../services/authService";

export default function SignIn() {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [remember, setRemember]         = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [apiError, setApiError]         = useState("");
  const [success, setSuccess]           = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // On mount: if a valid session already exists, skip the login form
  useEffect(() => {
    // Show success message passed from ForgotPassword redirect
    if (location.state?.successMsg) {
      setSuccess(location.state.successMsg);
    }

    const token = getStoredToken();
    if (token) {
      validateToken(token)
        .then(() => navigate("/poweradmin/dashboard", { replace: true }))
        .catch(() => signOut()); // clear stale token, stay on signin
    }

    try {
      const savedEmail    = localStorage.getItem("powerAdminEmail");
      const savedPassword = localStorage.getItem("powerAdminPassword");
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRemember(true);
      }
    } catch (ex) {
      console.warn("Storage access failed; continuing without saved credentials.", ex);
    }
  }, []);

  const emailIsValid    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordIsValid = password.length >= 6;
  const formIsValid     = emailIsValid && passwordIsValid;

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    setSuccess("");

    if (!formIsValid) {
      setApiError("Please fix the validation errors and try again.");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn(email, password);

      // Persist remembered credentials
      try {
        if (remember) {
          localStorage.setItem("powerAdminEmail",    email);
          localStorage.setItem("powerAdminPassword", password);
        } else {
          localStorage.removeItem("powerAdminEmail");
          localStorage.removeItem("powerAdminPassword");
        }
      } catch { /* ignore */ }

      // Persist auth token + user
      try {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("powerAdminToken", result.token);
        storage.setItem("powerAdminUser",  JSON.stringify(result.user));
      } catch {
        console.warn("Failed to persist auth token to storage.");
      }

      setSuccess("Signed in successfully. Redirecting…");
      setTimeout(() => navigate("/poweradmin/dashboard"), 600);
    } catch (err) {
      setApiError(err?.message || "Sign in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  const handleRememberChange = (e) => {
    const checked = e.target.checked;
    setRemember(checked);
    if (!checked) {
      try {
        localStorage.removeItem("powerAdminEmail");
        localStorage.removeItem("powerAdminPassword");
      } catch { /* ignore */ }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-100 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg mx-auto shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-white bg-opacity-90 backdrop-blur py-12 px-6 sm:px-10">
          <form onSubmit={handleSubmit} aria-label="Poweradmin sign in" noValidate className="space-y-6">

            {/* ── Logo / heading ── */}
            <div className="flex flex-col items-center mb-2 gap-3">
              <img
                              src="https://www.dotsandcoms.in/assets/dots-and-coms-logo.webp"
                alt="Dots & Coms"
                className="h-20 w-auto object-contain"
                draggable={false}
                width="94"
                height="98"
              />
              <h1 className="text-2xl font-bold" style={{ color: "#cf1f1f" }}>
                Admin Login
              </h1>
            </div>

            {/* ── Error banner ── */}
            {apiError && (
              <div
                role="alert"
                data-testid="signin-error-box"
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

            {/* ── Success banner ── */}
            {success && (
              <div
                role="status"
                className="flex items-center gap-2 p-3 rounded-lg border text-sm font-medium"
                style={{ background: "#f0fdf4", borderColor: "#86efac", color: "#15803d" }}
              >
                <svg height="18" width="18" fill="none" viewBox="0 0 24 24" className="shrink-0">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M8.8 13.2l2.1 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {success}
              </div>
            )}

            {/* ── Email ── */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={email.length > 0 && !emailIsValid}
                aria-describedby="email-error"
                className="block w-full px-4 py-2.5 rounded-lg border-2 text-sm focus:outline-none focus:ring-4 transition"
                style={{
                  background:   "#fff",
                  borderColor:  email.length === 0 ? "#e5e7eb" : emailIsValid ? "#86efac" : "#fca5a5",
                  focusRingColor: emailIsValid ? "#bbf7d0" : "#fecaca",
                }}
              />
              {email.length > 0 && !emailIsValid && (
                <p id="email-error" className="text-xs text-red-600 font-medium mt-1">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            {/* ── Password ── */}
            <div className="space-y-1 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={password.length > 0 && !passwordIsValid}
                aria-describedby="password-error"
                className="block w-full px-4 py-2.5 pr-12 rounded-lg border-2 text-sm focus:outline-none focus:ring-4 transition"
                style={{
                  background:  "#fff",
                  borderColor: password.length === 0 ? "#e5e7eb" : passwordIsValid ? "#86efac" : "#fca5a5",
                }}
              />
              {/* Show / hide toggle */}
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-8 p-1 rounded text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-200 transition"
              >
                {showPassword ? (
                  <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
                    <path d="M2 10c2-4 4.5-6 8-6s6 2 8 6c-2 4-4.5 6-8 6s-6-2-8-6Z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" width="20" height="20" fill="none">
                    <path d="M2 2l16 16M4.2 7.8C2.8 8.9 2 10 2 10c2 4 4.5 6 8 6 1.4 0 2.7-.4 3.8-1M7.5 4.6C8.3 4.2 9.1 4 10 4c3.5 0 6 2 8 6-.6 1.2-1.4 2.3-2.3 3.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>
              {password.length > 0 && !passwordIsValid && (
                <p id="password-error" className="text-xs text-red-600 font-medium mt-1">
                  Password must be at least 6 characters.
                </p>
              )}
            </div>

            {/* ── Remember me + Forgot password ── */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-600">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={handleRememberChange}
                  className="h-4 w-4 rounded border-gray-300 accent-red-600 focus:ring-red-300"
                />
                Remember me
              </label>
              <Link
                to="/poweradmin/forgot-password"
                className="text-sm font-medium hover:underline focus:outline-none focus:ring-1 focus:ring-red-300 transition"
                style={{ color: "#cf1f1f" }}
              >
                Forgot password?
              </Link>
            </div>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={!formIsValid || loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-base font-bold shadow focus:outline-none focus:ring-4 focus:ring-red-200 transition disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(90deg, #dc2626 0%, #ef4444 50%, #f87171 100%)",
                boxShadow:  "0 2px 10px #f87171aa",
                opacity:    !formIsValid || loading ? 0.55 : 1,
              }}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75" />
                </svg>
              )}
              {loading ? "Signing In…" : "Sign In"}
            </button>

            {/* ── Footer note ── */}
            {/*<p className="text-center text-xs text-gray-400 pt-2">*/}
            {/*  By signing in you agree to the{" "}*/}
            {/*  <a*/}
            {/*    href="#"*/}
            {/*    className="underline underline-offset-2 hover:text-red-500 transition"*/}
            {/*    style={{ color: "#cf1f1f" }}*/}
            {/*  >*/}
            {/*    admin usage policy*/}
            {/*  </a>*/}
            {/*  .*/}
            {/*</p>*/}

          </form>
        </div>
      </div>
    </div>
  );
}
