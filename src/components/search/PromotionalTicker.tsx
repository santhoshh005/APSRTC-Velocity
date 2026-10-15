import { Tag, Sparkles, Smartphone } from 'lucide-react';
import { Language } from '../../types';

interface PromotionalTickerProps {
  currentLang: Language;
}

export const PromotionalTicker: React.FC<PromotionalTickerProps> = ({ currentLang }) => {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Promo 1: Round Trip Discount */}
      <div className="bg-gradient-to-r from-red-50 to-amber-50 border border-red-200/60 rounded-xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-apsrtc-red text-amber-300 flex items-center justify-center shrink-0">
          <Tag className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-black text-apsrtc-red uppercase tracking-wide block">
            {currentLang === 'te' ? 'రౌండ్ ట్రిప్ ఆఫర్' : 'Round Trip Discount'}
          </span>
          <span className="text-xs text-apsrtc-slate-700 font-medium">
            {currentLang === 'te' 
              ? 'రిటర్న్ టికెట్ బుకింగ్‌పై 10% తక్షణ తగ్గింపు పొందండి.' 
              : 'Save 10% instantly on all return journey tickets.'}
          </span>
        </div>
      </div>

      {/* Promo 2: Festival Special Services */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-apsrtc-gold text-white flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-black text-amber-900 uppercase tracking-wide block">
            {currentLang === 'te' ? 'పండుగ ప్రత్యేక సర్వీసులు' : 'Festival Specials (Zero Surge)'}
          </span>
          <span className="text-xs text-apsrtc-slate-700 font-medium">
            {currentLang === 'te' 
              ? 'దసరా & సంక్రాంతి రద్దీకి అదనపు బస్సులు, సాధారణ ఛార్జీలే.' 
              : 'Additional holiday buses deployed at standard government fares.'}
          </span>
        </div>
      </div>

      {/* Promo 3: Official Mobile App */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-black text-emerald-800 uppercase tracking-wide block">
            {currentLang === 'te' ? 'ఎపిఎస్ఆర్టీసి మొబైల్ యాప్' : 'Official Mobile App'}
          </span>
          <span className="text-xs text-apsrtc-slate-700 font-medium">
            {currentLang === 'te' 
              ? 'ప్లే స్టోర్ & యాప్ స్టోర్‌లో లభ్యం. కండక్టర్‌కి QR చూపించండి.' 
              : 'Available on Android & iOS. Show m-Ticket QR on boarding.'}
          </span>
        </div>
      </div>
    </div>
  );
};
