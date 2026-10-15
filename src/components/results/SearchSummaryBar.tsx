import React from 'react';
import { ArrowRight, Calendar, Filter, RotateCcw } from 'lucide-react';
import { SearchParams, Language } from '../../types';
import { useI18n } from '../../core/i18n';

interface SearchSummaryBarProps {
  searchParams: SearchParams;
  totalBuses: number;
  currentLang: Language;
  onModifySearch: () => void;
  onToggleMobileFilters?: () => void;
}

export const SearchSummaryBar: React.FC<SearchSummaryBarProps> = ({
  searchParams,
  totalBuses,
  currentLang,
  onModifySearch,
  onToggleMobileFilters
}) => {
  const { t } = useI18n(currentLang);

  return (
    <div className="bg-white border-b border-apsrtc-slate-200 sticky top-18 z-30 shadow-sm py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Origin -> Destination + Date */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-base sm:text-lg font-black text-apsrtc-slate-900">
            <span>{searchParams.origin}</span>
            <ArrowRight className="w-4 h-4 text-apsrtc-red" />
            <span>{searchParams.destination}</span>
          </div>

          <div className="h-4 w-px bg-apsrtc-slate-300 hidden sm:block" />

          <div className="flex items-center gap-1.5 text-xs font-bold text-apsrtc-slate-600 bg-apsrtc-slate-100 px-2.5 py-1 rounded-md">
            <Calendar className="w-3.5 h-3.5 text-apsrtc-red" />
            <span>{searchParams.departureDate}</span>
            {searchParams.isRoundTrip && searchParams.returnDate && (
              <span> &bull; Return: {searchParams.returnDate}</span>
            )}
          </div>

          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {totalBuses} {t.foundBuses}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {onToggleMobileFilters && (
            <button
              onClick={onToggleMobileFilters}
              className="lg:hidden flex items-center gap-1.5 bg-apsrtc-slate-100 hover:bg-apsrtc-slate-200 text-apsrtc-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-apsrtc-slate-300 transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-apsrtc-red" />
              <span>Filters</span>
            </button>
          )}

          <button
            onClick={onModifySearch}
            className="flex items-center gap-1.5 bg-white hover:bg-apsrtc-slate-50 text-apsrtc-red border border-apsrtc-red/30 hover:border-apsrtc-red text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.modifySearch}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
