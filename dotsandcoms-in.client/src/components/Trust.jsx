import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ target, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(target);

    const totalMiliseconds = duration * 1000;
    const incrementTime = 30;
    const steps = totalMiliseconds / incrementTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Trust() {
  const stats = [
    { label: "Years Experience", target: 25, suffix: "+" },
    { label: "Websites Delivered", target: 5000, suffix: "+" },
    { label: "Happy Clients", target: 8000, suffix: "+" },
    { label: "Domains Managed", target: 6000, suffix: "+" },
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
                          <h3 className="relative text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-slate-900">

                              <Counter
                                  target={stat.target}
                                  suffix={stat.suffix}
                              />

                          </h3>

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
