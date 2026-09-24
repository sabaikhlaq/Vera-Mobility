import { ShieldCheck, UserCheck, Radio, FileCheck, Stethoscope, AlertTriangle, Check, Sparkles } from 'lucide-react';

export function SafetySection() {
  const vettingSteps = [
    {
      number: '01',
      title: '7-Year Criminal & Multi-Jurisdictional Vetting',
      description: 'Comprehensive screening across federal, state, and county registries with continuous DMV driving telemetry. We verify zero major traffic infractions and spotless character records.',
      icon: FileCheck,
    },
    {
      number: '02',
      title: 'In-Person Interviews & Behavioral Assessment',
      description: 'We do not auto-approve applications online. Every chauffeur meets our senior female operations board for in-depth scenario evaluations, empathy, and situational de-escalation training.',
      icon: UserCheck,
    },
    {
      number: '03',
      title: 'Certified Defensive Driving & Escort Mastery',
      description: 'Mandatory completion of advanced adverse-weather defensive driving courses (Smith System) and physical accompaniment standards for passengers with mobility limitations.',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'Adult, Pediatric & Geriatric First Aid / CPR',
      description: 'Chauffeurs hold active Red Cross CPR & First Aid certification, with specialized training in recognizing signs of distress, stroke symptoms, and panic anxiety in transit.',
      icon: Stethoscope,
    },
  ];

  const comparisonRows = [
    {
      criterion: 'Driver Verification & Gender',
      standard: 'Random matching from massive gig pools; high percentage of unvetted contract drivers.',
      vera: '100% vetted professional female chauffeurs. Consistent, familiar drivers upon request.',
    },
    {
      criterion: 'Pick-Up & Arrival Protocol',
      standard: 'Curbside only; driver drives away immediately upon curbside drop-off.',
      vera: 'Door-through-door assistance. Chauffeur remains until you are safely inside your residence.',
    },
    {
      criterion: 'Pricing Predictability',
      standard: 'Surge algorithms inflate prices 2x–4x during rain, nighttime, or campus events.',
      vera: 'Guaranteed transparent, flat-rate pricing. Zero surge multipliers ever applied.',
    },
    {
      criterion: 'Elderly & Specialized Care',
      standard: 'Drivers often refuse folding walkers, lack patience, or park across the street.',
      vera: 'Trained arm-assisted boarding, patient pacing, wheelchair stowage, and clinic check-in.',
    },
    {
      criterion: 'Real-Time Family Tracking',
      standard: 'Basic app link often disjointed; no live human dispatcher available.',
      vera: 'Live dispatch desk staffed by female coordinators with direct line for family members.',
    },
  ];

  return (
    <section id="safety" className="py-20 md:py-28 bg-gradient-to-b from-[#FAF7F5] via-[#F4EDF0] to-[#FAF7F5] text-[#2A222B] relative overflow-hidden border-b border-[#EFE7EB]">
      
      {/* Soft atmospheric ambient glow */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#E8D0D9]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-[#DFE2E8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/80 text-[11px] font-semibold uppercase tracking-widest text-[#782846] mb-3">
            <span>The VERA Standard</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Integrity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-display tracking-tight text-[#2A222B] leading-tight">
            Safety is not a feature toggle. It is our entire <span className="italic font-medium text-[#782846]">operating reason</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5D5262] leading-relaxed">
            Standard rideshare was designed around algorithmic supply and dynamic surge margins. VERA was founded around one fundamental priority: creating an unshakeable sanctuary of trust, dignity, and calm for women traveling at any hour.
          </p>
        </div>

        {/* 4-Step Vetting Framework in frosted glass panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {vettingSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number} 
                className="glass-panel-elevated rounded-2xl p-6 relative flex flex-col justify-between border border-white hover:border-[#782846]/30 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-[#782846] font-bold tracking-wider">
                      STEP {step.number}
                    </span>
                    <div className="p-2.5 bg-[#FAF2F5] text-[#782846] rounded-xl border border-[#F2DEE5]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-[#2A222B] font-display mb-2.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#635766] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix: Soft frosted glass table */}
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-white shadow-xl">
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-normal font-display text-[#2A222B]">
              The Real Difference: Generic Gig Rideshare vs. VERA Chauffeured Care
            </h3>
            <p className="text-xs sm:text-sm text-[#7B6E7D] mt-1">
              Clear, transparent distinctions in passenger dignity, reliability, and human presence.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#EFE7EB] text-[#7E7081] uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-semibold w-1/4">Evaluation Point</th>
                  <th className="py-3.5 px-4 font-semibold w-3/8 text-[#A84A4A] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#C45E5E]" />
                    Generic Rideshare Apps
                  </th>
                  <th className="py-3.5 px-4 font-semibold w-3/8 text-[#782846] bg-[#FAF2F5]/70 border-l border-[#EFE7EB]">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#782846]" />
                      VERA Chauffeur Standard
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7EB]">
                {comparisonRows.map((row, index) => (
                  <tr key={index} className="hover:bg-white/40 transition-colors">
                    <td className="py-4 px-4 font-semibold text-[#2A222B] align-top">
                      {row.criterion}
                    </td>
                    <td className="py-4 px-4 text-[#665A69] align-top">
                      {row.standard}
                    </td>
                    <td className="py-4 px-4 text-[#2A222B] font-medium bg-[#FAF2F5]/60 border-l border-[#EFE7EB] align-top">
                      {row.vera}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-[#EFE7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#7B6E7D]">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#782846] animate-pulse" />
              <span>Real-time Operations Control Center monitored 24/7/365</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#2A222B]">Direct Concierge & Family Desk:</span>
              <span className="text-[#782846] font-mono tabular-nums font-bold">1-800-555-8372</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
