export interface RouteWaypoint {
  id: string;
  name: string;
  teluguName: string;
  scheduledTime: string;
  actualOrEstimatedTime: string;
  isPassed: boolean;
  isCurrent: boolean;
}

export interface LiveTelemetryData {
  pnrNumber: string;
  serviceNumber: string;
  busClassName: string;
  registrationNumber: string;
  driverName: string;
  driverContactMasked: string;
  conductorContactMasked: string;
  currentSpeedKmH: number;
  currentLocationName: string;
  gpsCoordinates: { lat: number; lng: number };
  status: 'ON_TIME' | 'DELAYED';
  delayMinutes: number;
  lastPingTimestamp: string;
  waypoints: RouteWaypoint[];
}

export function fetchLiveBusTelemetry(pnrOrService: string): LiveTelemetryData {
  const serviceCode = pnrOrService.trim().toUpperCase() || '1105';

  return {
    pnrNumber: serviceCode.startsWith('APS') ? serviceCode : `APS-${serviceCode}-2026`,
    serviceNumber: serviceCode.replace(/\D/g, '') || '1105',
    busClassName: 'Amaravathi Multi-Axle Volvo AC (AP-28-Z-9844)',
    registrationNumber: 'AP 28 Z 9844',
    driverName: 'K. Subba Rao (Depot #1)',
    driverContactMasked: '+91 98480 ••••12',
    conductorContactMasked: '+91 94401 ••••88',
    currentSpeedKmH: 78,
    currentLocationName: 'Near Suryapet NH-65 Toll Plaza, Km 138',
    gpsCoordinates: { lat: 17.1439, lng: 79.6239 },
    status: 'ON_TIME',
    delayMinutes: 0,
    lastPingTimestamp: '15 seconds ago (Satellite GPS)',
    waypoints: [
      {
        id: 'wp-1',
        name: 'Mahatma Gandhi Bus Station (MGBS), Hyderabad',
        teluguName: 'ఎం.జి.బి.ఎస్, హైదరాబాద్',
        scheduledTime: '21:30',
        actualOrEstimatedTime: '21:32 (Departed)',
        isPassed: true,
        isCurrent: false
      },
      {
        id: 'wp-2',
        name: 'LB Nagar Ring Road, Hyderabad',
        teluguName: 'ఎల్.బి నగర్ రింగ్ రోడ్డు',
        scheduledTime: '22:15',
        actualOrEstimatedTime: '22:18 (Departed)',
        isPassed: true,
        isCurrent: false
      },
      {
        id: 'wp-3',
        name: 'Choutuppal Toll Plaza',
        teluguName: 'చౌటుప్పల్ టోల్ ప్లాజా',
        scheduledTime: '23:10',
        actualOrEstimatedTime: '23:12 (Passed)',
        isPassed: true,
        isCurrent: false
      },
      {
        id: 'wp-4',
        name: 'Suryapet Bypass (Current Location)',
        teluguName: 'సూర్యాపేట బైపాస్ (ప్రస్తుత స్థానం)',
        scheduledTime: '01:00',
        actualOrEstimatedTime: '01:02 (Approaching)',
        isPassed: false,
        isCurrent: true
      },
      {
        id: 'wp-5',
        name: 'Nandigama Toll Gate',
        teluguName: 'నందిగామ టోల్ గేట్',
        scheduledTime: '03:15',
        actualOrEstimatedTime: '03:15 (Estimated)',
        isPassed: false,
        isCurrent: false
      },
      {
        id: 'wp-6',
        name: 'Pandit Nehru Bus Station (PNBS), Vijayawada',
        teluguName: 'పండిట్ నెహ్రూ బస్ స్టేషన్, విజయవాడ',
        scheduledTime: '05:45',
        actualOrEstimatedTime: '05:45 (On Schedule)',
        isPassed: false,
        isCurrent: false
      }
    ]
  };
}
