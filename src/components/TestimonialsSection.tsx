import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export function TestimonialsSection() {
  return (
    <section id="stories" className="py-20 md:py-28 bg-gradient-to-b from-[#FAF7F5] via-[#F6EEF2] to-[#FAF7F5] border-b border-[#EFE7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/80 text-[11px] font-semibold uppercase tracking-widest text-[#782846] mb-3">
            <span>Verified Passenger Experiences</span>
            <span aria-hidden="true">·</span>
            <span>Real Accounts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2A222B] font-display tracking-tight leading-tight">
            Trusted by daughters, mothers, executives, and <span className="italic font-medium text-[#782846]">students alike</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5D5262] leading-relaxed font-normal">
            Safety isn't an abstract metric. It is the palpable relief of arriving home without friction, guided by professionals who treat your time and dignity as sacred.
          </p>
        </div>

        {/* Testimonials Grid with Frosted Glass Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-panel-elevated rounded-3xl p-8 flex flex-col justify-between border border-white shadow-md hover:border-[#782846]/30 transition-all group"
            >
              <div>
                {/* Clean unboxed metadata header */}
                <div className="flex items-center justify-between text-xs text-[#7B6E7D] pb-4 mb-4 border-b border-[#EFE7EB]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#782846]">{t.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{t.rideType}</span>
                  </div>
                  <div className="flex items-center text-[#782846]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#782846]" />
                    ))}
                  </div>
                </div>

                {/* Quote with elegant serif feel */}
                <p className="text-sm sm:text-base text-[#382D3B] leading-relaxed font-normal mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-[#EFE7EB] flex items-center justify-between">
                <div>
                  <div className="font-display font-medium text-base text-[#2A222B]">
                    {t.author}
                  </div>
                  <div className="text-xs text-[#7B6E7D] mt-0.5">
                    {t.ageAndRole}
                  </div>
                </div>
                <div className="text-right text-xs text-[#9A8B9C]">
                  {t.location}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Adjacent Proof Strip with Frosted Glass */}
        <div className="mt-12 p-6 glass-panel rounded-2xl flex flex-wrap items-center justify-around gap-6 text-xs text-[#5D5262] border border-white">
          <div>
            <span className="font-normal text-[#782846] font-display text-2xl block">4.99 / 5.0</span>
            <span className="text-[#7B6E7D]">Average Chauffeur Quality Rating</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-[#EFE7EB]" />
          <div>
            <span className="font-normal text-[#782846] font-display text-2xl block">87%</span>
            <span className="text-[#7B6E7D]">Monthly Commuter Retention</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-[#EFE7EB]" />
          <div>
            <span className="font-normal text-[#782846] font-display text-2xl block">Zero</span>
            <span className="text-[#7B6E7D]">Safety Incidents in 5+ Operating Years</span>
          </div>
        </div>

      </div>
    </section>
  );
}
