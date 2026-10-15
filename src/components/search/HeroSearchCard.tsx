import React, { useState } from 'react';
import { ArrowLeftRight, Calendar, Search, Sparkles, AlertCircle } from 'lucide-react';
import { Language, SearchParams } from '../../types';
import { useI18n } from '../../core/i18n';
import { StationAutocomplete } from './StationAutocomplete';

interface HeroSearchCardProps {
  currentLang: Language;
  onSearch: (params: SearchParams) => void;
  initialParams?: Partial<SearchParams>;
}

export const HeroSearchCard: React.FC<HeroSearchCardProps> = ({
  currentLang,
  onSearch,
  initialParams
}) => {
  const { t } = useI18n(currentLang);

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

  // Upcoming Saturday
  const weekendDate = new Date();
  const dayOfWeek = weekendDate.getDay();
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
  weekendDate.setDate(weekendDate.getDate() + daysUntilSaturday);
  const weekendStr = weekendDate.toISOString().split('T')[0];

  const [origin, setOrigin] = useState(initialParams?.origin || 'HYDERABAD');
  const [destination, setDestination] = useState(initialParams?.destination || 'VIJAYAWADA');
  const [departureDate, setDepartureDate] = useState(initialParams?.departureDate || tomorrowStr);
  const [returnDate, setReturnDate] = useState(initialParams?.returnDate || '');
  const [isRoundTrip, setIsRoundTrip] = useState(initialParams?.isRoundTrip || false);
  const [swapRotated, setSwapRotated] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSwap = () => {
    setSwapRotated(prev => !prev);
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleQuickDate = (dateStr: string) => {
    setDepartureDate(dateStr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!origin.trim()) {
      setValidationError('Please select a departure origin station.');
      return;
    }
    if (!destination.trim()) {
      setValidationError('Please select an arrival destination station.');
      return;
    }
    if (origin.trim().toUpperCase() === destination.trim().toUpperCase()) {
      setValidationError('Origin and Destination cannot be the same city.');
      return;
    }
    if (!departureDate) {
      setValidationError('Please select a travel departure date.');
      return;
    }

    onSearch({
      origin,
      destination,
      departureDate,
      returnDate: isRoundTrip ? returnDate : undefined,
      isRoundTrip
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-gov-card border border-apsrtc-slate-200/80 p-5 sm:p-7 relative backdrop-blur-xl">
      {/* Search Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-apsrtc-slate-100 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-apsrtc-red uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Official Direct Reservation System
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-apsrtc-slate-900 tracking-tight">
            {t.heroTitle}
          </h2>
        </div>

        {/* Round Trip Toggle Pill */}
        <label className="inline-flex items-center gap-2 cursor-pointer bg-apsrtc-red-subtle/80 hover:bg-apsrtc-red-light px-3.5 py-1.5 rounded-full border border-apsrtc-red/20 transition-all select-none">
          <input
            type="checkbox"
            checked={isRoundTrip}
            onChange={(e) => {
              setIsRoundTrip(e.target.checked);
              if (e.target.checked && !returnDate) {
                // Set default return date to departure + 2 days
                const d = new Date(departureDate);
                d.setDate(d.getDate() + 2);
                setReturnDate(d.toISOString().split('T')[0]);
              }
            }}
            className="w-4 h-4 text-apsrtc-red rounded focus:ring-apsrtc-red accent-apsrtc-red"
          />
          <span className="text-xs font-bold text-apsrtc-red-dark">
            {t.roundTrip}
          </span>
        </label>
      </div>

      {/* Validation Message */}
      {validationError && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Origin Station */}
          <div className="lg:col-span-4">
            <StationAutocomplete
              label={t.fromCity}
              placeholder={t.selectOrigin}
              value={origin}
              onChange={setOrigin}
              iconColor="text-apsrtc-red"
            />
          </div>

          {/* Swap Route Button */}
          <div className="lg:col-span-1 flex justify-center -my-2 lg:my-0 lg:pt-6">
            <button
              type="button"
              onClick={handleSwap}
              className="w-10 h-10 rounded-full bg-apsrtc-slate-100 hover:bg-apsrtc-red hover:text-white text-apsrtc-slate-700 border border-apsrtc-slate-300 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95"
              title={t.swapRoute}
              aria-label={t.swapRoute}
            >
              <ArrowLeftRight className={`w-4 h-4 transition-transform duration-300 ${swapRotated ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Destination Station */}
          <div className="lg:col-span-4">
            <StationAutocomplete
              label={t.toCity}
              placeholder={t.selectDestination}
              value={destination}
              onChange={setDestination}
              iconColor="text-emerald-600"
            />
          </div>

          {/* Travel Date */}
          <div className="lg:col-span-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-apsrtc-slate-600 mb-1.5">
              {t.departDate}
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-5 h-5 text-apsrtc-gold absolute left-3.5 pointer-events-none" />
              <input
                type="date"
                min={todayStr}
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full pl-11 pr-3 py-3 bg-white border border-apsrtc-slate-300 rounded-xl text-apsrtc-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-apsrtc-red focus:border-apsrtc-red shadow-sm cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Optional Return Date if Round Trip selected */}
        {isRoundTrip && (
          <div className="pt-2 animate-fadeIn max-w-sm">
            <label className="block text-xs font-bold uppercase tracking-wider text-apsrtc-slate-600 mb-1.5">
              {t.returnDate}
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-5 h-5 text-apsrtc-red absolute left-3.5 pointer-events-none" />
              <input
                type="date"
                min={departureDate}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full pl-11 pr-3 py-2.5 bg-white border border-apsrtc-slate-300 rounded-xl text-apsrtc-slate-900 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-apsrtc-red focus:border-apsrtc-red shadow-sm cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Quick Date Chips + Submit Button Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-apsrtc-slate-500 mr-1">
              Quick Dates:
            </span>
            <button
              type="button"
              onClick={() => handleQuickDate(todayStr)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                departureDate === todayStr
                  ? 'bg-apsrtc-red text-white border-apsrtc-red shadow-sm'
                  : 'bg-apsrtc-slate-50 text-apsrtc-slate-700 border-apsrtc-slate-200 hover:bg-apsrtc-slate-100'
              }`}
            >
              {t.today}
            </button>
            <button
              type="button"
              onClick={() => handleQuickDate(tomorrowStr)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                departureDate === tomorrowStr
                  ? 'bg-apsrtc-red text-white border-apsrtc-red shadow-sm'
                  : 'bg-apsrtc-slate-50 text-apsrtc-slate-700 border-apsrtc-slate-200 hover:bg-apsrtc-slate-100'
              }`}
            >
              {t.tomorrow}
            </button>
            <button
              type="button"
              onClick={() => handleQuickDate(weekendStr)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                departureDate === weekendStr
                  ? 'bg-apsrtc-red text-white border-apsrtc-red shadow-sm'
                  : 'bg-apsrtc-slate-50 text-apsrtc-slate-700 border-apsrtc-slate-200 hover:bg-apsrtc-slate-100'
              }`}
            >
              {t.thisWeekend}
            </button>
          </div>

          {/* Primary CTA */}
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-apsrtc-red to-apsrtc-red-dark hover:from-apsrtc-red-dark hover:to-apsrtc-red text-white px-8 py-3.5 rounded-xl font-black text-sm sm:text-base shadow-lg shadow-apsrtc-red/25 hover:shadow-xl hover:shadow-apsrtc-red/35 active:scale-98 transition-all"
          >
            <Search className="w-5 h-5 text-amber-300" />
            <span>{t.checkAvailability}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
