
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import BraikiGroup from '@/components/BraikiGroup';
import MissionVision from '@/components/MissionVision';
import Team from '@/components/Team';
import Quality from '@/components/Quality';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Login from '@/components/Admin/Login';
import Dashboard from '@/components/Admin/Dashboard';
import { Toaster } from '@/components/ui/toaster';
import { ContentProvider } from '@/context/ContentContext';

const WebsiteLayout = () => {
  const [language, setLanguage] = useState('ar');
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{language === 'ar' ? 'شركة العين الوطنية للنقل' : 'Al Ain National Transport'}</title>
      </Helmet>
      
      <Header language={language} toggleLanguage={toggleLanguage} />
      <Hero language={language} />
      <About language={language} />
      <Services language={language} />
      <BraikiGroup language={language} />
      <MissionVision language={language} />
      <Team language={language} />
      <Quality language={language} />
      <Contact language={language} />
      <Footer language={language} />
    </div>
  );
};

function App() {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/" element={<WebsiteLayout />} />
        </Routes>
        <Toaster />
      </Router>
    </ContentProvider>
  );
}

export default App;
