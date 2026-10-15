import { useState, useEffect } from 'react';
import { QrCode, ShieldCheck, Clock, ArrowRight, Smartphone, CreditCard } from 'lucide-react';
import { FareBreakup } from '../../core/fareEngine';
import { Language } from '../../types';
import { useI18n } from '../../core/i18n';

interface PaymentModalProps {
  fareBreakup: FareBreakup;
  currentLang: Language;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  fareBreakup,
  currentLang,
  onPaymentSuccess,
  onCancel
}) => {
  const { t } = useI18n(currentLang);
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes
  const [activeTab, setActiveTab] = useState<'UPI' | 'CARDS'>('UPI');
  const [upiId, setUpiId] = useState('9848012345@ibl');
  const [isProcessing, setIsProcessing] = useState(false);

  // 10-minute countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-apsrtc-slate-200 shadow-2xl overflow-hidden my-6">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-apsrtc-red to-apsrtc-red-dark text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300">
              Govt. of AP Certified Secure Gateway
            </span>
            <h3 className="text-xl font-black">
              {t.paymentTitle}
            </h3>
          </div>

          {/* Seat Hold Countdown */}
          <div className="bg-black/30 border border-white/20 px-3 py-1.5 rounded-xl text-right">
            <span className="text-[10px] text-white/80 block leading-tight">
              {t.seatLockWarning}
            </span>
            <span className="font-mono text-sm font-black text-amber-300 flex items-center justify-end gap-1">
              <Clock className="w-3.5 h-3.5" />
              {timeFormatted}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Fare Summary Breakdown Card */}
          <div className="bg-apsrtc-slate-50 border border-apsrtc-slate-200 rounded-xl p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between text-apsrtc-slate-700">
              <span>{t.baseFare}</span>
              <span className="font-bold">₹{fareBreakup.baseFareTotal}</span>
            </div>

            {fareBreakup.seniorConcessionAmount > 0 && (
              <div className="flex items-center justify-between text-emerald-700 font-semibold">
                <span>Senior Citizen Concession (25%)</span>
                <span>-₹{fareBreakup.seniorConcessionAmount}</span>
              </div>
            )}

            {fareBreakup.roundTripDiscountAmount > 0 && (
              <div className="flex items-center justify-between text-emerald-700 font-semibold">
                <span>Round-Trip Booking Discount (10%)</span>
                <span>-₹{fareBreakup.roundTripDiscountAmount}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-apsrtc-slate-700">
              <span>{t.gst}</span>
              <span className="font-bold">₹{fareBreakup.gstAmount}</span>
            </div>

            <div className="flex items-center justify-between text-apsrtc-slate-700">
              <span>{t.tollFee}</span>
              <span className="font-bold">₹{fareBreakup.tollFeeAmount}</span>
            </div>

            <div className="pt-2 border-t border-apsrtc-slate-200 flex items-center justify-between text-sm font-black text-apsrtc-slate-900">
              <span>{t.totalPayable}</span>
              <span className="text-lg text-apsrtc-red-dark">₹{fareBreakup.finalPayable}</span>
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div className="flex items-center gap-2 border-b border-apsrtc-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('UPI')}
              className={`flex items-center gap-2 pb-2 text-xs font-black border-b-2 transition-all ${
                activeTab === 'UPI'
                  ? 'border-apsrtc-red text-apsrtc-red'
                  : 'border-transparent text-apsrtc-slate-500 hover:text-apsrtc-slate-800'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>UPI (PhonePe, GPay, Paytm)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('CARDS')}
              className={`flex items-center gap-2 pb-2 text-xs font-black border-b-2 transition-all ${
                activeTab === 'CARDS'
                  ? 'border-apsrtc-red text-apsrtc-red'
                  : 'border-transparent text-apsrtc-slate-500 hover:text-apsrtc-slate-800'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Cards & NetBanking</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'UPI' ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                {/* Simulated Dynamic QR Code */}
                <div className="w-32 h-32 bg-white p-2 rounded-xl border border-apsrtc-slate-300 shadow-sm flex flex-col items-center justify-center shrink-0">
                  <div className="w-full h-full bg-apsrtc-slate-900 rounded p-1 flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-white" />
                  </div>
                </div>

                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="text-xs font-black text-amber-900 uppercase tracking-wide block">
                    Zero Extra Transaction Fee
                  </span>
                  <p className="text-xs text-apsrtc-slate-700 font-medium">
                    {t.scanQrCode}
                  </p>
                  <p className="text-[11px] text-apsrtc-slate-500">
                    Supports Google Pay, PhonePe, Paytm, CRED, BHIM & all Indian banks.
                  </p>
                </div>
              </div>

              {/* UPI ID Input */}
              <div>
                <label className="block text-xs font-bold text-apsrtc-slate-600 mb-1">
                  {t.enterUpiId}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@okhdfcbank"
                    className="flex-1 px-3 py-2.5 bg-white border border-apsrtc-slate-300 rounded-xl text-xs font-bold text-apsrtc-slate-900 focus:outline-none focus:ring-2 focus:ring-apsrtc-red"
                  />
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="px-4 py-2.5 bg-apsrtc-slate-800 hover:bg-apsrtc-slate-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    {t.verifyAndPay}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-apsrtc-slate-600 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4111 •••• •••• 1234"
                  className="w-full px-3 py-2.5 bg-white border border-apsrtc-slate-300 rounded-xl text-xs font-bold text-apsrtc-slate-900 focus:outline-none focus:ring-2 focus:ring-apsrtc-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-apsrtc-slate-600 mb-1">
                    Valid Thru (MM/YY)
                  </label>
                  <input
                    type="text"
                    placeholder="12/28"
                    className="w-full px-3 py-2.5 bg-white border border-apsrtc-slate-300 rounded-xl text-xs font-bold text-apsrtc-slate-900 focus:outline-none focus:ring-2 focus:ring-apsrtc-red"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-apsrtc-slate-600 mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    maxLength={3}
                    placeholder="•••"
                    className="w-full px-3 py-2.5 bg-white border border-apsrtc-slate-300 rounded-xl text-xs font-bold text-apsrtc-slate-900 focus:outline-none focus:ring-2 focus:ring-apsrtc-red"
                  />
                </div>
              </div>
            </div>
          )}

          {/* GovTech Trust Badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-apsrtc-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted &bull; Official APSRTC Payment Gateway</span>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="bg-apsrtc-slate-50 p-4 px-6 border-t border-apsrtc-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="text-xs font-bold text-apsrtc-slate-600 hover:text-apsrtc-slate-900"
          >
            Cancel & Return
          </button>

          <button
            type="button"
            onClick={handleSimulatePayment}
            disabled={isProcessing}
            className="px-6 py-3 bg-gradient-to-r from-apsrtc-red to-apsrtc-red-dark hover:from-apsrtc-red-dark hover:to-apsrtc-red text-white font-black text-sm rounded-xl shadow-lg shadow-apsrtc-red/25 flex items-center gap-2 active:scale-98 transition-all"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <span>Pay ₹{fareBreakup.finalPayable}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
