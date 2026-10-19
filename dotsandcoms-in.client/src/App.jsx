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
const VacancyList = lazy(() => import("./Poweradmin/Pages/Vacancies/VacancyList"));
const VacancyForm = lazy(() => import("./Poweradmin/Pages/Vacancies/VacancyForm"));
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
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const OneLifeCaseStudyPage = lazy(() => import("./pages/OneLifeCaseStudyPage"));
const AuroPumpsCaseStudyPage = lazy(() => import("./pages/AuroPumpsCaseStudyPage"));
const HimileIndiaCaseStudyPage = lazy(() => import("./pages/HimileIndiaCaseStudyPage"));
const OrderNowPage = lazy(() => import("./pages/OrderNowPage"));
const WebHostingDetailsPage = lazy(() => import("./pages/WebHostingDetailsPage"));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const ChangePassword = lazy(() => import("./Poweradmin/Pages/ChangePassword/ChangePassword"));
const ForgotPassword = lazy(() => import("./Poweradmin/Pages/ForgotPassword/ForgotPassword"));
const FreeWebsiteAuditPage = lazy(() => import("./pages/FreeWebsiteAuditPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const JobVacancyPage = lazy(() => import("./pages/JobVacancyPage"));
const JobDetailPage = lazy(() => import("./pages/JobDetailPage"));
const ApplyPage = lazy(() => import("./pages/ApplyPage"));
const ApplicationStatusPage = lazy(() => import("./pages/ApplicationStatusPage"));
const ApplicationReceivedPage = lazy(() => import("./pages/ApplicationReceivedPage"));
const ApplicationList = lazy(() => import("./Poweradmin/Pages/Applications/ApplicationList"));
const ApplicationDetail = lazy(() => import("./Poweradmin/Pages/Applications/ApplicationDetail"));
const MassEmailPage = lazy(() => import("./Poweradmin/Pages/Applications/MassEmailPage"));
import ProtectedRoute from "./Poweradmin/components/ProtectedRoute";
import AdminShell from "./Poweradmin/components/AdminFeedback";

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

// Load OpenAI pixel on public routes (covers admin → public soft navigations)
function EnsureOaiqPixelOnPublicRoutes() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/poweradmin")) return;
    if (typeof window.ensureOaiqPixel === "function") {
      window.ensureOaiqPixel();
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHashElement />
      <EnsureOaiqPixelOnPublicRoutes />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ── Poweradmin area ── */}
          <Route path="/poweradmin" element={<AdminShell />}>
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
              <Route path="applications" element={<ApplicationList />} />
              <Route path="applications/mass-email" element={<MassEmailPage />} />
              <Route path="applications/:id" element={<ApplicationDetail />} />
              <Route path="blogs" element={<BlogList />} />
              <Route path="blogs/new" element={<BlogForm />} />
              <Route path="blogs/edit/:id" element={<BlogForm />} />
              <Route path="vacancies" element={<VacancyList />} />
              <Route path="vacancies/new" element={<VacancyForm />} />
              <Route path="vacancies/edit/:id" element={<VacancyForm />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Route>
          {/* Standalone SEO Audit Page (No Header / No Footer) */}
          <Route path="/free-seo-performance-website-audit" element={<FreeWebsiteAuditPage />} />
          <Route path="/feer-seo-performance-website-audit" element={<Navigate to="/free-seo-performance-website-audit" replace />} />
          <Route path="/fee-seo-performance-website-audit" element={<Navigate to="/free-seo-performance-website-audit" replace />} />
          <Route path="/fee-seo-performance-web-site-audit" element={<Navigate to="/free-seo-performance-website-audit" replace />} />
          <Route path="/free-audit" element={<Navigate to="/free-seo-performance-website-audit" replace />} />
          <Route path="/free-seo-audit" element={<Navigate to="/free-seo-performance-website-audit" replace />} />
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
                    <Route path="/organic-seo-ppc-digital-marketing-vadodara" element={<DigitalMarketingDetail />} />
                    <Route path="/contact-webdesign-mobileapp-socialmedia-marketing-baroda" element={<ContactPage />} />
                    <Route path="/webhosting-vps-dedicated-server-support-baroda" element={<TechnicalSupportPage />} />
                    <Route path="/faqs-web-design-hosting-digital-marketing" element={<FaqPage />} />
                    <Route path="/web-stories" element={<WebStoriesPage />} />
                    <Route path="/terms-and-conditions" element={<TermsPage />} />
                    <Route path="/sitemap" element={<SitemapPage />} />
                    <Route path="/sitemap.html" element={<Navigate to="/sitemap" replace />} />
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="/404.html" element={<Navigate to="/404" replace />} />
                    <Route path="/case-studies" element={<CaseStudiesPage />} />
                    <Route path="/case-study-list" element={<Navigate to="/case-studies" replace />} />
                    <Route path="/case-studies-list" element={<Navigate to="/case-studies" replace />} />
                    <Route path="/accutechlabels-case-study-traditional-to-web-business" element={<AccutechCaseStudyPage />} />
                    <Route path="/1life-case-study-of-regional-to-national-reach" element={<OneLifeCaseStudyPage />} />
                    <Route path="/auro-pumps-case-study-traditional-to-digital-lead-engine" element={<AuroPumpsCaseStudyPage />} />
                    <Route path="/himile-india-case-study-global-manufacturing-digital-voice" element={<HimileIndiaCaseStudyPage />} />
                    <Route path="/himile-india-case-study" element={<Navigate to="/himile-india-case-study-global-manufacturing-digital-voice" replace />} />
                    <Route path="/hobby-goes-global-case-study" element={<Navigate to="/auro-pumps-case-study-traditional-to-digital-lead-engine" replace />} />
                    <Route path="/order-now" element={<OrderNowPage />} />
                    <Route path="/web-hosting-details" element={<WebHostingDetailsPage />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                    <Route path="/training-and-job-vacancy-at-dots-coms-vadodara" element={<CareersPage />} />
                    <Route path="/training-and-job-vacancy-at-dots-coms-vadodara.html" element={<Navigate to="/training-and-job-vacancy-at-dots-coms-vadodara" replace />} />
                    <Route path="/job-vacancy-at-dots-and-coms-company" element={<JobVacancyPage />} />
                    <Route path="/job-vacancy-at-dots-and-coms-company.html" element={<Navigate to="/job-vacancy-at-dots-and-coms-company" replace />} />
                    <Route path="/:slug" element={<JobDetailPage />} />
                    <Route path="/apply/:slug" element={<ApplyPage />} />
                    <Route path="/check-application-status" element={<ApplicationStatusPage />} />
                    <Route path="/application-received" element={<ApplicationReceivedPage />} />
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