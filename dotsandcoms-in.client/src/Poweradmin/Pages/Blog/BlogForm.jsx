// src/Poweradmin/Pages/Blog/BlogForm.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBlog, updateBlog, getBlogById,
  checkBlogTitleExists, checkBlogBrowserUrlExists,
} from "../../../services/blogService";

import {
  ClassicEditor, Essentials, Paragraph, Bold, Italic, Underline,
  Strikethrough, Link, BlockQuote, Heading, List, Indent, IndentBlock,
  Table, TableToolbar, HorizontalLine, SourceEditing, GeneralHtmlSupport,
  FindAndReplace, Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

function fmt(dateVal) {
  if (!dateVal) return "";
  const d = new Date(dateVal);
  return isNaN(d) ? "" : d.toISOString().slice(0, 10);
}

function slugify(str) {
  return str.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const EMPTY = {
  isVisible: true, imageUrls: [], title: "", pageTitle: "",
  browserUrl: "", metaTags: "", shortDescription: "",
  longDescription: "", blogDate: fmt(new Date()), expiryDate: "",
};

const CK_PLUGINS = [
  Essentials, Paragraph, Bold, Italic, Underline, Strikethrough,
  Link, BlockQuote, Heading, List, Indent, IndentBlock,
  Table, TableToolbar, HorizontalLine, SourceEditing,
  GeneralHtmlSupport, FindAndReplace, Undo,
];

const CK_TOOLBAR = [
  "sourceEditing", "|", "heading", "|",
  "bold", "italic", "underline", "strikethrough", "|",
  "link", "blockQuote", "|", "bulletedList", "numberedList", "|",
  "outdent", "indent", "|", "insertTable", "horizontalLine", "|",
  "findAndReplace", "|", "undo", "redo",
];

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {msg}
    </p>
  );
}

