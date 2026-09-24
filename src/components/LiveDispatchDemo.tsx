import { useState } from 'react';
import { LiveTrackingMap } from './LiveTrackingMap';
import { Radio, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface LiveDispatchDemoProps {
  onOpenBooking: () => void;
}

export function LiveDispatchDemo({ onOpenBooking }: LiveDispatchDemoProps) {
  const [activeScenario, setActiveScenario] = useState<'executive' | 'senior' | 'student'>('executive');

  const scenarios = {
    executive: {
      name: 'Executive Late-Night & Airport Route',
      bookingRef: 'VERA-9142-26',
      passenger: 'Dr. Evelyn Vance, MD',
      pickup: 'Metropolitan Medical Center (Staff Bay 3)',
      dropoff: 'Executive Terminal 2, Private Aviation Gates',
      serviceTier: 'Executive & Shift Discretion',
      vehicle: 'Lexus ES 300h (Clean Hybrid)',
      chauffeurId: 'c1',
      context: 'Late hospital shift departure with guaranteed quiet cabin protocol and airport check-in synchronization.',
    },
    senior: {
      name: 'Senior Healthcare Clinic Companion',
      bookingRef: 'VERA-4819-26',
      passenger: 'Eleanor Vance (Age 81) w/ Daughter Claire',
      pickup: 'Oakridge Senior Living Village (Front Portico)',
      dropoff: 'University Medical Pavilion & Ophthalmology Clinic',
      serviceTier: 'Senior Independence Door-Through-Door',
      vehicle: 'Toyota Crown Signia (Gentle-Step Crossover)',
      chauffeurId: 'c2',
      context: 'Arm-assisted threshold support, folding walker stowage, and automated SMS arrival updates sent to family guardians.',
    },
    student: {
      name: 'Campus Safe Night Transit',
      bookingRef: 'VERA-6204-26',
      passenger: 'Maya Raman (University Sophomore)',
      pickup: 'Science & Engineering Library (North Quad)',
      dropoff: 'West Campus Residential Dormitory',
      serviceTier: 'Student Safe Commute & Guardian PIN',
      vehicle: 'Volvo S90 Recharge (Safety Cell)',
      chauffeurId: 'c3',
      context: 'Pre-shared two-way security PIN code, live GPS link shared with parents, zero surge rate during rainstorms.',
    },
  };

  const current = scenarios[activeScenario];

  return (
    <section id="live-tracking" className="py-20 md:py-28 bg-gradient-to-b from-[#FAF7F5] via-[#F4ECEF] to-[#FAF7F5] text-[#2A222B] border-b border-[#EFE7EB] relative overflow-hidden">
      
      {/* Background soft pink & lilac glow blur */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#EAD4DE]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-[#DFE2E8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/80 text-[11px] font-semibold uppercase tracking-widest text-[#782846] mb-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#782846] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#782846]"></span>
              </span>
              <span>Live Operations Telemetry</span>
              <span aria-hidden="true">·</span>
              <span>Real-Time GPS Map</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-display tracking-tight text-[#2A222B] leading-tight">
              Real-time map tracking with <span className="italic font-medium text-[#782846]">exact arrival estimates</span>.
            </h2>
            
            <p className="mt-4 text-base sm:text-lg text-[#5D5262] leading-relaxed">
              Every VERA trip transmits authenticated live telemetry to both the passenger and designated family guardians. Test the interactive map simulation below to see real-time route progression, speed monitoring, and dynamic arrival calculations.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#782846] hover:bg-[#601F37] text-white font-semibold rounded-full text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:shadow-[#782846]/20 self-start lg:self-auto shrink-0"
          >
            <span>Book With Live Tracking</span>
            <ArrowRight className="w-4 h-4 text-[#F3CBD7]" />
          </button>
        </div>

        {/* Scenario Switcher Tabs: Frosted glass buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {[
            { id: 'executive', title: '1. Executive Shift / Red-Eye', passenger: 'Dr. Evelyn Vance' },
            { id: 'senior', title: '2. Senior Door-to-Clinic', passenger: 'Eleanor Vance (81) & Claire' },
            { id: 'student', title: '3. Campus Evening Study', passenger: 'Maya Raman (Student)' },
          ].map((tab) => {
            const isSelected = activeScenario === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveScenario(tab.id as any)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'glass-panel-elevated border-[#782846] text-[#2A222B] shadow-md ring-1 ring-[#782846]/30'
                    : 'glass-panel border-white/80 text-[#6B5E6D] hover:bg-white/80 hover:text-[#2A222B]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#782846]">
                    Scenario
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[11px] text-[#782846] font-semibold">
                      <Radio className="w-3 h-3 animate-pulse" />
                      Active Stream
                    </span>
                  )}
                </div>
                <div className="font-semibold text-sm sm:text-base text-[#2A222B] mt-1 font-display">
                  {tab.title}
                </div>
                <div className="text-xs text-[#7B6E7D] mt-0.5">
                  Passenger: {tab.passenger}
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Scenario Context Strip: Soft mirror card */}
        <div className="mb-6 p-4 glass-panel rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs border border-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FAF2F5] text-[#782846] rounded-xl border border-[#F2DEE5]">
              <ShieldCheck className="w-4 h-4 text-[#3E6554]" />
            </div>
            <div>
              <span className="font-semibold text-[#2A222B] block font-display text-sm">{current.name}</span>
              <span className="text-[#665A69]">{current.context}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#7B6E7D] shrink-0">
            <span>Vehicle: <strong className="text-[#2A222B]">{current.vehicle}</strong></span>
          </div>
        </div>

        {/* The Live Interactive Map */}
        <LiveTrackingMap
          key={activeScenario}
          bookingRef={current.bookingRef}
          passengerName={current.passenger}
          pickupAddress={current.pickup}
          dropoffAddress={current.dropoff}
          serviceTier={current.serviceTier}
          vehicleName={current.vehicle}
          chauffeurId={current.chauffeurId}
        />

        {/* Real-time feature checklist underneath */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#6B5E6D] pt-6 border-t border-[#EFE7EB]">
          <div className="space-y-1">
            <h4 className="font-semibold text-[#2A222B] text-sm">Dynamic ETA Algorithms</h4>
            <p>Calculates precise minutes of arrival using continuous highway speeds, traffic density, and driver maneuvering pacing.</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-[#2A222B] text-sm">Two-Way Boarding PIN</h4>
            <p>Guarantees you never enter the wrong vehicle. The chauffeur's screen and passenger phone must match before unlocking doors.</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-[#2A222B] text-sm">Guardian Family Sharing</h4>
            <p>One-click private link shares real-time vehicle movement with adult daughters, parents, or corporate security desks.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
