import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { getPublicBlogs } from "../services/blogService";
import { setPageSEO } from "../utils/seo";

function fmt(dateVal) {
  if (!dateVal) return "";
  return new Date(dateVal).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55 },
};

export default function BlogsPage() {
  const [blogs, setBlogs]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Blogs – Web Design, Mobile App & Digital Marketing Insights",
      description:
        "Read expert articles on website design, mobile app development, SEO, digital marketing, and web hosting from Dots & Coms, Vadodara.",
      keywords:
        "web design blog Vadodara, mobile app development blog, SEO tips Baroda, digital marketing articles, web hosting tips, Dots and Coms blog",
      canonical: "https://www.dotsandcoms.in/blogs",
    });
  }, []);

  useEffect(() => {
    getPublicBlogs()
      .then((data) => setBlogs(data || []))
      .catch((e) => setError(e.message || "Failed to load blogs."))
      .finally(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const currentBlogs = blogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <>
      <InnerBanner
        title="Our Blogs"
        subtitle={<>Insights, <strong>web design tips</strong>, and <strong>mobile app updates</strong> from the Dots & Coms team in <strong>Vadodara</strong>.</>}
        breadcrumbs={[{ label: "Blogs" }]}
      />

      <section className="relative overflow-hidden bg-slate-50/60 py-16 sm:py-20">
        {/* Subtle background accents */}
        <div className="pointer-events-none absolute top-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#dc2626]/3 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-10 -z-10 h-[400px] w-[400px] rounded-full bg-[#ea580c]/3 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-6 md:px-12">

          {/* Section header */}
          <motion.div {...fadeUp} className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full border border-red-500/10 bg-red-500/5 px-3 py-1.5 font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase">
              // LATEST ARTICLES
            </span>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-slate-800 sm:text-3xl">
              From Our Blog
            </h2>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <svg className="h-8 w-8 animate-spin text-[#dc2626]" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75" />
              </svg>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="py-20 text-center text-slate-500">{error}</div>
          )}

          {/* Empty */}
          {!loading && !error && blogs.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-slate-500">No blog posts available yet. Check back soon!</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && currentBlogs.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {currentBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                  >
                    <Link
                      to={`/blogs/${blog.browserUrl || blog.id}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                      aria-label={blog.title}
                    >
                      {/* Cover image */}
                      <div className="relative h-52 flex-shrink-0 overflow-hidden bg-slate-100">
                        {(blog.imageUrls?.[0] || blog.imageUrl) ? (
                          <img
                            src={blog.imageUrls?.[0] || blog.imageUrl}
                            alt={blog.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                            width="400"
                            height="208"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                            <svg className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24">
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                            </svg>
                          </div>
                        )}
                        {/* Red top-line accent */}
                        <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#dc2626] to-[#f87171] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <Calendar className="h-3.5 w-3.5 text-[#dc2626]" />
                          {fmt(blog.blogDate)}
                        </div>

                        {/* Title */}
                        <h3 className="font-heading line-clamp-2 text-base leading-snug font-bold text-slate-800 transition-colors duration-200 group-hover:text-[#dc2626]">
                          {blog.title}
                        </h3>

                        {/* Short description */}
                        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
                          {blog.shortDescription}
                        </p>

                        {/* CTA */}
                        <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#dc2626] transition-all duration-200 group-hover:gap-2">
                          Read more <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2 pt-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 text-xs font-bold rounded-lg transition-colors ${
                        pageNum === currentPage
                          ? "bg-[#dc2626] text-white shadow-sm"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </>
  );
}
