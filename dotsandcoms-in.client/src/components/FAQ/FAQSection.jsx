import { useState } from "react";
import { AccordionItem } from "./AccordionItem";
import { faqs } from "../../data/faq";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (idx) => {
        setOpenIndex((prev) => (prev === idx ? -1 : idx));
    };

    return (
        <section id="faq" className="relative py-16 sm:py-20 bg-slate-50/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-800 text-center mb-10 tracking-tight">
                    Frequently Asked Questions about our Services
                </h2>

                {/* Accordion list */}
                <div className="space-y-3">
                    {faqs.map((item, idx) => (
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