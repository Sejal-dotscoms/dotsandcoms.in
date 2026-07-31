import {
    ArrowRight,  HelpCircle, Ticket, Clock3, Siren, FileCheck2, ListChecks, Users, TrendingUp, ShieldCheck, Phone } from "lucide-react";

/* ============================================================
   Data
   ============================================================ */
const supportLinks = [
    {
        icon: HelpCircle,
        label: "Frequently Asked Questions",
        href: "https://www.dotscoms.com/FAQ.aspx",
        desc: "Click to continue",
    },
    {
        icon: Ticket,
        label: "Generate Support Ticket",
        href: "https://www.dotscoms.com/TicketSystem.aspx",
        primary: true,
        desc: "Click to continue",
    },
    {
        icon: Siren,
        label: "Emergency",
        href: "https://www.dotscoms.com/Emergency.aspx",
        urgent: true,
        desc: "Click to continue",
    },
];

const features = [
    {
        icon: FileCheck2,
        title: "Everything Documented",
        desc: "Every request is recorded, making it easier to solve similar issues faster next time.",
    },
    {
        icon: ListChecks,
        title: "Well Organized",
        desc: "Each issue is tracked from start to finish, ensuring quick responses and clear follow-ups.",
    },
    {
        icon: Users,
        title: "Team Powered",
        desc: "Support continues smoothly even if team members change. Your issue is never tied to just one person.",
    },
    {
        icon: TrendingUp,
        title: "Smarter Over Time",
        desc: "By spotting patterns in tickets, we improve solutions and prevent recurring problems.",
    },
    {
        icon: ShieldCheck,
        title: "Safe & Secure",
        desc: "Sensitive information stays protected within a controlled support system.",
    },
    {
        icon: Clock3,
        title: "Transparent Progress",
        desc: "Track your ticket status in real time with clear updates, ensuring you always know what’s happening next.",
    },
];

/* ============================================================
   TechnicalSupport
   ============================================================ */
export default function TechnicalSupport() {
    return (
        <section className="relative py-16 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

                {/* ---------- Technical Support Banner ---------- */}

                <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#ea580c] to-[#dc2626] shadow-2xl mb-16">

                    {/* Background Effects */}
                    <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-black/20 blur-3xl" />
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] [background-size:24px_24px]" />

                    <div className="relative z-10 px-6 lg:px-10 py-10">

                        <div className="grid lg:grid-cols-[1.3fr_.9fr] gap-8 items-center">

                            {/* Left */}

                            <div>

                                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[3px] font-mono text-white">
                                    <ShieldCheck size={14} />
                                    Get Expert Support
                                </span>

                                <h2 className="mt-5 text-3xl lg:text-4xl font-black leading-tight text-white">
                                    Need Help?
                                    <br />
                                    We're Ready to Assist.
                                </h2>

                                <p className="mt-5 max-w-xl text-white/90 leading-7">
                                    Submit a support ticket, browse FAQs or contact our emergency
                                    team. Every request is securely tracked to ensure quick,
                                    transparent and reliable support.
                                </p>

                                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-4 text-white">
                                    <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/20">
                                        <Phone size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 font-sans">Tech Support</h4>
                                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-base font-bold">
                                            <a href="tel:+919925008936" className="hover:text-slate-900 transition-colors">+91 99250 08936</a>
                                            <span className="text-white/30 hidden sm:inline">|</span>
                                            <a href="tel:+919925008991" className="hover:text-slate-900 transition-colors">+91 99250 08991</a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Right */}

                            <div className="space-y-3">

                                {supportLinks.map(
                                    ({ icon: Icon, label, href, primary, urgent, desc }) => (

                                        <a
                                            key={label}
                                            href={href}
                                            target={href.startsWith("tel:") ? undefined : "_blank"}
                                            rel={href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                                            className={`group flex items-center justify-between rounded-2xl p-4 transition-all duration-300 hover:translate-x-1

                            ${urgent
                                                    ? "bg-white text-[#dc2626]"
                                                    : primary
                                                        ? "bg-slate-900/80 backdrop-blur border border-white/10 text-white"
                                                        : "bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20"
                                                }`}
                                        >

                                            <div className="flex items-center gap-4">

                                                <div
                                                    className={`h-10 w-10 rounded-xl flex items-center justify-center

                                    ${urgent
                                                            ? "bg-red-100"
                                                            : primary
                                                                ? "bg-[#dc2626]/20"
                                                                : "bg-white/10"
                                                        }`}
                                                >
                                                    <Icon
                                                        size={20}
                                                        className={
                                                            urgent
                                                                ? "text-[#dc2626]"
                                                                : primary
                                                                    ? "text-[#ea580c]"
                                                                    : "text-white"
                                                        }
                                                    />
                                                </div>

                                                <div>

                                                    <h4 className="font-semibold text-base">
                                                        {label}
                                                    </h4>

                                                    <p
                                                        className={`text-sm ${urgent
                                                                ? "text-slate-500"
                                                                : "text-white/70"
                                                            }`}
                                                    >
                                                        {desc}
                                                    </p>

                                                </div>

                                            </div>

                                            <ArrowRight
                                                size={18}
                                                className={`transition-transform duration-300 group-hover:translate-x-1 ${urgent
                                                        ? "text-[#dc2626]"
                                                        : primary
                                                            ? "text-white"
                                                            : "text-white"
                                                    }`}
                                            />

                                        </a>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                </div>

                <div className="relative mt-20">

                    {/* Background */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-10 left-20 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-40"></div>
                        <div className="absolute bottom-0 right-20 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
                    </div>

                    <div className="relative">

                        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 text-center">
                            <span className="text-xs font-bold font-mono tracking-widest text-[#dc2626] uppercase">
                                // WHY IT WORKS
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-800 tracking-tight mt-2">
                                Smart Support Starts
                                
                                With a Ticket
                            </h2>
                        </div>


                        <div className="grid lg:grid-cols-12 gap-10 items-center">

                          
                            {/* RIGHT CARDS */}

                            <div className="lg:col-span-12">

                                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

                                    {features.map(({ icon: Icon, title, desc }, index) => (

                                        <div
                                            key={title}
                                            className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white p-7 transition duration-500 hover:-translate-y-3 hover:shadow-2xl"
                                        >

                                            {/* Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                                            <div className="relative z-10">

                                                {/* Number */}

                                                <div className="absolute top-0 right-0 text-5xl font-black text-slate-100 group-hover:text-red-100 transition">
                                                    0{index + 1}
                                                </div>

                                                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-[#dc2626] transition">

                                                    <Icon
                                                        size={30}
                                                        className="text-[#dc2626] group-hover:text-white transition"
                                                    />

                                                </div>

                                                <h3 className="mt-6 text-xl font-bold text-slate-900">
                                                    {title}
                                                </h3>

                                                <p className="mt-4 text-slate-500 leading-8 text-[15px]">
                                                    {desc}
                                                </p>

                                               
                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}