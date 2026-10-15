import { useState, useRef, useEffect } from 'react';
import { MapPin, Building2, Check, X } from 'lucide-react';
import { Station } from '../../types';
import { searchStations } from '../../core/stationIndex';

interface StationAutocompleteProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (stationName: string) => void;
  iconColor?: string;
}

export const StationAutocomplete: React.FC<StationAutocompleteProps> = ({
  label,
  placeholder,
  value,
  onChange,
  iconColor = 'text-apsrtc-red'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredStations = searchStations(query);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (station: Station) => {
    setQuery(station.name);
    onChange(station.name);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < filteredStations.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && activeIndex >= 0 && activeIndex < filteredStations.length) {
      e.preventDefault();
      handleSelect(filteredStations[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block text-xs font-bold uppercase tracking-wider text-apsrtc-slate-600 mb-1.5">
        {label}
      </label>

      <div className="relative flex items-center">
        <div className={`absolute left-3.5 pointer-events-none ${iconColor}`}>
          <MapPin className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-11 pr-8 py-3 bg-white border border-apsrtc-slate-300 rounded-xl text-apsrtc-slate-900 font-bold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-apsrtc-red focus:border-apsrtc-red transition-all shadow-sm"
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onChange('');
              setIsOpen(true);
            }}
            className="absolute right-3 text-apsrtc-slate-400 hover:text-apsrtc-slate-600 p-1"
            aria-label="Clear field"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-apsrtc-slate-200 rounded-xl shadow-gov-lg max-h-72 overflow-y-auto divide-y divide-apsrtc-slate-100 animate-fadeIn">
          {filteredStations.length === 0 ? (
            <div className="p-4 text-center text-xs text-apsrtc-slate-500">
              No matching stations found. Try searching for "Vijayawada", "Hyderabad", "Tirupati"...
            </div>
          ) : (
            <div>
              <div className="px-3.5 py-1.5 bg-apsrtc-slate-50 text-[11px] font-bold text-apsrtc-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-apsrtc-red" />
                Major Bus Stations & Transit Hubs
              </div>
              {filteredStations.map((station, idx) => {
                const isSelected = value === station.name;
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={station.id}
                    onClick={() => handleSelect(station)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors ${
                      isActive ? 'bg-apsrtc-red-subtle text-apsrtc-red' : 'hover:bg-apsrtc-slate-50 text-apsrtc-slate-900'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-sm flex items-center gap-2">
                        <span>{station.name}</span>
                        <span className="text-xs font-normal text-apsrtc-slate-500 font-telugu">
                          ({station.teluguName})
                        </span>
                      </div>
                      <div className="text-xs text-apsrtc-slate-500">
                        {station.district} Dist, {station.state} • {station.boardingPoints.length} pickup points
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-apsrtc-red shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
