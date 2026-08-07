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
      title: "Blogs – Web Design, Mobile App & Digital Marketing Insights | Dots & Coms",
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
        subtitle="Insights, tips and updates from the Dots & Coms team."
        breadcrumbs={[{ label: "Blogs" }]}
      />

      <section className="relative py-16 sm:py-20 bg-slate-50/60 overflow-hidden">
        {/* Subtle background accents */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#dc2626]/3 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#ea580c]/3 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Section header */}
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase bg-red-500/5 border border-red-500/10 px-3 py-1.5 rounded-full inline-block mb-4">
              // LATEST ARTICLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-800 tracking-tight">
              From Our Blog
            </h2>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <svg className="animate-spin h-8 w-8 text-[#dc2626]" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path d="M4 12a8 8 0 018-8v8H4z" fill="currentColor" className="opacity-75" />
              </svg>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="text-center py-20 text-slate-500">{error}</div>
          )}

          {/* Empty */}
          {!loading && !error && blogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No blog posts available yet. Check back soon!</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && currentBlogs.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full"
                      aria-label={blog.title}
                    >
                      {/* Cover image */}
                      <div className="relative overflow-hidden h-52 bg-slate-100 flex-shrink-0">
                        {(blog.imageUrls?.[0] || blog.imageUrl) ? (
                          <img
                            src={blog.imageUrls?.[0] || blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                            <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24">
                              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                              <path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                            </svg>
                          </div>
                        )}
                        {/* Red top-line accent */}
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#dc2626] to-[#f87171] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-1 p-5 gap-3">
                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#dc2626]" />
                          {fmt(blog.blogDate)}
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold font-heading text-slate-800 leading-snug group-hover:text-[#dc2626] transition-colors duration-200 line-clamp-2">
                          {blog.title}
                        </h3>

                        {/* Short description */}
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                          {blog.shortDescription}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-1 text-xs font-semibold text-[#dc2626] mt-1 group-hover:gap-2 transition-all duration-200">
                          Read more <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 pt-4">
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
