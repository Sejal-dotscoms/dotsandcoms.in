import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogs, deleteBlog } from "../../../services/blogService";

// ── Sort icon ──────────────────────────────────────────────────────────────
function SortIcon({ col, sortCol, sortDir }) {
  const isActive = sortCol === col;
  return (
    <span className="inline-flex flex-col ml-1.5 gap-px shrink-0">
      <svg viewBox="0 0 8 5" className={`w-2 h-2 ${isActive && sortDir === "asc" ? "text-red-600" : "text-gray-300"}`} fill="currentColor">
        <path d="M4 0L8 5H0z" />
      </svg>
      <svg viewBox="0 0 8 5" className={`w-2 h-2 ${isActive && sortDir === "desc" ? "text-red-600" : "text-gray-300"}`} fill="currentColor">
        <path d="M4 5L0 0h8z" />
      </svg>
    </span>
  );
}

// ── Sortable th ────────────────────────────────────────────────────────────
function Th({ label, col, sortCol, sortDir, onSort, className = "" }) {
  return (
    <th
      className={`px-4 py-3 select-none cursor-pointer hover:bg-gray-100 transition whitespace-nowrap ${className}`}
      onClick={() => onSort(col)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <SortIcon col={col} sortCol={sortCol} sortDir={sortDir} />
      </span>
    </th>
  );
}

export default function BlogList() {
  const [blogs, setBlogs]           = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage]             = useState(1);
  const [pageSize, setPageSize]     = useState(10);
  const [search, setSearch]         = useState("");
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [sortCol, setSortCol]       = useState("blogDate");
  const [sortDir, setSortDir]       = useState("desc");

  const navigate = useNavigate();

  // ── Fetch ──────────────────────────────────────────────────────────────
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    getBlogs({ page, pageSize, search })
      .then((res) => {
        if (!alive) return;
        setBlogs(res.items || []);
        setTotalCount(res.totalCount || 0);
      })
      .catch((err) => { if (alive) setError(err.message || "Failed to load blogs."); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [page, pageSize, search]);

  // ── Client-side sort ───────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortCol) return blogs;
    return [...blogs].sort((a, b) => {
      let av = a[sortCol], bv = b[sortCol];
      if (sortCol === "blogDate" || sortCol === "expiryDate") {
        av = av ? new Date(av).getTime() : 0;
        bv = bv ? new Date(bv).getTime() : 0;
      } else if (sortCol === "isVisible") {
        av = av ? 1 : 0;
        bv = bv ? 1 : 0;
      } else {
        av = (av ?? "").toString().toLowerCase();
        bv = (bv ?? "").toString().toLowerCase();
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [blogs, sortCol, sortDir]);

  function handleSort(col) {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortCol(col); setSortDir("asc"); }
  }

  function handleSearchChange(e) { setSearch(e.target.value); setPage(1); }

  async function handleDelete(id) {
    if (!confirm("Delete this blog post?")) return;
    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
      setTotalCount((c) => c - 1);
    } catch (err) {
      alert(err.message || "Failed to delete blog.");
    }
  }

  // ── Pagination ─────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  function goToPage(p) { if (p >= 1 && p <= totalPages) setPage(p); }

  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to   = Math.min(page * pageSize, totalCount);

  // Page buttons: first, ..., window around current, ..., last
  const pageButtons = useMemo(() => {
    const btns = [];
    const start = Math.max(1, page - 2);
    const end   = Math.min(totalPages, page + 2);
    if (start > 1) btns.push(1);
    if (start > 2) btns.push("...");
    for (let i = start; i <= end; i++) btns.push(i);
    if (end < totalPages - 1) btns.push("...");
    if (end < totalPages) btns.push(totalPages);
    return btns;
  }, [page, totalPages]);

  return (
    <div>
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Blog Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all blog posts from here.</p>
        </div>
        <button
          onClick={() => navigate("/poweradmin/blogs/new")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium shadow hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-red-300"
          style={{ background: "linear-gradient(90deg,#dc2626,#f87171)" }}
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Add Blog
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* ── Table card ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Top controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <span className="text-sm text-gray-500">entries per page</span>
          </div>

          <div className="relative">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13.5 13.5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Search by title or description…"
              value={search}
              onChange={handleSearchChange}
              className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200 w-64"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-red-600" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75" />
            </svg>
          </div>
        ) : sorted.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            {search ? "No blogs match your search." : "No blogs yet. Click 'Add Blog' to create one."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-600 font-semibold">
                <tr>
                  <Th label="Visible"     col="isVisible"  sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
                  <Th label="Title"       col="title"      sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
                  <Th label="Blog Date"   col="blogDate"   sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
                  <Th label="Expiry Date" col="expiryDate" sortCol={sortCol} sortDir={sortDir} onSort={handleSort} />
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        blog.isVisible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {blog.isVisible ? "✓ Yes" : "✗ No"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-medium max-w-xs truncate">{blog.title}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(blog.blogDate).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {blog.expiryDate ? new Date(blog.expiryDate).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/poweradmin/blogs/edit/${blog.id}`)}
                          className="px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="px-3 py-1 rounded-md text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition focus:outline-none focus:ring-2 focus:ring-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bottom: showing info + pagination */}
        {!loading && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 text-sm text-gray-600">
            <p>
              {totalCount === 0
                ? "No entries found"
                : `Showing ${from} to ${to} of ${totalCount} ${totalCount === 1 ? "entry" : "entries"}`}
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                title="Previous page"
              >
                ‹
              </button>

              {pageButtons.map((btn, idx) =>
                btn === "..." ? (
                  <span key={`e-${idx}`} className="px-1 text-gray-400">…</span>
                ) : (
                  <button
                    key={btn}
                    onClick={() => goToPage(btn)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md border text-xs transition ${
                      page === btn
                        ? "bg-red-600 text-white border-red-600 font-semibold"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {btn}
                  </button>
                )
              )}

              <button
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                title="Next page"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
