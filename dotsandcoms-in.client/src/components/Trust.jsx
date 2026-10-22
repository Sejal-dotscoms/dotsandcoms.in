import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function formatStat(value, grouped) {
  const rounded = Math.ceil(value);
  return grouped ? rounded.toLocaleString("en-US") : String(rounded);
}

function Counter({ target, duration = 2, suffix = "", grouped = true }) {
  const end = Number.parseInt(target, 10);
  const finalText = `${formatStat(end, grouped)}${suffix}`;
  const hostRef = useRef(null);
  const visualRef = useRef(null);
  const isInView = useInView(hostRef, { once: true, amount: 0.5 });

  // The light-DOM text stays on the final number for the whole animation.
  // The ticking digits live in a shadow root, so innerText / AI readers never see 0.
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let shadow = host.shadowRoot;
    if (!shadow) {
      shadow = host.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = `
        span {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          color: inherit;
          user-select: none;
          pointer-events: none;
          white-space: nowrap;
        }
      `;
      const span = document.createElement("span");
      span.setAttribute("aria-hidden", "true");
      span.dataset.visual = "true";
      // Slot keeps the final number in the rendered text crawlers read.
      const slot = document.createElement("slot");
      shadow.append(style, span, slot);
    }

    const visual = shadow.querySelector("[data-visual]");
    visualRef.current = visual;
    if (visual) visual.textContent = finalText;
  }, [finalText]);

  useEffect(() => {
    if (!isInView) return;
    const visual = visualRef.current;
    if (!visual) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      visual.textContent = finalText;
      return;
    }

    let start = 0;
    visual.textContent = `${formatStat(0, grouped)}${suffix}`;

    const incrementTime = 30;
    const steps = (duration * 1000) / incrementTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        visual.textContent = finalText;
      } else {
        visual.textContent = `${formatStat(start, grouped)}${suffix}`;
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration, suffix, grouped, finalText]);

  return (
    <span ref={hostRef} className="relative inline-block" role="group" aria-label={finalText}>
      <span className="text-transparent">{finalText}</span>
    </span>
  );
}

export default function Trust() {
  const stats = [
    { label: "Since", target: 1999, suffix: "", grouped: false },
    { label: "Websites Designed", target: 5000, suffix: "+", grouped: true },
    { label: "Happy Clients", target: 8000, suffix: "+", grouped: true },
    { label: "Domains Managed", target: 6000, suffix: "+", grouped: true },
  ];

  return (
      <section className="relative overflow-hidden py-12 md:py-24 bg-gradient-to-br from-[#ea580c] via-[#dc2626] to-[#b91c1c]">

          {/* Background */}
          <div className="absolute inset-0">
              <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-black/20 blur-3xl" />
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] [background-size:30px_30px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

                  {stats.map((stat, index) => (

                      <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 25 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                              duration: 0.5,
                              delay: index * 0.1,
                          }}
                          className="
                        group
                        relative
                        overflow-hidden
                        rounded-3xl
                        bg-[#FFF8F3]
                        border border-[#F7D8C3]
                        p-4 md:p-8
                        text-center
                        transition-all
                        duration-500
                        hover:-translate-y-2
                        hover:bg-white
                        hover:border-[#FDBA74]
                        hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
                    "
                      >

                          
                          {/* Glow */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full bg-orange-300/20 blur-3xl" />
                          </div>

                       

                          {/* Number */}
                          <div className="relative text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-slate-900">

                              <Counter
                                  target={stat.target}
                                  suffix={stat.suffix}
                                  grouped={stat.grouped}
                              />

                          </div>

                          {/* Divider */}
                          <div className="relative mx-auto mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-20" />

                          {/* Label */}
                          <p className="relative mt-4 text-[10px] md:text-xs lg:text-sm uppercase tracking-[1.5px] sm:tracking-[3px] font-semibold text-slate-650">
                              {stat.label}
                          </p>

                      </motion.div>

                  ))}

              </div>

          </div>

      </section>
  );
}
