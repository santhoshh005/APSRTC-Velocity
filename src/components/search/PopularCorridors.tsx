import React from 'react';
import { ArrowRight, Clock, Bus, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { useI18n } from '../../core/i18n';
import { POPULAR_ROUTES } from '../../core/stationIndex';

interface PopularCorridorsProps {
  currentLang: Language;
  onSelectRoute: (origin: string, destination: string) => void;
}

export const PopularCorridors: React.FC<PopularCorridorsProps> = ({
  currentLang,
  onSelectRoute
}) => {
  const { t } = useI18n(currentLang);

  return (
    <section className="py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-apsrtc-red uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            High Frequency Routes
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-apsrtc-slate-900 tracking-tight">
            {t.popularRoutesTitle}
          </h3>
          <p className="text-xs text-apsrtc-slate-500 mt-0.5">
            {t.popularRoutesSubtitle}
          </p>
        </div>
      </div>

      {/* Corridor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {POPULAR_ROUTES.map((route, idx) => (
          <div
            key={idx}
            onClick={() => onSelectRoute(route.origin, route.destination)}
            className="group bg-white rounded-xl p-4 border border-apsrtc-slate-200 hover:border-apsrtc-red/50 shadow-sm hover:shadow-gov-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Route Endpoints */}
              <div className="flex items-center justify-between text-apsrtc-slate-900 font-extrabold text-sm mb-2 group-hover:text-apsrtc-red transition-colors">
                <span>{route.origin}</span>
                <ArrowRight className="w-4 h-4 text-apsrtc-red group-hover:translate-x-1 transition-transform" />
                <span>{route.destination}</span>
              </div>

              {/* Metrics */}
              <div className="flex items-center gap-3 text-xs text-apsrtc-slate-500 mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-apsrtc-slate-400" />
                  {route.duration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Bus className="w-3.5 h-3.5 text-emerald-600" />
                  {route.dailyBuses} {t.busesPerDay}
                </span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="pt-3 border-t border-apsrtc-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-apsrtc-slate-400 block">
                  {t.startingFrom}
                </span>
                <span className="text-base font-black text-apsrtc-red-dark">
                  ₹{route.startingFare}
                </span>
              </div>

              <span className="text-xs font-bold text-apsrtc-red group-hover:underline flex items-center gap-0.5">
                {t.bookNow} &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
