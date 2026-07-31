import { useState } from "react";
import { timelineData, timelineIntro } from "../../data/about";

export default function DNCTimeline() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className=" py-20 px-5 sm:px-10 lg:px-16 font-[Inter,sans-serif]">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');
        .dnc-serif { font-family: 'Fraunces', serif; }
        .dnc-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-14 lg:gap-20 items-start">

                    {/* LEFT — sticky masthead, pinned for the full scroll of the timeline */}
                    <div className="lg:sticky lg:top-32 self-start">
                       
                       
                        <div className="text-left space-y-4 mb-4  max-w-2xl">
                            <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
                                {timelineIntro.est}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-slate-800 tracking-tight leading-tight">
                                {timelineIntro.title}
                            </h2>
                        </div>
                        {timelineIntro.paragraphs.map((p, idx) => (
                            <p 
                                key={idx} 
                                className={`text-[#5f5a51] text-[15px] leading-relaxed ${idx === timelineIntro.paragraphs.length - 1 ? 'mb-10' : 'mb-4'}`}
                            >
                                {p}
                            </p>
                        ))}
                    </div>

                    {/* RIGHT — the actual vertical timeline */}
                    <div className="relative">
                        {/* the spine */}
                       <div
                            className="absolute top-2 bottom-2 w-[2px]"
                            style={{
                                left: "5px",
                                background:
                                    "linear-gradient(to bottom, #dc2626 0%, #f0c9c4 85%, transparent 100%)",
                            }}
                        />

                        <div className="space-y-0">
                            {timelineData.map((item, index) => {
                                const isActive = activeIndex === index;
                                const isFounder = item.year === "1999";

                                return (
                                    <div
                                        key={item.year}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        onMouseLeave={() => setActiveIndex(null)}
                                        className="relative pl-9 sm:pl-11 pb-10 last:pb-0 cursor-default"
                                    >
                                        {/* node on the spine */}
                                        <span
                                            className="absolute top-0.5 rounded-full transition-all duration-300"
                                            style={{
                                                left: "0px",
                                                width: isFounder ? "12px" : "10px",
                                                height: isFounder ? "12px" : "10px",
                                                backgroundColor: isFounder || isActive ? "#dc2626" : "#faf6ef",
                                                border: `2px solid ${isFounder || isActive ? "#dc2626" : "#d8c9b3"}`,
                                                boxShadow: isFounder || isActive ? "0 0 0 4px #fbdada" : "none",
                                                transform: isActive && !isFounder ? "scale(1.15)" : "scale(1)",
                                            }}
                                        />

                                        <div className="flex items-center gap-3 mb-2">
                                            <span
                                                className="dnc-mono text-[18px] sm:text-[20px] font-bold leading-none transition-colors duration-300"
                                                style={{ color: isFounder || isActive ? "#dc2626" : "#2c2823" }}
                                            >
                                                {item.year}
                                            </span>
                                            <span
                                                className="dnc-mono text-[9px] uppercase tracking-[0.12em] px-2 py-[3px] rounded-sm transition-colors duration-300"
                                                style={{
                                                    color: isFounder ? "#fff8f0" : "#dc2626",
                                                    backgroundColor: isFounder ? "#dc2626" : "#fbe5e3",
                                                }}
                                            >
                                                {item.tag}
                                            </span>
                                        </div>

                                        <p
                                            className="text-[14px] sm:text-[15px] leading-relaxed max-w-lg transition-colors duration-300"
                                            style={{
                                                color: isFounder || isActive ? "#2c2823" : "#5f5a51",
}}
                                        >
                                            {item.event}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}