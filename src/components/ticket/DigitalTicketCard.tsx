import { QrCode, Download, Printer, Share2, Navigation, CheckCircle2, Clock, MapPin, User } from 'lucide-react';
import { BookingState, Language } from '../../types';
import { useI18n } from '../../core/i18n';

interface DigitalTicketCardProps {
  booking: BookingState;
  currentLang: Language;
  onTrackBus: (pnr: string) => void;
  onBookAnother: () => void;
}

export const DigitalTicketCard: React.FC<DigitalTicketCardProps> = ({
  booking,
  currentLang,
  onTrackBus,
  onBookAnother
}) => {
  const { t } = useI18n(currentLang);

  const bus = booking.selectedBus;
  if (!bus) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `APSRTC m-Ticket Confirmed! PNR: ${booking.pnrNumber}, Bus: ${bus.busClassName}, Seats: ${booking.selectedSeats.map(s => s.seatNumber).join(', ')}, Date: ${booking.searchParams.departureDate}. Track live bus: https://apsrtconline.in/track?pnr=${booking.pnrNumber}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 my-8 animate-fadeIn">
      {/* Success Banner */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-apsrtc-slate-900 tracking-tight">
          {t.bookingConfirmed}
        </h2>
        <p className="text-xs text-apsrtc-slate-500">
          Booking reference sent to {booking.contact.mobile} and {booking.contact.email}.
        </p>
      </div>

      {/* Printable Digital m-Ticket Card */}
      <div id="printable-ticket" className="bg-white rounded-3xl border-2 border-apsrtc-slate-200 shadow-gov-lg overflow-hidden relative">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-apsrtc-red to-apsrtc-red-dark text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-amber-300 text-lg border border-white/20">
              AP
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                Official Electronic Passenger Reservation
              </span>
              <h3 className="font-extrabold text-lg leading-tight">
                {currentLang === 'te' ? 'ఎపిఎస్ఆర్టీసి ఇ-టికెట్' : 'APSRTC Digital m-Ticket'}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-white/80 block uppercase tracking-wider font-semibold">
              {t.pnrLabel}
            </span>
            <span className="font-mono text-base sm:text-lg font-black text-amber-300 tracking-wider">
              {booking.pnrNumber}
            </span>
          </div>
        </div>

        {/* Journey Details */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Route & Timing Stepper */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-apsrtc-slate-100">
            {/* Origin */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-apsrtc-red uppercase tracking-wider block">
                {t.boardingAt}
              </span>
              <div className="text-lg font-black text-apsrtc-slate-900">
                {bus.origin}
              </div>
              <div className="text-xs font-bold text-apsrtc-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-apsrtc-gold" />
                <span>{bus.departureTime}</span> &bull; <span>{booking.searchParams.departureDate}</span>
              </div>
              <div className="text-xs text-apsrtc-slate-500 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-apsrtc-slate-400 shrink-0 mt-0.5" />
                <span>{booking.selectedBoardingPoint?.name} ({booking.selectedBoardingPoint?.landmark})</span>
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                {t.droppingAt}
              </span>
              <div className="text-lg font-black text-apsrtc-slate-900">
                {bus.destination}
              </div>
              <div className="text-xs font-bold text-apsrtc-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{bus.arrivalTime} (Next Day)</span>
              </div>
              <div className="text-xs text-apsrtc-slate-500 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-apsrtc-slate-400 shrink-0 mt-0.5" />
                <span>{booking.selectedDroppingPoint?.name}</span>
              </div>
            </div>
          </div>

          {/* Service & Coach Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-apsrtc-slate-50 p-3.5 rounded-xl border border-apsrtc-slate-200 text-xs">
            <div>
              <span className="text-[10px] text-apsrtc-slate-400 uppercase font-bold block">{t.serviceNoLabel}</span>
              <span className="font-extrabold text-apsrtc-slate-900">#{bus.serviceNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-apsrtc-slate-400 uppercase font-bold block">{t.busCategory}</span>
              <span className="font-extrabold text-apsrtc-slate-900 truncate block">{bus.busClassName}</span>
            </div>
            <div>
              <span className="text-[10px] text-apsrtc-slate-400 uppercase font-bold block">{t.seatNumbers}</span>
              <span className="font-black text-apsrtc-red text-sm">
                {booking.selectedSeats.map(s => s.seatNumber).join(', ')}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-apsrtc-slate-400 uppercase font-bold block">Conductor Help</span>
              <span className="font-bold text-apsrtc-slate-900">0866-2570005</span>
            </div>
          </div>

          {/* Passenger Roster */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-apsrtc-slate-500 mb-2">
              Booked Passengers
            </h4>
            <div className="divide-y divide-apsrtc-slate-100 border border-apsrtc-slate-200 rounded-xl overflow-hidden text-xs">
              {booking.passengers.map((p, idx) => (
                <div key={idx} className="p-2.5 px-3 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-apsrtc-slate-400" />
                    <span className="font-bold text-apsrtc-slate-900">{p.name}</span>
                    <span className="text-apsrtc-slate-500">({p.age} yrs, {p.gender})</span>
                    {p.isSeniorCitizen && (
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                        Senior Concession
                      </span>
                    )}
                  </div>
                  <span className="font-black text-apsrtc-slate-800">
                    Seat {p.seatNumber}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Conductor Boarding QR Barcode */}
          <div className="pt-4 border-t border-dashed border-apsrtc-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 bg-apsrtc-slate-900 rounded-xl p-1 flex items-center justify-center shrink-0">
                <QrCode className="w-18 h-18 text-white" />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-black text-apsrtc-slate-900 block">
                  Conductor Boarding QR
                </span>
                <p className="text-apsrtc-slate-500 text-[11px] leading-relaxed">
                  Present this digital QR on your phone to the bus conductor at boarding. Physical paper printout is not mandatory.
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-[10px] font-bold text-apsrtc-slate-400 uppercase block">
                Total Paid
              </span>
              <span className="text-2xl font-black text-apsrtc-red-dark">
                ₹{booking.selectedSeats.reduce((sum, s) => sum + s.fare, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-1.5 bg-white hover:bg-apsrtc-slate-50 text-apsrtc-slate-800 border border-apsrtc-slate-300 font-bold text-xs py-3 rounded-xl transition-all shadow-sm"
        >
          <Printer className="w-4 h-4 text-apsrtc-slate-600" />
          <span>{t.printTicket}</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-1.5 bg-white hover:bg-apsrtc-slate-50 text-apsrtc-slate-800 border border-apsrtc-slate-300 font-bold text-xs py-3 rounded-xl transition-all shadow-sm"
        >
          <Download className="w-4 h-4 text-apsrtc-red" />
          <span>{t.downloadPdf}</span>
        </button>

        <button
          onClick={handleShareWhatsApp}
          className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm"
        >
          <Share2 className="w-4 h-4" />
          <span>{t.shareWhatsApp}</span>
        </button>

        <button
          onClick={() => onTrackBus(booking.pnrNumber || '1105')}
          className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-apsrtc-red to-apsrtc-red-dark hover:from-apsrtc-red-dark hover:to-apsrtc-red text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm"
        >
          <Navigation className="w-4 h-4 text-amber-300" />
          <span>{t.trackThisBus}</span>
        </button>
      </div>

      {/* Book Another Journey */}
      <div className="text-center pt-2">
        <button
          onClick={onBookAnother}
          className="text-xs font-bold text-apsrtc-slate-500 hover:text-apsrtc-red underline"
        >
          &larr; Book Another Bus Ticket
        </button>
      </div>
    </div>
  );
};
