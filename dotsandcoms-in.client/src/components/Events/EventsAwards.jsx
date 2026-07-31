import { motion } from "framer-motion";
import { events, eventsIntro } from "../../data/about";

export default function EventsAwards() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Heading */}
                <div className="text-center mb-14">
                    <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
                      //  {eventsIntro.badge}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                        {eventsIntro.title}
                    </h2>

                    <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
                        {eventsIntro.description}
                    </p>
                </div>

                {/* Cards */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.08,
                            }}
                            className="group overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.alt || `${item.title} - Dots & Coms Corporate Events & Achievements Baroda`}
                                    className="h-62 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                    width={item.width}
                                    height={item.height}
                                />
                            </div>

                            {/* Title */}
                            <div className="p-6 text-center">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#dc2626] transition-colors duration-300">
                                    {item.title}
                                </h3>

                                <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#dc2626] group-hover:w-20 transition-all duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}