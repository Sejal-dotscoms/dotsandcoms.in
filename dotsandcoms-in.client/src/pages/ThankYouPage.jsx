import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";

export default function ThankYouPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
    return setPageSEO({
      title: "Thank You for Your Order | Dots & Coms",
      description: "Thank you for choosing Dots & Coms. Your order has been placed successfully. Our team will contact you soon.",
      keywords: "thank you page, order success, checkout complete, Dots and Coms",
      canonical: "https://www.dotsandcoms.in/thank-you"
    });
  }, []);

  if (!state) {
    return (
      <>
        <InnerBanner
          title="Thank You"
          subtitle="Thank you for contacting us."
          breadcrumbs={[
            { label: "Web Hosting", href: "/windows-web-hosting-service-provider-baroda" },
            { label: "Thank You" }
          ]}
        />
        <div className="bg-white min-h-screen py-16 px-6 sm:px-12 md:px-24 text-slate-900 font-sans">
          <div className="max-w-xl mx-auto text-center space-y-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Thank You!
              </h2>
              <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
                We appreciate you reaching out to Dots & Coms. If you have placed an order or submitted a message, our team will get back to you shortly.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-lg text-sm transition-all duration-200 shadow-md cursor-pointer"
              >
                Back to Home Page
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const {
    orderId,
    packageName,
    grandTotal,
    paymentMethod,
    emailId,
    domainName,
    serverName,
    isServerPlan,
    from
  } = state;

  if (from === "contact") {
    return (
      <>
        <InnerBanner
          title="Thank You"
          subtitle="Thank you for contacting us."
          breadcrumbs={[
            { label: "Contact Us", href: "/contact-webdesign-mobileapp-socialmedia-marketing-baroda" },
            { label: "Thank You" }
          ]}
        />
        <div className="bg-white min-h-screen py-16 px-6 sm:px-12 md:px-24 text-slate-900 font-sans">
          <div className="max-w-xl mx-auto text-center space-y-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Thank You for contacting us!
              </h2>
              <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
                We have received your message. Our consulting team will review it and get back to you shortly.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-lg text-sm transition-all duration-200 shadow-md cursor-pointer"
              >
                Back to Home Page
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const displayName = packageName ? packageName.replace("Web Hosting - ", "") : "";

  return (
    <>
      <InnerBanner
        title="Thank You"
        subtitle="Your hosting order has been placed successfully."
        breadcrumbs={[
          { label: "Web Hosting", href: "/windows-web-hosting-service-provider-baroda" },
          { label: "Thank You" }
        ]}
      />

      <div className="bg-white min-h-screen py-16 px-6 sm:px-12 md:px-24 text-slate-900 font-sans">
        <div className="max-w-xl mx-auto text-center space-y-8">
          
          {/* Green checkmark circle */}
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Order Placed Successfully!
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
              Thank you for ordering with Dots & Coms. We have received your order details and will setup your server/domain hosting shortly.
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-150 space-y-4 shadow-sm">
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
              <span>Order Reference</span>
              <span>Plan Details</span>
            </div>
            
            <div className="flex justify-between items-start text-slate-900 font-bold">
              <span className="font-mono text-base text-[#dc2626]">{orderId}</span>
              <span className="text-sm text-right">{displayName}</span>
            </div>

            <div className="w-full h-[1px] bg-slate-200" />

            <div className="flex justify-between items-center text-sm text-slate-700">
              <span>Total Amount due:</span>
              <span className="font-mono font-extrabold text-black text-base">₹{grandTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-sm text-slate-700">
              <span>Payment Gateway:</span>
              <span className="font-extrabold text-slate-800">{paymentMethod}</span>
            </div>

            <div className="w-full h-[1px] bg-slate-200" />

            <div className="text-center text-xs text-slate-500 font-medium">
              Primary server/domain assigned: <strong className="text-slate-700">{isServerPlan ? serverName : domainName}</strong>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Our deployment desk will contact you via email at <strong className="text-slate-700">{emailId}</strong> to complete server verification and payment processing.
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigate("/windows-web-hosting-service-provider-baroda")}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-lg text-sm transition-all duration-200 shadow-md cursor-pointer"
            >
              Back to Hosting Solutions
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
