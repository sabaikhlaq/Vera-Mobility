import { useState, useId } from 'react';
import { Calculator, MapPin, ArrowRight, ShieldCheck, Check, Info, Sparkles } from 'lucide-react';
import { POPULAR_ROUTES, VEHICLE_OPTIONS } from '../data/mockData';
import { ServiceType, BookingDetails } from '../types';

interface RideEstimatorProps {
  onBookRide: (details: Partial<BookingDetails>) => void;
  initialService?: ServiceType;
  initialVehicle?: string;
}

export function RideEstimator({ onBookRide, initialService = 'executive', initialVehicle = 'executive-sedan' }: RideEstimatorProps) {
  const pickupId = useId();
  const dropoffId = useId();
  const dateId = useId();
  const timeId = useId();

  const [selectedRouteId, setSelectedRouteId] = useState<string>('airport-express');
  const [customPickup, setCustomPickup] = useState<string>('');
  const [customDropoff, setCustomDropoff] = useState<string>('');
  const [isCustomRoute, setIsCustomRoute] = useState<boolean>(false);
  const [estimatedMiles, setEstimatedMiles] = useState<number>(18.4);

  const [serviceType, setServiceType] = useState<ServiceType>(initialService);
  const [vehicleId, setVehicleId] = useState<string>(initialVehicle);
  const [date, setDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('08:30');

  // Add-ons
  const [seniorDoorAssist, setSeniorDoorAssist] = useState<boolean>(serviceType === 'senior');
  const [childSeat, setChildSeat] = useState<boolean>(serviceType === 'family');
  const [quietRide, setQuietRide] = useState<boolean>(true);
  const [meetAndGreet, setMeetAndGreet] = useState<boolean>(false);

  // Handle route preset change
  const handleSelectPreset = (routeId: string) => {
    setSelectedRouteId(routeId);
    setIsCustomRoute(false);
    const route = POPULAR_ROUTES.find(r => r.id === routeId);
    if (route) {
      setEstimatedMiles(route.distanceMiles);
    }
  };

  // Pricing calculation math
  const selectedVehicle = VEHICLE_OPTIONS.find(v => v.id === vehicleId) || VEHICLE_OPTIONS[0];
  
  // Base rate calculation: $20 flat flag drop + $2.60 per mile * vehicle multiplier
  const baseMileageCost = Math.round((20 + (estimatedMiles * 2.65)) * selectedVehicle.multiplier);
  
  // Service tier modifier
  const serviceTierCost = serviceType === 'senior' ? 15 : serviceType === 'family' ? 10 : 0;
  
  // Addon costs
  const doorAssistCost = seniorDoorAssist ? 12 : 0;
  const childSeatCost = childSeat ? 10 : 0;
  const meetAndGreetCost = meetAndGreet ? 18 : 0;
  
  const totalEstimatedPrice = baseMileageCost + serviceTierCost + doorAssistCost + childSeatCost + meetAndGreetCost;

  const currentRoute = POPULAR_ROUTES.find(r => r.id === selectedRouteId);
  const pickupAddress = isCustomRoute ? (customPickup || 'Current Location') : currentRoute?.pickup || 'Pickup Location';
  const dropoffAddress = isCustomRoute ? (customDropoff || 'Selected Destination') : currentRoute?.dropoff || 'Dropoff Destination';

  const handleProceed = () => {
    onBookRide({
      pickup: pickupAddress,
      dropoff: dropoffAddress,
      date,
      time,
      serviceType,
      vehicleId,
      seniorAssistance: seniorDoorAssist,
      childSeatRequired: childSeat,
      quietRide,
      estimatedPrice: totalEstimatedPrice,
    });
  };

  return (
    <section id="estimator" className="py-20 md:py-28 bg-gradient-to-b from-[#FAF7F5] via-[#F5EDF0] to-[#FAF7F5] border-b border-[#EFE7EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/80 text-[11px] font-semibold uppercase tracking-widest text-[#782846] mb-3">
            <span>Guaranteed Flat Rates</span>
            <span aria-hidden="true">·</span>
            <span>Fare Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2A222B] font-display tracking-tight leading-tight">
            Transparent pricing without <span className="italic font-medium text-[#782846]">hidden surge penalties</span>.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#5D5262] leading-relaxed">
            Configure your journey parameters below to see an exact itemized fare estimate. What you see is what you pay—no late-night spikes, rain penalties, or sudden traffic surcharges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column with glass panel */}
          <div className="lg:col-span-7 glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white shadow-xl space-y-6">
            
            {/* Route Selection Mode */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A222B] mb-3">
                1. Select Route or Custom Addresses
              </label>
              <div className="flex items-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setIsCustomRoute(false)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                    !isCustomRoute ? 'bg-[#782846] text-white shadow-sm' : 'bg-white/60 text-[#5D5262] hover:text-[#2A222B] border border-white'
                  }`}
                >
                  Curated Popular Routes
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomRoute(true)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                    isCustomRoute ? 'bg-[#782846] text-white shadow-sm' : 'bg-white/60 text-[#5D5262] hover:text-[#2A222B] border border-white'
                  }`}
                >
                  Custom Address Route
                </button>
              </div>

              {!isCustomRoute ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {POPULAR_ROUTES.map((route) => {
                    const isSelected = selectedRouteId === route.id;
                    return (
                      <button
                        key={route.id}
                        type="button"
                        onClick={() => handleSelectPreset(route.id)}
                        className={`p-3.5 text-left rounded-xl border text-xs transition-all ${
                          isSelected
                            ? 'border-[#782846] bg-[#FAF2F5] text-[#2A222B] font-semibold shadow-2xs'
                            : 'border-white/80 bg-white/70 text-[#5D5262] hover:border-[#782846]/30 hover:bg-white'
                        }`}
                      >
                        <div className="font-semibold text-[#2A222B]">{route.name}</div>
                        <div className="text-[11px] text-[#8C7D8E] mt-0.5">
                          {route.distanceMiles} mi · approx. {route.durationMins} mins
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label htmlFor={pickupId} className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                      Pick-up Address
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#782846] absolute left-3 top-3" />
                      <input
                        id={pickupId}
                        type="text"
                        value={customPickup}
                        onChange={(e) => setCustomPickup(e.target.value)}
                        placeholder="e.g., 742 Evergreen Terrace or Hotel Lobby"
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-white/80 border border-[#ECE2E6] rounded-xl focus:border-[#782846] focus:ring-1 focus:ring-[#782846] shadow-2xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={dropoffId} className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                      Drop-off Destination
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#3E6554] absolute left-3 top-3" />
                      <input
                        id={dropoffId}
                        type="text"
                        value={customDropoff}
                        onChange={(e) => setCustomDropoff(e.target.value)}
                        placeholder="e.g., Terminal 4 or Senior Wellness Clinic"
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-white/80 border border-[#ECE2E6] rounded-xl focus:border-[#782846] focus:ring-1 focus:ring-[#782846] shadow-2xs"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[11px] text-[#7B6E7D]">Estimated distance:</span>
                    <input
                      type="range"
                      min="3"
                      max="45"
                      step="1"
                      value={estimatedMiles}
                      onChange={(e) => setEstimatedMiles(Number(e.target.value))}
                      className="accent-[#782846] flex-1"
                    />
                    <span className="text-xs font-mono font-bold tabular-nums text-[#2A222B]">{estimatedMiles} mi</span>
                  </div>
                </div>
              )}
            </div>

            {/* Service & Generation Tier */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A222B] mb-3">
                2. Primary Care Protocol
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'executive', label: 'Executive Shift', sub: 'Discreet / Quiet' },
                  { id: 'senior', label: 'Senior Escort', sub: 'Door-Through-Door' },
                  { id: 'student', label: 'Campus Safe', sub: 'PIN & Live GPS' },
                  { id: 'family', label: 'Family & Seat', sub: 'Luggage & Seats' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      const st = tier.id as ServiceType;
                      setServiceType(st);
                      if (st === 'senior') setSeniorDoorAssist(true);
                      if (st === 'family') setChildSeat(true);
                    }}
                    className={`p-3 text-left rounded-xl border text-xs transition-all ${
                      serviceType === tier.id
                        ? 'border-[#782846] bg-[#FAF2F5] text-[#2A222B] font-semibold shadow-2xs'
                        : 'border-white/80 bg-white/70 text-[#5D5262] hover:border-[#782846]/30'
                    }`}
                  >
                    <div className="font-semibold">{tier.label}</div>
                    <div className="text-[10px] text-[#8C7D8E] mt-0.5">{tier.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A222B] mb-3">
                3. Choose Vehicle Category
              </label>
              <div className="space-y-2">
                {VEHICLE_OPTIONS.map((veh) => (
                  <label
                    key={veh.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                      vehicleId === veh.id ? 'border-[#782846] bg-[#FAF2F5]' : 'border-white/80 bg-white/70 hover:border-[#782846]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="vehicleChoice"
                        checked={vehicleId === veh.id}
                        onChange={() => setVehicleId(veh.id)}
                        className="text-[#782846] focus:ring-[#782846]"
                      />
                      <div>
                        <div className="font-semibold text-[#2A222B]">{veh.name}</div>
                        <div className="text-[11px] text-[#7B6E7D]">{veh.category} · {veh.capacity}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-[#782846]">
                      {veh.multiplier === 1 ? 'Standard' : `+${Math.round((veh.multiplier - 1) * 100)}%`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2A222B] mb-2.5">
                4. Specialized Chauffeur Accompaniments
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-white/80 bg-white/70 hover:bg-white cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={seniorDoorAssist}
                    onChange={(e) => setSeniorDoorAssist(e.target.checked)}
                    className="mt-0.5 text-[#782846] focus:ring-[#782846] rounded"
                  />
                  <div>
                    <span className="font-semibold text-[#2A222B]">Arm-Assisted Door Escort</span>
                    <span className="text-[11px] text-[#7B6E7D] block">Walk to living room & clinic (+$12)</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-white/80 bg-white/70 hover:bg-white cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={childSeat}
                    onChange={(e) => setChildSeat(e.target.checked)}
                    className="mt-0.5 text-[#782846] focus:ring-[#782846] rounded"
                  />
                  <div>
                    <span className="font-semibold text-[#2A222B]">Pre-installed Britax Seat</span>
                    <span className="text-[11px] text-[#7B6E7D] block">Rear or forward facing (+$10)</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-white/80 bg-white/70 hover:bg-white cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={meetAndGreet}
                    onChange={(e) => setMeetAndGreet(e.target.checked)}
                    className="mt-0.5 text-[#782846] focus:ring-[#782846] rounded"
                  />
                  <div>
                    <span className="font-semibold text-[#2A222B]">Baggage Meet & Greet</span>
                    <span className="text-[11px] text-[#7B6E7D] block">Greeting at baggage carousel (+$18)</span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-3 rounded-xl border border-white/80 bg-white/70 hover:bg-white cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={quietRide}
                    onChange={(e) => setQuietRide(e.target.checked)}
                    className="mt-0.5 text-[#782846] focus:ring-[#782846] rounded"
                  />
                  <div>
                    <span className="font-semibold text-[#2A222B]">Quiet Cabin Protocol</span>
                    <span className="text-[11px] text-[#7B6E7D] block">Tranquil silence & rest (Complimentary)</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label htmlFor={dateId} className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                  Scheduled Date
                </label>
                <input
                  id={dateId}
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white/80 border border-[#ECE2E6] rounded-xl focus:border-[#782846]"
                />
              </div>
              <div>
                <label htmlFor={timeId} className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                  Departure Time
                </label>
                <input
                  id={timeId}
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white/80 border border-[#ECE2E6] rounded-xl focus:border-[#782846]"
                />
              </div>
            </div>

          </div>

          {/* Itemized Calculation Summary Card: Plum Brand Accent Glass Panel */}
          <div className="lg:col-span-5 glass-dark rounded-3xl p-7 text-white shadow-2xl relative overflow-hidden">
            {/* Soft pink highlight orb inside dark glass */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#782846]/40 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#F2C4D3]" />
                <h3 className="text-base font-normal font-display text-white">Itemized Trip Quote</h3>
              </div>
              <span className="text-xs font-semibold text-[#8BE4BC] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Guaranteed Flat
              </span>
            </div>

            {/* Route preview */}
            <div className="p-3.5 bg-white/10 rounded-2xl text-xs space-y-2 mb-6 border border-white/10 relative z-10">
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F2C4D3] mt-1 shrink-0" />
                <div>
                  <span className="text-[#C4B6C2] block text-[10px] uppercase tracking-wider">Pickup</span>
                  <span className="font-semibold text-white">{pickupAddress}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#8BE4BC] mt-1 shrink-0" />
                <div>
                  <span className="text-[#C4B6C2] block text-[10px] uppercase tracking-wider">Destination</span>
                  <span className="font-semibold text-white">{dropoffAddress}</span>
                </div>
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-3 text-xs text-[#DACFD6] pb-6 border-b border-white/15 relative z-10">
              <div className="flex justify-between">
                <span>Base Chauffeur Transport ({estimatedMiles} mi)</span>
                <span className="text-white font-mono tabular-nums">${baseMileageCost}.00</span>
              </div>
              <div className="flex justify-between">
                <span>Vehicle: {selectedVehicle.name}</span>
                <span className="text-[#B9AAB5] text-[11px] font-mono tabular-nums">Included</span>
              </div>
              {serviceTierCost > 0 && (
                <div className="flex justify-between">
                  <span>Care Protocol Tier ({serviceType})</span>
                  <span className="text-white font-mono tabular-nums">+${serviceTierCost}.00</span>
                </div>
              )}
              {doorAssistCost > 0 && (
                <div className="flex justify-between">
                  <span>Door-Through-Door Arm Escort</span>
                  <span className="text-white font-mono tabular-nums">+${doorAssistCost}.00</span>
                </div>
              )}
              {childSeatCost > 0 && (
                <div className="flex justify-between">
                  <span>Pre-installed Britax Safety Seat</span>
                  <span className="text-white font-mono tabular-nums">+${childSeatCost}.00</span>
                </div>
              )}
              {meetAndGreetCost > 0 && (
                <div className="flex justify-between">
                  <span>Baggage Meet & Greet</span>
                  <span className="text-white font-mono tabular-nums">+${meetAndGreetCost}.00</span>
                </div>
              )}
              <div className="flex justify-between text-[#B9AAB5] text-[11px]">
                <span>24/7 Operations Monitoring</span>
                <span className="text-[#8BE4BC]">Complimentary</span>
              </div>
            </div>

            {/* Total */}
            <div className="py-6 flex items-baseline justify-between relative z-10">
              <div>
                <span className="text-xs text-[#C4B6C2] uppercase tracking-wider font-semibold block">Total Estimated Fare</span>
                <span className="text-[11px] text-[#A697A3]">Includes all tolls, gratuity & fees</span>
              </div>
              <div className="text-right">
                <span className="text-4xl font-normal font-display text-white font-mono tabular-nums">
                  ${totalEstimatedPrice}
                </span>
                <span className="text-xs text-[#C4B6C2] block">USD</span>
              </div>
            </div>

            {/* Proceed CTA: Brand color button */}
            <button
              type="button"
              onClick={handleProceed}
              className="w-full py-4 bg-[#782846] hover:bg-[#8F3355] text-white font-bold rounded-2xl text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 border border-white/20 relative z-10"
            >
              <span>Lock in This Chauffeur Rate</span>
              <ArrowRight className="w-4 h-4 text-[#F3CBD7]" />
            </button>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-[#C4B6C2] relative z-10">
              <Info className="w-3.5 h-3.5 shrink-0 text-[#F2C4D3]" />
              <span>Full refund guarantee up to 2 hours prior to scheduled departure.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
