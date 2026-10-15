import { BusService, BusClass, SeatingType, Seat, BusAmenity, BoardingPoint } from '../types';
import { MAJOR_STATIONS } from './stationIndex';

const STANDARD_AMENITIES: Record<string, BusAmenity> = {
  wifi: { id: 'wifi', label: 'Free Wi-Fi', teluguLabel: 'ఉచిత వై-ఫై', iconName: 'wifi' },
  charging: { id: 'charging', label: 'USB Charging Points', teluguLabel: 'ఛార్జింగ్ పాయింట్లు', iconName: 'charging' },
  water: { id: 'water', label: 'Water Bottle Included', teluguLabel: 'మంచినీటి సీసా', iconName: 'water' },
  blanket: { id: 'blanket', label: 'Clean Blanket & Pillow', teluguLabel: 'దుప్పటి & దిండు', iconName: 'blanket' },
  tracking: { id: 'tracking', label: 'Live GPS Tracking', teluguLabel: 'లైవ్ జీపీఎస్ ట్రాకింగ్', iconName: 'tracking' },
  reading: { id: 'reading', label: 'Reading Lights', teluguLabel: 'రీడింగ్ లైట్లు', iconName: 'reading_light' }
};

function generateSeatMap(seatingType: SeatingType, baseFare: number) {
  const lowerDeckSeats: Seat[] = [];
  const upperDeckSeats: Seat[] = [];

  if (seatingType === 'SLEEPER' || seatingType === 'SEATER_CUM_SLEEPER') {
    // 2+1 Berth Layout
    let seatNum = 1;
    // Lower Deck
    for (let row = 1; row <= 6; row++) {
      // Single Berth (Left)
      const isLadies = row <= 2;
      const isBooked = row === 3 || row === 5;
      lowerDeckSeats.push({
        id: `L-${seatNum}`,
        seatNumber: `L${seatNum}`,
        deck: 'LOWER',
        row,
        column: 1,
        isBerth: true,
        berthType: 'LOWER_SINGLE',
        fare: baseFare + 120,
        status: isBooked ? 'BOOKED' : isLadies ? 'LADIES_QUOTA' : 'AVAILABLE'
      });
      seatNum++;

      // Double Berths (Right)
      for (let col = 2; col <= 3; col++) {
        const isDoubleBooked = (row + col) % 3 === 0;
        lowerDeckSeats.push({
          id: `L-${seatNum}`,
          seatNumber: `L${seatNum}`,
          deck: 'LOWER',
          row,
          column: col,
          isBerth: true,
          berthType: 'LOWER_DOUBLE',
          fare: baseFare + 80,
          status: isDoubleBooked ? 'BOOKED' : 'AVAILABLE'
        });
        seatNum++;
      }
    }

    // Upper Deck
    let upperSeatNum = 1;
    for (let row = 1; row <= 6; row++) {
      const isUpperBooked = row % 2 === 0;
      upperDeckSeats.push({
        id: `U-${upperSeatNum}`,
        seatNumber: `U${upperSeatNum}`,
        deck: 'UPPER',
        row,
        column: 1,
        isBerth: true,
        berthType: 'UPPER_SINGLE',
        fare: baseFare + 100,
        status: isUpperBooked ? 'BOOKED' : 'AVAILABLE'
      });
      upperSeatNum++;

      for (let col = 2; col <= 3; col++) {
        const isUpperDoubleBooked = (row * col) % 4 === 0;
        upperDeckSeats.push({
          id: `U-${upperSeatNum}`,
          seatNumber: `U${upperSeatNum}`,
          deck: 'UPPER',
          row,
          column: col,
          isBerth: true,
          berthType: 'UPPER_DOUBLE',
          fare: baseFare + 50,
          status: isUpperDoubleBooked ? 'BOOKED' : 'AVAILABLE'
        });
        upperSeatNum++;
      }
    }
  } else {
    // 2+2 Seater Layout (e.g. Super Luxury / Amaravathi Seater)
    let seatNum = 1;
    for (let row = 1; row <= 9; row++) {
      for (let col = 1; col <= 4; col++) {
        // First 2 rows (seats 1-8) have 4 reserved for ladies quota
        const isLadies = (row === 1 || row === 2) && (col === 3 || col === 4);
        const isBooked = (row * 4 + col) % 5 === 0 || (row === 3 && col === 2);
        lowerDeckSeats.push({
          id: `S-${seatNum}`,
          seatNumber: `${seatNum}`,
          deck: 'LOWER',
          row,
          column: col,
          isBerth: false,
          berthType: 'SEAT',
          fare: baseFare,
          status: isBooked ? 'BOOKED' : isLadies ? 'LADIES_QUOTA' : 'AVAILABLE'
        });
        seatNum++;
      }
    }
  }

  return { lowerDeckSeats, upperDeckSeats: upperDeckSeats.length > 0 ? upperDeckSeats : undefined };
}

