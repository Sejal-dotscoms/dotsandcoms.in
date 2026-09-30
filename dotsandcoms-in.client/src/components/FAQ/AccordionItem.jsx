import { Plus } from "lucide-react";

export function AccordionItem({ item, isOpen, onToggle }) {
    const questionText = item.q || item.question;
    const answerText = item.a || item.answer;

    return (
        <div
            className={`rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                isOpen 
                    ? "border-[#dc2626]/30 bg-white shadow-sm" 
                    : "border-slate-200/80 bg-white hover:border-slate-300"
            }`}
        >
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 cursor-pointer select-none"
            >
                <span
                    className={`text-sm sm:text-base font-semibold leading-snug transition-colors duration-200 ${
                        isOpen ? "text-[#dc2626]" : "text-slate-800"
                    }`}
                >
                    {questionText}
                </span>
                <span
                    className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isOpen
                            ? "bg-[#dc2626] border-[#dc2626] rotate-45 text-white"
                            : "bg-slate-50 border-slate-200 text-slate-500"
                    }`}
                >
                    <Plus size={16} />
                </span>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm md:text-[14.5px] text-slate-600 leading-relaxed border-t border-slate-100/80">
                    {answerText}
                </div>
            </div>
        </div>
    );
}