import { useState } from 'react';
import { HeartHandshake, Briefcase, GraduationCap, Baby, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceType } from '../types';

interface PillarsSectionProps {
  onSelectService: (service: ServiceType) => void;
}

export function PillarsSection({ onSelectService }: PillarsSectionProps) {
  const [activeTab, setActiveTab] = useState<ServiceType>('senior');

  const pillars = [
    {
      id: 'senior' as ServiceType,
      number: '01',
      title: 'Senior Independence & Medical Escort',
      target: 'Older Adults & Daughters/Caregivers',
      tagline: 'True door-through-door physical accompaniment, never just curbside dropping.',
      description: 'Preserve dignity and autonomy for older women attending therapy, dialysis, ophthalmology appointments, or social visits. Our certified chauffeurs offer gentle arm support, walk with passengers from their living room to clinic reception, stow walkers safely, and wait patiently on-site.',
      image: '/src/assets/images/senior_mobility_assist_1790267749030.jpg',
      icon: HeartHandshake,
      protocols: [
        'Door-through-door arm assistance across stairs and thresholds',
        'Stowage and secure handling of folding wheelchairs and rollators',
        'Automated real-time SMS arrival alerts to adult daughters and family',
        'Wait-and-return standby for medical appointments and procedures',
      ],
      idealFor: 'Ages 65+ · Physical therapy · Dialysis & eye care · Social visiting',
    },
    {
      id: 'executive' as ServiceType,
      number: '02',
      title: 'Executive & Late-Night Shift Transit',
      target: 'Working Professionals, Physicians & Executives',
      tagline: 'Psychological safety and pristine discretion when your schedule extends past midnight.',
      description: 'Designed for female physicians, surgeons, attorneys, consultants, and travelers arriving on delayed late-night flights. Avoid the vulnerability of unvetted parking garages and erratic rideshare drivers. Step into a tranquil, secure cabin where you can either work in silent peace or decompress completely.',
      image: '/src/assets/images/interior_comfort_commute_1790267766055.jpg',
      icon: Briefcase,
      protocols: [
        'Curbside waiting inside private staff bays or terminal arrivals',
        'Strict "Quiet Cabin" protocol with charging docks and fast Wi-Fi',
        'Automated real-time flight tracking for unexpected gate delays',
        'Chauffeur waits with high-beams illuminated until you enter home safely',
      ],
      idealFor: 'Ages 25–60 · Night shifts · Red-eye flights · Board meetings',
    },
    {
      id: 'student' as ServiceType,
      number: '03',
      title: 'Student & Young Adult Safe Commute',
      target: 'University Students & Young Women',
      tagline: 'Consistent, verified campus mobility without late-night walking hazards.',
      description: 'Navigating college campuses, evening labs, internships, and weekend transit can feel daunting. VERA provides a trusted female chauffeur network with two-way guardian PIN confirmation, designated pick-up corridors, and zero surge pricing regardless of bad weather or high demand.',
      image: '/src/assets/images/chauffeur_team_fleet_1790267781382.jpg',
      icon: GraduationCap,
      protocols: [
        'Mandatory two-way PIN verification before entering vehicle',
        'Live journey GPS tracking link shareable with parents or roommates',
        'Designated safe-zone pick-up spots at campus dorms and libraries',
        'Zero surge pricing during campus rush hours or late rainstorms',
      ],
      idealFor: 'Ages 16–25 · Evening campus labs · Inter-city travel · Internships',
    },
    {
      id: 'family' as ServiceType,
      number: '04',
      title: 'Family, Maternity & Multi-Stop Care',
      target: 'Mothers, Infants & Multi-Generational Groups',
      tagline: 'Certified child seats pre-installed and extra hands for baggage and strollers.',
      description: 'Traveling with children or multi-generational family members shouldn’t require wrestling with heavy car seats or wondering if your driver has patience. Our spacious SUVs arrive with sanitized, NHTSA-inspected Britax seats pre-installed, luggage assistance, and plenty of room for all family essentials.',
      image: '/src/assets/images/hero_driver_executive_1790267729722.jpg',
      icon: Baby,
      protocols: [
        'Pre-installed and inspected infant, convertible, or booster seats',
        'Multi-stop scheduling for school drop-offs and family errands',
        'Chauffeur assists with strollers, diaper bags, and heavy parcels',
        'Gentle acceleration and braking tailored for infants and elder relatives',
      ],
      idealFor: 'Mothers with infants · Multi-generation outings · School runs',
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-to-b from-[#FAF7F5] via-[#FBF9F7] to-[#FAF7F5] border-b border-[#EFE7EB] relative">
      
      {/* Soft pastel ambient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#E8D7DE]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/80 text-[11px] font-semibold uppercase tracking-widest text-[#782846] mb-3">
            <span>The Generational Spectrum</span>
            <span aria-hidden="true">·</span>
            <span>Tailored Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2A222B] font-display tracking-tight leading-tight">
            Designed for women across every chapter of <span className="italic font-medium text-[#782846]">life and independence</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5D5262] leading-relaxed">
            Transportation needs change gracefully throughout a woman's life. We refuse an impersonal one-size-fits-all approach. Every journey is customized with physical patience, empathy, and calibrated safety.
          </p>
        </div>

        {/* Interactive Segmented Selector in frosted glass pill bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-2 glass-panel rounded-2xl mb-12 border border-white/80">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activeTab === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-white/95 text-[#2A222B] shadow-sm font-semibold border border-white'
                    : 'text-[#6B5E6D] hover:text-[#2A222B] hover:bg-white/50 font-medium'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-[#782846] text-white shadow-2xs' : 'bg-[#F2EAEF] text-[#782846]'}`}>
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-[#9A8C9C] font-mono tabular-nums uppercase tracking-wider">{pillar.number}</div>
                  <div className="text-xs sm:text-sm truncate">{pillar.title.split('&')[0]}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detailed View: Elegant glass card */}
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 lg:p-12 border border-white shadow-xl relative overflow-hidden">
          
          {/* Subtle rose water glow in card corner */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#F6DEE7]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Information Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#782846] uppercase tracking-wider mb-2">
                  <span>Pillar {currentPillar.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentPillar.target}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-[#2A222B] font-display">
                  {currentPillar.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base font-medium text-[#782846]">
                  {currentPillar.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#5D5262] leading-relaxed font-normal">
                {currentPillar.description}
              </p>

              {/* Protocol List */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2A222B] mb-3">
                  Service Standards & In-Cabin Protocol
                </div>
                <ul className="space-y-2.5">
                  {currentPillar.protocols.map((protocol, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#483B4B]">
                      <CheckCircle2 className="w-4 h-4 text-[#3E6554] shrink-0 mt-0.5" />
                      <span>{protocol}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unboxed Metadata & CTA */}
              <div className="pt-4 border-t border-[#EFE7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[#7B6E7D]">
                  <span className="font-semibold text-[#2A222B]">Ideal For: </span>
                  <span>{currentPillar.idealFor}</span>
                </div>

                <button
                  onClick={() => onSelectService(currentPillar.id)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#782846] hover:bg-[#601F37] text-white text-xs font-semibold rounded-full tracking-wider uppercase transition-all shadow-sm hover:shadow-md hover:shadow-[#782846]/20 whitespace-nowrap self-start sm:self-auto"
                >
                  <span>Select Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F3CBD7]" />
                </button>
              </div>

            </div>

            {/* Media Column with mirror rounded frame */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/80 shadow-lg bg-[#271926]">
                <img
                  src={currentPillar.image}
                  alt={currentPillar.title}
                  className="w-full aspect-[4/3] object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#271926]/90 via-[#271926]/30 to-transparent p-5 sm:p-6 text-white">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#F3CBD7]">
                    Certified Chauffeur Guarantee
                  </div>
                  <div className="text-sm font-medium mt-1 text-[#F7EEF2]">
                    Unrushed, polite, and deeply attuned to your comfort.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
