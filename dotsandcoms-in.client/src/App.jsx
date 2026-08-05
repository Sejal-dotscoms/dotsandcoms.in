import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./components/Home";
import SignIn from "./Poweradmin/Pages/SignIn/SignIn";
import PoweradminLayout from "./Poweradmin/layout/PoweradminLayout";
import Dashboard from "./Poweradmin/Pages/Dashboard/Dashboard";
import BlogList from "./Poweradmin/Pages/Blog/BlogList";
import BlogForm from "./Poweradmin/Pages/Blog/BlogForm";
import ContactPage from "./pages/ContactPage";
import AppLayout from "./layout/AppLayout";
import FaqPage from "./pages/FaqPage";
import TechnicalSupportPage from "./pages/TechnicalSupportPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import WebDesignDetail from "./pages/services/WebDesignDetail";
import MobileAppsDetail from "./pages/services/MobileAppsDetail";
import WebHostingDetail from "./pages/services/WebHostingDetail";
import DigitalMarketingDetail from "./pages/services/DigitalMarketingDetail";
import WebStoriesPage from "./pages/WebStoriesPage";
import TermsPage from "./pages/TermsPage";
import SitemapPage from "./pages/SitemapPage";
import NotFoundPage from "./pages/NotFoundPage";
import AccutechCaseStudyPage from "./pages/AccutechCaseStudyPage";
import OneLifeCaseStudyPage from "./pages/OneLifeCaseStudyPage";
import KiiaraCaseStudyPage from "./pages/KiiaraCaseStudyPage";
import OrderNowPage from "./pages/OrderNowPage";
import WebHostingDetailsPage from "./pages/WebHostingDetailsPage";
import ThankYouPage from "./pages/ThankYouPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ChangePassword from "./Poweradmin/Pages/ChangePassword/ChangePassword";
import ForgotPassword from "./Poweradmin/Pages/ForgotPassword/ForgotPassword";
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
                  <Route path="/fee-seo-performance-web-site-audit" element={<Navigate to="/organic-seo-ppc-digital-marketing-vadodara" replace />} />
                  <Route path="/organic-seo-ppc-digital-marketing-vadodara" element={<DigitalMarketingDetail />} />
                  <Route path="/contact-webdesign-mobileapp-socialmedia-marketing-baroda" element={<ContactPage />} />
                  <Route path="/webhosting-vps-dedicated-server-support-baroda" element={<TechnicalSupportPage />} />
                  <Route path="/faqs-web-design-hosting-digital-marketing" element={<FaqPage />} />
                  <Route path="/web-stories" element={<WebStoriesPage />} />
                  <Route path="/terms-and-conditions" element={<TermsPage />} />
                  <Route path="/sitemap" element={<SitemapPage />} />
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
    </BrowserRouter>
  );
}

export default App;