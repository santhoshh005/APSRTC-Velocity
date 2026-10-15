import { ShieldCheck, Award, Phone, Mail, ExternalLink } from 'lucide-react';
import { Language } from '../../types';
import { useI18n } from '../../core/i18n';

interface GovFooterProps {
  currentLang: Language;
}

export const GovFooter: React.FC<GovFooterProps> = ({ currentLang }) => {
  const { t } = useI18n(currentLang);

  return (
    <footer className="bg-apsrtc-slate-900 text-apsrtc-slate-300 pt-12 pb-8 border-t-4 border-apsrtc-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-apsrtc-slate-800">
          {/* Column 1: Brand & Gov Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-apsrtc-red flex items-center justify-center font-black text-amber-300 text-xl border border-amber-300/30">
                AP
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">
                  {currentLang === 'te' ? 'ఎపిఎస్ఆర్టీసి' : 'APSRTC'}
                </h3>
                <p className="text-xs text-apsrtc-slate-400">
                  {currentLang === 'te' ? 'ఆంధ్రప్రదేశ్ ప్రభుత్వం' : 'Govt. of Andhra Pradesh'}
                </p>
              </div>
            </div>

            <p className="text-xs text-apsrtc-slate-400 leading-relaxed">
              {t.footerAbout}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400/90 font-medium bg-apsrtc-slate-800/80 p-2.5 rounded-lg border border-apsrtc-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Official Citizen Transport Booking Portal</span>
            </div>
          </div>

          {/* Column 2: Digital Passenger Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-apsrtc-red pl-2.5">
              Passenger Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#search" className="hover:text-white transition-colors">
                  Advance Bus Ticket Booking (60 Days)
                </a>
              </li>
              <li>
                <a href="#tracking" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  APSRTC LiveTrack (GPS Tracker)
                </a>
              </li>
              <li>
                <a href="#manage" className="hover:text-white transition-colors">
                  PNR Status & Cancellation
                </a>
              </li>
              <li>
                <a href="https://cargo.apsrtconline.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  APSRTC Parcel & Cargo Logistics <ExternalLink className="w-3 h-3 text-apsrtc-slate-500" />
                </a>
              </li>
              <li>
                <a href="#pilgrim" className="hover:text-white transition-colors">
                  Tirupati & Srisailam Pilgrim Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Citizen Grievance & Helplines */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-apsrtc-gold pl-2.5">
              Support & Grievances
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">0866-2570005 / 149</span>
                  <span className="text-apsrtc-slate-400">24/7 Central Call Centre</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">1902 (Toll Free)</span>
                  <span className="text-apsrtc-slate-400">{t.rtgsHelp}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">customercare@apsrtc.ap.gov.in</span>
                  <span className="text-apsrtc-slate-400">Official Support Mail</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: National Recognition */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2.5">
              Recognition & Awards
            </h4>
            <div className="space-y-3 text-xs bg-apsrtc-slate-800/50 p-3 rounded-lg border border-apsrtc-slate-700/60">
              <div className="flex items-start gap-2.5">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">National Public Transport Excellence</p>
                  <p className="text-[11px] text-apsrtc-slate-400">Best Digital Mobility & Passenger Safety Initiatives</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-2 border-t border-apsrtc-slate-700">
                <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">India Bus Awards (Kuala Lumpur)</p>
                  <p className="text-[11px] text-apsrtc-slate-400">Triple Gold in Passenger Mobile Innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accessibility */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-apsrtc-slate-500 gap-4">
          <p className="text-center sm:text-left">
            {t.copyright}
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-apsrtc-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-apsrtc-slate-400 cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-apsrtc-slate-400 cursor-pointer">WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
