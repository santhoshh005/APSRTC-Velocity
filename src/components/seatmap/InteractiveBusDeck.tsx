import React, { useState } from 'react';
import { Layers, Disc, UserCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import { BusService, Seat, Language, Deck } from '../../types';
import { useI18n } from '../../core/i18n';
import { SeatLegend } from './SeatLegend';

interface InteractiveBusDeckProps {
  bus: BusService;
  selectedSeats: Seat[];
  currentLang: Language;
  onSeatToggle: (seat: Seat) => void;
  onProceed: () => void;
}

export const InteractiveBusDeck: React.FC<InteractiveBusDeckProps> = ({
  bus,
  selectedSeats,
  currentLang,
  onSeatToggle,
  onProceed
}) => {
  const { t } = useI18n(currentLang);
  const [activeDeck, setActiveDeck] = useState<Deck>('LOWER');
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const hasUpperDeck = Boolean(bus.upperDeckSeats && bus.upperDeckSeats.length > 0);
  const currentSeats = activeDeck === 'LOWER' ? bus.lowerDeckSeats : (bus.upperDeckSeats || []);

  const totalAmount = selectedSeats.reduce((sum, s) => sum + s.fare, 0);

  const handleSeatClick = (seat: Seat) => {
    setWarningMessage(null);

    if (seat.status === 'BOOKED') {
      return;
    }

    const isAlreadySelected = selectedSeats.some(s => s.id === seat.id);

    if (!isAlreadySelected && selectedSeats.length >= 6) {
      setWarningMessage(t.maxSeatsWarning);
      return;
    }

    if (seat.status === 'LADIES_QUOTA' && !isAlreadySelected) {
      // Allow selection but notify that it's reserved for women passengers
      setWarningMessage(t.ladiesSeatNotice);
    }

    onSeatToggle(seat);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-apsrtc-red/20 p-5 sm:p-7 shadow-gov-card space-y-6">
      {/* Deck Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-apsrtc-slate-200 gap-4">
        <div>
          <span className="text-xs font-bold text-apsrtc-red uppercase tracking-wider block">
            Step 1 of 3: Seat Selection
          </span>
          <h3 className="text-lg font-black text-apsrtc-slate-900">
            Interactive Seating Deck & Berth Selector
          </h3>
          <p className="text-xs text-apsrtc-slate-500">
            Click on any available seat to reserve. Maximum 6 seats per transaction.
          </p>
        </div>

        {/* Lower vs Upper Deck Tabs */}
        {hasUpperDeck && (
          <div className="flex items-center gap-2 bg-apsrtc-slate-100 p-1.5 rounded-xl border border-apsrtc-slate-200">
            <button
              type="button"
              onClick={() => setActiveDeck('LOWER')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black transition-all ${
                activeDeck === 'LOWER'
                  ? 'bg-white text-apsrtc-red shadow-sm'
                  : 'text-apsrtc-slate-600 hover:text-apsrtc-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-apsrtc-red" />
              <span>{t.lowerDeck}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDeck('UPPER')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black transition-all ${
                activeDeck === 'UPPER'
                  ? 'bg-white text-apsrtc-red shadow-sm'
                  : 'text-apsrtc-slate-600 hover:text-apsrtc-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-600" />
              <span>{t.upperDeck}</span>
            </button>
          </div>
        )}
      </div>

      {/* Visual Legend */}
      <SeatLegend currentLang={currentLang} />

      {/* Warning Notice */}
      {warningMessage && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-semibold flex items-center gap-2 animate-fadeIn">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{warningMessage}</span>
        </div>
      )}

      {/* Bus Layout Canvas */}
      <div className="relative mx-auto max-w-lg bg-apsrtc-slate-50 border-2 border-dashed border-apsrtc-slate-300 rounded-3xl p-6 sm:p-8 shadow-inner">
        {/* Front / Driver Indicator */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-apsrtc-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-apsrtc-slate-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-apsrtc-slate-400" />
            {t.frontCabin}
          </div>

          {/* Steering Wheel */}
          <div className="w-10 h-10 rounded-full border-2 border-apsrtc-slate-400 flex items-center justify-center text-apsrtc-slate-500" title="Driver Cabin">
            <Disc className="w-6 h-6 animate-spin-slow" />
          </div>
        </div>

        {/* Seats Grid */}
        <div className="space-y-4">
          {bus.seatingType === 'SLEEPER' || bus.seatingType === 'SEATER_CUM_SLEEPER' ? (
            /* Sleeper 2+1 Layout */
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map(rowNum => {
                const singleSeat = currentSeats.find(s => s.row === rowNum && s.column === 1);
                const doubleSeat1 = currentSeats.find(s => s.row === rowNum && s.column === 2);
                const doubleSeat2 = currentSeats.find(s => s.row === rowNum && s.column === 3);

                return (
                  <div key={rowNum} className="flex items-center justify-between gap-4">
                    {/* Single Berth (Left) */}
                    <div className="w-1/3">
                      {singleSeat && renderSeatButton(singleSeat)}
                    </div>

                    {/* Gangway / Aisle */}
                    <div className="w-8 text-center text-[10px] font-bold text-apsrtc-slate-300 select-none">
                      •
                    </div>

                    {/* Double Berths (Right) */}
                    <div className="w-2/3 flex items-center gap-2">
                      {doubleSeat1 && <div className="w-1/2">{renderSeatButton(doubleSeat1)}</div>}
                      {doubleSeat2 && <div className="w-1/2">{renderSeatButton(doubleSeat2)}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Seater 2+2 Pushback Layout */
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(rowNum => {
                const s1 = currentSeats.find(s => s.row === rowNum && s.column === 1);
                const s2 = currentSeats.find(s => s.row === rowNum && s.column === 2);
                const s3 = currentSeats.find(s => s.row === rowNum && s.column === 3);
                const s4 = currentSeats.find(s => s.row === rowNum && s.column === 4);

                return (
                  <div key={rowNum} className="flex items-center justify-between gap-3">
                    {/* Left 2 Seats */}
                    <div className="flex items-center gap-2 w-1/2">
                      {s1 && <div className="w-1/2">{renderSeatButton(s1)}</div>}
                      {s2 && <div className="w-1/2">{renderSeatButton(s2)}</div>}
                    </div>

                    {/* Gangway */}
                    <div className="w-4 text-center text-[10px] text-apsrtc-slate-300 select-none">
                      •
                    </div>

                    {/* Right 2 Seats */}
                    <div className="flex items-center gap-2 w-1/2">
                      {s3 && <div className="w-1/2">{renderSeatButton(s3)}</div>}
                      {s4 && <div className="w-1/2">{renderSeatButton(s4)}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Rear of Bus */}
        <div className="pt-6 mt-6 border-t border-apsrtc-slate-200 text-center text-xs font-bold text-apsrtc-slate-400 uppercase tracking-widest">
          {t.rearDeck}
        </div>
      </div>

      {/* Sticky Bottom Selection Summary Bar */}
      <div className="pt-4 border-t border-apsrtc-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-apsrtc-slate-500 font-medium block">
            {t.selectedSeatsLabel}
          </span>
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            {selectedSeats.length === 0 ? (
              <span className="text-xs text-apsrtc-slate-400 italic">
                No seats selected yet
              </span>
            ) : (
              selectedSeats.map(s => (
                <span
                  key={s.id}
                  className="bg-apsrtc-red text-white text-xs font-black px-2.5 py-0.5 rounded-md shadow-sm"
                >
                  {s.seatNumber} (₹{s.fare})
                </span>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-5">
          <div className="text-right">
            <span className="text-[10px] font-bold text-apsrtc-slate-400 uppercase block">
              {t.totalPayable}
            </span>
            <span className="text-2xl font-black text-apsrtc-red-dark">
              ₹{totalAmount}
            </span>
          </div>

          <button
            type="button"
            disabled={selectedSeats.length === 0}
            onClick={onProceed}
            className={`px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all shadow-md ${
              selectedSeats.length > 0
                ? 'bg-apsrtc-red hover:bg-apsrtc-red-dark text-white shadow-apsrtc-red/25 hover:shadow-lg'
                : 'bg-apsrtc-slate-200 text-apsrtc-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{t.proceedToPickup}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  function renderSeatButton(seat: Seat) {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    const isBooked = seat.status === 'BOOKED';
    const isLadies = seat.status === 'LADIES_QUOTA';

    let styling = 'bg-white border-2 border-apsrtc-slate-300 text-apsrtc-slate-700 hover:border-apsrtc-red';
    if (isBooked) {
      styling = 'bg-apsrtc-slate-200 border-2 border-apsrtc-slate-300 text-apsrtc-slate-400 cursor-not-allowed';
    } else if (isSelected) {
      styling = 'bg-apsrtc-red border-2 border-apsrtc-red-dark text-white shadow-md ring-2 ring-apsrtc-red/30 scale-105';
    } else if (isLadies) {
      styling = 'bg-pink-50 border-2 border-pink-400 text-pink-700 hover:bg-pink-100';
    }

    const heightClass = seat.isBerth ? 'h-14 sm:h-16' : 'h-11 sm:h-12';

    return (
      <button
        type="button"
        disabled={isBooked}
        onClick={() => handleSeatClick(seat)}
        title={`Seat ${seat.seatNumber} • ₹${seat.fare} • ${seat.status}`}
        className={`w-full ${heightClass} rounded-xl font-black text-xs transition-all duration-200 flex flex-col items-center justify-center p-1 relative active:scale-95 ${styling}`}
      >
        <span className="text-[11px] leading-none">{seat.seatNumber}</span>
        <span className="text-[9px] font-normal opacity-80 mt-0.5">₹{seat.fare}</span>
        {isLadies && !isSelected && !isBooked && (
          <UserCheck className="w-3 h-3 text-pink-600 absolute top-1 right-1" />
        )}
      </button>
    );
  }
};
