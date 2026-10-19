import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";
import { getRouteSEO } from "../seo/publicRoutes";
import { CAREERS_PATH, STATUS_PATH, VACANCY_PATH, gallerySlides, workingCopy } from "../data/careers";

export default function CareersPage() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO(getRouteSEO(CAREERS_PATH));
  }, []);

  useEffect(() => {
    if (open) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % gallerySlides.length), 3000);
    return () => clearInterval(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const slide = gallerySlides[index];

  return (
    <>
      <InnerBanner
        title={workingCopy.title}
        subtitle="IT training and job vacancies in Vadodara for freshers and experienced candidates."
        breadcrumbs={[{ label: "Career" }]}
      />
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:px-12 lg:grid-cols-2">
          <div className="space-y-4 text-left text-[15px] leading-relaxed text-slate-600">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900">Working at Dots and Coms</h2>
            {workingCopy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="flex flex-wrap gap-3 pt-3">
              <Link
                to={VACANCY_PATH}
                className="inline-flex items-center rounded-full bg-[#dc2626] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Job | Internship
              </Link>
              <Link
                to={STATUS_PATH}
                className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#dc2626] hover:text-[#dc2626]"
              >
                Check Status
              </Link>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="block w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm"
            >
              <img src={slide.src} alt={slide.alt} className="aspect-[4/3] w-full object-cover" />
            </button>
            <div className="mt-4 flex justify-center gap-2">
              {gallerySlides.map((item, itemIndex) => (
                <button
                  key={`${item.alt}-${itemIndex}`}
                  type="button"
                  aria-label={item.alt}
                  onClick={() => setIndex(itemIndex)}
                  className={`h-2.5 w-2.5 rounded-full ${itemIndex === index ? "bg-[#dc2626]" : "bg-slate-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 p-4" onClick={() => setOpen(false)}>
          <button type="button" className="absolute right-4 top-4 text-white" aria-label="Close photo" onClick={() => setOpen(false)}>
            <X />
          </button>
          <img src={slide.src} alt={slide.alt} className="max-h-[85vh] max-w-5xl rounded-xl object-contain" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </>
  );
}
