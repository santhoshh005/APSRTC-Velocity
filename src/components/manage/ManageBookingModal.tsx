import { useState } from 'react';
import { Search, AlertTriangle, CheckCircle2, Ticket } from 'lucide-react';
import { Language } from '../../types';
import { calculateCancellationRefund, CancellationRefundEstimate } from '../../core/fareEngine';

interface ManageBookingModalProps {
  currentLang: Language;
  onClose: () => void;
  onTrackBus: (pnr: string) => void;
}

export const ManageBookingModal: React.FC<ManageBookingModalProps> = ({
  onClose,
  onTrackBus
}) => {
  const [pnr, setPnr] = useState('APS-1105-8842');
  const [mobile, setMobile] = useState('9848012345');
  const [searched, setSearched] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [hoursBefore, setHoursBefore] = useState(36); // Default 36 hours before departure

  const mockPaidAmount = 980;
  const refundEstimate: CancellationRefundEstimate = calculateCancellationRefund(mockPaidAmount, hoursBefore);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const handleConfirmCancel = () => {
    if (window.confirm('Are you sure you want to cancel this ticket? This action cannot be undone.')) {
      setIsCancelled(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-apsrtc-slate-200 shadow-2xl overflow-hidden my-6">
        {/* Top Header */}
        <div className="bg-apsrtc-red-dark text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Ticket className="w-5 h-5 text-amber-300" />
            <h3 className="font-black text-lg">
              Manage Booking & Ticket Cancellation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xs font-bold px-2 py-1 bg-white/10 rounded-lg"
          >
            ✕ Close
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Lookup Form */}
          <form onSubmit={handleSearch} className="space-y-3 bg-apsrtc-slate-50 p-4 rounded-2xl border border-apsrtc-slate-200">
            <span className="text-xs font-bold text-apsrtc-slate-600 uppercase tracking-wider block">
              Search Existing Reservation
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-apsrtc-slate-500 mb-1">
                  PNR Number
                </label>
                <input
                  type="text"
                  value={pnr}
                  onChange={(e) => setPnr(e.target.value)}
                  placeholder="APS-1105-8842"
                  className="w-full px-3 py-2 bg-white border border-apsrtc-slate-300 rounded-lg text-xs font-bold text-apsrtc-slate-900 focus:outline-none focus:ring-2 focus:ring-apsrtc-red"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-apsrtc-slate-500 mb-1">
                  Passenger Mobile Number
                </label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9848012345"
                  className="w-full px-3 py-2 bg-white border border-apsrtc-slate-300 rounded-lg text-xs font-bold text-apsrtc-slate-900 focus:outline-none focus:ring-2 focus:ring-apsrtc-red"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-apsrtc-red hover:bg-apsrtc-red-dark text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Fetch Ticket Details</span>
            </button>
          </form>

          {/* Ticket Details Display */}
          {searched && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl border border-apsrtc-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-apsrtc-slate-100">
                  <div>
                    <span className="text-[10px] font-bold text-apsrtc-slate-400 uppercase block">PNR Number</span>
                    <span className="font-mono text-sm font-black text-apsrtc-red">{pnr}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isCancelled
                      ? 'bg-red-100 text-red-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {isCancelled ? 'CANCELLED' : 'CONFIRMED'}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-apsrtc-slate-500">Route:</span>
                    <span className="font-bold text-apsrtc-slate-800">HYDERABAD &rarr; VIJAYAWADA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apsrtc-slate-500">Service:</span>
                    <span className="font-bold text-apsrtc-slate-800">#1105 Amaravathi Volvo AC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apsrtc-slate-500">Seat(s):</span>
                    <span className="font-bold text-apsrtc-slate-800">L1 (Single Berth)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apsrtc-slate-500">Fare Paid:</span>
                    <span className="font-black text-apsrtc-slate-900">₹{mockPaidAmount}</span>
                  </div>
                </div>

                {!isCancelled && (
                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => onTrackBus(pnr)}
                      className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 transition-colors"
                    >
                      Track Live Bus GPS &rarr;
                    </button>
                  </div>
                )}
              </div>

              {/* Cancellation Simulator */}
              {!isCancelled ? (
                <div className="bg-red-50/60 border border-red-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-900">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Official APSRTC Cancellation Refund Policy</span>
                  </div>

                  {/* Hours before departure slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-apsrtc-slate-600 mb-1">
                      <span>Simulate Hours Before Departure:</span>
                      <span className="text-apsrtc-red">{hoursBefore} Hours</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="48"
                      value={hoursBefore}
                      onChange={(e) => setHoursBefore(parseInt(e.target.value))}
                      className="w-full accent-apsrtc-red cursor-pointer"
                    />
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-red-200 text-xs space-y-1.5">
                    <p className="text-[11px] text-apsrtc-slate-600 font-medium">
                      {refundEstimate.policyDescription}
                    </p>
                    <div className="flex justify-between pt-1 border-t border-apsrtc-slate-100">
                      <span className="text-apsrtc-slate-500">Cancellation Charge ({refundEstimate.cancellationPercentage}%):</span>
                      <span className="font-bold text-red-600">-₹{refundEstimate.deductionAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-apsrtc-slate-900">
                      <span>Net Refund Payable to UPI/Card:</span>
                      <span className="text-emerald-700">₹{refundEstimate.refundAmount}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmCancel}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow transition-all active:scale-95"
                  >
                    Cancel Ticket & Initiate ₹{refundEstimate.refundAmount} Refund
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Ticket Cancelled Successfully</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Refund of ₹{refundEstimate.refundAmount} initiated to source payment method. Expected credit in 2-3 business days.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
