import { Station } from '../types';

export const MAJOR_STATIONS: Station[] = [
  {
    id: 'VJA',
    name: 'VIJAYAWADA',
    teluguName: 'విజయవాడ',
    district: 'NTR',
    state: 'Andhra Pradesh',
    isMajorHub: true,
    boardingPoints: [
      { id: 'VJA-PNBS', name: 'Pandit Nehru Bus Station (PNBS)', landmark: 'Platform 1-12, Main Terminal', contactPhone: '0866-2570005', timeOffsetMinutes: 0 },
      { id: 'VJA-BENZ', name: 'Benz Circle', landmark: 'Near Jyothi Mahal', contactPhone: '0866-2570006', timeOffsetMinutes: 20 },
      { id: 'VJA-RAMA', name: 'Ramavarappadu Ring', landmark: 'Under Flyover Junction', contactPhone: '0866-2570007', timeOffsetMinutes: 35 },
      { id: 'VJA-GANNA', name: 'Gannavaram Airport Road', landmark: 'Opposite International Airport Gate', contactPhone: '0866-2570008', timeOffsetMinutes: 50 }
    ]
  },
  {
    id: 'HYD',
    name: 'HYDERABAD',
    teluguName: 'హైదరాబాద్',
    district: 'Hyderabad',
    state: 'Telangana',
    isMajorHub: true,
    boardingPoints: [
      { id: 'HYD-MGBS', name: 'Mahatma Gandhi Bus Station (MGBS)', landmark: 'Gowliguda Terminal', contactPhone: '040-24614406', timeOffsetMinutes: 0 },
      { id: 'HYD-DILSUKH', name: 'Dilsukhnagar', landmark: 'Near Metro Pillar A1422', contactPhone: '040-24614407', timeOffsetMinutes: 25 },
      { id: 'HYD-LB_NAGAR', name: 'LB Nagar Ring Road', landmark: 'Near Big Bazaar Flyover', contactPhone: '040-24614408', timeOffsetMinutes: 45 },
      { id: 'HYD-AMRP', name: 'Ameerpet', landmark: 'Opposite Mythrivanam', contactPhone: '040-24614409', timeOffsetMinutes: 15 },
      { id: 'HYD-KPHB', name: 'KPHB Colony', landmark: 'Near Rythu Bazar', contactPhone: '040-24614410', timeOffsetMinutes: 30 },
      { id: 'HYD-GACH', name: 'Gachibowli Outer Ring Road', landmark: 'ORR Toll Gate Bus Shelter', contactPhone: '040-24614411', timeOffsetMinutes: 60 }
    ]
  },
  {
    id: 'VSP',
    name: 'VISAKHAPATNAM',
    teluguName: 'విశాఖపట్నం',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    isMajorHub: true,
    boardingPoints: [
      { id: 'VSP-RTC', name: 'Dwaraka Bus Station (RTC Complex)', landmark: 'Asilmetta Junction', contactPhone: '0891-2746400', timeOffsetMinutes: 0 },
      { id: 'VSP-MADH', name: 'Madhurawada', landmark: 'Car Shed Junction', contactPhone: '0891-2746401', timeOffsetMinutes: 30 },
      { id: 'VSP-GJU', name: 'Gajuwaka', landmark: 'Near Mohini Theater', contactPhone: '0891-2746402', timeOffsetMinutes: 40 },
      { id: 'VSP-KURM', name: 'Kurmannapalem', landmark: 'Steel Plant Gate', contactPhone: '0891-2746403', timeOffsetMinutes: 55 }
    ]
  },
  {
    id: 'TPT',
    name: 'TIRUPATI',
    teluguName: 'తిరుపతి',
    district: 'Tirupati',
    state: 'Andhra Pradesh',
    isMajorHub: true,
    boardingPoints: [
      { id: 'TPT-CEN', name: 'Tirupati Central Bus Station', landmark: 'Near Railway Station Road', contactPhone: '0877-2289900', timeOffsetMinutes: 0 },
      { id: 'TPT-ALIPIRI', name: 'Alipiri Garuda Circle', landmark: 'Toll Gate Footpath Entry', contactPhone: '0877-2289901', timeOffsetMinutes: 20 },
      { id: 'TPT-LEELA', name: 'Leela Mahal Circle', landmark: 'Beside APSRTC Depot 1', contactPhone: '0877-2289902', timeOffsetMinutes: 10 }
    ]
  },
  {
    id: 'BLR',
    name: 'BENGALURU',
    teluguName: 'బెంగళూరు',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    isMajorHub: true,
    boardingPoints: [
      { id: 'BLR-KBS', name: 'Kempegowda Bus Station (Majestic)', landmark: 'Terminal 3 (APSRTC Platforms)', contactPhone: '080-22870005', timeOffsetMinutes: 0 },
      { id: 'BLR-SHAN', name: 'Shantinagar Bus Station', landmark: 'KH Road Platform 2', contactPhone: '080-22870006', timeOffsetMinutes: 25 },
      { id: 'BLR-INDIRA', name: 'Indiranagar 100ft Road', landmark: 'Domlur Flyover Corner', contactPhone: '080-22870007', timeOffsetMinutes: 45 },
      { id: 'BLR-WHITE', name: 'Whitefield', landmark: 'Near ITPL Gate 1', contactPhone: '080-22870008', timeOffsetMinutes: 65 }
    ]
  },
  {
    id: 'MAA',
    name: 'CHENNAI',
    teluguName: 'చెన్నై',
    district: 'Chennai',
    state: 'Tamil Nadu',
    isMajorHub: true,
    boardingPoints: [
      { id: 'MAA-CMBT', name: 'Koyambedu (CMBT)', landmark: 'Platform 5, Interstate Terminal', contactPhone: '044-24790005', timeOffsetMinutes: 0 },
      { id: 'MAA-MADHA', name: 'Madhavaram MMBT', landmark: 'Near Roundtana', contactPhone: '044-24790006', timeOffsetMinutes: 30 }
    ]
  },
  {
    id: 'KRN',
    name: 'KURNOOL',
    teluguName: 'కర్నూలు',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    isMajorHub: true,
    boardingPoints: [
      { id: 'KRN-BUS', name: 'Kurnool New Bus Stand', landmark: 'Bellary Road', contactPhone: '08518-257005', timeOffsetMinutes: 0 },
      { id: 'KRN-CHECK', name: 'Kurnool Toll Plaza', landmark: 'NH 44 Checkpost', contactPhone: '08518-257006', timeOffsetMinutes: 20 }
    ]
  },
  {
    id: 'GNT',
    name: 'GUNTUR',
    teluguName: 'గుంటూరు',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    isMajorHub: true,
    boardingPoints: [
      { id: 'GNT-NTR', name: 'NTR Bus Station', landmark: 'Collectorate Road', contactPhone: '0863-2224005', timeOffsetMinutes: 0 },
      { id: 'GNT-AUTONAGAR', name: 'Autonagar Bypass', landmark: 'Near Flyover', contactPhone: '0863-2224006', timeOffsetMinutes: 20 }
    ]
  },
  {
    id: 'NLR',
    name: 'NELLORE',
    teluguName: 'నెల్లూరు',
    district: 'SPS Nellore',
    state: 'Andhra Pradesh',
    isMajorHub: true,
    boardingPoints: [
      { id: 'NLR-CENT', name: 'Nellore Central Bus Stand', landmark: 'Atmakur Bus Stand Road', contactPhone: '0861-2327005', timeOffsetMinutes: 0 },
      { id: 'NLR-BYPASS', name: 'Nellore Mini Bypass', landmark: 'Near Ayyappa Temple', contactPhone: '0861-2327006', timeOffsetMinutes: 20 }
    ]
  },
  {
    id: 'RJY',
    name: 'RAJAMAHENDRAVARAM',
    teluguName: 'రాజమహేంద్రవరం',
    district: 'East Godavari',
    state: 'Andhra Pradesh',
    isMajorHub: true,
    boardingPoints: [
      { id: 'RJY-RTC', name: 'Kotipalli Bus Stand', landmark: 'Near Godavari Bridge Road', contactPhone: '0883-2470005', timeOffsetMinutes: 0 },
      { id: 'RJY-MORAM', name: 'Morampudi Junction', landmark: 'National Highway Bypass', contactPhone: '0883-2470006', timeOffsetMinutes: 25 }
    ]
  },
  {
    id: 'KKD',
    name: 'KAKINADA',
    teluguName: 'కాకినాడ',
    district: 'Kakinada',
    state: 'Andhra Pradesh',
    isMajorHub: true,
    boardingPoints: [
      { id: 'KKD-MAIN', name: 'Kakinada Main Bus Stand', landmark: 'Collector Office Road', contactPhone: '0884-2370005', timeOffsetMinutes: 0 },
      { id: 'KKD-SARPA', name: 'Sarpavaram Junction', landmark: 'Near RTO Office', contactPhone: '0884-2370006', timeOffsetMinutes: 15 }
    ]
  },
  {
    id: 'KDP',
    name: 'KADAPA',
    teluguName: 'కడప',
    district: 'YSR Kadapa',
    state: 'Andhra Pradesh',
    isMajorHub: true,
    boardingPoints: [
      { id: 'KDP-BUS', name: 'Kadapa RTC Bus Station', landmark: 'Seven Roads Junction', contactPhone: '08562-247005', timeOffsetMinutes: 0 }
    ]
  },
  {
    id: 'ATP',
    name: 'ANANTAPUR',
    teluguName: 'అనంతపురం',
    district: 'Anantapuramu',
    state: 'Andhra Pradesh',
    isMajorHub: true,
    boardingPoints: [
      { id: 'ATP-RTC', name: 'Anantapur RTC Bus Stand', landmark: 'Near Clock Tower', contactPhone: '08554-270005', timeOffsetMinutes: 0 }
    ]
  },
  {
    id: 'OGL',
    name: 'ONGOLE',
    teluguName: 'ఒంగోలు',
    district: 'Prakasam',
    state: 'Andhra Pradesh',
    isMajorHub: true,
    boardingPoints: [
      { id: 'OGL-RTC', name: 'Ongole Central Bus Stand', landmark: 'Kurnool Road', contactPhone: '08592-232005', timeOffsetMinutes: 0 }
    ]
  }
];

