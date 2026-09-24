/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { RoadCarTicker } from './components/RoadCarTicker';
import { Hero } from './components/Hero';
import { PillarsSection } from './components/PillarsSection';
import { SafetySection } from './components/SafetySection';
import { FleetSection } from './components/FleetSection';
import { RideEstimator } from './components/RideEstimator';
import { LiveDispatchDemo } from './components/LiveDispatchDemo';
import { ChauffeurSpotlight } from './components/ChauffeurSpotlight';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceType, BookingDetails } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType>('executive');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('executive-sedan');
  const [activeBookingDetails, setActiveBookingDetails] = useState<Partial<BookingDetails>>({
    pickup: 'Downtown Financial Center',
    dropoff: 'Terminal 2 International Departure',
    serviceType: 'executive',
    vehicleId: 'executive-sedan',
  });

  const handleOpenBooking = () => {
    setActiveBookingDetails((prev) => ({
      ...prev,
      serviceType: selectedService,
      vehicleId: selectedVehicle,
    }));
    setIsBookingOpen(true);
  };

  const handleSelectServiceFromPillars = (service: ServiceType) => {
    setSelectedService(service);
    setActiveBookingDetails((prev) => ({
      ...prev,
      serviceType: service,
      seniorAssistance: service === 'senior',
      childSeatRequired: service === 'family',
    }));
    // Smoothly scroll down to estimator
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectVehicleFromFleet = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setActiveBookingDetails((prev) => ({
      ...prev,
      vehicleId,
    }));
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookFromEstimator = (details: Partial<BookingDetails>) => {
    setActiveBookingDetails(details);
    setIsBookingOpen(true);
  };

  const handleExploreCalculator = () => {
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F5] text-[#2A222B] selection:bg-[#782846]/20 selection:text-[#782846]">
      {/* Top Bar Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Infinite Cruising Car Animation directly below Navbar */}
      <RoadCarTicker />

      <main className="flex-1">
        {/* 1. Hero Section with 16:9 photo, unboxed metadata, and proof metrics */}
        <Hero 
          onOpenBooking={handleOpenBooking}
          onExploreCalculator={handleExploreCalculator}
        />

        {/* 2. Generations & Pillars Section (Senior, Executive, Student, Family) */}
        <PillarsSection onSelectService={handleSelectServiceFromPillars} />

        {/* 3. The Safety Standard & 4-tier Vetting + Direct Comparison Matrix */}
        <SafetySection />

        {/* 4. Executive Fleet */}
        <FleetSection onSelectVehicle={handleSelectVehicleFromFleet} />

        {/* 5. Interactive Fare Calculator & Rate Lock */}
        <RideEstimator 
          onBookRide={handleBookFromEstimator}
          initialService={selectedService}
          initialVehicle={selectedVehicle}
        />

        {/* 6. Real-Time Leaflet Map Visualization & Live ETA Telemetry */}
        <LiveDispatchDemo onOpenBooking={handleOpenBooking} />

        {/* 7. Chauffeur Spotlight (Verified professional women chauffeurs) */}
        <ChauffeurSpotlight />

        {/* 7. Client Stories & Testimonials across generations */}
        <TestimonialsSection />

        {/* 8. Dedicated Inquiries (Family accounts, corporate programs) */}
        <ContactSection />

        {/* 9. FAQ Accordion */}
        <FaqSection />
      </main>

      {/* 10. Quiet, Authoritative Footer */}
      <Footer />

      {/* Interactive Booking & Voucher Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialDetails={activeBookingDetails}
      />
    </div>
  );
}
