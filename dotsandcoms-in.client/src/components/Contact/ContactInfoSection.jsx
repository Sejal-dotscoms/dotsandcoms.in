import { Phone, Mail, MapPin } from "lucide-react";
import { contactData } from "../../data/contact";

/* ============================================================
   1) ContactInfoCard — reusable card for phone / email / location
   ============================================================ */
function ContactInfoCard({ icon: Icon, title, children }) {
    return (
        <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-[#dc2626] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-[#dc2626] mb-4 group-hover:bg-[#dc2626] group-hover:text-white transition-colors duration-300">
                <Icon size={22} strokeWidth={2} />
            </div>
            <h3 className="text-slate-800 font-semibold text-lg mb-2">{title}</h3>
            <div className="text-slate-500 text-[15px] space-y-[4px]">{children}</div>
        </div>
    );
}

/* ============================================================
   2) ContactInfoSection — groups the three info cards
   ============================================================ */
export function ContactInfoSection() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <ContactInfoCard icon={Phone} title="Call Us">
                {contactData.phones.map((phone, idx) => (
                    <a key={idx} href={`tel:${phone.value}`} className="block hover:text-[#dc2626] transition-colors">
                        {phone.label}
                    </a>
                ))}
                <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] leading-normal text-slate-400 mb-2 font-medium">
                        * Job Seekers: Please apply online only. Do not call on this numbers for job inquiries.
                    </p>
                    <a
                        href="https://www.dotscoms.com/training-and-job-vacancy-at-dots-coms-vadodara.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase bg-[#dc2626] text-white hover:bg-red-700 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        Job / Internship
                    </a>
                </div>
            </ContactInfoCard>

            <ContactInfoCard icon={Mail} title="Send Email">
                {contactData.emails.map((email, idx) => (
                    <a key={idx} href={`mailto:${email.value}`} className="block hover:text-[#dc2626] transition-colors break-all">
                        {email.label}
                    </a>
                ))}
            </ContactInfoCard>

            <ContactInfoCard icon={MapPin} title="Dots and Coms">
                <p className="leading-relaxed">
                    {contactData.address}
                </p>
            </ContactInfoCard>
        </div>
    );
}
