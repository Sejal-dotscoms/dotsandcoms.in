import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { webStories, introData, bannerData } from "../data/webStories";
import { setPageSEO } from "../utils/seo";

export default function WebStoriesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Web Stories – Visual Digital Stories by Dots & Coms Baroda",
      description: "Explore engaging Web Stories created by Dots & Coms covering website design tips, mobile app development insights, digital marketing trends, and SEO strategies for businesses in Vadodara.",
      keywords: "web stories Vadodara, digital stories Baroda, web design tips, mobile app stories, SEO tips Vadodara, digital marketing stories, Google web stories India",
      canonical: "https://www.dotsandcoms.in/web-stories",
    });
  }, []);

  return (
    <>
      <InnerBanner
        title={bannerData.title}
        subtitle={bannerData.subtitle}
        breadcrumbs={[{ label: "Web Stories" }]}
      />

      {/* Intro Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Glowing abstract background mesh */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#dc2626] font-bold text-xs uppercase tracking-widest font-mono border border-red-100/50">
                // {introData.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                {introData.title}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-slate-500 text-sm md:text-base leading-relaxed font-sans">
                {introData.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid Section */}
      <section className="py-24 bg-[#f8fafc] relative overflow-hidden border-t border-slate-100">
        {/* Technical grid lines background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f040_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f040_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* 9:16 Tall Story Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {webStories.map((story, index) => (
              <motion.a
                key={story.id}
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="relative group rounded-3xl overflow-hidden shadow-md hover:shadow-[0_22px_40px_rgba(0,0,0,0.08)] transition-all duration-500 bg-white border border-slate-100 flex flex-col justify-between cursor-pointer"
                style={{
                  "--accent-color": story.accentColor
                }}
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <motion.img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Soft top overlay for category readability */}
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
                  
                  {/* Category Pill Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md select-none font-mono"
                      style={{
                        backgroundColor: `${story.accentColor}15`,
                        borderColor: `${story.accentColor}40`,
                        color: story.accentColor
                      }}
                    >
                      {story.category}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1 justify-between text-left space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight leading-tight group-hover:text-[#dc2626] transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-slate-500 text-xs md:text-sm font-sans font-normal leading-relaxed line-clamp-3">
                      {story.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-auto">
                    <div
                      className="inline-flex items-center gap-2 text-xs font-bold font-mono tracking-widest uppercase pb-1 border-b border-transparent group-hover:border-current transition-all duration-300"
                      style={{
                        color: story.accentColor
                      }}
                    >
                      <span>View Story</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-[#dc2626] group-hover:border-red-100 transition-colors">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom edge color glow bar */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                  style={{
                    backgroundColor: story.accentColor,
                    boxShadow: `0 0 15px ${story.accentColor}`
                  }}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Consult CTA Section */}
      <section className="py-20 bg-white border-t border-slate-100 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#dc2626]/3 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#dc2626] font-bold text-xs uppercase tracking-widest font-mono border border-red-100/50">
            // Learning Hub
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight max-w-2xl mx-auto">
            Want to build visual stories for your brand?
          </h2>
          <p className="text-slate-600 text-[15px] leading-relaxed max-w-md mx-auto font-sans">
            Web Stories are perfect for boosting mobile engagement, user retention, and search visibility.
          </p>
          <div className="pt-2">
            <Link
              to="/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#dc2626] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer active:scale-95 select-none"
            >
              Get Free Consulting <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
