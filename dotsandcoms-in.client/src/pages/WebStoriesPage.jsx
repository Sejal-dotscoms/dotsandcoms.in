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
      description: "Explore engaging Web Stories created by Dots & Coms covering website design tips, mobile app development, digital marketing, and SEO strategies.",
      keywords: "web stories Vadodara, digital stories Baroda, web design tips, mobile app stories, SEO tips Vadodara, digital marketing stories, Google web stories India",
      canonical: "https://www.dotsandcoms.in/web-stories",
    });
  }, []);

  return (
    <>
      <InnerBanner
        title={bannerData.title}
        subtitle={<>Engaging visual stories about <strong>website design</strong>, <strong>app development</strong>, and <strong>digital marketing trends</strong>.</>}
        breadcrumbs={[{ label: "Web Stories" }]}
      />

      {/* Intro Section */}
      <section className="relative overflow-hidden bg-white py-20">
        {/* Glowing abstract background mesh */}
        <div className="pointer-events-none absolute top-10 left-10 -z-10 h-96 w-96 rounded-full bg-red-500/5 blur-[100px]" />
        <div className="pointer-events-none absolute right-10 bottom-10 -z-10 h-96 w-96 rounded-full bg-orange-500/5 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-6 text-left lg:px-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-4">
              <span className="inline-block rounded-full border border-red-100/50 bg-red-50 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase">
                // {introData.badge}
              </span>
              <h2 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-slate-800 md:text-4xl">
                {introData.title}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="font-sans text-sm leading-relaxed text-slate-500 md:text-base">
                {introData.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid Section */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-[#f8fafc] py-24">
        {/* Technical grid lines background pattern */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f040_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f040_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* 9:16 Tall Story Cards Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
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
                className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md transition-all duration-500 hover:shadow-[0_22px_40px_rgba(0,0,0,0.08)]"
                style={{
                  "--accent-color": story.accentColor
                }}
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <motion.img
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Soft top overlay for category readability */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent" />
                  
                  {/* Category Pill Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="rounded-full border px-3.5 py-1 font-mono font-bold tracking-widest text-[10px] uppercase backdrop-blur-md select-none"
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
                <div className="flex flex-1 flex-col justify-between space-y-4 p-6 text-left">
                  <div className="space-y-2">
                    <h3 className="line-clamp-2 text-lg leading-tight font-bold tracking-tight text-slate-800 transition-colors group-hover:text-[#dc2626] md:text-xl">
                      {story.title}
                    </h3>
                    <p className="line-clamp-3 font-sans text-xs leading-relaxed font-normal text-slate-500 md:text-sm">
                      {story.description}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <div
                      className="inline-flex items-center gap-2 border-b border-transparent pb-1 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 group-hover:border-current"
                      style={{
                        color: story.accentColor
                      }}
                    >
                      <span>View Story</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-400 transition-colors group-hover:border-red-100 group-hover:bg-red-50 group-hover:text-[#dc2626]">
                      <BookOpen className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom edge color glow bar */}
                <div
                  className="absolute bottom-0 left-0 z-10 h-[4px] w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
      <section className="relative overflow-hidden border-t border-slate-100 bg-white py-20">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dc2626]/3 blur-[120px]" />
        <div className="mx-auto max-w-4xl space-y-6 px-6 text-center">
          <span className="inline-block rounded-full border border-red-100/50 bg-red-50 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-[#dc2626] uppercase">
            // Learning Hub
          </span>
          <h2 className="font-heading mx-auto max-w-2xl text-3xl leading-tight font-extrabold tracking-tight text-slate-800 md:text-4xl">
            Want to build visual stories for your brand?
          </h2>
          <p className="mx-auto max-w-md font-sans leading-relaxed text-slate-600 text-[15px]">
            Web Stories are perfect for boosting mobile engagement, user retention, and search visibility.
          </p>
          <div className="pt-2">
            <Link
              to="/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#dc2626] px-7 py-3 text-xs font-bold tracking-widest text-white uppercase shadow-md transition-all duration-300 select-none hover:bg-red-700 hover:shadow-lg active:scale-95"
            >
              Get Free Consulting <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
