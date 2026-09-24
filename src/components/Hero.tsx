import { Check } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreCalculator: () => void;
}

export function Hero({ onOpenBooking, onExploreCalculator }: HeroProps) {
  const scrollToServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onExploreCalculator();
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-[#FAF7F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Two-column layout matching reference: Left Text/Buttons/Checklist & Right Rounded Square Illustration */}
        {/* Strictly side-by-side horizontally starting from md: viewport upwards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT SIDE: Headline, paragraph, CTA buttons, and checklist */}
          <div className="w-full flex flex-col justify-center space-y-6 lg:space-y-7 md:pr-2 lg:pr-6">
            
            {/* Main Headline matching reference bold condensed display feel */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-[#1F1924] tracking-tight leading-[1.08] font-display">
              Learning to drive,<br />
              <span className="text-[#782846]">minus the stress.</span>
            </h1>

            {/* Sub-paragraph matching reference rhythm and structure */}
            <p className="text-sm sm:text-base lg:text-lg text-[#5E5160] leading-relaxed font-normal max-w-xl">
              Patient instructors, dual-control cars, and lessons built around your week — not ours. Request a vetted female instructor when you book, no awkward conversation needed.
            </p>

            {/* Buttons: Primary Pill & Secondary Outlined Pill with subtle lift & scale on hover */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#782846] hover:bg-[#601F37] active:bg-[#4D182B] rounded-full shadow-sm hover:shadow-lg hover:shadow-[#782846]/20 hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-0 active:scale-100 transition-all duration-200 ease-out cursor-pointer whitespace-nowrap"
              >
                Book your first lesson
              </button>

              <button
                type="button"
                onClick={scrollToServices}
                className="inline-flex items-center justify-center px-5 sm:px-7 py-3.5 text-xs sm:text-sm font-semibold text-[#2A222B] bg-transparent hover:bg-white/80 active:bg-white border border-[#D9CDD3] hover:border-[#C4B3BC] rounded-full shadow-2xs hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-0 active:scale-100 transition-all duration-200 ease-out cursor-pointer whitespace-nowrap"
              >
                See how it works
              </button>
            </div>

            {/* Checklist with checkmark icons matching reference 2-column list */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 lg:gap-x-6 text-xs sm:text-sm font-medium text-[#2A222B]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2A222B] stroke-[2.5] shrink-0" />
                <span>Certified approved instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2A222B] stroke-[2.5] shrink-0" />
                <span>Female instructors available</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <Check className="w-4 h-4 text-[#2A222B] stroke-[2.5] shrink-0" />
                <span>4.9 average rating</span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Large rounded container housing the soft pastel vector artwork side-by-side */}
          <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-[480px] lg:max-w-[540px] aspect-square rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-sm border border-[#EBE1E6] bg-[#FAF3F5]">
              <img
                src="/src/assets/images/woman_girl_driving_1790269103559.jpg"
                alt="Vector illustration in soft pastel tones of a woman driving with a girl sitting beside her"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

        {/* Claim-to-Proof Adjacency Row in soft glass containers */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-[#EFE7EB]">
          <div className="glass-panel p-5 rounded-2xl space-y-1 border border-white">
            <div className="text-3xl sm:text-4xl font-normal text-[#782846] font-display tabular-nums">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#382C3A]">
              Female Chauffeur Corps
            </div>
            <p className="text-xs text-[#7E7081]">Zero exceptions or outsourced third-party drivers.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl space-y-1 border border-white">
            <div className="text-3xl sm:text-4xl font-normal text-[#782846] font-display tabular-nums">
              480,000+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#382C3A]">
              Care Rides Completed
            </div>
            <p className="text-xs text-[#7E7081]">Across driving lessons, clinics, airports, and schools.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl space-y-1 border border-white">
            <div className="text-3xl sm:text-4xl font-normal text-[#782846] font-display tabular-nums">
              7-Year
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#382C3A]">
              Background & Telemetry Audit
            </div>
            <p className="text-xs text-[#7E7081]">Continuous DMV records and safety monitoring.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl space-y-1 border border-white">
            <div className="text-3xl sm:text-4xl font-normal text-[#782846] font-display tabular-nums">
              99.8%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-[#382C3A]">
              Punctual & Safe Completion
            </div>
            <p className="text-xs text-[#7E7081]">Dedicated flight monitoring and door escort standards.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