export default function BlogForm() {
  const { id }   = useParams();
  const isEdit   = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm]               = useState(EMPTY);
  const [loading, setLoading]         = useState(false);
  const [fetching, setFetching]       = useState(isEdit);
  const [apiError, setApiError]       = useState("");
  const [success, setSuccess]         = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [titleChecking, setTitleChecking]   = useState(false);
  const [urlChecking, setUrlChecking]       = useState(false);
  const [userEditedUrl, setUserEditedUrl]   = useState(false);

  const editorRef   = useRef(null);
  const instanceRef = useRef(null);
  const mountedRef  = useRef(false);
  const initContent = useRef("");

  // ── Fetch for edit ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isEdit) return;
    let alive = true;
    getBlogById(id)
      .then((data) => {
        if (!alive) return;
        initContent.current = data.longDescription || "";
        setForm({
          isVisible:        data.isVisible,
          imageUrls:        data.imageUrls || [],
          title:            data.title,
          pageTitle:        data.pageTitle,
          browserUrl:       data.browserUrl,
          metaTags:         data.metaTags || "",
          shortDescription: data.shortDescription,
          longDescription:  data.longDescription,
          blogDate:         fmt(data.blogDate),
          expiryDate:       fmt(data.expiryDate),
        });
        setUserEditedUrl(true); // don't auto-overwrite existing slug
      })
      .catch((e) => { if (alive) setApiError(e.message || "Failed to load blog."); })
      .finally(() => { if (alive) setFetching(false); });
    return () => { alive = false; };
  }, [id, isEdit]);

  // ── Mount CKEditor ─────────────────────────────────────────────────
  useEffect(() => {
    if (fetching || mountedRef.current || !editorRef.current) return;
    mountedRef.current = true;
    ClassicEditor.create(editorRef.current, {
      licenseKey: "GPL", plugins: CK_PLUGINS,
      toolbar: { items: CK_TOOLBAR, shouldNotGroupWhenFull: true },
      htmlSupport: { allow: [{ name: /.*/, attributes: true, classes: true, styles: true }] },
      table: { contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"] },
    })
      .then((editor) => {
        instanceRef.current = editor;
        if (initContent.current) editor.setData(initContent.current);
        editor.model.document.on("change:data", () =>
          setForm((prev) => ({ ...prev, longDescription: editor.getData() }))
        );
      })
      .catch((err) => { console.error("CKEditor failed:", err); mountedRef.current = false; });

    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy().catch(() => {});
        instanceRef.current = null;
        mountedRef.current  = false;
      }
    };
  }, [fetching]);

  // ── Helpers ────────────────────────────────────────────────────────
  function clearErr(name) {
    setFieldErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm((prev) => {
      const next = { ...prev, [name]: val };
      // Auto-generate browserUrl from title (only if user hasn't manually edited it)
      if (name === "title" && !userEditedUrl) {
        next.browserUrl = slugify(value);
      }
      return next;
    });
    clearErr(name);
  }

  function handleBrowserUrlChange(e) {
    setUserEditedUrl(true);
    setForm((prev) => ({ ...prev, browserUrl: e.target.value.toLowerCase().replace(/\s+/g, "-") }));
    clearErr("browserUrl");
  }

  // Multiple images
  function handleImageChange(e) {
    const files = Array.from(e.target.files || []);
    const allowed = ["jpg", "jpeg", "png", "webp"];
    const invalid = files.find(f => !allowed.includes(f.name.split(".").pop().toLowerCase()));
    if (invalid) {
      setFieldErrors((prev) => ({ ...prev, images: "Only JPG, JPEG, PNG, WEBP images are allowed." }));
      e.target.value = "";
      return;
    }
    clearErr("images");
    Promise.all(files.map(file => new Promise((res) => {
      const reader = new FileReader();
      reader.onload = (ev) => res(ev.target.result);
      reader.readAsDataURL(file);
    }))).then((base64List) => {
      setForm((prev) => ({ ...prev, imageUrls: [...prev.imageUrls, ...base64List] }));
    });
    e.target.value = "";
  }

  function removeImage(idx) {
    setForm((prev) => ({ ...prev, imageUrls: prev.imageUrls.filter((_, i) => i !== idx) }));
  }

  // Title blur uniqueness check
  async function handleTitleBlur() {
    const title = form.title.trim();
    if (!title) return;
    setTitleChecking(true);
    try {
      const exists = await checkBlogTitleExists(title, isEdit ? Number(id) : null);
      if (exists) setFieldErrors((prev) => ({ ...prev, title: "A blog with this title already exists." }));
    } catch { /* ignore */ }
    finally { setTitleChecking(false); }
  }

  // BrowserUrl blur uniqueness check
  async function handleBrowserUrlBlur() {
    const url = form.browserUrl.trim();
    if (!url) return;
    setUrlChecking(true);
    try {
      const exists = await checkBlogBrowserUrlExists(url, isEdit ? Number(id) : null);
      if (exists) setFieldErrors((prev) => ({ ...prev, browserUrl: "This URL is already in use by another blog." }));
    } catch { /* ignore */ }
    finally { setUrlChecking(false); }
  }

  // ── Submit ─────────────────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    setApiError(""); setSuccess("");

    const longDesc = instanceRef.current?.getData() ?? form.longDescription;
    const errors = {};
    if (!form.title.trim())            errors.title            = "Title is required.";
    if (!form.pageTitle.trim())        errors.pageTitle        = "Page title is required.";
    if (!form.browserUrl.trim())       errors.browserUrl       = "Browser URL is required.";
    if (!form.shortDescription.trim()) errors.shortDescription = "Short description is required.";
    if (!longDesc.trim())              errors.longDescription  = "Long description is required.";
    if (!form.blogDate)                errors.blogDate         = "Blog date is required.";
    if (form.expiryDate && form.blogDate && form.expiryDate <= form.blogDate)
      errors.expiryDate = "Expiry date must be after the blog date.";

    if (form.title.trim() && !errors.title) {
      try {
        if (await checkBlogTitleExists(form.title.trim(), isEdit ? Number(id) : null))
          errors.title = "A blog with this title already exists.";
      } catch { /* ignore */ }
    }
    if (form.browserUrl.trim() && !errors.browserUrl) {
      try {
        if (await checkBlogBrowserUrlExists(form.browserUrl.trim(), isEdit ? Number(id) : null))
          errors.browserUrl = "This URL is already in use by another blog.";
      } catch { /* ignore */ }
    }

    if (Object.keys(errors).length) { setFieldErrors(errors); return; }

    const payload = {
      isVisible:        form.isVisible,
      imageUrls:        form.imageUrls.length > 0 ? form.imageUrls : null,
      title:            form.title.trim(),
      pageTitle:        form.pageTitle.trim(),
      browserUrl:       form.browserUrl.trim().toLowerCase(),
      metaTags:         form.metaTags || null,
      shortDescription: form.shortDescription.trim(),
      longDescription:  longDesc,
      blogDate:         new Date(form.blogDate).toISOString(),
      expiryDate:       form.expiryDate ? new Date(form.expiryDate).toISOString() : null,
    };

    setLoading(true);
    try {
      if (isEdit) {
        await updateBlog(id, payload);
        setSuccess("Blog updated successfully.");
      } else {
        await createBlog(payload);
        setSuccess("Blog created successfully. Redirecting…");
      }
      setTimeout(() => navigate("/poweradmin/blogs"), 800);
    } catch (err) {
      const msg = err.message || "Failed to save blog.";
      if (msg.toLowerCase().includes("title already exists"))
        setFieldErrors((prev) => ({ ...prev, title: msg }));
      else if (msg.toLowerCase().includes("browser url"))
        setFieldErrors((prev) => ({ ...prev, browserUrl: msg }));
      else
        setApiError(msg);
    } finally { setLoading(false); }
  }

  // ── Render ─────────────────────────────────────────────────────────
  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-8 w-8 text-red-600" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75" />
        </svg>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{isEdit ? "Edit Blog" : "Add New Blog"}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEdit ? "Update the blog post details below." : "Fill in the details to create a new blog post."}
          </p>
        </div>
        <button type="button" onClick={() => navigate("/poweradmin/blogs")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition">
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
            <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to list
        </button>
      </div>

      {/* Alerts */}
      {apiError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5">
          <svg height="16" width="16" fill="none" viewBox="0 0 24 24" className="shrink-0">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
            <path d="M12 7.5v4m0 2.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {apiError}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-5">
          <svg height="16" width="16" fill="none" viewBox="0 0 24 24" className="shrink-0">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8.8 13.2l2.1 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">

          {/* Visibility */}
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Visible to public</p>
              <p className="text-xs text-gray-400 mt-0.5">Toggle to show or hide this post on the website.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="isVisible" checked={form.isVisible}
                onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2
                peer-focus:ring-red-300 rounded-full peer peer-checked:bg-red-600 transition
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>

          {/* Title */}
          <div className="px-6 py-4 space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input type="text" name="title" value={form.title}
                onChange={handleChange} onBlur={handleTitleBlur}
                placeholder="Enter blog title" maxLength={500}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 pr-8 ${
                  fieldErrors.title ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"
                }`} />
              {titleChecking && (
                <svg className="animate-spin absolute right-3 top-3 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75" />
                </svg>
              )}
            </div>
            <FieldError msg={fieldErrors.title} />
          </div>

          {/* Page Title */}
          <div className="px-6 py-4 space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Page Title <span className="text-red-500">*</span>
              <span className="ml-1 text-xs font-normal text-gray-400">(browser tab title)</span>
            </label>
            <input type="text" name="pageTitle" value={form.pageTitle}
              onChange={handleChange} placeholder="Enter page title" maxLength={500}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                fieldErrors.pageTitle ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-red-200"
              }`} />
            <FieldError msg={fieldErrors.pageTitle} />
          </div>

          {/* Browser URL */}
          <div className="px-6 py-4 space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Browser URL <span className="text-red-500">*</span>
              <span className="ml-1 text-xs font-normal text-gray-400"></span>
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-red-200"
              style={{ borderColor: fieldErrors.browserUrl ? "#f87171" : "#e5e7eb" }}>
              <span className="px-3 py-2.5 text-xs text-gray-400 bg-gray-50 border-r border-gray-200 whitespace-nowrap select-none">
                /blogs/
              </span>
              <div className="relative flex-1">
                <input type="text" value={form.browserUrl}
                  onChange={handleBrowserUrlChange} onBlur={handleBrowserUrlBlur}
                  placeholder="my-blog-post-url" maxLength={500}
                  className="w-full px-3 py-2.5 text-sm focus:outline-none bg-white pr-8" />
                {urlChecking && (
                  <svg className="animate-spin absolute right-3 top-3 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75" />
                  </svg>
                )}
              </div>
            </div>
            {form.browserUrl && (
              <p className="text-xs text-gray-400">
                Full URL: <span className="text-gray-600">https://www.dotsandcoms.in/blogs/{form.browserUrl}</span>
              </p>
            )}
            <FieldError msg={fieldErrors.browserUrl} />
          </div>

          {/* Meta Tags */}
          <div className="px-6 py-4 space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Meta Tags
              <span className="ml-1 text-xs font-normal text-gray-400">(raw HTML injected into &lt;head&gt;)</span>
            </label>
            <textarea name="metaTags" value={form.metaTags} onChange={handleChange}
              rows={5} placeholder={`<link rel="canonical" href="https://www.dotsandcoms.in/blogs/my-url" />\n<meta name="description" content="..." />\n<meta name="keywords" content="..." />`}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-200 resize-y" />
            <p className="text-xs text-gray-400">Paste raw HTML meta/link tags. They will be injected into the blog detail page's &lt;head&gt;.</p>
          </div>

          {/* Short Description */}
          <div className="px-6 py-4 space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea name="shortDescription" value={form.shortDescription}
              onChange={handleChange} placeholder="Brief summary shown in blog listings…"
              rows={3} maxLength={1000}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200 resize-y ${
                fieldErrors.shortDescription ? "border-red-400" : "border-gray-200"
              }`} />
            <div className="flex justify-between items-center">
              <FieldError msg={fieldErrors.shortDescription} />
              <p className="text-xs text-gray-400 ml-auto">{form.shortDescription.length}/1000</p>
            </div>
          </div>

          {/* Long Description */}
          <div className="px-6 py-4 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Long Description <span className="text-red-500">*</span>
            </label>
            <div ref={editorRef} className={`ck-host-wrap ${fieldErrors.longDescription ? "ring-1 ring-red-400 rounded-lg" : ""}`} />
            <FieldError msg={fieldErrors.longDescription} />
          </div>

          {/* Cover Images (multiple) */}
          <div className="px-6 py-4 space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Images
              <span className="ml-1 text-xs font-normal text-gray-400">(select multiple)</span>
            </label>
            <input type="file" accept=".jpg,.jpeg,.png,.webp" multiple onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
            <p className="text-xs text-gray-400">Accepted: JPG, JPEG, PNG, WEBP. First image is used as the cover.</p>
            <FieldError msg={fieldErrors.images} />

            {form.imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {form.imageUrls.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img src={url} alt={`Image ${idx + 1}`}
                      className="h-28 w-28 rounded-lg border border-gray-200 object-cover" />
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        Cover
                      </span>
                    )}
                    <button type="button" onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-700 transition opacity-0 group-hover:opacity-100"
                      aria-label="Remove image">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Blog Date <span className="text-red-500">*</span>
              </label>
              <input type="date" name="blogDate" value={form.blogDate} onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200 ${
                  fieldErrors.blogDate ? "border-red-400" : "border-gray-200"
                }`} />
              <FieldError msg={fieldErrors.blogDate} />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input type="date" name="expiryDate" value={form.expiryDate}
                min={form.blogDate || undefined}
                onChange={(e) => {
                  handleChange(e);
                  if (form.blogDate && e.target.value && e.target.value <= form.blogDate)
                    setFieldErrors((prev) => ({ ...prev, expiryDate: "Expiry date must be after the blog date." }));
                  else clearErr("expiryDate");
                }}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-200 ${
                  fieldErrors.expiryDate ? "border-red-400" : "border-gray-200"
                }`} />
              {fieldErrors.expiryDate
                ? <FieldError msg={fieldErrors.expiryDate} />
                : <p className="text-xs text-gray-400">Leave blank for no expiry.</p>
              }
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-6">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white text-sm font-bold shadow transition focus:outline-none focus:ring-2 focus:ring-red-200 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(90deg,#dc2626,#f87171)", opacity: loading ? 0.6 : 1 }}>
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white shrink-0" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75" />
              </svg>
            )}
            {loading ? "Saving…" : isEdit ? "Update Blog" : "Create Blog"}
          </button>
          <button type="button" onClick={() => navigate("/poweradmin/blogs")}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
