import { useState } from 'react';
import { Phone, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F5]/80 backdrop-blur-xl border-b border-white/60 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Wordmark with miniature car badge and MOBILITY underneath VERA */}
        <a 
          href="/" 
          className="group inline-flex items-center"
          aria-label="VERA Mobility Home"
        >
          <BrandLogo />
        </a>

        {/* Clean text navigation links with soft plum active lines */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wide uppercase text-[#615465]">
          <a href="#services" className="hover:text-[#782846] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#782846] hover:after:w-full after:transition-all">
            Generations & Care
          </a>
          <a href="#safety" className="hover:text-[#782846] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#782846] hover:after:w-full after:transition-all">
            Safety Standard
          </a>
          <a href="#fleet" className="hover:text-[#782846] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#782846] hover:after:w-full after:transition-all">
            Sanctuary Fleet
          </a>
          <a href="#estimator" className="hover:text-[#782846] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#782846] hover:after:w-full after:transition-all">
            Fare Calculator
          </a>
          <a href="#live-tracking" className="hover:text-[#782846] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#782846] hover:after:w-full after:transition-all flex items-center gap-1.5 text-[#782846]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#782846] animate-pulse"></span>
            <span>Live Map ETA</span>
          </a>
          <a href="#stories" className="hover:text-[#782846] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#782846] hover:after:w-full after:transition-all">
            Stories
          </a>
          <a href="#faq" className="hover:text-[#782846] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#782846] hover:after:w-full after:transition-all">
            FAQ
          </a>
        </nav>

        {/* Primary actions with soft glass button and bold brand CTA */}
        <div className="flex items-center gap-3">
          <a 
            href="tel:18005558372" 
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-[#483B4D] px-3.5 py-2.5 rounded-full bg-white/60 hover:bg-white/90 border border-white/80 transition-all shadow-2xs whitespace-nowrap"
            title="Direct Dispatch Support"
          >
            <Phone className="w-3.5 h-3.5 text-[#782846]" />
            <span>(800) 555-VERA</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#782846] hover:bg-[#601F37] active:bg-[#4E182C] rounded-full transition-all shadow-sm hover:shadow-md hover:shadow-[#782846]/20 whitespace-nowrap"
          >
            Book Chauffeur
          </button>

          {/* Mobile hamburger toggle */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#483B4D] hover:bg-white/70 rounded-full transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile navigation drawer with soft glassmorphism */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/60 bg-[#FAF7F5]/95 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1 text-xs font-semibold uppercase tracking-wider text-[#615465]">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-white/80 hover:text-[#782846]"
            >
              Generations & Care
            </a>
            <a 
              href="#safety" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-white/80 hover:text-[#782846]"
            >
              Safety Standard
            </a>
            <a 
              href="#fleet" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-white/80 hover:text-[#782846]"
            >
              Sanctuary Fleet
            </a>
            <a 
              href="#estimator" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-white/80 hover:text-[#782846]"
            >
              Fare Calculator
            </a>
            <a 
              href="#live-tracking" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-white/60 text-[#782846] flex items-center justify-between"
            >
              <span>Live Map Tracking</span>
              <span className="w-2 h-2 rounded-full bg-[#782846] animate-pulse"></span>
            </a>
            <a 
              href="#stories" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-white/80 hover:text-[#782846]"
            >
              Stories
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-white/80 hover:text-[#782846]"
            >
              FAQ
            </a>
          </div>
          <div className="pt-3 border-t border-white/60 flex flex-col gap-2">
            <a 
              href="tel:18005558372" 
              className="flex items-center justify-center gap-2 text-xs font-semibold text-[#483B4D] py-2.5 bg-white/70 rounded-full border border-white/80"
            >
              <Phone className="w-3.5 h-3.5 text-[#782846]" />
              <span>Direct Concierge: (800) 555-VERA</span>
            </a>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#8A798C] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3E6554]" />
              <span>100% Certified Female Chauffeur Corps</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
