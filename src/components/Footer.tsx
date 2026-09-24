import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  return (
    <footer className="bg-[#261A25] text-[#D8CAD3] text-xs border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a 
              href="/" 
              className="group inline-flex items-center"
              aria-label="VERA Mobility Home"
            >
              <BrandLogo theme="dark" carClassName="h-5 w-auto" />
            </a>
            <p className="text-xs text-[#BFAEB9] max-w-sm leading-relaxed font-normal">
              Private chauffeured driving services provided exclusively by women, for women of every generation. Founded on the conviction that personal mobility must be calm, predictable, and fundamentally safe.
            </p>
            <div className="flex items-center gap-2 text-[#F3CBD7] text-xs font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-[#8BE4BC]" />
              <span>Licensed Commercial Carrier · 100% Female Chauffeur Fleet</span>
            </div>
          </div>

          {/* Generational Services */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Mobility Services
            </div>
            <ul className="space-y-2 text-[#BFAEB9]">
              <li><a href="#services" className="hover:text-white transition-colors">Senior Care & Clinic Escort</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Executive & Shift Travel</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Student & Campus Commutes</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Family, Maternity & Child Seat</a></li>
              <li><a href="#fleet" className="hover:text-white transition-colors">Sanctuary Fleet</a></li>
            </ul>
          </div>

          {/* Safety & Compliance */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Standards & Care
            </div>
            <ul className="space-y-2 text-[#BFAEB9]">
              <li><a href="#safety" className="hover:text-white transition-colors">The 4-Tier Vetting Process</a></li>
              <li><a href="#safety" className="hover:text-white transition-colors">Door-Through-Door Standard</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Passenger Accompaniment Rules</a></li>
              <li><a href="#safety" className="hover:text-white transition-colors">Continuous DMV Monitoring</a></li>
              <li><a href="#safety" className="hover:text-white transition-colors">Commercial Liability ($5M)</a></li>
            </ul>
          </div>

          {/* 24/7 Female Dispatch Desk */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              24/7 Concierge Desk
            </div>
            <div className="space-y-2 text-[#BFAEB9]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F3CBD7]" />
                <a href="tel:18005558372" className="text-white hover:text-[#F3CBD7] font-mono tabular-nums font-semibold">
                  (800) 555-VERA (8372)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F3CBD7]" />
                <a href="mailto:concierge@veramobility.com" className="hover:text-white">
                  concierge@veramobility.com
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#F3CBD7] shrink-0 mt-0.5" />
                <span>Operating across Metropolitan Region, Suburbs & Regional Airports</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A695A0]">
          <div>
            &copy; {new Date().getFullYear()} VERA Chauffeured Mobility Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#faq" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#faq" className="hover:text-white transition-colors">Terms of Carriage</a>
            <a href="#faq" className="hover:text-white transition-colors">Passenger Bill of Rights</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
