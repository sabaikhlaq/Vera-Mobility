import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Navigation, 
  Car, 
  User, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { CHAUFFEURS } from '../data/mockData';

// Fix leaflet default icon missing issue when bundled with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom styled HTML marker icons matching the soft feminine luxury palette
const createCarIcon = (bearing: number = 0) => L.divIcon({
  className: 'custom-car-pin',
  html: `
    <div style="
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: #782846;
      border: 2px solid #FFFFFF;
      border-radius: 50%;
      box-shadow: 0 6px 18px rgba(120,40,70,0.38);
      color: white;
      transform: rotate(${bearing}deg);
      transition: transform 0.4s ease;
    ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
        <circle cx="7" cy="17" r="2"/>
        <path d="M9 17h6"/>
        <circle cx="17" cy="17" r="2"/>
      </svg>
      <span style="
        position: absolute;
        top: -2px;
        right: -2px;
        width: 12px;
        height: 12px;
        background: #34D399;
        border: 2px solid #FFFFFF;
        border-radius: 50%;
      "></span>
    </div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

const createLocationIcon = (label: string, color: string, bg: string) => L.divIcon({
  className: 'custom-loc-pin',
  html: `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      filter: drop-shadow(0 4px 10px rgba(120,40,70,0.18));
    ">
      <div style="
        background: ${bg};
        color: ${color};
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 10px;
        font-weight: 700;
        font-family: 'Plus Jakarta Sans', sans-serif;
        letter-spacing: 0.05em;
        white-space: nowrap;
        margin-bottom: 2px;
        border: 1px solid rgba(255,255,255,0.9);
        box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      ">
        ${label}
      </div>
      <div style="
        width: 16px;
        height: 16px;
        background: ${color};
        border: 3px solid #FFFFFF;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      "></div>
    </div>
  `,
  iconSize: [70, 44],
  iconAnchor: [35, 44],
});

const ROUTE_COORDINATES: [number, number][] = [
  [37.7749, -122.4194],
  [37.7712, -122.4140],
  [37.7668, -122.4080],
  [37.7610, -122.4035],
  [37.7530, -122.4002],
  [37.7425, -122.3980],
  [37.7310, -122.3940],
  [37.7180, -122.3895],
  [37.7020, -122.3860],
  [37.6850, -122.3875],
  [37.6680, -122.3930],
  [37.6490, -122.4010],
  [37.6320, -122.3965],
  [37.6213, -122.3790],
];

function calculateBearing(startLat: number, startLng: number, destLat: number, destLng: number) {
  const startLatRad = (startLat * Math.PI) / 180;
  const startLngRad = (startLng * Math.PI) / 180;
  const destLatRad = (destLat * Math.PI) / 180;
  const destLngRad = (destLng * Math.PI) / 180;

  const y = Math.sin(destLngRad - startLngRad) * Math.cos(destLatRad);
  const x =
    Math.cos(startLatRad) * Math.sin(destLatRad) -
    Math.sin(startLatRad) * Math.cos(destLatRad) * Math.cos(destLngRad - startLngRad);
  let brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

function MapRecenter({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.panTo(position, { animate: true, duration: 0.8 });
  }, [position, map]);
  return null;
}

interface LiveTrackingMapProps {
  bookingRef?: string;
  passengerName?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  serviceTier?: string;
  vehicleName?: string;
  chauffeurId?: string;
  onClose?: () => void;
}

export function LiveTrackingMap({
  bookingRef = 'VERA-8492-26',
  passengerName = 'Katherine Sterling',
  pickupAddress = 'Downtown Financial Center (100 Montgomery St)',
  dropoffAddress = 'International Terminal 2, Executive Departure',
  serviceTier = 'Executive Shift & Airport',
  vehicleName = 'Lexus ES 300h (Clean Hybrid)',
  chauffeurId = 'c1',
  onClose
}: LiveTrackingMapProps) {
  const [progress, setProgress] = useState(0.28);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [statusMessage, setStatusMessage] = useState('Chauffeur en route to pickup');

  const chauffeur = useMemo(() => {
    return CHAUFFEURS.find(c => c.id === chauffeurId) || CHAUFFEURS[0];
  }, [chauffeurId]);

  const { currentPosition, bearing, etaMinutes, distanceRemainingMiles } = useMemo(() => {
    const totalSegments = ROUTE_COORDINATES.length - 1;
    const scaledProgress = Math.min(Math.max(progress, 0), 1) * totalSegments;
    const segmentIndex = Math.min(Math.floor(scaledProgress), totalSegments - 1);
    const segmentProgress = scaledProgress - segmentIndex;

    const p1 = ROUTE_COORDINATES[segmentIndex];
    const p2 = ROUTE_COORDINATES[segmentIndex + 1];

    const lat = p1[0] + (p2[0] - p1[0]) * segmentProgress;
    const lng = p1[1] + (p2[1] - p1[1]) * segmentProgress;

    const calculatedBearing = calculateBearing(p1[0], p1[1], p2[0], p2[1]);

    const remainingFraction = 1 - progress;
    const estMiles = +(18.4 * remainingFraction).toFixed(1);
    const estMins = Math.max(1, Math.round(32 * remainingFraction));

    return {
      currentPosition: [lat, lng] as [number, number],
      bearing: calculatedBearing,
      etaMinutes: estMins,
      distanceRemainingMiles: estMiles,
    };
  }, [progress]);

  useEffect(() => {
    if (progress < 0.35) {
      setStatusMessage('En route to designated passenger pickup point');
    } else if (progress < 0.40) {
      setStatusMessage('Arrived at pickup: Chauffeur standing by with vehicle door open');
    } else if (progress < 0.90) {
      setStatusMessage('Passenger safely on board · Smooth highway transit in progress');
    } else if (progress < 0.98) {
      setStatusMessage('Approaching drop-off corridor: Preparing luggage assistance');
    } else {
      setStatusMessage('Arrived safely at destination: Chauffeur escorting to entrance');
    }
  }, [progress]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return prev + 0.002 * speedMultiplier;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, speedMultiplier]);

  const pickupPoint = ROUTE_COORDINATES[0];
  const dropoffPoint = ROUTE_COORDINATES[ROUTE_COORDINATES.length - 1];

  const coveredCoordinates = useMemo(() => {
    const totalSegments = ROUTE_COORDINATES.length - 1;
    const scaledProgress = progress * totalSegments;
    const segmentIndex = Math.min(Math.floor(scaledProgress), totalSegments - 1);
    
    const slice = ROUTE_COORDINATES.slice(0, segmentIndex + 1);
    slice.push(currentPosition);
    return slice;
  }, [progress, currentPosition]);

  return (
    <div className="glass-panel-elevated rounded-3xl border border-white shadow-2xl overflow-hidden flex flex-col">
      
      {/* Real-time Status Header: Soft frosted glass header */}
      <div className="bg-[#FAF2F5]/90 backdrop-blur-md p-5 sm:p-6 border-b border-[#F0E4E8]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#782846] mb-1">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#782846] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#782846]"></span>
              </span>
              <span>Live Vehicle Telemetry</span>
              <span aria-hidden="true">·</span>
              <span>Ref: {bookingRef}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-normal font-display text-[#2A222B]">
              Estimated Arrival in <span className="text-[#782846] font-medium font-mono tabular-nums">{etaMinutes} mins</span>
            </h3>
            <p className="text-xs text-[#6B5E6D] mt-0.5">
              {distanceRemainingMiles} miles remaining · {statusMessage}
            </p>
          </div>

          {/* Telemetry quick badges in glass pills */}
          <div className="flex items-center gap-2.5">
            <div className="glass-panel px-3.5 py-2 rounded-2xl text-right border border-white">
              <div className="text-[10px] text-[#8C7D8E] uppercase tracking-wider font-semibold">Speed / Pacing</div>
              <div className="text-xs font-mono font-bold text-[#2A222B] tabular-nums">46 mph / Smooth</div>
            </div>
            <div className="glass-panel px-3.5 py-2 rounded-2xl text-right border border-white">
              <div className="text-[10px] text-[#8C7D8E] uppercase tracking-wider font-semibold">Security State</div>
              <div className="text-xs font-semibold text-[#3E6554] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative h-[380px] sm:h-[440px] w-full bg-[#F4EFEA]">
        <MapContainer
          center={currentPosition}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <MapRecenter position={currentPosition} />

          {/* Planned full route track: Soft lavender/gray */}
          <Polyline
            positions={ROUTE_COORDINATES}
            pathOptions={{
              color: '#BFA8B3',
              weight: 4,
              opacity: 0.5,
              dashArray: '6, 8',
            }}
          />

          {/* Completed route track: Bold plum brand line */}
          <Polyline
            positions={coveredCoordinates}
            pathOptions={{
              color: '#782846',
              weight: 5,
              opacity: 0.95,
            }}
          />

          {/* Pickup Marker */}
          <Marker
            position={pickupPoint}
            icon={createLocationIcon('PICKUP', '#782846', '#FFFFFF')}
          >
            <Popup>
              <div className="text-xs">
                <strong>Pickup Point:</strong><br />
                {pickupAddress}
              </div>
            </Popup>
          </Marker>

          {/* Dropoff Marker */}
          <Marker
            position={dropoffPoint}
            icon={createLocationIcon('DESTINATION', '#3E6554', '#FFFFFF')}
          >
            <Popup>
              <div className="text-xs">
                <strong>Destination:</strong><br />
                {dropoffAddress}
              </div>
            </Popup>
          </Marker>

          {/* Live Moving Vehicle Marker */}
          <Marker
            position={currentPosition}
            icon={createCarIcon(bearing)}
          >
            <Popup>
              <div className="text-xs">
                <strong>Chauffeur:</strong> {chauffeur.name}<br />
                <strong>Vehicle:</strong> {vehicleName}<br />
                <strong>ETA:</strong> {etaMinutes} mins ({distanceRemainingMiles} mi)
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Floating Quick Action Overlay on Map with soft frosted glass */}
        <div className="absolute top-4 left-4 z-[400] glass-panel-elevated rounded-2xl p-3 border border-white max-w-xs text-xs space-y-1.5 hidden sm:block">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#782846] animate-pulse" />
            <span className="font-semibold text-[#2A222B]">Live GPS Stream Synchronized</span>
          </div>
          <div className="text-[#6B5E6D] leading-tight text-[11px]">
            Encrypted telemetry feed directly linked to local female dispatch operations.
          </div>
        </div>

        {/* Playback simulation controls bar in frosted glass */}
        <div className="absolute bottom-4 left-4 right-4 z-[400] glass-dark rounded-2xl p-3 text-white flex flex-wrap items-center justify-between gap-3 text-xs shadow-xl border border-white/15">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
              title={isPlaying ? "Pause simulation" : "Play simulation"}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-[#F3CBD7]" /> : <Play className="w-4 h-4 text-[#8BE4BC]" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setProgress(0);
                setIsPlaying(true);
              }}
              className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
              title="Reset route to beginning"
            >
              <RotateCcw className="w-4 h-4 text-[#D8CAD2]" />
            </button>

            <div className="flex items-center gap-1.5 text-[11px] text-[#D8CAD2]">
              <span>Speed:</span>
              {[1, 2, 4].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeedMultiplier(s)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    speedMultiplier === s ? 'bg-[#782846] text-white font-bold' : 'bg-white/10 text-[#D8CAD2] hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#D8CAD2]">Trip Progress:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={progress}
              onChange={(e) => {
                setProgress(parseFloat(e.target.value));
              }}
              className="w-24 sm:w-32 accent-[#F3CBD7]"
            />
            <span className="font-mono font-bold text-white text-[11px] tabular-nums">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Driver Card & Safety Confirmation Footer */}
      <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-md border-t border-[#F0E4E8] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Driver identity */}
        <div className="md:col-span-5 flex items-center gap-4">
          <div className="w-13 h-13 rounded-full bg-[#782846] text-white flex items-center justify-center font-display font-bold text-base border-2 border-white shadow-sm shrink-0">
            {chauffeur.initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm text-[#2A222B] font-display">{chauffeur.name}</h4>
              <span className="text-[10px] font-semibold bg-[#EDF5F1] text-[#3E6554] px-2.5 py-0.5 rounded-full border border-[#D5E6DC]">
                Verified Chauffeur
              </span>
            </div>
            <div className="text-xs text-[#6B5E6D] mt-0.5">{chauffeur.role} · 5.0 ★</div>
            <div className="text-[11px] text-[#8C7D8E] mt-0.5">Vehicle: <strong>{vehicleName}</strong> (Lic. #4VRM892)</div>
          </div>
        </div>

        {/* Security code & direct contact */}
        <div className="md:col-span-4 flex items-center gap-3">
          <div className="glass-panel rounded-2xl p-2.5 flex-1 border border-white text-center">
            <div className="text-[10px] uppercase tracking-wider text-[#8C7D8E] font-semibold">Boarding PIN</div>
            <div className="text-lg font-mono font-bold text-[#782846] tracking-widest mt-0.5">4829</div>
          </div>
          <a
            href="tel:18005558372"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-[#FAF2F5] border border-[#F0E4E8] rounded-2xl text-xs font-semibold text-[#2A222B] transition-colors shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#782846]" />
            <span>Call Driver</span>
          </a>
        </div>

        {/* Share GPS Link with Family */}
        <div className="md:col-span-3 text-right">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Live tracking link copied to clipboard. Share with family or emergency contacts.');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#782846] hover:bg-[#601F37] text-white text-xs font-semibold rounded-full transition-all shadow-sm hover:shadow-md hover:shadow-[#782846]/20"
          >
            <span>Share with Family</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#F3CBD7]" />
          </button>
        </div>

      </div>

    </div>
  );
}
