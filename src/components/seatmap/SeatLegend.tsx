import { UserCheck } from 'lucide-react';
import { Language } from '../../types';
import { useI18n } from '../../core/i18n';

interface SeatLegendProps {
  currentLang: Language;
}

export const SeatLegend: React.FC<SeatLegendProps> = ({ currentLang }) => {
  const { t } = useI18n(currentLang);

  return (
    <div className="flex items-center gap-4 flex-wrap text-xs font-semibold py-2.5 px-4 bg-apsrtc-slate-50 border border-apsrtc-slate-200 rounded-xl justify-center sm:justify-start">
      {/* Available */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-6 rounded bg-white border-2 border-apsrtc-slate-300 shadow-sm" />
        <span className="text-apsrtc-slate-700">{t.available}</span>
      </div>

      {/* Selected */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-6 rounded bg-apsrtc-red border-2 border-apsrtc-red-dark shadow-sm text-white flex items-center justify-center text-[10px] font-bold">
          ✓
        </div>
        <span className="text-apsrtc-red-dark font-bold">{t.selected}</span>
      </div>

      {/* Ladies Quota */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-6 rounded bg-pink-100 border-2 border-pink-500 shadow-sm flex items-center justify-center text-pink-700">
          <UserCheck className="w-3.5 h-3.5" />
        </div>
        <span className="text-pink-700 font-bold">{t.ladiesQuota}</span>
      </div>

      {/* Booked */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-6 rounded bg-apsrtc-slate-200 border-2 border-apsrtc-slate-300 text-apsrtc-slate-400 flex items-center justify-center text-[10px]">
          ✕
        </div>
        <span className="text-apsrtc-slate-400">{t.booked}</span>
      </div>
    </div>
  );
};
