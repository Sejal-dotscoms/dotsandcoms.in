import { Plus } from "lucide-react";
export function AccordionItem({ item, isOpen, onToggle }) {
    return (
        <div
            className={`rounded-2xl border transition-colors duration-300 ${isOpen ? "border-[#dc2626]/30 bg-white" : "border-slate-100 bg-white"
                }`}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
            >
                <span
                    className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-[#dc2626]" : "text-slate-800"
                        }`}
                >
                    {item.q}
                </span>
                <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen
                            ? "bg-[#dc2626] border-[#dc2626] rotate-45"
                            : "bg-slate-50 border-slate-200"
                        }`}
                >
                    <Plus size={16} className={isOpen ? "text-white" : "text-slate-500"} />
                </span>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                    {item.a}
                </p>
            </div>
        </div>
    );
}