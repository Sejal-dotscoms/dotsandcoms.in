import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Home from "./components/Home";
import AppLayout from "./layout/AppLayout";

// Lazy-loaded pages for optimal bundle splitting and fast initial page load
const SignIn = lazy(() => import("./Poweradmin/Pages/SignIn/SignIn"));
const PoweradminLayout = lazy(() => import("./Poweradmin/layout/PoweradminLayout"));
const Dashboard = lazy(() => import("./Poweradmin/Pages/Dashboard/Dashboard"));
const BlogList = lazy(() => import("./Poweradmin/Pages/Blog/BlogList"));
const BlogForm = lazy(() => import("./Poweradmin/Pages/Blog/BlogForm"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const TechnicalSupportPage = lazy(() => import("./pages/TechnicalSupportPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const WebDesignDetail = lazy(() => import("./pages/services/WebDesignDetail"));
const MobileAppsDetail = lazy(() => import("./pages/services/MobileAppsDetail"));
const WebHostingDetail = lazy(() => import("./pages/services/WebHostingDetail"));
const DigitalMarketingDetail = lazy(() => import("./pages/services/DigitalMarketingDetail"));
const WebStoriesPage = lazy(() => import("./pages/WebStoriesPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AccutechCaseStudyPage = lazy(() => import("./pages/AccutechCaseStudyPage"));
const OneLifeCaseStudyPage = lazy(() => import("./pages/OneLifeCaseStudyPage"));
const KiiaraCaseStudyPage = lazy(() => import("./pages/KiiaraCaseStudyPage"));
const OrderNowPage = lazy(() => import("./pages/OrderNowPage"));
const WebHostingDetailsPage = lazy(() => import("./pages/WebHostingDetailsPage"));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const ChangePassword = lazy(() => import("./Poweradmin/Pages/ChangePassword/ChangePassword"));
const ForgotPassword = lazy(() => import("./Poweradmin/Pages/ForgotPassword/ForgotPassword"));
const FreeWebsiteAuditPage = lazy(() => import("./pages/FreeWebsiteAuditPage"));
import ProtectedRoute from "./Poweradmin/components/ProtectedRoute";

// Scroll helper to support both top-of-page scrolling and dynamic #hash scrolling in Single Page App navigations
function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          if (window.lenis) {
            window.lenis.scrollTo(element);
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);

  return null;
}

// Dynamic canonical tag updater for SEO across pages
function CanonicalLink() {
  const { pathname } = useLocation();

  useEffect(() => {
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    const base = "https://www.dotsandcoms.in";
    const normalizedPath = pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;
      
    link.setAttribute("href", `${base}${normalizedPath}`);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHashElement />
      <CanonicalLink />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ── Poweradmin area ── */}
          <Route path="/poweradmin">
            {/* /poweradmin → signin */}
            <Route index element={<SignIn />} />

            {/* /poweradmin/forgot-password → public */}
            <Route path="forgot-password" element={<ForgotPassword />} />

            {/* /poweradmin/* → protected shell */}
            <Route
              element={
                <ProtectedRoute>
                  <PoweradminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="blogs" element={<BlogList />} />
              <Route path="blogs/new" element={<BlogForm />} />
              <Route path="blogs/edit/:id" element={<BlogForm />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Route>
                <Route element={<AppLayout />}>
                    <Route path="/about-web-development-company-baroda" element={<AboutPage />} />
                    <Route path="/website-mobile-app-development-company-portfolio-baroda" element={<WorkPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/responsive-website-designing-company-vadodara" element={<WebDesignDetail />} />
                    <Route path="/android-ios-mobile-app-development-company-baroda" element={<MobileAppsDetail />} />
                    <Route path="/windows-web-hosting-service-provider-baroda" element={<WebHostingDetail />} />
                    <Route path="/windows-and-linux-vps-server-hosting-gujarat" element={<Navigate to="/windows-web-hosting-service-provider-baroda" replace />} />
                    <Route path="/dedicated-server-hosting-cloud-hosting-vadodara" element={<Navigate to="/windows-web-hosting-service-provider-baroda" replace />} />
                    <Route path="/dedicated-server-hosting-company-vadodara" element={<Navigate to="/windows-web-hosting-service-provider-baroda" replace />} />
                    <Route path="/fee-seo-performance-website-audit" element={<FreeWebsiteAuditPage />} />
                    <Route path="/fee-seo-performance-web-site-audit" element={<FreeWebsiteAuditPage />} />
                    <Route path="/free-audit" element={<Navigate to="/fee-seo-performance-website-audit" replace />} />
                    <Route path="/free-seo-audit" element={<Navigate to="/fee-seo-performance-website-audit" replace />} />
                    <Route path="/organic-seo-ppc-digital-marketing-vadodara" element={<DigitalMarketingDetail />} />
                    <Route path="/contact-webdesign-mobileapp-socialmedia-marketing-baroda" element={<ContactPage />} />
                    <Route path="/webhosting-vps-dedicated-server-support-baroda" element={<TechnicalSupportPage />} />
                    <Route path="/faqs-web-design-hosting-digital-marketing" element={<FaqPage />} />
                    <Route path="/web-stories" element={<WebStoriesPage />} />
                    <Route path="/terms-and-conditions" element={<TermsPage />} />
                    <Route path="/sitemap" element={<SitemapPage />} />
                    <Route path="/sitemap.html" element={<SitemapPage />} />
                    <Route path="/accutechlabels-case-study-traditional-to-web-business" element={<AccutechCaseStudyPage />} />
                    <Route path="/1life-case-study-of-regional-to-national-reach" element={<OneLifeCaseStudyPage />} />
                    <Route path="/hobby-goes-global-case-study" element={<KiiaraCaseStudyPage />} />
                    <Route path="/order-now" element={<OrderNowPage />} />
                    <Route path="/web-hosting-details" element={<WebHostingDetailsPage />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/blogs/:slug" element={<BlogDetailPage />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;