export function generateBusSchedules(origin: string, destination: string, travelDate: string): BusService[] {
  const originStation = MAJOR_STATIONS.find(s => s.name === origin) || MAJOR_STATIONS[0];
  const destStation = MAJOR_STATIONS.find(s => s.name === destination) || MAJOR_STATIONS[1];

  const defaultBoarding: BoardingPoint[] = originStation.boardingPoints;
  const defaultDropping: BoardingPoint[] = destStation.boardingPoints;

  const schedulesConfig = [
    {
      serviceNumber: '1105',
      busClass: 'AMARAVATHI_VOLVO_AC' as BusClass,
      busClassName: 'Amaravathi Multi-Axle Volvo AC',
      busClassTeluguName: 'అమరావతి మల్టీ-యాక్సిల్ వోల్వో ఎసి',
      seatingType: 'SLEEPER' as SeatingType,
      departureTime: '21:30',
      arrivalTime: '05:45',
      duration: '8h 15m',
      baseFare: 980,
      amenities: [STANDARD_AMENITIES.wifi, STANDARD_AMENITIES.charging, STANDARD_AMENITIES.water, STANDARD_AMENITIES.blanket, STANDARD_AMENITIES.tracking, STANDARD_AMENITIES.reading],
      hasLiveGps: true,
      currentLocation: 'Near Suryapet Highway Junction (NH-65)',
      speedKmH: 78,
      delayMinutes: 0
    },
    {
      serviceNumber: '2418',
      busClass: 'GARUDA_PLUS_MULTI_AXLE' as BusClass,
      busClassName: 'Garuda Plus Scania AC Multi-Axle',
      busClassTeluguName: 'గరుడ ప్లస్ స్కానియా ఎసి మల్టీ-యాక్సిల్',
      seatingType: 'SEATER_CUM_SLEEPER' as SeatingType,
      departureTime: '22:15',
      arrivalTime: '06:30',
      duration: '8h 15m',
      baseFare: 840,
      amenities: [STANDARD_AMENITIES.charging, STANDARD_AMENITIES.water, STANDARD_AMENITIES.blanket, STANDARD_AMENITIES.tracking],
      hasLiveGps: true,
      currentLocation: 'Passing Narketpally Toll Plaza',
      speedKmH: 82,
      delayMinutes: 10
    },
    {
      serviceNumber: '3512',
      busClass: 'INDRA_AC' as BusClass,
      busClassName: 'Indra AC 2+2 Semi-Sleeper',
      busClassTeluguName: 'ఇంద్ర ఎసి 2+2 సెమీ-స్లీపర్',
      seatingType: 'SEATER' as SeatingType,
      departureTime: '18:45',
      arrivalTime: '02:30',
      duration: '7h 45m',
      baseFare: 620,
      amenities: [STANDARD_AMENITIES.charging, STANDARD_AMENITIES.tracking, STANDARD_AMENITIES.reading],
      hasLiveGps: true,
      currentLocation: 'Departed Pandit Nehru Bus Station',
      speedKmH: 65,
      delayMinutes: 0
    },
    {
      serviceNumber: '4890',
      busClass: 'SUPER_LUXURY' as BusClass,
      busClassName: 'Super Luxury 2+2 Push-Back',
      busClassTeluguName: 'సూపర్ లగ్జరీ 2+2 పుష్-బ్యాక్',
      seatingType: 'SEATER' as SeatingType,
      departureTime: '06:30',
      arrivalTime: '14:15',
      duration: '7h 45m',
      baseFare: 440,
      amenities: [STANDARD_AMENITIES.charging, STANDARD_AMENITIES.tracking],
      hasLiveGps: true,
      currentLocation: 'Benz Circle Pickup Complete',
      speedKmH: 70,
      delayMinutes: 5
    },
    {
      serviceNumber: '5230',
      busClass: 'AMARAVATHI_VOLVO_AC' as BusClass,
      busClassName: 'Amaravathi Multi-Axle Volvo AC (Day Service)',
      busClassTeluguName: 'అమరావతి మల్టీ-యాక్సిల్ వోల్వో ఎసి (పగటి వేళ)',
      seatingType: 'SEATER' as SeatingType,
      departureTime: '13:00',
      arrivalTime: '20:45',
      duration: '7h 45m',
      baseFare: 920,
      amenities: [STANDARD_AMENITIES.wifi, STANDARD_AMENITIES.charging, STANDARD_AMENITIES.water, STANDARD_AMENITIES.tracking],
      hasLiveGps: true,
      currentLocation: 'NH-65 Km Stone 142',
      speedKmH: 85,
      delayMinutes: 0
    },
    {
      serviceNumber: '6122',
      busClass: 'ULTRA_DELUXE' as BusClass,
      busClassName: 'Ultra Deluxe Non-AC (Direct)',
      busClassTeluguName: 'అల్ట్రా డీలక్స్ నాన్-ఎసి (డైరెక్ట్)',
      seatingType: 'SEATER' as SeatingType,
      departureTime: '23:00',
      arrivalTime: '07:00',
      duration: '8h 00m',
      baseFare: 390,
      amenities: [STANDARD_AMENITIES.tracking],
      hasLiveGps: true,
      currentLocation: 'Depot Ready for Boarding',
      speedKmH: 0,
      delayMinutes: 0
    }
  ];

  return schedulesConfig.map((cfg) => {
    const { lowerDeckSeats, upperDeckSeats } = generateSeatMap(cfg.seatingType, cfg.baseFare);
    const availableLower = lowerDeckSeats.filter(s => s.status === 'AVAILABLE' || s.status === 'LADIES_QUOTA').length;
    const availableUpper = upperDeckSeats ? upperDeckSeats.filter(s => s.status === 'AVAILABLE' || s.status === 'LADIES_QUOTA').length : 0;

    return {
      id: `APS-${cfg.serviceNumber}-${travelDate}`,
      serviceNumber: cfg.serviceNumber,
      busClass: cfg.busClass,
      busClassName: cfg.busClassName,
      busClassTeluguName: cfg.busClassTeluguName,
      seatingType: cfg.seatingType,
      origin: originStation.name,
      originTelugu: originStation.teluguName,
      destination: destStation.name,
      destinationTelugu: destStation.teluguName,
      departureTime: cfg.departureTime,
      arrivalTime: cfg.arrivalTime,
      duration: cfg.duration,
      baseFare: cfg.baseFare,
      availableSeatsCount: availableLower + availableUpper,
      amenities: cfg.amenities,
      lowerDeckSeats,
      upperDeckSeats,
      boardingPoints: defaultBoarding,
      droppingPoints: defaultDropping,
      hasLiveGps: cfg.hasLiveGps,
      currentGpsStatus: {
        currentLocation: cfg.currentLocation,
        speedKmH: cfg.speedKmH,
        delayMinutes: cfg.delayMinutes,
        lastUpdated: '1 min ago'
      }
    };
  });
}
