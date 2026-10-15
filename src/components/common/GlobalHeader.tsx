import React, { useState } from 'react';
import { PhoneCall, Navigation, Ticket, ShieldCheck, Globe, Menu, X, Bus, Package } from 'lucide-react';
import { Language, BookingStep } from '../../types';
import { useI18n } from '../../core/i18n';

interface GlobalHeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentStep: BookingStep;
  onNavigate: (step: BookingStep) => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  currentLang,
  onLanguageChange,
  currentStep,
  onNavigate
}) => {
  const { t } = useI18n(currentLang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-apsrtc-slate-200 shadow-sm transition-all">
      {/* Top Utility GovTech Bar */}
      <div className="bg-apsrtc-red-dark text-white text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between font-medium">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-apsrtc-red px-2 py-0.5 rounded-full text-[11px] font-semibold text-amber-300 border border-amber-300/30">
            <ShieldCheck className="w-3 h-3" />
            Govt. of Andhra Pradesh
          </span>
          <span className="hidden md:inline text-white/80">
            {t.tagline}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:08662570005"
            className="flex items-center gap-1.5 text-white/90 hover:text-amber-300 transition-colors"
            title="APSRTC 24/7 Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">{t.hotline24x7}:</span>
            <span className="font-bold tracking-wide">0866 2570005 / 149</span>
          </a>

          <div className="h-3 w-px bg-white/20 hidden sm:block" />

          {/* Bilingual Switcher */}
          <button
            onClick={() => onLanguageChange(currentLang === 'en' ? 'te' : 'en')}
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-2.5 py-0.5 rounded text-xs font-semibold transition-all border border-white/20"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>{currentLang === 'en' ? 'తెలుగు (Telugu)' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
        {/* Brand Identity */}
        <div 
          onClick={() => onNavigate('SEARCH')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-apsrtc-red to-apsrtc-red-dark flex items-center justify-center text-white shadow-md shadow-apsrtc-red/20 group-hover:scale-105 transition-transform border border-apsrtc-red/30">
            <Bus className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-apsrtc-red-dark tracking-tight">
                {currentLang === 'te' ? 'ఎపిఎస్ఆర్టీసి' : 'APSRTC'}
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-apsrtc-red-light text-apsrtc-red px-1.5 py-0.5 rounded border border-apsrtc-red/20">
                VELOCITY
              </span>
            </div>
            <p className="text-xs font-medium text-apsrtc-slate-600 line-clamp-1">
              {currentLang === 'te' 
                ? 'ఆంధ్రప్రదేశ్ రాష్ట్ర రోడ్డు రవాణా సంస్థ' 
                : 'Andhra Pradesh State Road Transport Corporation'}
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
          <button
            onClick={() => onNavigate('SEARCH')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              currentStep === 'SEARCH' || currentStep === 'RESULTS'
                ? 'text-apsrtc-red font-bold bg-apsrtc-red-subtle'
                : 'text-apsrtc-slate-700 hover:text-apsrtc-red hover:bg-apsrtc-slate-100'
            }`}
          >
            {t.home}
          </button>

          <button
            onClick={() => onNavigate('TRACKING')}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentStep === 'TRACKING'
                ? 'text-apsrtc-red font-bold bg-apsrtc-red-subtle'
                : 'text-apsrtc-slate-700 hover:text-apsrtc-red hover:bg-apsrtc-slate-100'
            }`}
          >
            <Navigation className="w-4 h-4 text-emerald-600 animate-bounce" />
            {t.trackBus}
          </button>

          <button
            onClick={() => onNavigate('MANAGE')}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentStep === 'MANAGE'
                ? 'text-apsrtc-red font-bold bg-apsrtc-red-subtle'
                : 'text-apsrtc-slate-700 hover:text-apsrtc-red hover:bg-apsrtc-slate-100'
            }`}
          >
            <Ticket className="w-4 h-4 text-apsrtc-red" />
            {t.ticketStatus}
          </button>

          <a
            href="https://cargo.apsrtconline.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-lg text-apsrtc-slate-700 hover:text-apsrtc-red hover:bg-apsrtc-slate-100 transition-colors flex items-center gap-1.5"
          >
            <Package className="w-4 h-4 text-amber-600" />
            {t.logistics}
          </a>

          <div className="h-5 w-px bg-apsrtc-slate-200 mx-2" />

          {/* Quick Ticket Lookup / Agent Login */}
          <button
            onClick={() => onNavigate('MANAGE')}
            className="border border-apsrtc-red text-apsrtc-red hover:bg-apsrtc-red hover:text-white px-4 py-1.5 rounded-lg font-semibold transition-all shadow-sm text-xs"
          >
            {t.myBookings}
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-apsrtc-slate-700 hover:bg-apsrtc-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-apsrtc-red" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-apsrtc-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg animate-fadeIn">
          <button
            onClick={() => { onNavigate('SEARCH'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-apsrtc-slate-800 hover:bg-apsrtc-red-subtle hover:text-apsrtc-red flex items-center gap-2"
          >
            <Bus className="w-4 h-4 text-apsrtc-red" />
            {t.home}
          </button>

          <button
            onClick={() => { onNavigate('TRACKING'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-apsrtc-slate-800 hover:bg-apsrtc-red-subtle hover:text-apsrtc-red flex items-center gap-2"
          >
            <Navigation className="w-4 h-4 text-emerald-600" />
            {t.trackBus}
          </button>

          <button
            onClick={() => { onNavigate('MANAGE'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-apsrtc-slate-800 hover:bg-apsrtc-red-subtle hover:text-apsrtc-red flex items-center gap-2"
          >
            <Ticket className="w-4 h-4 text-apsrtc-red" />
            {t.ticketStatus}
          </button>

          <a
            href="https://cargo.apsrtconline.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-apsrtc-slate-800 hover:bg-apsrtc-red-subtle hover:text-apsrtc-red flex items-center gap-2"
          >
            <Package className="w-4 h-4 text-amber-600" />
            {t.logistics}
          </a>

          <div className="pt-2 border-t border-apsrtc-slate-200">
            <button
              onClick={() => { onNavigate('MANAGE'); setMobileMenuOpen(false); }}
              className="w-full bg-apsrtc-red text-white py-2.5 rounded-lg font-bold text-center shadow"
            >
              {t.myBookings}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
