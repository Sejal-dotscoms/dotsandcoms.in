import { useEffect } from "react";
import InnerBanner from "../components/ui/InnerBanner";
import { ContactInfoSection } from "../components/Contact/ContactInfoSection";
import { MapEmbed } from "../components/Contact/MapEmbed";
import { ContactForm } from "../components/Contact/ContactForm";
import { setPageSEO } from "../utils/seo";

export default function ContactPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
        return setPageSEO({
            title: "Contact Us | Web Design, Mobile Apps, Hosting & SEO Services | Dots & Coms",
            description: "Contact our Vadodara team for website design, mobile app development, web hosting, dedicated servers, eCommerce development, SEO services, and domain registration support.",
            keywords: "website design Vadodara, web design company Baroda, mobile app development Vadodara, web hosting services Vadodara, SEO services Baroda, digital marketing agency Vadodara, website designer Vadodara, ecommerce website development",
            canonical: "https://www.dotsandcoms.in/contact-webdesign-mobileapp-socialmedia-marketing-baroda"
        });
    }, []);

    return (
        <>
            <InnerBanner
                title="Contact Us"
                subtitle="Have a query or looking to launch a new project? Reach out to our technical consulting team."
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