// src/Poweradmin/layout/PoweradminLayout.jsx
// Shared admin shell: collapsible sidebar + topbar + page content area.

import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut, getStoredUser, getStoredToken } from "../../services/authService";
import logo from "../../assets/images/dots-and-coms-logo.png";

// ── Nav items ─────────────────────────────────────────────────────────
const NAV = [
  {
    label: "Dashboard",
    to: "/poweradmin/dashboard",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5 shrink-0">
        <rect x="2" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="12" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="2" y="12" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="12" y="12" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Blog Management",
    to: "/poweradmin/blogs",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5 shrink-0">
        <rect x="2" y="3" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 8h10M6 12h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ── Sidebar link ──────────────────────────────────────────────────────
function SideLink({ item, collapsed }) {
  return (
    <NavLink
      to={item.to}
      end
      className={({ isActive }) =>
        [
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
          isActive
            ? "bg-red-600 text-white shadow"
            : "text-gray-300 hover:bg-white/10 hover:text-white",
        ].join(" ")
      }
      title={collapsed ? item.label : undefined}
    >
      {item.icon}
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );
}

// ── Layout ────────────────────────────────────────────────────────────
export default function PoweradminLayout() {
  const [collapsed, setCollapsed]       = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate      = useNavigate();
  const user          = getStoredUser();
  const hasSession    = !!(user || getStoredToken());
  const displayName   = user?.fullName ?? "Admin";
  const displayEmail  = user?.email ?? "";
  const displayRole   = user?.role ?? "Admin";
  const avatarLetter  = displayName[0]?.toUpperCase() ?? "A";
  const dropdownRef   = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSignOut() {
    signOut();
    navigate("/poweradmin");
  }

  return (
    <div className="min-h-screen flex bg-gray-100" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>

      {/* ── Sidebar ────────────────────────────────────────────────── */}
      <aside
        className="flex flex-col shrink-0 transition-all duration-200"
        style={{
          width: collapsed ? "68px" : "230px",
          background: "linear-gradient(180deg, #1e1e2d 0%, #2a2a3d 100%)",
          minHeight: "100vh",
        }}
      >
        {/* Logo / brand */}
        <div
          className="flex items-center justify-center px-4 py-4 border-b border-white/10 select-none overflow-hidden"
          style={{ minHeight: "64px" }}
        >
          {collapsed ? (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow"
              style={{ background: "linear-gradient(135deg,#dc2626,#f87171)" }}
            >
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-white">
                <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          ) : (
                          <img
                              src={logo}
                              alt="Dots & Coms"
                              className="h-20 w-auto object-contain"
                              style={{
                                  backgroundColor: "white",
                                  paddingRight: "20px",
                                  paddingLeft: "20px",
                                  paddingBottom: "7px",
                              }}
                          />
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {NAV.map((item) => (
            <SideLink key={item.to} item={item} collapsed={collapsed} />
          ))}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center justify-center gap-2 mx-2 mb-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white text-xs transition"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className={`w-4 h-4 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
          >
            <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>

      {/* ── Main area ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header
          className="flex items-center justify-between px-6 border-b bg-white shadow-sm"
          style={{ minHeight: "64px" }}
        >
          <h1>&nbsp;</h1>

          {/* Profile dropdown — shown whenever a session token exists */}
          {hasSession && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm"
                  style={{ background: "linear-gradient(135deg,#dc2626,#f87171)" }}
                >
                  {avatarLetter}
                </div>
                <div className="hidden sm:block text-left leading-tight">
                  <p className="text-sm font-semibold text-gray-800 leading-none">{displayName}</p>
                  {/*<p className="text-xs text-gray-400 mt-0.5">{displayRole}</p>*/}
                </div>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 hidden sm:block ${dropdownOpen ? "rotate-180" : ""}`}
                >
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50"
                  style={{ top: "100%" }}
                >
                  <div className="px-4 py-2.5 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-800 truncate">{displayName}</p>
                    {displayEmail && (
                      <p className="text-xs text-gray-400 truncate mt-0.5">{displayEmail}</p>
                    )}
                  </div>

                  <NavLink
                    to="/poweradmin/change-password"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-gray-400 shrink-0">
                      <rect x="3" y="9" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M7 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    Change Password
                  </NavLink>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0">
                      <path d="M13 3h4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M9 14l4-4-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 10H3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