export const POPULAR_ROUTES = [
  { origin: 'HYDERABAD', destination: 'VIJAYAWADA', distanceKm: 275, duration: '5h 15m', startingFare: 420, dailyBuses: 96 },
  { origin: 'VIJAYAWADA', destination: 'HYDERABAD', distanceKm: 275, duration: '5h 15m', startingFare: 420, dailyBuses: 96 },
  { origin: 'BENGALURU', destination: 'TIRUPATI', distanceKm: 250, duration: '4h 45m', startingFare: 380, dailyBuses: 72 },
  { origin: 'TIRUPATI', destination: 'CHENNAI', distanceKm: 135, duration: '3h 15m', startingFare: 210, dailyBuses: 84 },
  { origin: 'HYDERABAD', destination: 'VISAKHAPATNAM', distanceKm: 620, duration: '11h 30m', startingFare: 980, dailyBuses: 48 },
  { origin: 'VIJAYAWADA', destination: 'VISAKHAPATNAM', distanceKm: 350, duration: '6h 30m', startingFare: 550, dailyBuses: 64 },
  { origin: 'HYDERABAD', destination: 'TIRUPATI', distanceKm: 560, duration: '9h 45m', startingFare: 850, dailyBuses: 52 },
  { origin: 'VIJAYAWADA', destination: 'BENGALURU', distanceKm: 650, duration: '11h 15m', startingFare: 950, dailyBuses: 36 }
];

export function searchStations(query: string): Station[] {
  if (!query || query.trim() === '') {
    return MAJOR_STATIONS.slice(0, 8);
  }
  const clean = query.trim().toUpperCase();
  return MAJOR_STATIONS.filter(s => 
    s.name.includes(clean) || 
    s.teluguName.includes(query.trim()) ||
    s.district.toUpperCase().includes(clean) ||
    s.boardingPoints.some(b => b.name.toUpperCase().includes(clean))
  );
}
