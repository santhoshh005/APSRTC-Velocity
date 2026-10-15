import React from 'react';
import { MapPin, Clock, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BoardingPoint, Language } from '../../types';
import { useI18n } from '../../core/i18n';

interface BoardingDroppingPickerProps {
  boardingPoints: BoardingPoint[];
  droppingPoints: BoardingPoint[];
  selectedBoarding: BoardingPoint | null;
  selectedDropping: BoardingPoint | null;
  currentLang: Language;
  onSelectBoarding: (point: BoardingPoint) => void;
  onSelectDropping: (point: BoardingPoint) => void;
  onProceed: () => void;
}

export const BoardingDroppingPicker: React.FC<BoardingDroppingPickerProps> = ({
  boardingPoints,
  droppingPoints,
  selectedBoarding,
  selectedDropping,
  currentLang,
  onSelectBoarding,
  onSelectDropping,
  onProceed
}) => {
  const { t } = useI18n(currentLang);

  const canProceed = Boolean(selectedBoarding && selectedDropping);

  return (
    <div className="bg-white rounded-2xl border border-apsrtc-slate-200 p-5 sm:p-7 shadow-gov-card space-y-6">
      <div>
        <span className="text-xs font-bold text-apsrtc-red uppercase tracking-wider block">
          Step 2 of 3: Pickup & Drop Points
        </span>
        <h3 className="text-xl font-black text-apsrtc-slate-900">
          Select Your Boarding and Dropping Stations
        </h3>
        <p className="text-xs text-apsrtc-slate-500">
          Choose the exact bus shelter where you will board and alight from the bus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Boarding Points Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-black text-sm text-apsrtc-slate-900 border-b border-apsrtc-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-apsrtc-red" />
            <span>{t.selectBoarding}</span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {boardingPoints.map((point) => {
              const isSelected = selectedBoarding?.id === point.id;

              return (
                <div
                  key={point.id}
                  onClick={() => onSelectBoarding(point)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-apsrtc-red bg-apsrtc-red-subtle/70 shadow-sm'
                      : 'border-apsrtc-slate-200 hover:border-apsrtc-slate-300 hover:bg-apsrtc-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-extrabold text-sm text-apsrtc-slate-900 block leading-tight">
                        {point.name}
                      </span>
                      <span className="text-xs text-apsrtc-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-apsrtc-slate-400 shrink-0" />
                        {point.landmark}
                      </span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-apsrtc-red shrink-0" />
                    )}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-apsrtc-slate-100 flex items-center justify-between text-[11px] text-apsrtc-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-apsrtc-slate-700">
                      <Clock className="w-3 h-3 text-apsrtc-gold" />
                      +{point.timeOffsetMinutes}m from Depot
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-apsrtc-slate-400" />
                      {point.contactPhone}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dropping Points Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-black text-sm text-apsrtc-slate-900 border-b border-apsrtc-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{t.selectDropping}</span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {droppingPoints.map((point) => {
              const isSelected = selectedDropping?.id === point.id;

              return (
                <div
                  key={point.id}
                  onClick={() => onSelectDropping(point)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                      : 'border-apsrtc-slate-200 hover:border-apsrtc-slate-300 hover:bg-apsrtc-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-extrabold text-sm text-apsrtc-slate-900 block leading-tight">
                        {point.name}
                      </span>
                      <span className="text-xs text-apsrtc-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-apsrtc-slate-400 shrink-0" />
                        {point.landmark}
                      </span>
                    </div>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-apsrtc-slate-100 flex items-center justify-between text-[11px] text-apsrtc-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-apsrtc-slate-700">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      Arrival Landmark
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-apsrtc-slate-400" />
                      {point.contactPhone}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-apsrtc-slate-200 flex items-center justify-end">
        <button
          type="button"
          disabled={!canProceed}
          onClick={onProceed}
          className={`px-8 py-3.5 rounded-xl font-black text-sm flex items-center gap-2 transition-all shadow-md ${
            canProceed
              ? 'bg-apsrtc-red hover:bg-apsrtc-red-dark text-white shadow-apsrtc-red/25 hover:shadow-lg'
              : 'bg-apsrtc-slate-200 text-apsrtc-slate-400 cursor-not-allowed'
          }`}
        >
          <span>{t.proceedToPassengers}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
