import React, { useState } from 'react';
import { User, Phone, Mail, ShieldAlert, ArrowRight, MessageSquare } from 'lucide-react';
import { Seat, Passenger, BookingContact, Language } from '../../types';
import { useI18n } from '../../core/i18n';

interface PassengerFormProps {
  selectedSeats: Seat[];
  currentLang: Language;
  onProceedToPayment: (passengers: Passenger[], contact: BookingContact) => void;
}

export const PassengerForm: React.FC<PassengerFormProps> = ({
  selectedSeats,
  currentLang,
  onProceedToPayment
}) => {
  const { t } = useI18n(currentLang);

  // Initialize passengers based on selected seats
  const [passengers, setPassengers] = useState<Passenger[]>(
    selectedSeats.map(seat => ({
      seatId: seat.id,
      seatNumber: seat.seatNumber,
      name: '',
      age: 28,
      gender: seat.status === 'LADIES_QUOTA' ? 'FEMALE' : 'MALE',
      isSeniorCitizen: false,
      fare: seat.fare
    }))
  );

  const [contact, setContact] = useState<BookingContact>({
    mobile: '9848012345',
    email: 'passenger@example.com',
    whatsAppOptIn: true
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePassengerChange = (index: number, updates: Partial<Passenger>) => {
    setPassengers(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...updates };
      // Auto-toggle senior citizen if age >= 60
      if (updates.age !== undefined) {
        copy[index].isSeniorCitizen = updates.age >= 60;
      }
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate passengers
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name.trim() || p.name.trim().length < 3) {
        setErrorMessage(`Please enter a valid full name for Passenger ${i + 1} (Seat ${p.seatNumber}).`);
        return;
      }
      if (!p.age || p.age < 1 || p.age > 110) {
        setErrorMessage(`Please enter a valid age (1-110) for Passenger ${i + 1}.`);
        return;
      }
    }

    // Validate contact
    const mobileDigits = contact.mobile.replace(/\D/g, '');
    if (mobileDigits.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number for ticket dispatch.');
      return;
    }

    if (!contact.email.includes('@') || !contact.email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    onProceedToPayment(passengers, contact);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-apsrtc-slate-200 p-5 sm:p-7 shadow-gov-card space-y-7">
      <div>
        <span className="text-xs font-bold text-apsrtc-red uppercase tracking-wider block">
          Step 3 of 3: Passenger & Contact Information
        </span>
        <h3 className="text-xl font-black text-apsrtc-slate-900">
          {t.passengerDetailsTitle}
        </h3>
        <p className="text-xs text-apsrtc-slate-500">
          {t.passengerDetailsSubtitle}
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2 animate-shake">
          <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Passenger Input Blocks */}
      <div className="space-y-4">
        {passengers.map((passenger, idx) => (
          <div
            key={passenger.seatId}
            className="p-4 sm:p-5 rounded-xl border border-apsrtc-slate-200 bg-apsrtc-slate-50/50 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-apsrtc-red text-white text-xs font-black flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-extrabold text-sm text-apsrtc-slate-900">
                  {t.passengerNumber} {idx + 1}
                </span>
                <span className="text-xs font-black bg-white px-2 py-0.5 rounded border border-apsrtc-slate-300 text-apsrtc-red">
                  Seat: {passenger.seatNumber}
                </span>
              </div>

              <span className="text-xs font-bold text-apsrtc-slate-500">
                Fare: ₹{passenger.fare}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
              {/* Full Name */}
              <div className="sm:col-span-6">
                <label className="block text-xs font-bold text-apsrtc-slate-600 mb-1">
                  {t.fullName} *
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-apsrtc-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(idx, { name: e.target.value })}
                    placeholder={t.enterName}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-apsrtc-slate-300 rounded-lg text-xs font-bold text-apsrtc-slate-900 focus:outline-none focus:ring-2 focus:ring-apsrtc-red"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-apsrtc-slate-600 mb-1">
                  {t.age} *
                </label>
                <input
                  type="number"
                  min="1"
                  max="110"
                  required
                  value={passenger.age}
                  onChange={(e) => handlePassengerChange(idx, { age: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-white border border-apsrtc-slate-300 rounded-lg text-xs font-bold text-apsrtc-slate-900 focus:outline-none focus:ring-2 focus:ring-apsrtc-red"
                />
              </div>

              {/* Gender */}
              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-apsrtc-slate-600 mb-1">
                  {t.gender} *
                </label>
                <select
                  value={passenger.gender}
                  onChange={(e) => handlePassengerChange(idx, { gender: e.target.value as any })}
                  className="w-full px-3 py-2 bg-white border border-apsrtc-slate-300 rounded-lg text-xs font-bold text-apsrtc-slate-900 focus:outline-none focus:ring-2 focus:ring-apsrtc-red cursor-pointer"
                >
                  <option value="MALE">{t.male}</option>
                  <option value="FEMALE">{t.female}</option>
                  <option value="OTHER">{t.other}</option>
                </select>
              </div>
            </div>

            {/* Senior Citizen Concession Option */}
            <div className="pt-2 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={passenger.isSeniorCitizen}
                  onChange={(e) => handlePassengerChange(idx, { isSeniorCitizen: e.target.checked })}
                  className="w-4 h-4 text-apsrtc-red rounded focus:ring-apsrtc-red accent-apsrtc-red"
                />
                <span className="text-xs font-bold text-apsrtc-slate-700">
                  {t.seniorCitizenConcession}
                </span>
              </label>

              {passenger.isSeniorCitizen && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  25% Concession Applied (-₹{Math.round(passenger.fare * 0.25)})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Primary Contact Information */}
      <div className="p-4 sm:p-5 rounded-xl border border-apsrtc-slate-200 bg-white space-y-4">
        <div>
          <h4 className="font-extrabold text-sm text-apsrtc-slate-900">
            {t.contactDetailsTitle}
          </h4>
          <p className="text-xs text-apsrtc-slate-500">
            {t.contactDetailsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Mobile Phone */}
          <div>
            <label className="block text-xs font-bold text-apsrtc-slate-600 mb-1">
              {t.mobileNumber} *
            </label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 text-apsrtc-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="tel"
                maxLength={10}
                required
                value={contact.mobile}
                onChange={(e) => setContact({ ...contact, mobile: e.target.value })}
                placeholder="9848012345"
                className="w-full pl-9 pr-3 py-2 bg-white border border-apsrtc-slate-300 rounded-lg text-xs font-bold text-apsrtc-slate-900 focus:outline-none focus:ring-2 focus:ring-apsrtc-red"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-apsrtc-slate-600 mb-1">
              {t.emailAddress} *
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-apsrtc-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="email"
                required
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                placeholder="passenger@example.com"
                className="w-full pl-9 pr-3 py-2 bg-white border border-apsrtc-slate-300 rounded-lg text-xs font-bold text-apsrtc-slate-900 focus:outline-none focus:ring-2 focus:ring-apsrtc-red"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Dispatch Opt-in */}
        <label className="flex items-center gap-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={contact.whatsAppOptIn}
            onChange={(e) => setContact({ ...contact, whatsAppOptIn: e.target.checked })}
            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-600 accent-emerald-600"
          />
          <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-emerald-900">
            {t.whatsAppOptIn}
          </span>
        </label>
      </div>

      {/* Submit Action */}
      <div className="pt-4 border-t border-apsrtc-slate-200 flex items-center justify-end">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-apsrtc-red to-apsrtc-red-dark hover:from-apsrtc-red-dark hover:to-apsrtc-red text-white font-black text-sm rounded-xl shadow-lg shadow-apsrtc-red/25 hover:shadow-xl active:scale-98 flex items-center justify-center gap-2 transition-all"
        >
          <span>{t.proceedToPayment}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
