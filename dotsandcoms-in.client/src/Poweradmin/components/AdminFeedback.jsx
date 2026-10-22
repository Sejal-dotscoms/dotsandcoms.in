/* eslint-disable react-refresh/only-export-components -- provider, hooks, and buttons share one feedback module */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";

const FeedbackContext = createContext(null);
const MESSAGE_MS = 3000;

export function useAdminFeedback() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) return { notify: () => {}, dismissToast: () => {} };
  return ctx;
}

export function useActionNotices() {
  const { notify, dismissToast } = useAdminFeedback();
  const [busy, setBusy] = useState({});
  const [notices, setNotices] = useState({});

  const begin = useCallback((key) => {
    dismissToast();
    setNotices({});
    setBusy((current) => ({ ...current, [key]: true }));
  }, [dismissToast]);

  const finish = useCallback((key, message, type = "success", options = {}) => {
    setBusy((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    const showInline = options.inline !== false && !!message;
    setNotices(showInline ? { [key]: { type, message } } : {});
    if (message) notify(message, type);
  }, [notify]);

  const dismiss = useCallback((key) => {
    setNotices((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }, []);

  const isBusy = useCallback((key) => !!busy[key], [busy]);

  return { isBusy, notices, begin, finish, dismiss };
}

export function ButtonSpinner({ className = "h-4 w-4" }) {
  return (
    <svg className={`animate-spin shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-90" />
    </svg>
  );
}

export function BusyButton({
  busy = false,
  busyLabel,
  children,
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      className={`inline-flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...props}
    >
      {busy && <ButtonSpinner />}
      {busy && busyLabel ? busyLabel : children}
    </button>
  );
}

export function ActionNotice({ notice, onClose, className = "mt-3" }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const message = notice?.message || "";

  useEffect(() => {
    if (!message || !ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, [message, notice?.type]);

  useEffect(() => {
    if (!message || !closeRef.current) return;
    const timer = window.setTimeout(() => closeRef.current?.(), MESSAGE_MS);
    return () => window.clearTimeout(timer);
  }, [message, notice?.type]);

  if (!message) return null;
  const error = notice.type === "error";

  return (
    <div
      ref={ref}
      role={error ? "alert" : "status"}
      className={`${className} flex items-start gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm font-semibold shadow-md ${
        error
          ? "border-red-600 bg-red-100 text-red-950"
          : "border-emerald-700 bg-emerald-100 text-emerald-950"
      }`}
    >
      {error ? (
        <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6.5 10.2l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="flex-1 leading-snug">{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss message"
          className="shrink-0 rounded px-1 text-lg leading-none hover:bg-black/10"
        >
          ×
        </button>
      )}
    </div>
  );
}

function AdminToast({ toast, onClose }) {
  const error = toast.type === "error";
  const belowSiteHeader = typeof document !== "undefined" && !!document.querySelector(".apply-form");
  return createPortal(
    <div className={`pointer-events-none fixed inset-x-0 z-[200] flex justify-center px-4 ${belowSiteHeader ? "top-24" : "top-4"}`}>
      <div
        role={error ? "alert" : "status"}
        aria-live="assertive"
        data-testid="admin-toast"
        className="admin-toast pointer-events-auto flex w-full max-w-xl items-start gap-3 rounded-xl px-4 py-4 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
        style={{ background: error ? "#991b1b" : "#065f46" }}
      >
        {error ? (
          <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 7.5v5M12 16.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 12.2l2.4 2.4 5.2-5.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <div className="flex-1 text-left text-base font-semibold leading-snug">{toast.message}</div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss message"
          className="shrink-0 cursor-pointer rounded px-1 text-2xl leading-none text-white hover:bg-white/15"
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
}

export function AdminFeedbackProvider({ children }) {
  const seq = useRef(0);
  const [toast, setToast] = useState(null);

  const notify = useCallback((message, type = "success") => {
    if (!message) return;
    seq.current += 1;
    setToast({ id: seq.current, message, type });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => {
      setToast((current) => (current?.id === toast.id ? null : current));
    }, MESSAGE_MS);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <FeedbackContext.Provider value={{ notify, dismissToast }}>
      {children}
      {toast && <AdminToast key={toast.id} toast={toast} onClose={dismissToast} />}
    </FeedbackContext.Provider>
  );
}

export default function AdminShell() {
  return (
    <AdminFeedbackProvider>
      <div className="admin-shell contents">
        <Outlet />
      </div>
    </AdminFeedbackProvider>
  );
}
