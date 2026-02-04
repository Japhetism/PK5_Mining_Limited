import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Header } from '@/app/components/header';
import { Footer } from '@/app/components/footer';
import { HomePage } from '@/app/pages/home-page';
import { AboutPage } from '@/app/pages/about-page';
import { SustainabilityPage } from '@/app/pages/sustainability-page';
import { InvestorRelationsPage } from '@/app/pages/investor-relations-page';
import { CareersPage } from '@/app/pages/careers-page';
import { ContactPage } from '@/app/pages/contact-page';
import { JobDetailsPage } from './pages/job-details-page';
import { ScrollToTop } from './components/scrollToTop';
import { AdminLoginPage } from './admin/admin-login-page';
import { AdminProtectedRoute } from './admin/protected-route';
import { AdminLayout } from './admin/admin-layout';
import { AdminDashboardPage } from './admin/dashboard-page';
import { AdminJobsPage } from './admin/jobs-page';
import { AdminJobEditPage } from './admin/job-edit-page';
import { AdminJobDetailPage } from './admin/job-detail-page';
import { AdminApplicationsPage } from './admin/applications-page';
import { AdminApplicationDetailPage } from './admin/application-detail-page';

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={isAdminRoute ? '' : 'min-h-screen bg-[#1a1a1a] text-white'}>
      {!isAdminRoute && <Header />}
      <main>
        <ScrollToTop />
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          {/* <Route path="/investor-relations" element={<InvestorRelationsPage />} /> */}
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers/job/:jobId" element={<JobDetailsPage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="jobs" element={<AdminJobsPage />} />
              <Route path="jobs/new" element={<AdminJobEditPage />} />
              <Route path="jobs/:jobId" element={<AdminJobDetailPage />} />
              <Route path="jobs/:jobId/edit" element={<AdminJobEditPage />} />
              <Route path="applications" element={<AdminApplicationsPage />} />
              <Route
                path="applications/:applicationId"
                element={<AdminApplicationDetailPage />}
              />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
