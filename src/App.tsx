import { useState, useMemo } from 'react';
import { 
  Language, 
  BookingStep, 
  SearchParams, 
  FilterState, 
  BusService, 
  Seat, 
  BoardingPoint, 
  Passenger, 
  BookingContact, 
  BookingState 
} from './types';
import { useI18n } from './core/i18n';
import { generateBusSchedules } from './core/busScheduleEngine';
import { calculateFare } from './core/fareEngine';

// Components
import { GlobalHeader } from './components/common/GlobalHeader';
import { GovFooter } from './components/common/GovFooter';
import { HeroSearchCard } from './components/search/HeroSearchCard';
import { PromotionalTicker } from './components/search/PromotionalTicker';
import { PopularCorridors } from './components/search/PopularCorridors';
import { SearchSummaryBar } from './components/results/SearchSummaryBar';
import { FilterSidebar } from './components/results/FilterSidebar';
import { BusCard } from './components/results/BusCard';
import { InteractiveBusDeck } from './components/seatmap/InteractiveBusDeck';
import { BoardingDroppingPicker } from './components/checkout/BoardingDroppingPicker';
import { PassengerForm } from './components/checkout/PassengerForm';
import { PaymentModal } from './components/checkout/PaymentModal';
import { DigitalTicketCard } from './components/ticket/DigitalTicketCard';
import { LiveTrackPortal } from './components/tracking/LiveTrackPortal';
import { ManageBookingModal } from './components/manage/ManageBookingModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentStep, setCurrentStep] = useState<BookingStep>('SEARCH');
  const { t } = useI18n(currentLang);

  // Search State
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

  const [searchParams, setSearchParams] = useState<SearchParams>({
    origin: 'HYDERABAD',
    destination: 'VIJAYAWADA',
    departureDate: tomorrowStr,
    isRoundTrip: false
  });

  // Services State
  const [buses, setBuses] = useState<BusService[]>(() => 
    generateBusSchedules(searchParams.origin, searchParams.destination, searchParams.departureDate)
  );

  // Filter State
  const [filterState, setFilterState] = useState<FilterState>({
    busClasses: [],
    seatingTypes: [],
    departureTimeSlots: [],
    acOnly: null,
    boardingPoint: null,
    droppingPoint: null,
    sortBy: 'departure_asc'
  });

  // Selection & Booking State
  const [selectedBus, setSelectedBus] = useState<BusService | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedBoarding, setSelectedBoarding] = useState<BoardingPoint | null>(null);
  const [selectedDropping, setSelectedDropping] = useState<BoardingPoint | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contact, setContact] = useState<BookingContact>({
    mobile: '9848012345',
    email: 'passenger@example.com',
    whatsAppOptIn: true
  });

  const [confirmedBooking, setConfirmedBooking] = useState<BookingState | null>(null);
  const [activeTrackingPnr, setActiveTrackingPnr] = useState<string>('1105');
  const [showManageModal, setShowManageModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fare calculation
  const fareBreakup = useMemo(() => {
    if (!selectedBus) {
      return {
        baseFareTotal: 0,
        seniorConcessionAmount: 0,
        roundTripDiscountAmount: 0,
        gstAmount: 0,
        tollFeeAmount: 0,
        finalPayable: 0
      };
    }
    return calculateFare(selectedSeats, passengers, selectedBus.busClass, searchParams.isRoundTrip);
  }, [selectedSeats, passengers, selectedBus, searchParams.isRoundTrip]);

  // Filter logic
  const filteredBuses = useMemo(() => {
    return buses.filter(bus => {
      if (filterState.acOnly !== null) {
        const isAc = bus.busClass.includes('AC') || bus.busClass.includes('VOLVO') || bus.busClass.includes('GARUDA') || bus.busClass.includes('INDRA');
        if (filterState.acOnly && !isAc) return false;
        if (!filterState.acOnly && isAc) return false;
      }

      if (filterState.seatingTypes.length > 0) {
        const match = filterState.seatingTypes.some(type => {
          if (type === 'SLEEPER') return bus.seatingType === 'SLEEPER' || bus.seatingType === 'SEATER_CUM_SLEEPER';
          if (type === 'SEATER') return bus.seatingType === 'SEATER';
          return false;
        });
        if (!match) return false;
      }

      if (filterState.departureTimeSlots.length > 0) {
        const hour = parseInt(bus.departureTime.split(':')[0], 10);
        const match = filterState.departureTimeSlots.some(slot => {
          if (slot === 'early_morning') return hour >= 0 && hour < 6;
          if (slot === 'morning') return hour >= 6 && hour < 12;
          if (slot === 'afternoon') return hour >= 12 && hour < 18;
          if (slot === 'night') return hour >= 18 && hour < 24;
          return false;
        });
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'departure_asc') {
        return a.departureTime.localeCompare(b.departureTime);
      } else if (filterState.sortBy === 'departure_desc') {
        return b.departureTime.localeCompare(a.departureTime);
      } else if (filterState.sortBy === 'fare_asc') {
        return a.baseFare - b.baseFare;
      } else if (filterState.sortBy === 'seats_desc') {
        return b.availableSeatsCount - a.availableSeatsCount;
      }
      return 0;
    });
  }, [buses, filterState]);

  // Handlers
  const handleSearchSubmit = (params: SearchParams) => {
    setSearchParams(params);
    const newBuses = generateBusSchedules(params.origin, params.destination, params.departureDate);
    setBuses(newBuses);
    setSelectedBus(null);
    setSelectedSeats([]);
    setCurrentStep('RESULTS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPopularRoute = (origin: string, destination: string) => {
    const updated = {
      ...searchParams,
      origin,
      destination
    };
    handleSearchSubmit(updated);
  };

  const handleSelectBus = (bus: BusService) => {
    if (selectedBus?.id === bus.id && currentStep === 'SEATS') {
      // Toggle close
      setSelectedBus(null);
      setSelectedSeats([]);
      setCurrentStep('RESULTS');
    } else {
      setSelectedBus(bus);
      setSelectedSeats([]);
      setSelectedBoarding(bus.boardingPoints[0] || null);
      setSelectedDropping(bus.droppingPoints[0] || null);
      setCurrentStep('SEATS');
    }
  };

  const handleSeatToggle = (seat: Seat) => {
    setSelectedSeats(prev => {
      const exists = prev.some(s => s.id === seat.id);
      if (exists) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const handleProceedToPickup = () => {
    setCurrentStep('PASSENGERS');
  };

  const handleProceedToPayment = (passengerList: Passenger[], contactData: BookingContact) => {
    setPassengers(passengerList);
    setContact(contactData);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    const randomPnr = `APS-${selectedBus?.serviceNumber || '1105'}-${Math.floor(1000 + Math.random() * 9000)}`;

    const confirmed: BookingState = {
      searchParams,
      selectedBus,
      selectedSeats,
      selectedBoardingPoint: selectedBoarding,
      selectedDroppingPoint: selectedDropping,
      passengers,
      contact,
      pnrNumber: randomPnr,
      bookingTimestamp: new Date().toLocaleString()
    };

    setConfirmedBooking(confirmed);
    setActiveTrackingPnr(randomPnr);
    setCurrentStep('CONFIRMED');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackBus = (pnr: string) => {
    setActiveTrackingPnr(pnr);
    setCurrentStep('TRACKING');
    setShowManageModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-apsrtc-slate-50 text-apsrtc-slate-900 font-sans selection:bg-apsrtc-red-light selection:text-apsrtc-red-dark">
      {/* Global Header */}
      <GlobalHeader
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentStep={currentStep}
        onNavigate={(step) => {
          if (step === 'MANAGE') {
            setShowManageModal(true);
          } else {
            setCurrentStep(step);
          }
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* VIEW 1: SEARCH & HOMEPAGE */}
        {currentStep === 'SEARCH' && (
          <div>
            {/* Hero Section with Search Card */}
            <section className="relative bg-gradient-to-b from-apsrtc-red-dark via-apsrtc-red to-apsrtc-slate-900 text-white pt-8 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
              {/* Subtle Decorative Transit Grid */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                  <div className="inline-flex items-center gap-1.5 bg-black/30 border border-white/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    <span>ఆంధ్రప్రదేశ్ రాష్ట్ర రోడ్డు రవాణా సంస్థ &bull; APSRTC Official</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                    {t.heroTitle}
                  </h1>
                  <p className="text-sm sm:text-base text-white/85 font-medium">
                    {t.heroSubtitle}
                  </p>
                </div>

                {/* Hero Booking Card Component */}
                <div className="max-w-4xl mx-auto">
                  <HeroSearchCard
                    currentLang={currentLang}
                    onSearch={handleSearchSubmit}
                    initialParams={searchParams}
                  />
                </div>
              </div>
            </section>

            {/* Container for Below-the-fold content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Promotional Ticker (Replaces legacy marquee) */}
              <PromotionalTicker currentLang={currentLang} />

              {/* Popular Corridors Cards */}
              <PopularCorridors
                currentLang={currentLang}
                onSelectRoute={handleSelectPopularRoute}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: SEARCH RESULTS & SEAT PICKER */}
        {(currentStep === 'RESULTS' || currentStep === 'SEATS' || currentStep === 'PASSENGERS') && (
          <div>
            {/* Sticky Search Summary Bar */}
            <SearchSummaryBar
              searchParams={searchParams}
              totalBuses={filteredBuses.length}
              currentLang={currentLang}
              onModifySearch={() => setCurrentStep('SEARCH')}
              onToggleMobileFilters={() => setShowMobileFilters(!showMobileFilters)}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Desktop Filter Sidebar */}
                <div className={`lg:col-span-4 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                  <FilterSidebar
                    currentLang={currentLang}
                    filterState={filterState}
                    onFilterChange={setFilterState}
                    onReset={() => setFilterState({
                      busClasses: [],
                      seatingTypes: [],
                      departureTimeSlots: [],
                      acOnly: null,
                      boardingPoint: null,
                      droppingPoint: null,
                      sortBy: 'departure_asc'
                    })}
                  />
                </div>

                {/* Main Results / Selection Area */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Step 2: Passenger Details Form */}
                  {currentStep === 'PASSENGERS' && selectedBus && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setCurrentStep('SEATS')}
                          className="text-xs font-bold text-apsrtc-red hover:underline"
                        >
                          &larr; Back to Seat Selection
                        </button>
                      </div>

                      {/* Boarding and Dropping Point Selector */}
                      <BoardingDroppingPicker
                        boardingPoints={selectedBus.boardingPoints}
                        droppingPoints={selectedBus.droppingPoints}
                        selectedBoarding={selectedBoarding}
                        selectedDropping={selectedDropping}
                        currentLang={currentLang}
                        onSelectBoarding={setSelectedBoarding}
                        onSelectDropping={setSelectedDropping}
                        onProceed={() => {}}
                      />

                      {/* Passenger Details Form */}
                      <PassengerForm
                        selectedSeats={selectedSeats}
                        currentLang={currentLang}
                        onProceedToPayment={handleProceedToPayment}
                      />
                    </div>
                  )}

                  {/* Step 1: Bus Seat Layout Deck */}
                  {currentStep === 'SEATS' && selectedBus && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedBus(null);
                            setSelectedSeats([]);
                            setCurrentStep('RESULTS');
                          }}
                          className="text-xs font-bold text-apsrtc-red hover:underline"
                        >
                          &larr; Back to Bus Services List
                        </button>
                      </div>

                      {/* Bus Card Highlight */}
                      <BusCard
                        bus={selectedBus}
                        currentLang={currentLang}
                        isSelected={true}
                        onSelectBus={handleSelectBus}
                      />

                      {/* Interactive Seat Canvas */}
                      <InteractiveBusDeck
                        bus={selectedBus}
                        selectedSeats={selectedSeats}
                        currentLang={currentLang}
                        onSeatToggle={handleSeatToggle}
                        onProceed={handleProceedToPickup}
                      />
                    </div>
                  )}

                  {/* Service Cards List */}
                  {currentStep === 'RESULTS' && (
                    <div className="space-y-4">
                      {filteredBuses.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-apsrtc-slate-200 p-12 text-center space-y-3">
                          <p className="font-extrabold text-base text-apsrtc-slate-800">
                            No buses found matching your active filter criteria.
                          </p>
                          <p className="text-xs text-apsrtc-slate-500">
                            Try resetting AC or time filters to view all available state services.
                          </p>
                          <button
                            onClick={() => setFilterState({
                              busClasses: [],
                              seatingTypes: [],
                              departureTimeSlots: [],
                              acOnly: null,
                              boardingPoint: null,
                              droppingPoint: null,
                              sortBy: 'departure_asc'
                            })}
                            className="px-4 py-2 bg-apsrtc-red text-white text-xs font-bold rounded-lg shadow"
                          >
                            Reset Filters
                          </button>
                        </div>
                      ) : (
                        filteredBuses.map(bus => (
                          <BusCard
                            key={bus.id}
                            bus={bus}
                            currentLang={currentLang}
                            isSelected={selectedBus?.id === bus.id}
                            onSelectBus={handleSelectBus}
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: CONFIRMED TICKET */}
        {currentStep === 'CONFIRMED' && confirmedBooking && (
          <div className="px-4 sm:px-6 lg:px-8">
            <DigitalTicketCard
              booking={confirmedBooking}
              currentLang={currentLang}
              onTrackBus={handleTrackBus}
              onBookAnother={() => {
                setSelectedBus(null);
                setSelectedSeats([]);
                setConfirmedBooking(null);
                setCurrentStep('SEARCH');
              }}
            />
          </div>
        )}

        {/* VIEW 4: LIVE GPS BUS TRACKING */}
        {currentStep === 'TRACKING' && (
          <div className="px-4 sm:px-6 lg:px-8">
            <LiveTrackPortal
              currentLang={currentLang}
              initialPnr={activeTrackingPnr}
            />
          </div>
        )}
      </main>

      {/* Payment Modal */}
      {showPaymentModal && selectedBus && (
        <PaymentModal
          fareBreakup={fareBreakup}
          currentLang={currentLang}
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={() => setShowPaymentModal(false)}
        />
      )}

      {/* Manage Booking & Cancellation Modal */}
      {showManageModal && (
        <ManageBookingModal
          currentLang={currentLang}
          onClose={() => setShowManageModal(false)}
          onTrackBus={handleTrackBus}
        />
      )}

      {/* GovFooter */}
      <GovFooter currentLang={currentLang} />
    </div>
  );
}
