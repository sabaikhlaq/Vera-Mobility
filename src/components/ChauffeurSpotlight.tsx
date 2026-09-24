import { Star, CheckCircle, ShieldCheck, UserCheck, Heart } from 'lucide-react';
import { CHAUFFEURS } from '../data/mockData';

export function ChauffeurSpotlight() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#FAF7F5] via-[#FBF9F8] to-[#FAF7F5] border-b border-[#EFE7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/80 text-[11px] font-semibold uppercase tracking-widest text-[#782846] mb-3">
            <span>Career Chauffeurs</span>
            <span aria-hidden="true">·</span>
            <span>Never Casual Gig Labor</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2A222B] font-display tracking-tight leading-tight">
            Meet the professional women behind <span className="italic font-medium text-[#782846]">your journey</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5D5262] leading-relaxed font-normal">
            Our chauffeurs are certified career drivers, former healthcare responders, and trained executive specialists. Average driving experience exceeds 9 years with unblemished safety records.
          </p>
        </div>

        {/* Chauffeur Grid with Frosted Glass Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CHAUFFEURS.map((chauffeur) => (
            <div
              key={chauffeur.id}
              className="glass-panel-elevated rounded-3xl p-7 sm:p-8 flex flex-col justify-between border border-white hover:border-[#782846]/40 transition-all shadow-md group"
            >
              <div>
                {/* Header with Monogram Badge & Rating */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-full bg-[#782846] text-white flex items-center justify-center font-display font-medium text-lg tracking-wider border-2 border-white shadow-sm">
                    {chauffeur.initials}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2A222B] bg-white/80 border border-white px-3 py-1 rounded-full shadow-2xs">
                    <Star className="w-3.5 h-3.5 fill-[#782846] text-[#782846]" />
                    <span className="tabular-nums font-bold">{chauffeur.rating.toFixed(2)}</span>
                    <span className="text-[#8C7D8E] font-normal">({chauffeur.completedRides.toLocaleString()})</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-normal text-[#2A222B] font-display">
                    {chauffeur.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#782846] mt-0.5">
                    {chauffeur.role}
                  </div>
                  <div className="text-xs text-[#7B6E7D] mt-1 flex items-center gap-2">
                    <span>{chauffeur.experienceYears} Years Chauffeur</span>
                    <span aria-hidden="true">·</span>
                    <span>{chauffeur.specialty}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5D5262] leading-relaxed mb-6 font-normal">
                  "{chauffeur.bio}"
                </p>

                {/* Certifications List */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#2A222B]">
                    Verified Certifications:
                  </div>
                  {chauffeur.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-[#483B4B]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#3E6554] shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Verification Seal */}
              <div className="pt-4 border-t border-[#EFE7EB] flex items-center justify-between text-[11px] text-[#7B6E7D]">
                <div className="flex items-center gap-1.5 text-[#3E6554] font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Annual Clearance Valid</span>
                </div>
                <span className="text-[#782846] font-medium">Req. Preferred Driver</span>
              </div>

            </div>
          ))}
        </div>

        {/* Recurring schedule banner with mirror glass */}
        <div className="mt-12 p-6 glass-panel rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white text-[#782846] rounded-xl shadow-2xs border border-[#F2DEE5]">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#2A222B]">Looking to match a recurring chauffeur for your mother or daughter?</div>
              <div className="text-xs text-[#5D5262]">You can link regular weekly schedules to familiar drivers for peace of mind.</div>
            </div>
          </div>
          <a
            href="#estimator"
            className="text-xs font-semibold text-[#782846] hover:text-[#5B1B33] flex items-center gap-1.5 whitespace-nowrap self-start sm:self-auto bg-[#FAF2F5] px-4 py-2 rounded-full border border-[#F2DEE5]"
          >
            <span>Configure recurring schedule</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}
