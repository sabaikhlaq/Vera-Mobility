import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/mockData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#FAF7F5] border-b border-[#EFE7EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/80 text-[11px] font-semibold uppercase tracking-widest text-[#782846] mb-3">
            <span>Clarity & Policies</span>
            <span aria-hidden="true">·</span>
            <span>Frequently Asked</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#2A222B] font-display tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5D5262] font-normal">
            Detailed answers regarding our chauffeur qualifications, passenger accompaniment rules, and care procedures.
          </p>
        </div>

        {/* Accordion List with Frosted Glass Accordions */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-panel-elevated rounded-2xl overflow-hidden border border-white transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 bg-white/60 hover:bg-white/90 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-normal text-[#2A222B] font-display">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full transition-colors ${isOpen ? 'bg-[#FAF2F5] text-[#782846]' : 'text-[#8C7D8E]'}`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#782846]' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 py-4 bg-white/90 text-xs sm:text-sm text-[#5D5262] leading-relaxed border-t border-[#F0E4E8] font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support direct contact callout */}
        <div className="mt-12 text-center text-xs text-[#7B6E7D]">
          <span>Have an uncommon care request or specialized accessibility question? </span>
          <a href="tel:18005558372" className="font-semibold text-[#782846] underline hover:text-[#5B1B33] ml-1">
            Speak directly with a female coordinator at (800) 555-VERA
          </a>
        </div>

      </div>
    </section>
  );
}
