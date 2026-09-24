import { Shield, Sparkles, Wind, BatteryCharging, Check } from 'lucide-react';
import { VEHICLE_OPTIONS } from '../data/mockData';
import { VehicleOption } from '../types';

interface FleetSectionProps {
  onSelectVehicle: (vehicleId: string) => void;
}

export function FleetSection({ onSelectVehicle }: FleetSectionProps) {
  return (
    <section id="fleet" className="py-20 md:py-28 bg-gradient-to-b from-[#FAF7F5] via-[#F8F3F5] to-[#FAF7F5] border-b border-[#EFE7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/80 text-[11px] font-semibold uppercase tracking-widest text-[#782846] mb-3">
              <span>Sanctuary on Wheels</span>
              <span aria-hidden="true">·</span>
              <span>Pristine Maintenance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2A222B] font-display tracking-tight leading-tight">
              An executive fleet calibrated for <span className="italic font-medium text-[#782846]">calm, gentle access</span>, and discretion.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5D5262] max-w-md font-normal leading-relaxed">
            All vehicles in our dedicated fleet are under 4 years old, hybrid or electric, strictly scent-neutral, and equipped with medical-grade continuous HEPA cabin purification.
          </p>
        </div>

        {/* Fleet Banner image featuring real professional female chauffeurs */}
        <div className="relative rounded-3xl overflow-hidden border border-white/80 mb-12 shadow-lg bg-[#271926]">
          <img
            src="/src/assets/images/chauffeur_team_fleet_1790267781382.jpg"
            alt="VERA professional female chauffeurs standing with executive fleet vehicles"
            className="w-full aspect-[21/9] min-h-[300px] object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#271926]/90 via-[#271926]/40 to-transparent flex items-center p-6 sm:p-12">
            <div className="glass-dark rounded-2xl p-6 sm:p-8 max-w-lg border border-white/15 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#F2C4D3] font-semibold mb-2 block">
                The Fleet Standard
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-normal leading-tight">
                Triple-inspected every 6,000 miles. Never a casual gig vehicle.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#E5D7DE] leading-relaxed">
                Dedicated commercial passenger insurance, tuned air-suspension for smooth deceleration, and pre-loaded amenities including emergency chargers and hydration.
              </p>
            </div>
          </div>
        </div>

        {/* Vehicle Spec Cards: Refined glassmorphism cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VEHICLE_OPTIONS.map((vehicle: VehicleOption) => (
            <div
              key={vehicle.id}
              className="glass-panel-elevated rounded-3xl p-7 flex flex-col justify-between hover:border-[#782846]/40 transition-all shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#782846]">
                    {vehicle.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#3E6554] bg-[#EDF5F1] px-2.5 py-0.5 rounded-full border border-[#D5E6DC] font-medium">
                    <BatteryCharging className="w-3 h-3" />
                    <span>Hybrid / EV</span>
                  </div>
                </div>

                <h4 className="text-xl font-normal text-[#2A222B] font-display mb-1">
                  {vehicle.name}
                </h4>

                <div className="flex items-center gap-3 text-xs text-[#7B6E7D] py-2 border-b border-[#EFE7EB] mb-5">
                  <span>{vehicle.capacity}</span>
                  <span aria-hidden="true">·</span>
                  <span>{vehicle.luggage}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-semibold text-[#2A222B] uppercase tracking-wider">
                    In-Cabin Amenities:
                  </div>
                  <ul className="space-y-2">
                    {vehicle.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#5D5262]">
                        <Check className="w-3.5 h-3.5 text-[#782846] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE7EB] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#7B6E7D] block">Rate standard</span>
                  <span className="text-xs font-semibold text-[#2A222B]">
                    {vehicle.multiplier === 1 ? 'Standard Flat Rate' : `Tier Rate (${vehicle.multiplier}x)`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectVehicle(vehicle.id)}
                  className="px-4 py-2 text-xs font-semibold text-[#782846] bg-[#FAF2F5] hover:bg-[#782846] hover:text-white rounded-full transition-all border border-[#F2DEE5]"
                >
                  Select in Estimator
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Clean Amenities Banner: Soft glass strip */}
        <div className="mt-12 p-6 glass-panel rounded-2xl flex flex-wrap items-center justify-between gap-6 text-xs text-[#5D5262] border border-white">
          <div className="flex items-center gap-3">
            <Wind className="w-4 h-4 text-[#782846]" />
            <span><strong>HEPA Filtration:</strong> Cabin air continuously filtered for allergens and particulates.</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#782846]" />
            <span><strong>100% Scent-Free:</strong> No harsh synthetic air fresheners, scents, or aerosols.</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-[#782846]" />
            <span><strong>Acoustic Glass:</strong> Total confidentiality and stillness for rest or calls.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
