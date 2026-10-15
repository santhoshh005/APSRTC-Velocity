import { useState } from 'react';
import { Navigation, Search, Phone, Gauge, Bus } from 'lucide-react';
import { Language } from '../../types';
import { useI18n } from '../../core/i18n';
import { fetchLiveBusTelemetry, LiveTelemetryData } from '../../core/trackingService';

interface LiveTrackPortalProps {
  currentLang: Language;
  initialPnr?: string;
}

export const LiveTrackPortal: React.FC<LiveTrackPortalProps> = ({
  currentLang,
  initialPnr = ''
}) => {
  const { t } = useI18n(currentLang);
  const [query, setQuery] = useState(initialPnr || '1105');
  const [telemetry, setTelemetry] = useState<LiveTelemetryData>(() => fetchLiveBusTelemetry(initialPnr || '1105'));

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setTelemetry(fetchLiveBusTelemetry(query.trim()));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 my-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-apsrtc-slate-900 to-apsrtc-red-dark text-white p-6 sm:p-8 rounded-3xl shadow-gov-card border border-apsrtc-slate-800">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
          <Navigation className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Satellite GPS Telemetry Active</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
          {t.liveTrackTitle}
        </h2>
        <p className="text-xs text-apsrtc-slate-300 max-w-xl mt-1">
          {t.liveTrackSubtitle}
        </p>

        {/* Search Input Bar */}
        <form onSubmit={handleTrack} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-apsrtc-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter PNR or Service No (e.g. 1105)"
              className="w-full pl-10 pr-3 py-3 bg-white text-apsrtc-slate-900 font-bold text-sm rounded-xl border border-apsrtc-slate-300 focus:outline-none focus:ring-2 focus:ring-apsrtc-gold shadow"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl shadow transition-all active:scale-95"
          >
            {t.locateBus}
          </button>
        </form>
      </div>

      {/* Live Telemetry Dashboard */}
      {telemetry && (
        <div className="space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Status */}
            <div className="bg-white p-4 rounded-2xl border border-apsrtc-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-apsrtc-slate-400 uppercase block">Status</span>
              <span className="inline-flex items-center gap-1.5 font-black text-sm text-emerald-700 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {t.onTime}
              </span>
            </div>

            {/* Current Speed */}
            <div className="bg-white p-4 rounded-2xl border border-apsrtc-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-apsrtc-slate-400 uppercase block">{t.busSpeed}</span>
              <span className="font-black text-sm text-apsrtc-slate-900 flex items-center gap-1 mt-1">
                <Gauge className="w-4 h-4 text-apsrtc-red" />
                {telemetry.currentSpeedKmH} km/h
              </span>
            </div>

            {/* Vehicle Number */}
            <div className="bg-white p-4 rounded-2xl border border-apsrtc-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-apsrtc-slate-400 uppercase block">Vehicle Reg #</span>
              <span className="font-mono font-black text-sm text-apsrtc-slate-900 mt-1 block">
                {telemetry.registrationNumber}
              </span>
            </div>

            {/* Conductor / Driver Contact */}
            <div className="bg-white p-4 rounded-2xl border border-apsrtc-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-apsrtc-slate-400 uppercase block">Depot Helpline</span>
              <span className="font-bold text-xs text-apsrtc-slate-700 flex items-center gap-1 mt-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                {telemetry.driverContactMasked}
              </span>
            </div>
          </div>

          {/* Current Location Highlight Card */}
          <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow">
                <Bus className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block">
                  Current Real-Time Location
                </span>
                <span className="font-black text-base text-apsrtc-slate-900">
                  {telemetry.currentLocationName}
                </span>
                <span className="text-xs text-apsrtc-slate-500 block mt-0.5">
                  GPS Coordinates: {telemetry.gpsCoordinates.lat}° N, {telemetry.gpsCoordinates.lng}° E &bull; Updated {telemetry.lastPingTimestamp}
                </span>
              </div>
            </div>

            <div className="bg-white px-3 py-1.5 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 shadow-sm self-start sm:self-auto">
              Service #{telemetry.serviceNumber}
            </div>
          </div>

          {/* Checkpoint Stepper */}
          <div className="bg-white rounded-2xl border border-apsrtc-slate-200 p-6 shadow-sm space-y-6">
            <div className="border-b border-apsrtc-slate-100 pb-3">
              <h3 className="font-black text-base text-apsrtc-slate-900">
                {t.routeMilestones}
              </h3>
              <p className="text-xs text-apsrtc-slate-500">
                Real-time transit log tracked via vehicle telematics unit (VTU)
              </p>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-apsrtc-slate-200">
              {telemetry.waypoints.map((wp) => (
                <div key={wp.id} className="relative flex items-start gap-4 pl-1">
                  {/* Stepper Node Icon */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold shadow-sm ${
                    wp.isPassed
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : wp.isCurrent
                      ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-bounce'
                      : 'bg-white border-2 border-apsrtc-slate-300 text-apsrtc-slate-400'
                  }`}>
                    {wp.isPassed ? '✓' : wp.isCurrent ? '•' : '○'}
                  </div>

                  {/* Waypoint Text Info */}
                  <div className="flex-1 bg-apsrtc-slate-50 p-3.5 rounded-xl border border-apsrtc-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-extrabold text-sm text-apsrtc-slate-900">
                        {wp.name}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded w-fit ${
                        wp.isPassed
                          ? 'bg-emerald-100 text-emerald-800'
                          : wp.isCurrent
                          ? 'bg-amber-100 text-amber-900 font-black'
                          : 'bg-apsrtc-slate-200 text-apsrtc-slate-600'
                      }`}>
                        {wp.actualOrEstimatedTime}
                      </span>
                    </div>

                    <div className="text-xs text-apsrtc-slate-500 mt-1 flex items-center gap-2">
                      <span className="font-telugu">{wp.teluguName}</span>
                      <span>&bull;</span>
                      <span>Scheduled: {wp.scheduledTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
