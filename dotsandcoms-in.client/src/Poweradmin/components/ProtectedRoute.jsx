import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getStoredToken, validateToken, signOut } from "../../services/authService";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking"); // "checking" | "ok" | "denied"

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setStatus("denied");
      return;
    }
    validateToken(token)
      .then(() => setStatus("ok"))
      .catch(() => {
        signOut();
        setStatus("denied");
      });
  }, []);

  if (status === "checking") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(180deg,#1e1e2d 0%,#2a2a3d 100%)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".2" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="text-sm text-gray-400">Verifying session…</span>
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/poweradmin" replace />;
  }

  return children;
}
