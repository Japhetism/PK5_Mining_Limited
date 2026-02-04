import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/app/components/header';
import { Footer } from '@/app/components/footer';
import { HomePage } from '@/app/pages/home-page';
import { AboutPage } from '@/app/pages/about-page';
import { SustainabilityPage } from '@/app/pages/sustainability-page';
import { InvestorRelationsPage } from '@/app/pages/investor-relations-page';
import { CareersPage } from '@/app/pages/careers-page';
import { ContactPage } from '@/app/pages/contact-page';
import { JobDetailsPage } from './pages/job-details-page';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#1a1a1a] text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/sustainability" element={<SustainabilityPage />} />
            {/* <Route path="/investor-relations" element={<InvestorRelationsPage />} /> */}
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers/job/:jobId" element={<JobDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
