import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { getPublicBlogBySlug } from "../services/blogService";
import { setPageSEO } from "../utils/seo";

function fmt(dateVal) {
  if (!dateVal) return "";
  return new Date(dateVal).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function ImageCarousel({ images, alt }) {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const touchX = useRef(0);
  const total   = images.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  useEffect(() => {
    setCurrent(0);
  }, [images]);

  useEffect(() => {
    if (total <= 1 || paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % total), 4500);
    return () => clearInterval(id);
  }, [total, paused]);

  if (total === 0) return null;

  if (total === 1) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
        <img src={images[0]} alt={alt} className="w-full max-h-[460px] object-cover" />
      </div>
    );
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-100 select-none bg-slate-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
      }}
    >
      {/* Slides strip */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((url, idx) => (
          <div key={idx} className="min-w-full">
            <img
              src={url}
              alt={`${alt} – image ${idx + 1}`}
              className="w-full max-h-[460px] object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-slate-700 hover:text-[#dc2626] transition-all duration-200"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-slate-700 hover:text-[#dc2626] transition-all duration-200"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to image ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "w-5 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Counter badge */}
      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
        {current + 1} / {total}
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  const { slug }    = useParams();
  const navigate    = useNavigate();
  const [blog, setBlog]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const injectedMetaRef = useRef({ added: [], removed: [] });

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // Inject / cleanup meta tags from DB — replaces any existing tag with the same name/property
  useEffect(() => {
    const { added, removed } = injectedMetaRef.current;
    added.forEach((el) => { try { document.head.removeChild(el); } catch {} });
    removed.forEach((el) => { try { document.head.appendChild(el); } catch {} });
    injectedMetaRef.current = { added: [], removed: [] };

    if (!blog?.metaTags?.trim()) return;

    const temp = document.createElement("div");
    temp.innerHTML = blog.metaTags;

    Array.from(temp.children).forEach((el) => {
      const nameAttr = el.getAttribute("name");
      const propAttr = el.getAttribute("property");
      const selector = nameAttr  ? `meta[name="${nameAttr}"]`
                     : propAttr  ? `meta[property="${propAttr}"]`
                     : null;

      if (selector) {
        const existing = document.head.querySelector(selector);
        if (existing) {
          document.head.removeChild(existing);
          injectedMetaRef.current.removed.push(existing);
        }
      }

      const clone = el.cloneNode(true);
      document.head.appendChild(clone);
      injectedMetaRef.current.added.push(clone);
    });

    return () => {
      injectedMetaRef.current.added.forEach((el) => { try { document.head.removeChild(el); } catch {} });
      injectedMetaRef.current.removed.forEach((el) => { try { document.head.appendChild(el); } catch {} });
      injectedMetaRef.current = { added: [], removed: [] };
    };
  }, [blog]);

  useEffect(() => {
    setLoading(true);
    setError("");
    getPublicBlogBySlug(slug)
      .then((data) => {
        if (!data) { navigate("/blogs", { replace: true }); return; }
        setBlog(data);
        setPageSEO({
          title:       data.pageTitle || `${data.title} | Dots & Coms Blog`,
          description: data.shortDescription,
          keywords:    `${data.title}, web design blog Vadodara, Dots and Coms`,
          canonical:   `https://www.dotsandcoms.in/blogs/${data.browserUrl}`,
          ogImage:     (data.imageUrls?.[0] || data.imageUrl) &&
                       !(data.imageUrls?.[0] || data.imageUrl).startsWith("data:")
                         ? (data.imageUrls?.[0] || data.imageUrl)
                         : undefined,
        });
      })
      .catch((e) => setError(e.message || "Failed to load blog."))
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return (
      <>
        <InnerBanner title="Blog" titleTag="div" breadcrumbs={[{ label: "Blogs", href: "/blogs" }, { label: "Loading…" }]} />
        <div className="flex justify-center py-32">
          <svg className="animate-spin h-8 w-8 text-[#dc2626]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75" />
          </svg>
        </div>
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <InnerBanner title="Blog" titleTag="div" breadcrumbs={[{ label: "Blogs", href: "/blogs" }, { label: "Not Found" }]} />
        <div className="text-center py-32 text-slate-500">{error || "Blog not found."}</div>
      </>
    );
  }

  const images = blog.imageUrls?.length > 0 ? blog.imageUrls : (blog.imageUrl ? [blog.imageUrl] : []);

  return (
    <>
      <InnerBanner
        title={blog.title}
        titleTag="div"
        breadcrumbs={[{ label: "Blogs", href: "/blogs" }, { label: blog.title }]}
      />

      <section className="relative py-16 sm:py-20 bg-white overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#dc2626]/3 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-12">

          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }} className="mb-8">
            <Link to="/blogs"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#dc2626] transition-colors duration-200">
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
          </motion.div>

          {/* Date */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex items-center gap-2 text-sm text-slate-400 font-medium mb-4">
            <Calendar className="w-4 h-4 text-[#dc2626]" />
            {fmt(blog.blogDate)}
          </motion.div>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-slate-800 leading-tight tracking-tight mb-6">
            {blog.title}
          </motion.h1>

          {/* Image carousel */}
          {images.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }} className="mb-8">
              <ImageCarousel images={images} alt={blog.title} />
            </motion.div>
          )}

          {/* Short description */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed border-l-4 border-[#dc2626] pl-4 mb-10 italic">
            {blog.shortDescription}
          </motion.p>

          <div className="h-px bg-gradient-to-r from-[#dc2626]/30 via-slate-200 to-transparent mb-10" />

          {/* Long description */}
          <motion.div className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.longDescription }} />

          {/* Bottom back link */}
          <div className="mt-14 pt-8 border-t border-slate-100">
            <Link to="/blogs"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(90deg,#dc2626,#f87171)" }}>
              <ArrowLeft className="w-4 h-4" />
              Back to All Blogs
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
