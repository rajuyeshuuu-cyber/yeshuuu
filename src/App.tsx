import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ServiceModal } from './components/ServiceModal';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { HireMeSection } from './components/HireMeSection';
import { HireMeModal } from './components/HireMeModal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SERVICES_DATA } from './data/servicesData';
import { ServiceItem, PortfolioCategory, HireInquiryType } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedQuoteServiceId, setSelectedQuoteServiceId] = useState<string>('reels-editing');
  const [activePortfolioCategory, setActivePortfolioCategory] = useState<PortfolioCategory>('Reels');
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [hireModalType, setHireModalType] = useState<HireInquiryType>('freelancer');
  const [defaultHireService, setDefaultHireService] = useState<string | undefined>(undefined);

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) {
      const match = SERVICES_DATA.find(
        (s) => s.name.toLowerCase() === serviceName.toLowerCase() || s.id === serviceName
      );
      if (match) {
        setSelectedQuoteServiceId(match.id);
      }
    }
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenHire = (type: HireInquiryType = 'freelancer', service?: string) => {
    setHireModalType(type);
    setDefaultHireService(service);
    setIsHireModalOpen(true);
  };

  const handleHireService = (service: ServiceItem) => {
    handleOpenHire('freelancer', `${service.name} (${service.startingPrice})`);
  };

  const handleViewPortfolioCategory = (category: PortfolioCategory) => {
    setActivePortfolioCategory(category);
    const workElem = document.querySelector('#work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleGetQuoteFromModal = (service: ServiceItem) => {
    setSelectedQuoteServiceId(service.id);
    setSelectedService(null);
    setTimeout(() => {
      const contactElem = document.querySelector('#contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const scrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const el = document.querySelector('#work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neutral-800 selection:text-white flex flex-col">
      {/* Fixed Navigation Bar with Hire Me integration */}
      <Navbar
        onOpenQuote={() => handleOpenQuote()}
        onOpenHire={(type) => handleOpenHire(type || 'freelancer')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreServices={scrollToServices}
          onViewWork={scrollToWork}
          onOpenHire={() => handleOpenHire('freelancer')}
        />

        <ServicesSection
          services={SERVICES_DATA}
          onSelectService={handleExploreService}
          onViewPortfolioCategory={handleViewPortfolioCategory}
          onHireService={handleHireService}
        />

        <PortfolioSection
          activeCategory={activePortfolioCategory}
          onCategoryChange={setActivePortfolioCategory}
        />

        <ProcessSection />

        <AboutSection />

        {/* Dedicated Visible HIRE ME Section */}
        <HireMeSection />

        <TestimonialsSection />

        {/* Contact Section with prominent Hire Me action card */}
        <ContactSection
          selectedServiceId={selectedQuoteServiceId}
          onOpenHire={() => handleOpenHire('freelancer')}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Dedicated Premium Cinematic Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={handleCloseModal}
        onGetQuote={handleGetQuoteFromModal}
      />

      {/* Direct Quick-Access Hire Me Modal with Freelancer/Job options */}
      <HireMeModal
        isOpen={isHireModalOpen}
        defaultType={hireModalType}
        defaultService={defaultHireService}
        onClose={() => setIsHireModalOpen(false)}
      />
    </div>
  );
}
