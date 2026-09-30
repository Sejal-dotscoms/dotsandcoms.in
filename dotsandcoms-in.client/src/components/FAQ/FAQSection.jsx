import { useState, useEffect } from "react";
import { AccordionItem } from "./AccordionItem";
import { faqs as defaultFaqs } from "../../data/faq";

export default function FAQSection({
    label = "FAQ",
    title = "Frequently Asked Questions about our Services",
    subtitle = "",
    items = defaultFaqs,
    enableSchema = true,
    id = "faq",
    className = ""
}) {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (idx) => {
        setOpenIndex((prev) => (prev === idx ? -1 : idx));
    };

    // Inject FAQ Schema for search engine indexing
    useEffect(() => {
        if (!enableSchema || !items || items.length === 0) return;

        const scriptId = `faq-schema-${id}`;
        let script = document.getElementById(scriptId);
        if (!script) {
            script = document.createElement("script");
            script.id = scriptId;
            script.type = "application/ld+json";
            document.head.appendChild(script);
        }

        const schemaData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": items.map((item) => ({
                "@type": "Question",
                "name": item.q || item.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.a || item.answer
                }
            }))
        };

        script.textContent = JSON.stringify(schemaData);

        return () => {
            const el = document.getElementById(scriptId);
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        };
    }, [items, enableSchema, id]);

    return (
        <section id={id} className={`relative py-14 sm:py-20 bg-slate-50/70 border-t border-slate-100/80 ${className}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 sm:mb-10">
                    {label && (
                        <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-[#dc2626] border border-red-100 text-xs font-bold font-mono uppercase tracking-widest mb-3">
                            {label}
                        </span>
                    )}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Accordion list */}
                <div className="space-y-3">
                    {items.map((item, idx) => (
                        <AccordionItem
                            key={idx}
                            item={item}
                            isOpen={openIndex === idx}
                            onToggle={() => toggle(idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}