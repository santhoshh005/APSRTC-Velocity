import React from 'react';
import { Filter, RotateCcw, Clock, ShieldCheck } from 'lucide-react';
import { FilterState, Language } from '../../types';
import { useI18n } from '../../core/i18n';

interface FilterSidebarProps {
  currentLang: Language;
  filterState: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  currentLang,
  filterState,
  onFilterChange,
  onReset
}) => {
  const { t } = useI18n(currentLang);

  const handleAcToggle = (value: boolean | null) => {
    onFilterChange({ ...filterState, acOnly: value });
  };

  const handleSeatingToggle = (type: 'SLEEPER' | 'SEATER') => {
    const exists = filterState.seatingTypes.includes(type);
    const updated = exists
      ? filterState.seatingTypes.filter(s => s !== type)
      : [...filterState.seatingTypes, type];
    onFilterChange({ ...filterState, seatingTypes: updated });
  };

  const handleTimeSlotToggle = (slot: 'early_morning' | 'morning' | 'afternoon' | 'night') => {
    const exists = filterState.departureTimeSlots.includes(slot);
    const updated = exists
      ? filterState.departureTimeSlots.filter(s => s !== slot)
      : [...filterState.departureTimeSlots, slot];
    onFilterChange({ ...filterState, departureTimeSlots: updated });
  };

  return (
    <aside className="w-full bg-white rounded-xl border border-apsrtc-slate-200 p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-apsrtc-slate-100">
        <div className="flex items-center gap-2 font-black text-sm text-apsrtc-slate-900 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-apsrtc-red" />
          <span>{t.filterBy}</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-bold text-apsrtc-red hover:underline flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t.resetFilters}</span>
        </button>
      </div>

      {/* Sort By Dropdown */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-apsrtc-slate-600 mb-2">
          Sort Services By
        </label>
        <select
          value={filterState.sortBy}
          onChange={(e) => onFilterChange({ ...filterState, sortBy: e.target.value as any })}
          className="w-full py-2 px-3 bg-apsrtc-slate-50 border border-apsrtc-slate-300 rounded-lg text-xs font-bold text-apsrtc-slate-800 focus:outline-none focus:ring-2 focus:ring-apsrtc-red cursor-pointer"
        >
          <option value="departure_asc">Departure Time (Earliest First)</option>
          <option value="departure_desc">Departure Time (Latest First)</option>
          <option value="fare_asc">Price (Lowest to Highest)</option>
          <option value="seats_desc">Available Seats (Highest First)</option>
        </select>
      </div>

      {/* AC vs Non-AC Toggle Chips */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-apsrtc-slate-600 mb-2.5">
          Air Conditioning
        </span>
        <div className="grid grid-cols-3 gap-1.5 bg-apsrtc-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => handleAcToggle(null)}
            className={`py-1.5 text-xs font-bold rounded-md transition-all ${
              filterState.acOnly === null
                ? 'bg-white text-apsrtc-red shadow-sm'
                : 'text-apsrtc-slate-600 hover:text-apsrtc-slate-900'
            }`}
          >
            {t.allBuses}
          </button>
          <button
            type="button"
            onClick={() => handleAcToggle(true)}
            className={`py-1.5 text-xs font-bold rounded-md transition-all ${
              filterState.acOnly === true
                ? 'bg-white text-apsrtc-red shadow-sm'
                : 'text-apsrtc-slate-600 hover:text-apsrtc-slate-900'
            }`}
          >
            {t.acOnly}
          </button>
          <button
            type="button"
            onClick={() => handleAcToggle(false)}
            className={`py-1.5 text-xs font-bold rounded-md transition-all ${
              filterState.acOnly === false
                ? 'bg-white text-apsrtc-red shadow-sm'
                : 'text-apsrtc-slate-600 hover:text-apsrtc-slate-900'
            }`}
          >
            {t.nonAcOnly}
          </button>
        </div>
      </div>

      {/* Seating Formats */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-apsrtc-slate-600 mb-2.5">
          {t.seatingFormat}
        </span>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2.5 cursor-pointer font-medium text-apsrtc-slate-800 select-none">
            <input
              type="checkbox"
              checked={filterState.seatingTypes.includes('SLEEPER')}
              onChange={() => handleSeatingToggle('SLEEPER')}
              className="w-4 h-4 text-apsrtc-red rounded focus:ring-apsrtc-red accent-apsrtc-red"
            />
            <span>Sleeper Berths (Single / Double)</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer font-medium text-apsrtc-slate-800 select-none">
            <input
              type="checkbox"
              checked={filterState.seatingTypes.includes('SEATER')}
              onChange={() => handleSeatingToggle('SEATER')}
              className="w-4 h-4 text-apsrtc-red rounded focus:ring-apsrtc-red accent-apsrtc-red"
            />
            <span>Push-Back Seater (2+2)</span>
          </label>
        </div>
      </div>

      {/* Departure Time Slots */}
      <div>
        <span className="block text-xs font-bold uppercase tracking-wider text-apsrtc-slate-600 mb-2.5 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-apsrtc-red" />
          {t.departureTime}
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleTimeSlotToggle('early_morning')}
            className={`p-2 rounded-lg border text-left transition-all ${
              filterState.departureTimeSlots.includes('early_morning')
                ? 'bg-apsrtc-red-subtle border-apsrtc-red text-apsrtc-red font-bold'
                : 'bg-white border-apsrtc-slate-200 text-apsrtc-slate-700 hover:bg-apsrtc-slate-50'
            }`}
          >
            <span className="font-bold block">12 AM - 6 AM</span>
            <span className="text-[10px] text-apsrtc-slate-400">Early Morning</span>
          </button>

          <button
            type="button"
            onClick={() => handleTimeSlotToggle('morning')}
            className={`p-2 rounded-lg border text-left transition-all ${
              filterState.departureTimeSlots.includes('morning')
                ? 'bg-apsrtc-red-subtle border-apsrtc-red text-apsrtc-red font-bold'
                : 'bg-white border-apsrtc-slate-200 text-apsrtc-slate-700 hover:bg-apsrtc-slate-50'
            }`}
          >
            <span className="font-bold block">6 AM - 12 PM</span>
            <span className="text-[10px] text-apsrtc-slate-400">Morning</span>
          </button>

          <button
            type="button"
            onClick={() => handleTimeSlotToggle('afternoon')}
            className={`p-2 rounded-lg border text-left transition-all ${
              filterState.departureTimeSlots.includes('afternoon')
                ? 'bg-apsrtc-red-subtle border-apsrtc-red text-apsrtc-red font-bold'
                : 'bg-white border-apsrtc-slate-200 text-apsrtc-slate-700 hover:bg-apsrtc-slate-50'
            }`}
          >
            <span className="font-bold block">12 PM - 6 PM</span>
            <span className="text-[10px] text-apsrtc-slate-400">Afternoon</span>
          </button>

          <button
            type="button"
            onClick={() => handleTimeSlotToggle('night')}
            className={`p-2 rounded-lg border text-left transition-all ${
              filterState.departureTimeSlots.includes('night')
                ? 'bg-apsrtc-red-subtle border-apsrtc-red text-apsrtc-red font-bold'
                : 'bg-white border-apsrtc-slate-200 text-apsrtc-slate-700 hover:bg-apsrtc-slate-50'
            }`}
          >
            <span className="font-bold block">6 PM - 12 AM</span>
            <span className="text-[10px] text-apsrtc-slate-400">Night</span>
          </button>
        </div>
      </div>

      {/* GovTech Guarantee Pill */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <span>No Surge Pricing: All APSRTC services run strictly at government approved tariffs.</span>
      </div>
    </aside>
  );
};
