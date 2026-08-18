import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ServiceModal } from './components/ServiceModal';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SERVICES_DATA } from './data/servicesData';
import { ServiceItem } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedQuoteServiceId, setSelectedQuoteServiceId] = useState<string>('video-editing');

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
      {/* Fixed Navigation Bar */}
      <Navbar onOpenQuote={() => handleOpenQuote()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreServices={scrollToServices}
          onViewWork={scrollToWork}
        />

        <ServicesSection
          services={SERVICES_DATA}
          onSelectService={handleExploreService}
        />

        <PortfolioSection />

        <ProcessSection />

        <AboutSection />

        <TestimonialsSection />

        <ContactSection selectedServiceId={selectedQuoteServiceId} />
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
    </div>
  );
}
