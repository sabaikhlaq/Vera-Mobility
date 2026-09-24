import { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, Phone, Mail, User, Copy, Check } from 'lucide-react';
import { BookingDetails } from '../types';
import { VEHICLE_OPTIONS } from '../data/mockData';
import { LiveTrackingMap } from './LiveTrackingMap';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDetails?: Partial<BookingDetails>;
}

export function BookingModal({ isOpen, onClose, initialDetails }: BookingModalProps) {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  
  const [pickup, setPickup] = useState(initialDetails?.pickup || 'Downtown Financial Center');
  const [dropoff, setDropoff] = useState(initialDetails?.dropoff || 'Terminal 2 International Departure');
  const [date, setDate] = useState(initialDetails?.date || new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(initialDetails?.time || '08:30');
  const [serviceType, setServiceType] = useState(initialDetails?.serviceType || 'executive');
  const [vehicleId, setVehicleId] = useState(initialDetails?.vehicleId || 'executive-sedan');
  const [seniorAssistance, setSeniorAssistance] = useState(initialDetails?.seniorAssistance ?? false);
  const [childSeatRequired, setChildSeatRequired] = useState(initialDetails?.childSeatRequired ?? false);
  const [quietRide, setQuietRide] = useState(initialDetails?.quietRide ?? true);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passengerNotes, setPassengerNotes] = useState('');
  const [preferredChauffeur, setPreferredChauffeur] = useState('any');
  
  const [copiedRef, setCopiedRef] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialDetails) {
      if (initialDetails.pickup) setPickup(initialDetails.pickup);
      if (initialDetails.dropoff) setDropoff(initialDetails.dropoff);
      if (initialDetails.date) setDate(initialDetails.date);
      if (initialDetails.time) setTime(initialDetails.time);
      if (initialDetails.serviceType) setServiceType(initialDetails.serviceType);
      if (initialDetails.vehicleId) setVehicleId(initialDetails.vehicleId);
      if (initialDetails.seniorAssistance !== undefined) setSeniorAssistance(initialDetails.seniorAssistance);
      if (initialDetails.childSeatRequired !== undefined) setChildSeatRequired(initialDetails.childSeatRequired);
      if (initialDetails.quietRide !== undefined) setQuietRide(initialDetails.quietRide);
    }
  }, [initialDetails]);

  if (!isOpen) return null;

  const selectedVehicle = VEHICLE_OPTIONS.find(v => v.id === vehicleId) || VEHICLE_OPTIONS[0];
  const estimatedPrice = initialDetails?.estimatedPrice || (
    Math.round(68 * selectedVehicle.multiplier) + (seniorAssistance ? 12 : 0) + (childSeatRequired ? 10 : 0)
  );

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Please provide passenger full name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid contact email is required';
    if (!phone.trim()) errs.phone = 'Mobile phone is required for chauffeur coordination';
    return errs;
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const refCode = `VERA-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear().toString().slice(-2)}`;
    setBookingRef(refCode);
    setStep('confirmed');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookingRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className={`glass-panel-elevated rounded-3xl w-full border border-white shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 ${
          step === 'confirmed' ? 'max-w-3xl' : 'max-w-xl'
        }`}
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0E4E8] bg-[#FAF2F5]/80">
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal font-display text-[#2A222B]">VERA Chauffeur Reservation</span>
            <span className="text-xs text-[#3E6554] font-semibold flex items-center gap-1 bg-[#EDF5F1] px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3" />
              100% Female Crew
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8C7D8E] hover:text-[#2A222B] hover:bg-white/80 rounded-full transition-colors"
            aria-label="Close Booking Dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleConfirm} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* Journey Summary Banner */}
            <div className="p-4 glass-panel rounded-2xl text-xs space-y-2.5 border border-white">
              <div className="flex items-center justify-between font-semibold text-[#2A222B] pb-2 border-b border-[#EFE7EB]">
                <span className="capitalize">{serviceType} Service Tier · {selectedVehicle.name}</span>
                <span className="text-base font-mono font-bold text-[#782846] tabular-nums">${estimatedPrice}.00</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#5D5262]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#782846] shrink-0" />
                  <span className="truncate">From: <strong>{pickup}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#3E6554] shrink-0" />
                  <span className="truncate">To: <strong>{dropoff}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#8C7D8E] shrink-0" />
                  <span>Date: <strong>{date}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8C7D8E] shrink-0" />
                  <span>Time: <strong>{time}</strong></span>
                </div>
              </div>
            </div>

            {/* Passenger Identification */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A222B]">
                1. Passenger Contact Information
              </h4>

              <div>
                <label className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                  Passenger Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C7D8E] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Margaret Vance or Sarah Miller"
                    className={`w-full pl-9 pr-3 py-2.5 text-xs bg-white/80 border rounded-xl focus:outline-none focus:ring-1 ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-[#ECE2E6] focus:border-[#782846]'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-[10px] text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                    Email for Itinerary & Tracking *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C7D8E] absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="margaret@domain.com"
                      className={`w-full pl-9 pr-3 py-2.5 text-xs bg-white/80 border rounded-xl focus:outline-none focus:ring-1 ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-[#ECE2E6] focus:border-[#782846]'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                    Mobile Phone for Driver SMS *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C7D8E] absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 345-6789"
                      className={`w-full pl-9 pr-3 py-2.5 text-xs bg-white/80 border rounded-xl focus:outline-none focus:ring-1 ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-[#ECE2E6] focus:border-[#782846]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Chauffeur Preference */}
            <div>
              <label className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                Preferred Chauffeur Match
              </label>
              <select
                value={preferredChauffeur}
                onChange={(e) => setPreferredChauffeur(e.target.value)}
                className="w-full p-2.5 text-xs bg-white/80 border border-[#ECE2E6] rounded-xl focus:border-[#782846]"
              >
                <option value="any">First Available Vetted Female Chauffeur</option>
                <option value="tanya">Tanya Vance-Morales (Senior Executive Specialist)</option>
                <option value="brenda">Brenda Chen, RN (Senior Care & Mobility Lead)</option>
                <option value="amara">Amara Diallo (Student & Family Seat Specialist)</option>
              </select>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-[11px] font-semibold text-[#5D5262] mb-1">
                Special Care & Boarding Instructions
              </label>
              <textarea
                rows={2}
                value={passengerNotes}
                onChange={(e) => setPassengerNotes(e.target.value)}
                placeholder="e.g. Ring Apt 4B upon arrival, passenger uses a rollator walker, flight UA1403, or daughter waiting at door..."
                className="w-full p-2.5 text-xs bg-white/80 border border-[#ECE2E6] rounded-xl focus:border-[#782846]"
              />
            </div>

            {/* Protocol checklist */}
            <div className="p-3.5 glass-panel rounded-xl text-xs space-y-1.5 text-[#5D5262] border border-white">
              <div className="font-semibold text-[#2A222B]">The VERA Promise:</div>
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6554] shrink-0" />
                <span>Zero surge pricing applied to this reservation.</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6554] shrink-0" />
                <span>Chauffeur will remain until passenger is safely inside destination.</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-[#782846] hover:bg-[#601F37] text-white font-bold rounded-full text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg hover:shadow-[#782846]/20"
              >
                Confirm & Dispatch Chauffeur
              </button>
              <p className="text-[10px] text-[#8C7D8E] text-center mt-2">
                Card pre-authorization held; charged only upon safe completion of journey.
              </p>
            </div>

          </form>
        ) : (
          <div className="p-8 text-center space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="w-14 h-14 bg-[#EDF5F1] text-[#3E6554] rounded-full flex items-center justify-center mx-auto border border-[#D5E6DC]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#782846] font-semibold block mb-1">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl font-normal font-display text-[#2A222B]">
                Your Chauffeur Is Locked In
              </h3>
              <p className="text-xs text-[#7B6E7D] mt-1">
                A confirmation voucher and live GPS telemetry link have been issued.
              </p>
            </div>

            {/* Voucher Box */}
            <div className="p-5 glass-panel rounded-2xl text-left space-y-3 border border-white">
              <div className="flex items-center justify-between pb-2 border-b border-[#EFE7EB]">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7D8E] block">Booking Reference</span>
                  <span className="text-base font-mono font-bold text-[#782846]">{bookingRef}</span>
                </div>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-xs text-[#782846] hover:text-[#5B1B33] p-1.5 rounded-lg bg-white/70"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-[#3E6554]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRef ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="text-xs space-y-1.5 text-[#483B4B]">
                <div><strong>Passenger:</strong> {fullName}</div>
                <div><strong>Pickup:</strong> {pickup}</div>
                <div><strong>Destination:</strong> {dropoff}</div>
                <div><strong>Schedule:</strong> {date} at {time}</div>
                <div><strong>Chauffeur Protocol:</strong> {serviceType.toUpperCase()} (100% Female Fleet)</div>
                <div><strong>Total Flat Fare:</strong> ${estimatedPrice}.00 USD</div>
              </div>
            </div>

            {/* Live Real-Time ETA Map Visualization */}
            <div className="text-left space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#2A222B] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#782846] animate-ping" />
                  Live GPS Dispatch Telemetry & ETA
                </span>
                <span className="text-[11px] text-[#782846] font-mono font-semibold">Real-Time Tracking Active</span>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm">
                <LiveTrackingMap
                  bookingRef={bookingRef}
                  passengerName={fullName}
                  pickupAddress={pickup}
                  dropoffAddress={dropoff}
                  serviceTier={serviceType}
                  vehicleName={selectedVehicle.name}
                  chauffeurId={preferredChauffeur === 'brenda' ? 'c2' : preferredChauffeur === 'amara' ? 'c3' : 'c1'}
                />
              </div>
            </div>

            <div className="p-3 bg-[#EDF5F1] border border-[#D5E6DC] rounded-xl text-xs text-[#2A483B] text-left flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#3E6554] shrink-0 mt-0.5" />
              <div>
                <strong>SMS Dispatch Notification:</strong> Chauffeur photo, vehicle tag, and license will be sent to <strong>{phone}</strong> 30 minutes prior to departure.
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-[#782846] hover:bg-[#601F37] text-white text-xs font-semibold rounded-full transition-all shadow-sm"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
