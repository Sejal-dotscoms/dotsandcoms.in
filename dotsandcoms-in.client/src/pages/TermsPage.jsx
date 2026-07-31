import { useEffect } from "react";
import InnerBanner from "../components/ui/InnerBanner";
import { setPageSEO } from "../utils/seo";

export default function TermsPage() {
  useEffect(() => {
    // Scroll to section if hash is present, otherwise scroll to top
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }

    return setPageSEO({
      title: "Terms & Conditions | Privacy Policy | Dots & Coms Baroda",
      description: "Read the terms and conditions and privacy policy for using Dots & Coms web design, mobile app development, hosting, SEO, and digital marketing services in Baroda.",
      keywords: "terms and conditions Dots and Coms, privacy policy web design company, website usage terms Baroda, digital agency terms Gujarat, web hosting terms Vadodara",
      canonical: "https://www.dotsandcoms.in/terms-and-conditions",
    });
  }, []);

  return (
    <>
      <InnerBanner
        title="Terms & Conditions"
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />

      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle decorative background accents */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#dc2626]/2 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ea580c]/2 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-6 text-left">
          <div className="prose prose-slate max-w-none space-y-12">
            
            {/* Section: Terms & Conditions */}
            <div id="terms" className="space-y-6 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800 tracking-tight border-b border-slate-100 pb-4">
                Our Terms & Conditions
              </h2>
              <div className="space-y-4 text-slate-600 text-sm md:text-[15px] leading-relaxed">
                <p>
                  The Website Owner, including subsidiaries and affiliates (“Website” or “Website Owner” or “we” or “us” or “our”) provides the information contained on the website or any of the pages comprising the website (“website”) to visitors (“visitors”) (cumulatively referred to as “you” or “your” hereinafter) subject to the terms and conditions set out in these website terms and conditions, the privacy policy and any other relevant terms and conditions, policies and notices which may be applicable to a specific section or module of the website.
                </p>
                <p>
                  Welcome to our website. If you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Dots & Coms's relationship with you in relation to this website.
                </p>
                <p>
                  The term Dots & Coms or 'us' or 'we' refers to the owner of the website whose registered office is 201, Senate Square, Gotri, Vadodara. The term 'you' refers to the user or viewer of our website.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-bold text-slate-700">
                  The use of this website is subject to the following terms of use:
                </h3>
                <ul className="list-disc pl-6 space-y-3.5 text-slate-655 text-sm md:text-[15px] leading-relaxed">
                  <li>
                    The content of the pages of this website is for your general information and use only. It is subject to change without notice.
                  </li>
                  <li>
                    Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
                  </li>
                  <li>
                    Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
                  </li>
                  <li>
                    This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
                  </li>
                  <li>
                    All trade marks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.
                  </li>
                  <li>
                    Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence.
                  </li>
                  <li>
                    From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
                  </li>
                  <li>
                    You may not create a link to this website from another website or document without Dots & Coms's prior written consent.
                  </li>
                  <li>
                    Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority.
                  </li>
                </ul>
              </div>

              <p className="p-4 bg-slate-50 border-l-4 border-[#dc2626] rounded-r-xl text-slate-600 text-sm italic leading-relaxed">
                "We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time time"
              </p>
            </div>

            {/* Section: Website privacy policy */}
            <div id="privacy" className="space-y-6 scroll-mt-24 pt-4">
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800 tracking-tight border-b border-slate-100 pb-4">
                Website privacy policy
              </h2>
              <div className="space-y-4 text-slate-650 text-sm md:text-[15px] leading-relaxed">
                <p>
                  This privacy policy sets out how Dots & Coms uses and protects any information that you provide on this website.
                </p>
                <p>
                  Dots & Coms is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, and then you can be assured that it will only be used in accordance with this privacy statement.
                </p>
                <p>
                  Dots & Coms does not share the information with any other agency or advertisers and may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-lg font-bold text-slate-700">What we collect</h3>
                <p className="text-slate-600 text-sm md:text-[15px]">We may collect the following information:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-655 text-sm md:text-[15px] leading-relaxed">
                  <li>name and job title</li>
                  <li>contact information including email address</li>
                  <li>demographic information such as postcode, preferences and interests</li>
                  <li>other information relevant to customer surveys and/or offers</li>
                  <li>IP address and browser details</li>
                </ul>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-slate-700">What we do with the information we gather</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-655 text-sm md:text-[15px] leading-relaxed">
                  <li>Internal record keeping.</li>
                  <li>We may use the information to improve our products and services.</li>
                  <li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
                  <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.</li>
                </ul>
              </div>
            </div>

            {/* Section: Security */}
            <div id="security" className="space-y-6 scroll-mt-24 pt-4">
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800 tracking-tight border-b border-slate-100 pb-4">
                Security
              </h2>
              <div className="space-y-4 text-slate-650 text-sm md:text-[15px] leading-relaxed">
                <p>
                  We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
                </p>

                <h3 className="text-lg font-bold text-slate-700 pt-2">How we use cookies</h3>
                <p>
                  A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyses web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.
                </p>
                <p>
                  We use traffic log cookies to identify which pages are being used. This helps us analyses data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
                </p>
                <p>
                  Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
                </p>
                <p>
                  You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
                </p>

                <h3 className="text-lg font-bold text-slate-700 pt-4">Links to other websites</h3>
                <p>
                  Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.
                </p>
                <p>
                  We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.
                </p>
                <p>
                  If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us. We will promptly correct any information found to be incorrect.
                </p>
              </div>
            </div>

            {/* Section: Website disclaimer */}
            <div id="disclaimer" className="space-y-6 scroll-mt-24 pt-4">
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800 tracking-tight border-b border-slate-100 pb-4">
                Website disclaimer
              </h2>
              <div className="space-y-4 text-slate-650 text-sm md:text-[15px] leading-relaxed">
                <p>
                  The information contained in this website is for general information purposes only. The information is provided by Dots & Coms and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
                </p>
                <p>
                  In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arise out of, or in connection with, the use of this website.
                </p>
                <p>
                  Through this website you are able to link to other websites which are not under the control of Dots & Coms. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                </p>
                <p>
                  Every effort is made to keep the website up and running smoothly. However, Dots & Coms takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
                </p>
              </div>
            </div>

            {/* Section: Cancellation and Refund Policy */}
            <div id="refund" className="space-y-6 scroll-mt-24 pt-4">
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800 tracking-tight border-b border-slate-100 pb-4">
                Cancellation and Refund Policy
              </h2>
              <div className="space-y-4 text-slate-650 text-sm md:text-[15px] leading-relaxed">
                <p>
                  Domain orders once place cannot be cancelled if the order has been executed. If there is a spelling mistake or any other reason to cancel the domain order, if the order has not been executed, we may be able to cancel the order and refund the full amount. However, if the order has been executed, no cancellation is possible.
                </p>
                <p>
                  Web Hosting orders can be cancelled, and full refund can be provided unless they are already executed. Once executed, no cancellation or refund can be provided for web hosting, VPS or dedicated server orders.
                </p>
                <p>
                  Web design order is taken only after showing a preview and upon confirmation of the preview. Confirmed web design or print design orders cannot be cancelled.
                </p>
                <p>
                  Digital Marketing orders can be cancelled and refund can be provided on pro-rata basis. Mobile Application development order confirmation is provided only after a preview has been provided and cannot be cancelled.
                </p>
                <p>
                  We are into custom development and design business. In almost all cases, the invoice for payment is provided only when custom preview has been developed and approved by the client and hence cancellation and refund cannot be provided.
                </p>
                <p>
                  However, if in any case, the refund is possible, the refund amount will exclude any statutory charges and expenses which have already been incurred.
                </p>
              </div>
            </div>

            {/* Section: Shipping & Delivery Policy */}
            <div id="shipping" className="space-y-6 scroll-mt-24 pt-4">
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800 tracking-tight border-b border-slate-100 pb-4">
                Shipping & Delivery Policy
              </h2>
              <div className="space-y-4 text-slate-655 text-sm md:text-[15px] leading-relaxed">
                <p>Our products and services are not physical, and no shipping or logistics is involved.</p>
                <p>
                  If we have to make the website live or upload the code on a server for which the webhosting is NOT provided by us, We expect the custom to do the due diligence about the platform and functionality of the server and that the server has required support to make the application live.
                </p>
              </div>
            </div>

            {/* Section: BO Clause */}
            <div id="bo-clause" className="space-y-6 scroll-mt-24 pt-4">
              <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-slate-800 tracking-tight border-b border-slate-100 pb-4">
                BO Clause
              </h2>
              <p className="p-4 bg-slate-50 border-l-4 border-[#ea580c] rounded-r-xl text-slate-655 text-sm md:text-[15px] leading-relaxed italic">
                We as a merchant shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
