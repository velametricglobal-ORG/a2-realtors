import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';

// Public Components
import { Navbar } from './components/public/Navbar';
import { Footer } from './components/public/Footer';
import { HomePage } from './components/public/HomePage';
import { PropertySearch } from './components/public/PropertySearch';
import { PropertyDetail } from './components/public/PropertyDetail';
import { PropertyCompare } from './components/public/PropertyCompare';
import { LocalityPage } from './components/public/LocalityPage';
import { SellPage } from './components/public/SellPage';
import { ConstructionPage } from './components/public/ConstructionPage';
import { AboutPage } from './components/public/AboutPage';
import { ProjectsPage } from './components/public/ProjectsPage';
import { InsightsPage } from './components/public/InsightsPage';
import { ContactPage } from './components/public/ContactPage';

// CRM Components
import { CRMLayout } from './components/crm/CRMLayout';
import { CRMDashboard } from './components/crm/CRMDashboard';
import { LeadManagement } from './components/crm/LeadManagement';
import { SalesPipeline } from './components/crm/SalesPipeline';
import { PropertyCRM } from './components/crm/PropertyCRM';
import { OwnerManagement } from './components/crm/OwnerManagement';
import { SiteVisitsManager } from './components/crm/SiteVisitsManager';
import { FollowUpManager } from './components/crm/FollowUpManager';
import { DealsAndCommissions } from './components/crm/DealsAndCommissions';
import { PropertyMatcher } from './components/crm/PropertyMatcher';
import { MarketingCRM } from './components/crm/MarketingCRM';
import { AISalesAssistant } from './components/crm/AISalesAssistant';
import { CMSManager } from './components/crm/CMSManager';
import { HomepageCustomizer } from './components/crm/HomepageCustomizer';
import { ReportsAnalytics } from './components/crm/ReportsAnalytics';
import { Settings } from './components/crm/Settings';
import { Login } from './components/crm/Login';
import { useStore } from './context/StoreContext';

function AppContent() {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore();
  const [viewMode, setViewMode] = useState<'PUBLIC' | 'CRM'>('PUBLIC');

  const handleSwitchToCRM = () => {
    setViewMode('CRM');
    navigate('/admin/dashboard');
  };

  const handleSwitchToPublic = () => {
    setViewMode('PUBLIC');
    navigate('/');
  };

  // Render Login portal if accessing CRM while unauthenticated
  if (viewMode === 'CRM' && !isAuthenticated) {
    return <Login />;
  }

  return (
    <div>
      {viewMode === 'PUBLIC' ? (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar onSwitchToCRM={handleSwitchToCRM} />
          
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/buy" element={<PropertySearch />} />
              <Route path="/rent" element={<PropertySearch />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/commercial" element={<PropertySearch />} />
              <Route path="/land-plots" element={<PropertySearch />} />
              <Route path="/construction" element={<ConstructionPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/search" element={<PropertySearch />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/compare" element={<PropertyCompare />} />
              <Route path="/properties/dehradun/:localitySlug" element={<LocalityPage />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      ) : (
        <CRMLayout onSwitchToPublic={handleSwitchToPublic}>
          <Routes>
            <Route path="/admin/dashboard" element={<CRMDashboard />} />
            <Route path="/admin/leads" element={<LeadManagement />} />
            <Route path="/admin/pipeline" element={<SalesPipeline />} />
            <Route path="/admin/properties" element={<PropertyCRM />} />
            <Route path="/admin/owners" element={<OwnerManagement />} />
            <Route path="/admin/site-visits" element={<SiteVisitsManager />} />
            <Route path="/admin/follow-ups" element={<FollowUpManager />} />
            <Route path="/admin/deals" element={<DealsAndCommissions />} />
            <Route path="/admin/matching" element={<PropertyMatcher />} />
            <Route path="/admin/campaigns" element={<MarketingCRM />} />
            <Route path="/admin/ai-assistant" element={<AISalesAssistant />} />
            <Route path="/admin/cms" element={<CMSManager />} />
            <Route path="/admin/homepage-customizer" element={<HomepageCustomizer />} />
            <Route path="/admin/reports" element={<ReportsAnalytics />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="*" element={<CRMDashboard />} />
          </Routes>
        </CRMLayout>
      )}
    </div>
  );
}

export function App() {
  return (
    <StoreProvider>
      <Router>
        <AppContent />
      </Router>
    </StoreProvider>
  );
}

export default App;
