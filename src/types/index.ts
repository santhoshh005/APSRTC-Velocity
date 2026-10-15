export type Language = 'en' | 'te';

export type BusClass = 
  | 'AMARAVATHI_VOLVO_AC'
  | 'GARUDA_PLUS_MULTI_AXLE'
  | 'INDRA_AC'
  | 'SUPER_LUXURY'
  | 'ULTRA_DELUXE'
  | 'EXPRESS';

export type SeatingType = 'SEATER' | 'SLEEPER' | 'SEATER_CUM_SLEEPER';

export type Deck = 'LOWER' | 'UPPER';

export type SeatStatus = 'AVAILABLE' | 'SELECTED' | 'BOOKED' | 'LADIES_QUOTA' | 'SENIOR_QUOTA';

export interface Station {
  id: string;
  name: string;
  teluguName: string;
  district: string;
  state: string;
  isMajorHub: boolean;
  boardingPoints: BoardingPoint[];
}

export interface BoardingPoint {
  id: string;
  name: string;
  landmark: string;
  contactPhone: string;
  timeOffsetMinutes: number; // offset from service departure time
}

export interface Seat {
  id: string;
  seatNumber: string;
  deck: Deck;
  row: number;
  column: number;
  isBerth: boolean;
  berthType?: 'LOWER_SINGLE' | 'LOWER_DOUBLE' | 'UPPER_SINGLE' | 'UPPER_DOUBLE' | 'SEAT';
  fare: number;
  status: SeatStatus;
}

export interface BusAmenity {
  id: string;
  label: string;
  teluguLabel: string;
  iconName: 'wifi' | 'charging' | 'water' | 'blanket' | 'tracking' | 'reading_light';
}

export interface BusService {
  id: string;
  serviceNumber: string;
  busClass: BusClass;
  busClassName: string;
  busClassTeluguName: string;
  seatingType: SeatingType;
  origin: string;
  originTelugu: string;
  destination: string;
  destinationTelugu: string;
  departureTime: string; // "21:30"
  arrivalTime: string;   // "05:45"
  duration: string;      // "8h 15m"
  baseFare: number;
  availableSeatsCount: number;
  amenities: BusAmenity[];
  lowerDeckSeats: Seat[];
  upperDeckSeats?: Seat[];
  boardingPoints: BoardingPoint[];
  droppingPoints: BoardingPoint[];
  hasLiveGps: boolean;
  currentGpsStatus?: {
    currentLocation: string;
    speedKmH: number;
    delayMinutes: number;
    lastUpdated: string;
  };
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  isRoundTrip: boolean;
}

export interface FilterState {
  busClasses: BusClass[];
  seatingTypes: SeatingType[];
  departureTimeSlots: ('early_morning' | 'morning' | 'afternoon' | 'night')[];
  acOnly: boolean | null;
  boardingPoint: string | null;
  droppingPoint: string | null;
  sortBy: 'departure_asc' | 'departure_desc' | 'fare_asc' | 'seats_desc';
}

export interface Passenger {
  seatId: string;
  seatNumber: string;
  name: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  isSeniorCitizen: boolean;
  fare: number;
}

export interface BookingContact {
  mobile: string;
  email: string;
  whatsAppOptIn: boolean;
}

export interface BookingState {
  searchParams: SearchParams;
  selectedBus: BusService | null;
  selectedSeats: Seat[];
  selectedBoardingPoint: BoardingPoint | null;
  selectedDroppingPoint: BoardingPoint | null;
  passengers: Passenger[];
  contact: BookingContact;
  pnrNumber?: string;
  bookingTimestamp?: string;
}

export type BookingStep = 
  | 'SEARCH'
  | 'RESULTS'
  | 'SEATS'
  | 'PASSENGERS'
  | 'PAYMENT'
  | 'CONFIRMED'
  | 'TRACKING'
  | 'MANAGE';
