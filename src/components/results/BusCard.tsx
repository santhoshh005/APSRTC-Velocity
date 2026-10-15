import { Clock, Navigation, Wifi, Zap, Droplets, Bed, SunMedium, ChevronDown, ChevronUp } from 'lucide-react';
import { BusService, Language } from '../../types';
import { useI18n } from '../../core/i18n';

interface BusCardProps {
  bus: BusService;
  currentLang: Language;
  isSelected: boolean;
  onSelectBus: (bus: BusService) => void;
}

export const BusCard: React.FC<BusCardProps> = ({
  bus,
  currentLang,
  isSelected,
  onSelectBus
}) => {
  const { t } = useI18n(currentLang);

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'wifi': return <Wifi className="w-3.5 h-3.5 text-blue-600" />;
      case 'charging': return <Zap className="w-3.5 h-3.5 text-amber-500" />;
      case 'water': return <Droplets className="w-3.5 h-3.5 text-cyan-600" />;
      case 'blanket': return <Bed className="w-3.5 h-3.5 text-indigo-600" />;
      case 'tracking': return <Navigation className="w-3.5 h-3.5 text-emerald-600" />;
      default: return <SunMedium className="w-3.5 h-3.5 text-apsrtc-slate-500" />;
    }
  };

  const isLowSeats = bus.availableSeatsCount <= 5;

  return (
    <div className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
      isSelected 
        ? 'border-apsrtc-red shadow-gov-card ring-1 ring-apsrtc-red' 
        : 'border-apsrtc-slate-200 hover:border-apsrtc-slate-300 shadow-sm hover:shadow-gov'
    }`}>
      <div className="p-4 sm:p-6">
        {/* Top Header: Service No + Bus Class + Gov Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-apsrtc-slate-100 gap-2">
          <div className="flex items-center gap-2.5">
            <span className="bg-apsrtc-red-dark text-white text-xs font-black px-2.5 py-1 rounded-md tracking-wider">
              #{bus.serviceNumber}
            </span>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-apsrtc-slate-900 leading-tight">
                {currentLang === 'te' ? bus.busClassTeluguName : bus.busClassName}
              </h4>
              <span className="text-[11px] font-semibold text-apsrtc-slate-500 uppercase tracking-wider">
                {bus.seatingType.replace(/_/g, ' ')} &bull; APSRTC EXPRESS SERVICE
              </span>
            </div>
          </div>

          {bus.hasLiveGps && (
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.trackBus} Enabled</span>
            </div>
          )}
        </div>

        {/* Middle Section: Route Timeline + Pricing + CTA */}
        <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Departure Info */}
          <div className="md:col-span-3">
            <div className="text-xl sm:text-2xl font-black text-apsrtc-slate-900 tracking-tight">
              {bus.departureTime}
            </div>
            <div className="text-xs font-bold text-apsrtc-slate-700">
              {bus.origin}
            </div>
            <div className="text-[11px] text-apsrtc-slate-400">
              {bus.boardingPoints[0]?.name || 'Central Bus Station'}
            </div>
          </div>

          {/* Duration Indicator */}
          <div className="md:col-span-3 flex flex-col items-center justify-center text-center py-2 md:py-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-apsrtc-slate-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-apsrtc-slate-400" />
              <span>{bus.duration}</span>
            </div>
            <div className="w-full max-w-[140px] flex items-center justify-between">
              <div className="w-2 h-2 rounded-full bg-apsrtc-slate-400" />
              <div className="h-0.5 w-full bg-apsrtc-slate-200 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1">
                  <span className="text-[10px] text-apsrtc-slate-400 font-bold">DIRECT</span>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-apsrtc-red" />
            </div>
          </div>

          {/* Arrival Info */}
          <div className="md:col-span-3 text-left md:text-right">
            <div className="text-xl sm:text-2xl font-black text-apsrtc-slate-900 tracking-tight">
              {bus.arrivalTime}
            </div>
            <div className="text-xs font-bold text-apsrtc-slate-700">
              {bus.destination}
            </div>
            <div className="text-[11px] text-apsrtc-slate-400">
              {bus.droppingPoints[0]?.name || 'Main Terminal'}
            </div>
          </div>

          {/* Price & Action Button */}
          <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-between pt-3 md:pt-0 border-t md:border-t-0 border-apsrtc-slate-100 gap-2">
            <div>
              <span className="text-[10px] font-bold text-apsrtc-slate-400 block uppercase md:text-right">
                {t.startingFrom}
              </span>
              <span className="text-2xl font-black text-apsrtc-red-dark">
                ₹{bus.baseFare}
              </span>
            </div>

            <button
              onClick={() => onSelectBus(bus)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm ${
                isSelected
                  ? 'bg-apsrtc-slate-900 text-white hover:bg-apsrtc-slate-800'
                  : 'bg-apsrtc-red hover:bg-apsrtc-red-dark text-white shadow-apsrtc-red/20 hover:shadow-md'
              }`}
            >
              <span>{isSelected ? t.hideSeats : t.selectSeats}</span>
              {isSelected ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Bottom Metadata: Available Seats + Amenities */}
        <div className="pt-3 border-t border-apsrtc-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Seat Status Badge */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
              isLowSeats
                ? 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isLowSeats ? 'bg-amber-500' : 'bg-emerald-500'}`} />
              {bus.availableSeatsCount} {t.seatsLeft}
            </span>

            <span className="text-[11px] text-apsrtc-slate-400 hidden sm:inline">
              &bull; Official APSRTC Tariff
            </span>
          </div>

          {/* Amenities Pill Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {bus.amenities.map(amenity => (
              <span
                key={amenity.id}
                title={amenity.label}
                className="inline-flex items-center gap-1 bg-apsrtc-slate-50 hover:bg-apsrtc-slate-100 text-apsrtc-slate-600 px-2 py-0.5 rounded text-[11px] font-medium border border-apsrtc-slate-200/70"
              >
                {getAmenityIcon(amenity.iconName)}
                <span className="hidden sm:inline">{amenity.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
