import { useEffect } from "react";
import InnerBanner from "../components/ui/InnerBanner";
import { ContactInfoSection } from "../components/Contact/ContactInfoSection";
import { MapEmbed } from "../components/Contact/MapEmbed";
import { ContactForm } from "../components/Contact/ContactForm";
import { setPageSEO } from "../utils/seo";
import { getRouteSEO } from "../seo/publicRoutes";

export default function ContactPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
        return setPageSEO(getRouteSEO("/contact-webdesign-mobileapp-socialmedia-marketing-baroda"));
    }, []);

    return (
        <>
            <InnerBanner
                title="Contact Us"
                subtitle={<>Have a query or looking to launch a new project? Reach out to our <strong>technical consulting team</strong> in <strong>Vadodara</strong>.</>}
                breadcrumbs={[{ label: "Contact Us" }]}
            />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
              

                {/* Info cards */}
                <div className="mb-14">
                    <ContactInfoSection />
                </div>

                    {/* Form + Map */}
                    <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-7">
                            <ContactForm />
                        </div>
                        <div className="lg:col-span-5">
                            <MapEmbed />
                        </div>
                    </div>
            </div>
        </div>
        </>
    );
}