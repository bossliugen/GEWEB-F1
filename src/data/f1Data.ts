export type SeasonYear = '2026' | '2025';
export type SessionType = 'Race' | 'Qualifying' | 'Sprint';
export type TyreCompound = 'Soft' | 'Medium' | 'Hard';

export interface TeamInfo {
  id: string;
  name: string;
  zhName: string;
  fullName: string;
  base: string;
  powerUnit: string;
  points2026: number;
  points2025: number;
  rank2026: number;
  liveryPrimary: string;
  liverySecondary: string;
  liveryAccent: string;
}

export interface DriverInfo {
  id: string;
  code: string;
  number: number;
  name: string;
  zhName: string;
  teamId: string;
  nationality: string;
  flag: string;
  points2026: number;
  points2025: number;
  rank2026: number;
  wins2026: number;
  podiums2026: number;
  headshotUrl: string;
  helmetPrimary: string;
  helmetAccent: string;
}

export interface CircuitSectorSplit {
  s1EndRatio: number;
  s2EndRatio: number;
}

export interface GrandPrixInfo {
  id: string;
  round: number;
  name: string;
  zhName: string;
  country: string;
  flag: string;
  location: string;
  circuitName: string;
  zhCircuitName: string;
  laps: number;
  lengthKm: number;
  date: string;
  taiwanQualiTime: string;
  taiwanSprintTime?: string;
  taiwanRaceTime: string;
  isSprint: boolean;
  status: 'completed' | 'upcoming';
  winnerCode?: string;
  winnerTeam?: string;
  fastestLapDriver?: string;
  fastestLapTime?: string;
  baseLapSec: number;
  topSpeedKmh: number;
  corners: number;
  drsZones: number;
  svgPath: string;
  startFinish: { x: number; y: number };
  sectorSplit: CircuitSectorSplit;
}

export const TEAMS: TeamInfo[] = [
  {
    id: 'mercedes',
    name: 'Mercedes',
    zhName: '賓士車隊',
    fullName: 'Mercedes-AMG PETRONAS Formula One Team',
    base: 'Brackley, UK',
    powerUnit: 'Mercedes',
    points2026: 652,
    points2025: 468,
    rank2026: 1,
    liveryPrimary: '#1A1D1F',
    liverySecondary: '#00A19C',
    liveryAccent: '#C8CCCE',
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    zhName: '法拉利車隊',
    fullName: 'Scuderia Ferrari HP',
    base: 'Maranello, Italy',
    powerUnit: 'Ferrari',
    points2026: 510,
    points2025: 582,
    rank2026: 2,
    liveryPrimary: '#C8102E',
    liverySecondary: '#1C1917',
    liveryAccent: '#F2C94C',
  },
  {
    id: 'redbull',
    name: 'Red Bull Racing',
    zhName: '紅牛車隊',
    fullName: 'Oracle Red Bull Racing',
    base: 'Milton Keynes, UK',
    powerUnit: 'Red Bull Ford',
    points2026: 415,
    points2025: 589,
    rank2026: 3,
    liveryPrimary: '#1E2A4A',
    liverySecondary: '#D92332',
    liveryAccent: '#F5B800',
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    zhName: '麥拉倫車隊',
    fullName: 'McLaren Formula 1 Team',
    base: 'Woking, UK',
    powerUnit: 'Mercedes',
    points2026: 398,
    points2025: 666,
    rank2026: 4,
    liveryPrimary: '#E86C00',
    liverySecondary: '#1C1917',
    liveryAccent: '#3B82F6',
  },
  {
    id: 'rb',
    name: 'Racing Bulls',
    zhName: '小紅牛車隊',
    fullName: 'Visa Cash App Racing Bulls',
    base: 'Faenza, Italy',
    powerUnit: 'Honda RBPT',
    points2026: 114,
    points2025: 76,
    rank2026: 5,
    liveryPrimary: '#F4F4F5',
    liverySecondary: '#1E3A8A',
    liveryAccent: '#DC2626',
  },
  {
    id: 'alpine',
    name: 'Alpine',
    zhName: '阿爾派車隊',
    fullName: 'BWT Alpine Formula One Team',
    base: 'Enstone, UK',
    powerUnit: 'Mercedes',
    points2026: 69,
    points2025: 65,
    rank2026: 6,
    liveryPrimary: '#1D4ED8',
    liverySecondary: '#EC4899',
    liveryAccent: '#1C1917',
  },
  {
    id: 'haas',
    name: 'Haas F1 Team',
    zhName: '哈斯車隊',
    fullName: 'MoneyGram Haas F1 Team',
    base: 'Kannapolis, USA',
    powerUnit: 'Ferrari',
    points2026: 31,
    points2025: 58,
    rank2026: 7,
    liveryPrimary: '#27272A',
    liverySecondary: '#DC2626',
    liveryAccent: '#F4F4F5',
  },
  {
    id: 'audi',
    name: 'Audi',
    zhName: '奧迪車隊',
    fullName: 'Audi Revolut F1 Team',
    base: 'Hinwil, Switzerland',
    powerUnit: 'Audi',
    points2026: 28,
    points2025: 14,
    rank2026: 8,
    liveryPrimary: '#52525B',
    liverySecondary: '#DC2626',
    liveryAccent: '#18181B',
  },
  {
    id: 'williams',
    name: 'Williams',
    zhName: '威廉斯車隊',
    fullName: 'Atlassian Williams Racing',
    base: 'Grove, UK',
    powerUnit: 'Mercedes',
    points2026: 12,
    points2025: 42,
    rank2026: 9,
    liveryPrimary: '#0F2B6B',
    liverySecondary: '#2563EB',
    liveryAccent: '#E5E7EB',
  },
  {
    id: 'astonmartin',
    name: 'Aston Martin',
    zhName: '奧斯頓馬丁',
    fullName: 'Aston Martin Aramco Honda',
    base: 'Silverstone, UK',
    powerUnit: 'Honda',
    points2026: 7,
    points2025: 94,
    rank2026: 10,
    liveryPrimary: '#0B4635',
    liverySecondary: '#1B4332',
    liveryAccent: '#A3E635',
  },
  {
    id: 'cadillac',
    name: 'Cadillac',
    zhName: '凱迪拉克車隊',
    fullName: 'Cadillac Formula 1 Team',
    base: 'Fishers, USA',
    powerUnit: 'Ferrari',
    points2026: 0,
    points2025: 0,
    rank2026: 11,
    liveryPrimary: '#18181B',
    liverySecondary: '#D4AF37',
    liveryAccent: '#E5E7EB',
  },
];

export const DRIVERS: DriverInfo[] = [
  {
    id: 'antonelli',
    code: 'ANT',
    number: 12,
    name: 'Kimi Antonelli',
    zhName: '安東內利',
    teamId: 'mercedes',
    nationality: 'Italy',
    flag: '🇮🇹',
    points2026: 390,
    points2025: 118,
    rank2026: 1,
    wins2026: 8,
    podiums2026: 15,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/KIMANT01_Kimi_Antonelli/kimant01.png',
    helmetPrimary: '#00A19C',
    helmetAccent: '#1C1917',
  },
  {
    id: 'verstappen',
    code: 'VER',
    number: 1,
    name: 'Max Verstappen',
    zhName: '維斯塔潘',
    teamId: 'redbull',
    nationality: 'Netherlands',
    flag: '🇳🇱',
    points2026: 279,
    points2025: 437,
    rank2026: 2,
    wins2026: 4,
    podiums2026: 11,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png',
    helmetPrimary: '#1E2A4A',
    helmetAccent: '#D92332',
  },
  {
    id: 'russell',
    code: 'RUS',
    number: 63,
    name: 'George Russell',
    zhName: '羅素',
    teamId: 'mercedes',
    nationality: 'United Kingdom',
    flag: '🇬🇧',
    points2026: 262,
    points2025: 245,
    rank2026: 3,
    wins2026: 3,
    podiums2026: 10,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png',
    helmetPrimary: '#1B4332',
    helmetAccent: '#00A19C',
  },
  {
    id: 'hamilton',
    code: 'HAM',
    number: 44,
    name: 'Lewis Hamilton',
    zhName: '漢米爾頓',
    teamId: 'ferrari',
    nationality: 'United Kingdom',
    flag: '🇬🇧',
    points2026: 261,
    points2025: 223,
    rank2026: 4,
    wins2026: 2,
    podiums2026: 9,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png',
    helmetPrimary: '#C8102E',
    helmetAccent: '#F2C94C',
  },
  {
    id: 'leclerc',
    code: 'LEC',
    number: 16,
    name: 'Charles Leclerc',
    zhName: '勒克萊爾',
    teamId: 'ferrari',
    nationality: 'Monaco',
    flag: '🇲🇨',
    points2026: 249,
    points2025: 356,
    rank2026: 5,
    wins2026: 2,
    podiums2026: 8,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png',
    helmetPrimary: '#C8102E',
    helmetAccent: '#FFFFFF',
  },
  {
    id: 'norris',
    code: 'NOR',
    number: 4,
    name: 'Lando Norris',
    zhName: '諾里斯',
    teamId: 'mclaren',
    nationality: 'United Kingdom',
    flag: '🇬🇧',
    points2026: 246,
    points2025: 374,
    rank2026: 6,
    wins2026: 2,
    podiums2026: 9,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png',
    helmetPrimary: '#E86C00',
    helmetAccent: '#1C1917',
  },
  {
    id: 'piastri',
    code: 'PIA',
    number: 81,
    name: 'Oscar Piastri',
    zhName: '皮亞斯特里',
    teamId: 'mclaren',
    nationality: 'Australia',
    flag: '🇦🇺',
    points2026: 152,
    points2025: 292,
    rank2026: 7,
    wins2026: 0,
    podiums2026: 4,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png',
    helmetPrimary: '#E86C00',
    helmetAccent: '#3B82F6',
  },
  {
    id: 'hadjar',
    code: 'HAD',
    number: 6,
    name: 'Isack Hadjar',
    zhName: '哈賈爾',
    teamId: 'redbull',
    nationality: 'France',
    flag: '🇫🇷',
    points2026: 122,
    points2025: 44,
    rank2026: 8,
    wins2026: 0,
    podiums2026: 2,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png',
    helmetPrimary: '#1E2A4A',
    helmetAccent: '#F5B800',
  },
  {
    id: 'lawson',
    code: 'LAW',
    number: 30,
    name: 'Liam Lawson',
    zhName: '勞森',
    teamId: 'rb',
    nationality: 'New Zealand',
    flag: '🇳🇿',
    points2026: 89,
    points2025: 32,
    rank2026: 9,
    wins2026: 0,
    podiums2026: 1,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png',
    helmetPrimary: '#1E3A8A',
    helmetAccent: '#DC2626',
  },
  {
    id: 'gasly',
    code: 'GAS',
    number: 10,
    name: 'Pierre Gasly',
    zhName: '蓋斯利',
    teamId: 'alpine',
    nationality: 'France',
    flag: '🇫🇷',
    points2026: 42,
    points2025: 42,
    rank2026: 10,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png',
    helmetPrimary: '#1D4ED8',
    helmetAccent: '#EC4899',
  },
  {
    id: 'lindblad',
    code: 'LIN',
    number: 41,
    name: 'Arvid Lindblad',
    zhName: '林德布拉德',
    teamId: 'rb',
    nationality: 'United Kingdom',
    flag: '🇬🇧',
    points2026: 38,
    points2025: 0,
    rank2026: 11,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ARVLIN01_Arvid_Lindblad/arvlin01.png',
    helmetPrimary: '#1E3A8A',
    helmetAccent: '#F59E0B',
  },
  {
    id: 'colapinto',
    code: 'COL',
    number: 43,
    name: 'Franco Colapinto',
    zhName: '科拉平托',
    teamId: 'alpine',
    nationality: 'Argentina',
    flag: '🇦🇷',
    points2026: 33,
    points2025: 18,
    rank2026: 12,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png',
    helmetPrimary: '#38BDF8',
    helmetAccent: '#1D4ED8',
  },
  {
    id: 'bearman',
    code: 'BEA',
    number: 87,
    name: 'Oliver Bearman',
    zhName: '貝爾曼',
    teamId: 'haas',
    nationality: 'United Kingdom',
    flag: '🇬🇧',
    points2026: 23,
    points2025: 15,
    rank2026: 13,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png',
    helmetPrimary: '#DC2626',
    helmetAccent: '#27272A',
  },
  {
    id: 'bortoleto',
    code: 'BOR',
    number: 5,
    name: 'Gabriel Bortoleto',
    zhName: '博托萊托',
    teamId: 'audi',
    nationality: 'Brazil',
    flag: '🇧🇷',
    points2026: 14,
    points2025: 8,
    rank2026: 14,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png',
    helmetPrimary: '#16A34A',
    helmetAccent: '#FACC15',
  },
  {
    id: 'hulkenberg',
    code: 'HUL',
    number: 27,
    name: 'Nico Hülkenberg',
    zhName: '霍肯伯格',
    teamId: 'audi',
    nationality: 'Germany',
    flag: '🇩🇪',
    points2026: 14,
    points2025: 41,
    rank2026: 15,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png',
    helmetPrimary: '#52525B',
    helmetAccent: '#DC2626',
  },
  {
    id: 'ocon',
    code: 'OCO',
    number: 31,
    name: 'Esteban Ocon',
    zhName: '奧康',
    teamId: 'haas',
    nationality: 'France',
    flag: '🇫🇷',
    points2026: 7,
    points2025: 23,
    rank2026: 16,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png',
    helmetPrimary: '#27272A',
    helmetAccent: '#DC2626',
  },
  {
    id: 'alonso',
    code: 'ALO',
    number: 14,
    name: 'Fernando Alonso',
    zhName: '阿隆索',
    teamId: 'astonmartin',
    nationality: 'Spain',
    flag: '🇪🇸',
    points2026: 7,
    points2025: 70,
    rank2026: 17,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png',
    helmetPrimary: '#0B4635',
    helmetAccent: '#A3E635',
  },
  {
    id: 'sainz',
    code: 'SAI',
    number: 55,
    name: 'Carlos Sainz',
    zhName: '賽恩斯',
    teamId: 'williams',
    nationality: 'Spain',
    flag: '🇪🇸',
    points2026: 7,
    points2025: 38,
    rank2026: 18,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png',
    helmetPrimary: '#0F2B6B',
    helmetAccent: '#DC2626',
  },
  {
    id: 'albon',
    code: 'ALB',
    number: 23,
    name: 'Alexander Albon',
    zhName: '阿爾本',
    teamId: 'williams',
    nationality: 'Thailand',
    flag: '🇹🇭',
    points2026: 5,
    points2025: 18,
    rank2026: 19,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png',
    helmetPrimary: '#0F2B6B',
    helmetAccent: '#2563EB',
  },
  {
    id: 'stroll',
    code: 'STR',
    number: 18,
    name: 'Lance Stroll',
    zhName: '斯托爾',
    teamId: 'astonmartin',
    nationality: 'Canada',
    flag: '🇨🇦',
    points2026: 0,
    points2025: 24,
    rank2026: 22,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png',
    helmetPrimary: '#0B4635',
    helmetAccent: '#1B4332',
  },
  {
    id: 'perez',
    code: 'PER',
    number: 11,
    name: 'Sergio Pérez',
    zhName: '佩雷茲',
    teamId: 'cadillac',
    nationality: 'Mexico',
    flag: '🇲🇽',
    points2026: 0,
    points2025: 152,
    rank2026: 23,
    wins2026: 0,
    podiums2026: 0,
    headshotUrl: 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png',
    helmetPrimary: '#18181B',
    helmetAccent: '#D4AF37',
  },
];

// Clean, recognizable 2D SVG circuit paths (normalized to 500x320 viewBox)
export const GRAND_PRIX_CALENDAR: GrandPrixInfo[] = [
  {
    id: 'aus',
    round: 1,
    name: 'Australian Grand Prix',
    zhName: '澳洲大獎賽',
    country: 'Australia',
    flag: '🇦🇺',
    location: '墨爾本 Melbourne',
    circuitName: 'Albert Park Circuit',
    zhCircuitName: '阿爾伯特公園賽道',
    laps: 58,
    lengthKm: 5.278,
    date: '2026-03-08',
    taiwanQualiTime: '03/07 (六) 13:00',
    taiwanRaceTime: '03/08 (日) 12:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'ANT',
    winnerTeam: 'Mercedes',
    fastestLapDriver: 'ANT',
    fastestLapTime: '1:19.248',
    baseLapSec: 79.2,
    topSpeedKmh: 326,
    corners: 14,
    drsZones: 4,
    svgPath: 'M 110 230 L 220 235 C 250 235 270 215 290 215 L 365 225 C 405 228 430 190 420 155 C 410 120 385 95 340 85 L 250 75 C 215 70 190 95 165 110 L 115 115 C 85 120 75 155 85 185 Z',
    startFinish: { x: 165, y: 232 },
    sectorSplit: { s1EndRatio: 0.34, s2EndRatio: 0.68 },
  },
  {
    id: 'chn',
    round: 2,
    name: 'Chinese Grand Prix',
    zhName: '中國大獎賽',
    country: 'China',
    flag: '🇨🇳',
    location: '上海 Shanghai',
    circuitName: 'Shanghai International Circuit',
    zhCircuitName: '上海國際賽車場',
    laps: 56,
    lengthKm: 5.451,
    date: '2026-03-15',
    taiwanQualiTime: '03/14 (六) 15:00',
    taiwanSprintTime: '03/14 (六) 11:00',
    taiwanRaceTime: '03/15 (日) 15:00',
    isSprint: true,
    status: 'completed',
    winnerCode: 'ANT',
    winnerTeam: 'Mercedes',
    fastestLapDriver: 'VER',
    fastestLapTime: '1:34.112',
    baseLapSec: 94.1,
    topSpeedKmh: 334,
    corners: 16,
    drsZones: 2,
    svgPath: 'M 95 215 C 80 185 110 140 150 140 C 180 140 185 170 210 170 C 245 170 265 115 310 95 C 360 72 425 90 430 135 C 435 170 390 190 340 190 L 210 210 L 120 245 Z',
    startFinish: { x: 155, y: 225 },
    sectorSplit: { s1EndRatio: 0.36, s2EndRatio: 0.71 },
  },
  {
    id: 'jpn',
    round: 3,
    name: 'Japanese Grand Prix',
    zhName: '日本大獎賽',
    country: 'Japan',
    flag: '🇯🇵',
    location: '鈴鹿 Suzuka',
    circuitName: 'Suzuka International Racing Course',
    zhCircuitName: '鈴鹿國際賽道',
    laps: 53,
    lengthKm: 5.807,
    date: '2026-03-29',
    taiwanQualiTime: '03/28 (六) 14:00',
    taiwanRaceTime: '03/29 (日) 13:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'VER',
    winnerTeam: 'Red Bull Racing',
    fastestLapDriver: 'ANT',
    fastestLapTime: '1:30.445',
    baseLapSec: 90.4,
    topSpeedKmh: 329,
    corners: 18,
    drsZones: 1,
    svgPath: 'M 80 185 L 145 130 C 170 110 195 140 215 125 C 235 110 260 95 295 100 C 330 105 340 145 375 155 C 415 165 445 135 430 95 C 415 60 365 65 345 95 L 285 190 C 265 225 220 245 175 235 L 105 215 Z',
    startFinish: { x: 135, y: 222 },
    sectorSplit: { s1EndRatio: 0.35, s2EndRatio: 0.67 },
  },
  {
    id: 'bhr',
    round: 4,
    name: 'Bahrain Grand Prix',
    zhName: '巴林大獎賽',
    country: 'Bahrain',
    flag: '🇧🇭',
    location: '薩基爾 Sakhir',
    circuitName: 'Bahrain International Circuit',
    zhCircuitName: '巴林國際賽道',
    laps: 57,
    lengthKm: 5.412,
    date: '2026-04-12',
    taiwanQualiTime: '04/12 (日) 00:00',
    taiwanRaceTime: '04/12 (日) 23:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'LEC',
    winnerTeam: 'Ferrari',
    fastestLapDriver: 'HAM',
    fastestLapTime: '1:32.890',
    baseLapSec: 92.8,
    topSpeedKmh: 332,
    corners: 15,
    drsZones: 3,
    svgPath: 'M 100 220 L 290 220 C 315 220 330 195 310 175 L 250 140 C 235 130 245 105 270 105 L 385 105 C 415 105 425 135 405 160 L 365 210 C 350 230 375 255 405 245 L 430 220 L 420 75 L 125 75 C 95 75 85 105 95 135 Z',
    startFinish: { x: 195, y: 220 },
    sectorSplit: { s1EndRatio: 0.32, s2EndRatio: 0.69 },
  },
  {
    id: 'ksa',
    round: 5,
    name: 'Saudi Arabian Grand Prix',
    zhName: '沙烏地阿拉伯大獎賽',
    country: 'Saudi Arabia',
    flag: '🇸🇦',
    location: '吉達 Jeddah',
    circuitName: 'Jeddah Corniche Circuit',
    zhCircuitName: '吉達濱海賽道',
    laps: 50,
    lengthKm: 6.174,
    date: '2026-04-19',
    taiwanQualiTime: '04/19 (日) 01:00',
    taiwanRaceTime: '04/20 (一) 01:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'RUS',
    winnerTeam: 'Mercedes',
    fastestLapDriver: 'ANT',
    fastestLapTime: '1:29.882',
    baseLapSec: 89.8,
    topSpeedKmh: 342,
    corners: 27,
    drsZones: 3,
    svgPath: 'M 75 210 L 180 185 C 220 175 250 155 295 140 L 395 105 C 430 95 445 120 420 140 L 325 170 C 285 185 245 215 190 230 L 95 245 C 65 250 55 220 75 210 Z',
    startFinish: { x: 130, y: 197 },
    sectorSplit: { s1EndRatio: 0.35, s2EndRatio: 0.70 },
  },
  {
    id: 'mia',
    round: 6,
    name: 'Miami Grand Prix',
    zhName: '邁阿密大獎賽',
    country: 'USA',
    flag: '🇺🇸',
    location: '邁阿密 Miami',
    circuitName: 'Miami International Autodrome',
    zhCircuitName: '邁阿密國際賽道',
    laps: 57,
    lengthKm: 5.412,
    date: '2026-05-03',
    taiwanQualiTime: '05/03 (日) 04:00',
    taiwanSprintTime: '05/03 (日) 00:00',
    taiwanRaceTime: '05/04 (一) 04:00',
    isSprint: true,
    status: 'completed',
    winnerCode: 'NOR',
    winnerTeam: 'McLaren',
    fastestLapDriver: 'NOR',
    fastestLapTime: '1:29.744',
    baseLapSec: 89.7,
    topSpeedKmh: 336,
    corners: 19,
    drsZones: 3,
    svgPath: 'M 90 190 L 260 190 C 295 190 315 155 345 145 L 415 135 C 435 132 440 165 415 180 L 340 215 C 310 230 270 230 230 225 L 110 225 C 80 225 70 190 90 190 Z',
    startFinish: { x: 175, y: 190 },
    sectorSplit: { s1EndRatio: 0.33, s2EndRatio: 0.68 },
  },
  {
    id: 'can',
    round: 7,
    name: 'Canadian Grand Prix',
    zhName: '加拿大大獎賽',
    country: 'Canada',
    flag: '🇨🇦',
    location: '蒙特婁 Montreal',
    circuitName: 'Circuit Gilles-Villeneuve',
    zhCircuitName: '吉爾·維倫紐夫賽道',
    laps: 70,
    lengthKm: 4.361,
    date: '2026-05-24',
    taiwanQualiTime: '05/24 (日) 04:00',
    taiwanSprintTime: '05/24 (日) 00:00',
    taiwanRaceTime: '05/25 (一) 04:00',
    isSprint: true,
    status: 'completed',
    winnerCode: 'ANT',
    winnerTeam: 'Mercedes',
    fastestLapDriver: 'RUS',
    fastestLapTime: '1:13.412',
    baseLapSec: 73.4,
    topSpeedKmh: 335,
    corners: 14,
    drsZones: 3,
    svgPath: 'M 80 175 L 185 145 L 315 110 C 375 95 430 105 435 135 C 440 165 390 185 330 195 L 160 220 C 105 228 65 200 80 175 Z',
    startFinish: { x: 145, y: 157 },
    sectorSplit: { s1EndRatio: 0.31, s2EndRatio: 0.65 },
  },
  {
    id: 'mon',
    round: 8,
    name: 'Monaco Grand Prix',
    zhName: '摩納哥大獎賽',
    country: 'Monaco',
    flag: '🇲🇨',
    location: '蒙地卡羅 Monte Carlo',
    circuitName: 'Circuit de Monaco',
    zhCircuitName: '摩納哥街道賽道',
    laps: 78,
    lengthKm: 3.337,
    date: '2026-06-07',
    taiwanQualiTime: '06/06 (六) 22:00',
    taiwanRaceTime: '06/07 (日) 21:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'LEC',
    winnerTeam: 'Ferrari',
    fastestLapDriver: 'HAM',
    fastestLapTime: '1:12.604',
    baseLapSec: 72.6,
    topSpeedKmh: 292,
    corners: 19,
    drsZones: 1,
    svgPath: 'M 110 210 L 185 180 C 205 170 215 135 235 115 C 265 85 320 80 365 95 C 415 110 430 150 400 180 L 320 205 C 280 218 230 225 185 235 L 125 235 Z',
    startFinish: { x: 150, y: 194 },
    sectorSplit: { s1EndRatio: 0.35, s2EndRatio: 0.72 },
  },
  {
    id: 'esp',
    round: 9,
    name: 'Spanish Grand Prix',
    zhName: '西班牙大獎賽',
    country: 'Spain',
    flag: '🇪🇸',
    location: '巴塞隆納 Barcelona',
    circuitName: 'Circuit de Barcelona-Catalunya',
    zhCircuitName: '加泰隆尼亞賽道',
    laps: 66,
    lengthKm: 4.657,
    date: '2026-06-14',
    taiwanQualiTime: '06/13 (六) 22:00',
    taiwanRaceTime: '06/14 (日) 21:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'ANT',
    winnerTeam: 'Mercedes',
    fastestLapDriver: 'ANT',
    fastestLapTime: '1:14.920',
    baseLapSec: 74.9,
    topSpeedKmh: 325,
    corners: 14,
    drsZones: 2,
    svgPath: 'M 105 215 L 285 215 C 330 215 360 185 385 155 C 410 125 380 85 330 85 L 185 95 C 145 100 130 135 110 165 Z',
    startFinish: { x: 195, y: 215 },
    sectorSplit: { s1EndRatio: 0.33, s2EndRatio: 0.67 },
  },
  {
    id: 'aut',
    round: 10,
    name: 'Austrian Grand Prix',
    zhName: '奧地利大獎賽',
    country: 'Austria',
    flag: '🇦🇹',
    location: '史匹柏 Spielberg',
    circuitName: 'Red Bull Ring',
    zhCircuitName: '紅牛環賽道',
    laps: 71,
    lengthKm: 4.318,
    date: '2026-06-28',
    taiwanQualiTime: '06/27 (六) 22:00',
    taiwanRaceTime: '06/28 (日) 21:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'VER',
    winnerTeam: 'Red Bull Racing',
    fastestLapDriver: 'VER',
    fastestLapTime: '1:06.192',
    baseLapSec: 66.2,
    topSpeedKmh: 330,
    corners: 10,
    drsZones: 3,
    svgPath: 'M 105 210 L 245 210 L 395 140 C 425 125 415 85 375 85 L 220 95 C 175 100 135 135 105 170 Z',
    startFinish: { x: 175, y: 210 },
    sectorSplit: { s1EndRatio: 0.30, s2EndRatio: 0.64 },
  },
  {
    id: 'gbr',
    round: 11,
    name: 'British Grand Prix',
    zhName: '英國大獎賽',
    country: 'United Kingdom',
    flag: '🇬🇧',
    location: '銀石 Silverstone',
    circuitName: 'Silverstone Circuit',
    zhCircuitName: '銀石賽道',
    laps: 52,
    lengthKm: 5.891,
    date: '2026-07-05',
    taiwanQualiTime: '07/04 (六) 22:00',
    taiwanSprintTime: '07/04 (六) 18:00',
    taiwanRaceTime: '07/05 (日) 22:00',
    isSprint: true,
    status: 'completed',
    winnerCode: 'HAM',
    winnerTeam: 'Ferrari',
    fastestLapDriver: 'RUS',
    fastestLapTime: '1:27.095',
    baseLapSec: 87.1,
    topSpeedKmh: 331,
    corners: 18,
    drsZones: 2,
    svgPath: 'M 110 220 L 210 230 L 295 180 L 405 185 C 430 185 435 135 400 110 L 315 80 C 275 68 230 90 195 115 L 125 130 C 90 140 85 190 110 220 Z',
    startFinish: { x: 165, y: 225 },
    sectorSplit: { s1EndRatio: 0.34, s2EndRatio: 0.68 },
  },
  {
    id: 'bel',
    round: 12,
    name: 'Belgian Grand Prix',
    zhName: '比利時大獎賽',
    country: 'Belgium',
    flag: '🇧🇪',
    location: '斯帕 Spa-Francorchamps',
    circuitName: 'Circuit de Spa-Francorchamps',
    zhCircuitName: '斯帕賽道',
    laps: 44,
    lengthKm: 7.004,
    date: '2026-07-19',
    taiwanQualiTime: '07/18 (六) 22:00',
    taiwanRaceTime: '07/19 (日) 21:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'ANT',
    winnerTeam: 'Mercedes',
    fastestLapDriver: 'ANT',
    fastestLapTime: '1:44.618',
    baseLapSec: 104.6,
    topSpeedKmh: 344,
    corners: 19,
    drsZones: 2,
    svgPath: 'M 95 215 L 160 155 L 330 85 C 380 68 425 90 420 130 L 375 195 C 345 230 285 240 230 230 L 125 235 Z',
    startFinish: { x: 120, y: 190 },
    sectorSplit: { s1EndRatio: 0.31, s2EndRatio: 0.72 },
  },
  {
    id: 'hun',
    round: 13,
    name: 'Hungarian Grand Prix',
    zhName: '匈牙利大獎賽',
    country: 'Hungary',
    flag: '🇭🇺',
    location: '布達佩斯 Budapest',
    circuitName: 'Hungaroring',
    zhCircuitName: '匈牙利賽道',
    laps: 70,
    lengthKm: 4.381,
    date: '2026-07-26',
    taiwanQualiTime: '07/25 (六) 22:00',
    taiwanRaceTime: '07/26 (日) 21:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'NOR',
    winnerTeam: 'McLaren',
    fastestLapDriver: 'NOR',
    fastestLapTime: '1:18.311',
    baseLapSec: 78.3,
    topSpeedKmh: 318,
    corners: 14,
    drsZones: 2,
    svgPath: 'M 100 220 L 245 220 C 285 220 305 185 335 160 C 370 130 415 110 410 85 C 405 65 340 75 295 100 L 175 135 C 125 150 85 185 100 220 Z',
    startFinish: { x: 170, y: 220 },
    sectorSplit: { s1EndRatio: 0.35, s2EndRatio: 0.69 },
  },
  {
    id: 'ned',
    round: 14,
    name: 'Dutch Grand Prix',
    zhName: '荷蘭大獎賽',
    country: 'Netherlands',
    flag: '🇳🇱',
    location: '贊德福特 Zandvoort',
    circuitName: 'Circuit Zandvoort',
    zhCircuitName: '贊德福特賽道',
    laps: 72,
    lengthKm: 4.259,
    date: '2026-08-23',
    taiwanQualiTime: '08/22 (六) 21:00',
    taiwanSprintTime: '08/22 (六) 17:00',
    taiwanRaceTime: '08/23 (日) 21:00',
    isSprint: true,
    status: 'completed',
    winnerCode: 'VER',
    winnerTeam: 'Red Bull Racing',
    fastestLapDriver: 'VER',
    fastestLapTime: '1:11.840',
    baseLapSec: 71.8,
    topSpeedKmh: 320,
    corners: 14,
    drsZones: 2,
    svgPath: 'M 110 220 L 285 220 C 350 220 410 185 415 140 C 420 95 360 75 305 90 L 175 125 C 120 140 85 180 110 220 Z',
    startFinish: { x: 195, y: 220 },
    sectorSplit: { s1EndRatio: 0.33, s2EndRatio: 0.66 },
  },
  {
    id: 'ita',
    round: 15,
    name: 'Italian Grand Prix',
    zhName: '義大利大獎賽',
    country: 'Italy',
    flag: '🇮🇹',
    location: '蒙扎 Monza',
    circuitName: 'Autodromo Nazionale Monza',
    zhCircuitName: '蒙扎國家賽車場',
    laps: 53,
    lengthKm: 5.793,
    date: '2026-09-06',
    taiwanQualiTime: '09/05 (六) 22:00',
    taiwanRaceTime: '09/06 (日) 21:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'ANT',
    winnerTeam: 'Mercedes',
    fastestLapDriver: 'HAM',
    fastestLapTime: '1:20.415',
    baseLapSec: 80.4,
    topSpeedKmh: 356,
    corners: 11,
    drsZones: 2,
    svgPath: 'M 90 220 L 340 220 C 395 220 425 190 410 150 L 370 95 C 355 75 310 75 275 85 L 135 125 C 95 138 75 180 90 220 Z',
    startFinish: { x: 215, y: 220 },
    sectorSplit: { s1EndRatio: 0.32, s2EndRatio: 0.68 },
  },
  {
    id: 'mad',
    round: 16,
    name: 'Madrid Grand Prix',
    zhName: '馬德里大獎賽',
    country: 'Spain',
    flag: '🇪🇸',
    location: '馬德里 Madrid',
    circuitName: 'Madrid IFEMA Street Circuit',
    zhCircuitName: '馬德里街道賽道',
    laps: 57,
    lengthKm: 5.474,
    date: '2026-09-13',
    taiwanQualiTime: '09/12 (六) 22:00',
    taiwanRaceTime: '09/13 (日) 21:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'HAM',
    winnerTeam: 'Ferrari',
    fastestLapDriver: 'ANT',
    fastestLapTime: '1:24.105',
    baseLapSec: 84.1,
    topSpeedKmh: 332,
    corners: 20,
    drsZones: 2,
    svgPath: 'M 95 215 L 250 225 C 315 228 380 195 415 145 C 435 115 395 85 340 90 L 180 110 C 125 118 85 165 95 215 Z',
    startFinish: { x: 170, y: 220 },
    sectorSplit: { s1EndRatio: 0.34, s2EndRatio: 0.68 },
  },
  {
    id: 'aze',
    round: 17,
    name: 'Azerbaijan Grand Prix',
    zhName: '亞塞拜然大獎賽',
    country: 'Azerbaijan',
    flag: '🇦🇿',
    location: '巴庫 Baku',
    circuitName: 'Baku City Circuit',
    zhCircuitName: '巴庫市街賽道',
    laps: 51,
    lengthKm: 6.003,
    date: '2026-09-26',
    taiwanQualiTime: '09/25 (五) 20:00',
    taiwanRaceTime: '09/26 (六) 19:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'RUS',
    winnerTeam: 'Mercedes',
    fastestLapDriver: 'RUS',
    fastestLapTime: '1:43.090',
    baseLapSec: 103.1,
    topSpeedKmh: 350,
    corners: 20,
    drsZones: 2,
    svgPath: 'M 80 225 L 365 225 L 420 180 L 420 95 L 285 95 L 285 145 L 155 145 L 155 185 L 80 185 Z',
    startFinish: { x: 225, y: 225 },
    sectorSplit: { s1EndRatio: 0.33, s2EndRatio: 0.67 },
  },
  {
    id: 'sgp',
    round: 18,
    name: 'Singapore Grand Prix',
    zhName: '新加坡大獎賽',
    country: 'Singapore',
    flag: '🇸🇬',
    location: '濱海灣 Marina Bay',
    circuitName: 'Marina Bay Street Circuit',
    zhCircuitName: '濱海灣市街賽道',
    laps: 62,
    lengthKm: 4.94,
    date: '2026-10-11',
    taiwanQualiTime: '10/10 (六) 21:00',
    taiwanSprintTime: '10/10 (六) 17:00',
    taiwanRaceTime: '10/11 (日) 20:00',
    isSprint: true,
    status: 'completed',
    winnerCode: 'ANT',
    winnerTeam: 'Mercedes',
    fastestLapDriver: 'ANT',
    fastestLapTime: '1:34.502',
    baseLapSec: 94.5,
    topSpeedKmh: 322,
    corners: 19,
    drsZones: 4,
    svgPath: 'M 95 215 L 270 215 L 340 180 L 415 160 L 405 100 L 290 90 L 220 125 L 125 125 L 95 170 Z',
    startFinish: { x: 185, y: 215 },
    sectorSplit: { s1EndRatio: 0.35, s2EndRatio: 0.70 },
  },
  {
    id: 'usa',
    round: 19,
    name: 'United States Grand Prix',
    zhName: '美國大獎賽',
    country: 'USA',
    flag: '🇺🇸',
    location: '奧斯汀 Austin',
    circuitName: 'Circuit of the Americas',
    zhCircuitName: '美洲賽道 (COTA)',
    laps: 56,
    lengthKm: 5.513,
    date: '2026-10-25',
    taiwanQualiTime: '10/25 (日) 06:00',
    taiwanRaceTime: '10/26 (一) 04:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'ANT',
    winnerTeam: 'Mercedes',
    fastestLapDriver: 'VER',
    fastestLapTime: '1:36.210',
    baseLapSec: 96.2,
    topSpeedKmh: 334,
    corners: 20,
    drsZones: 2,
    svgPath: 'M 90 225 L 240 225 L 410 155 C 430 140 420 105 390 100 L 285 95 C 245 95 225 130 190 140 L 115 150 Z',
    startFinish: { x: 165, y: 225 },
    sectorSplit: { s1EndRatio: 0.33, s2EndRatio: 0.69 },
  },
  {
    id: 'mex',
    round: 20,
    name: 'Mexico City Grand Prix',
    zhName: '墨西哥城大獎賽',
    country: 'Mexico',
    flag: '🇲🇽',
    location: '墨西哥城 Mexico City',
    circuitName: 'Autódromo Hermanos Rodríguez',
    zhCircuitName: '羅德里格斯兄弟賽道',
    laps: 71,
    lengthKm: 4.304,
    date: '2026-11-01',
    taiwanQualiTime: '11/01 (日) 05:00',
    taiwanRaceTime: '11/02 (一) 04:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'VER',
    winnerTeam: 'Red Bull Racing',
    fastestLapDriver: 'LEC',
    fastestLapTime: '1:18.110',
    baseLapSec: 78.1,
    topSpeedKmh: 348,
    corners: 17,
    drsZones: 3,
    svgPath: 'M 95 210 L 330 210 C 375 210 415 175 405 130 C 395 95 340 85 280 95 L 150 120 C 105 130 80 175 95 210 Z',
    startFinish: { x: 210, y: 210 },
    sectorSplit: { s1EndRatio: 0.34, s2EndRatio: 0.69 },
  },
  {
    id: 'bra',
    round: 21,
    name: 'São Paulo Grand Prix',
    zhName: '聖保羅大獎賽',
    country: 'Brazil',
    flag: '🇧🇷',
    location: '聖保羅 São Paulo',
    circuitName: 'Interlagos Circuit',
    zhCircuitName: '英特拉格斯賽道',
    laps: 71,
    lengthKm: 4.309,
    date: '2026-11-08',
    taiwanQualiTime: '11/08 (日) 02:00',
    taiwanRaceTime: '11/09 (一) 01:00',
    isSprint: false,
    status: 'completed',
    winnerCode: 'ANT',
    winnerTeam: 'Mercedes',
    fastestLapDriver: 'ANT',
    fastestLapTime: '1:11.304',
    baseLapSec: 71.3,
    topSpeedKmh: 332,
    corners: 15,
    drsZones: 2,
    svgPath: 'M 100 190 L 235 230 C 295 245 360 220 405 170 C 435 135 410 90 360 85 L 220 95 C 165 100 125 135 100 190 Z',
    startFinish: { x: 165, y: 210 },
    sectorSplit: { s1EndRatio: 0.31, s2EndRatio: 0.67 },
  },
  {
    id: 'las',
    round: 22,
    name: 'Las Vegas Grand Prix',
    zhName: '拉斯維加斯大獎賽',
    country: 'USA',
    flag: '🇺🇸',
    location: '拉斯維加斯 Las Vegas',
    circuitName: 'Las Vegas Strip Circuit',
    zhCircuitName: '拉斯維加斯大道賽道',
    laps: 50,
    lengthKm: 6.201,
    date: '2026-11-21',
    taiwanQualiTime: '11/21 (六) 12:00',
    taiwanRaceTime: '11/22 (日) 12:00',
    isSprint: false,
    status: 'upcoming',
    baseLapSec: 93.4,
    topSpeedKmh: 352,
    corners: 17,
    drsZones: 2,
    svgPath: 'M 85 210 L 365 210 C 405 210 425 180 415 145 L 385 105 L 185 105 L 125 145 Z',
    startFinish: { x: 220, y: 210 },
    sectorSplit: { s1EndRatio: 0.33, s2EndRatio: 0.66 },
  },
  {
    id: 'qat',
    round: 23,
    name: 'Qatar Grand Prix',
    zhName: '卡達大獎賽',
    country: 'Qatar',
    flag: '🇶🇦',
    location: '羅賽爾 Lusail',
    circuitName: 'Lusail International Circuit',
    zhCircuitName: '羅賽爾國際賽道',
    laps: 57,
    lengthKm: 5.419,
    date: '2026-11-29',
    taiwanQualiTime: '11/29 (日) 02:00',
    taiwanRaceTime: '11/30 (一) 00:00',
    isSprint: false,
    status: 'upcoming',
    baseLapSec: 82.8,
    topSpeedKmh: 330,
    corners: 16,
    drsZones: 1,
    svgPath: 'M 95 210 L 335 210 C 390 210 425 170 410 125 C 395 85 335 80 280 95 L 145 125 C 100 138 75 175 95 210 Z',
    startFinish: { x: 205, y: 210 },
    sectorSplit: { s1EndRatio: 0.34, s2EndRatio: 0.68 },
  },
  {
    id: 'abu',
    round: 24,
    name: 'Abu Dhabi Grand Prix',
    zhName: '阿布達比大獎賽',
    country: 'UAE',
    flag: '🇦🇪',
    location: '亞斯碼頭 Yas Marina',
    circuitName: 'Yas Marina Circuit',
    zhCircuitName: '亞斯碼頭賽道',
    laps: 58,
    lengthKm: 5.281,
    date: '2026-12-06',
    taiwanQualiTime: '12/05 (六) 22:00',
    taiwanRaceTime: '12/06 (日) 21:00',
    isSprint: false,
    status: 'upcoming',
    baseLapSec: 85.6,
    topSpeedKmh: 334,
    corners: 16,
    drsZones: 2,
    svgPath: 'M 95 215 L 265 215 L 395 165 C 425 150 420 105 385 95 L 220 95 L 135 135 C 95 150 75 185 95 215 Z',
    startFinish: { x: 185, y: 215 },
    sectorSplit: { s1EndRatio: 0.32, s2EndRatio: 0.67 },
  },
];

export interface TelemetryPoint {
  distanceM: number;
  speedA: number;
  speedB: number;
  throttleA: number;
  throttleB: number;
  brakeA: number;
  brakeB: number;
  gearA: number;
  gearB: number;
  drsA: number;
  drsB: number;
  deltaSec: number; // positive = Driver A ahead, negative = Driver B ahead
}

export interface LapProgressionPoint {
  lap: number;
  timeA: number | null;
  timeB: number | null;
  fuelCorrectedA: number | null;
  fuelCorrectedB: number | null;
  compoundA: TyreCompound;
  compoundB: TyreCompound;
  pitA: boolean;
  pitB: boolean;
}

export interface TyreStint {
  compound: TyreCompound;
  startLap: number;
  endLap: number;
  avgPaceSec: number;
  degPerLap: number;
}

export interface MiniSectorResult {
  index: number;
  sector: 1 | 2 | 3;
  faster: 'A' | 'B';
  deltaMs: number;
}

export interface SessionTelemetryBundle {
  gp: GrandPrixInfo;
  session: SessionType;
  driverA: DriverInfo;
  driverB: DriverInfo;
  fastestLapA: string;
  fastestLapB: string;
  bestS1A: string;
  bestS1B: string;
  bestS2A: string;
  bestS2B: string;
  bestS3A: string;
  bestS3B: string;
  topSpeedA: number;
  topSpeedB: number;
  pitStopsA: number;
  pitStopsB: number;
  telemetry: TelemetryPoint[];
  laps: LapProgressionPoint[];
  stintsA: TyreStint[];
  stintsB: TyreStint[];
  miniSectors: MiniSectorResult[];
}

function seededRandom(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function formatLapTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const rem = seconds - mins * 60;
  return `${mins}:${rem.toFixed(3).padStart(6, '0')}`;
}

export function formatSectorTime(seconds: number): string {
  return seconds.toFixed(3);
}

export function generateSessionTelemetry(
  gp: GrandPrixInfo,
  session: SessionType,
  driverA: DriverInfo,
  driverB: DriverInfo,
  season: SeasonYear
): SessionTelemetryBundle {
  const seedBase =
    gp.round * 997 +
    driverA.number * 31 +
    driverB.number * 17 +
    (session === 'Qualifying' ? 7 : session === 'Sprint' ? 3 : 1) +
    (season === '2025' ? 500 : 0);
  const rand = seededRandom(seedBase);

  const sessionPaceFactor =
    session === 'Qualifying' ? 0.965 : session === 'Sprint' ? 0.992 : 1.0;
  const driverAPaceOffset = (driverA.rank2026 - 1) * 0.045 - 0.15;
  const driverBPaceOffset = (driverB.rank2026 - 1) * 0.045 - 0.15;

  const baseA = gp.baseLapSec * sessionPaceFactor + driverAPaceOffset;
  const baseB = gp.baseLapSec * sessionPaceFactor + driverBPaceOffset;

  const totalDistM = Math.round(gp.lengthKm * 1000);
  const pointsCount = 100;
  const telemetry: TelemetryPoint[] = [];

  let cumulativeDelta = 0;
  for (let i = 0; i <= pointsCount; i++) {
    const ratio = i / pointsCount;
    const distanceM = Math.round(ratio * totalDistM);

    // Multi-frequency corner profile
    const cornerWave =
      Math.sin(ratio * Math.PI * (gp.corners * 0.55)) * 0.45 +
      Math.cos(ratio * Math.PI * 6) * 0.3 +
      Math.sin(ratio * Math.PI * 14) * 0.25;

    const normalizedThrottleZone = Math.max(0, Math.min(1, 0.58 + cornerWave * 0.52));
    const speedBase = 110 + normalizedThrottleZone * (gp.topSpeedKmh - 110);

    const speedA = Math.round(
      Math.max(72, Math.min(gp.topSpeedKmh + 4, speedBase + (rand() - 0.48) * 12))
    );
    const speedB = Math.round(
      Math.max(72, Math.min(gp.topSpeedKmh + 4, speedBase - (driverBPaceOffset - driverAPaceOffset) * 14 + (rand() - 0.5) * 12))
    );

    const throttleA =
      speedA > 270 ? 100 : Math.round(Math.max(0, Math.min(100, normalizedThrottleZone * 115 - 8 + (rand() - 0.5) * 6)));
    const throttleB =
      speedB > 270 ? 100 : Math.round(Math.max(0, Math.min(100, normalizedThrottleZone * 115 - 10 + (rand() - 0.5) * 6)));

    const brakeA = throttleA < 22 ? Math.round(65 + rand() * 35) : 0;
    const brakeB = throttleB < 22 ? Math.round(62 + rand() * 38) : 0;

    const gearA = Math.max(1, Math.min(8, Math.round(1 + (speedA / gp.topSpeedKmh) * 7)));
    const gearB = Math.max(1, Math.min(8, Math.round(1 + (speedB / gp.topSpeedKmh) * 7)));

    const drsA = speedA > gp.topSpeedKmh * 0.84 && throttleA > 92 ? 1 : 0;
    const drsB = speedB > gp.topSpeedKmh * 0.84 && throttleB > 92 ? 1 : 0;

    cumulativeDelta += ((speedA - speedB) / 320) * 0.032 + (rand() - 0.5) * 0.012;

    telemetry.push({
      distanceM,
      speedA,
      speedB,
      throttleA,
      throttleB,
      brakeA,
      brakeB,
      gearA,
      gearB,
      drsA,
      drsB,
      deltaSec: Number(cumulativeDelta.toFixed(3)),
    });
  }

  const totalLaps = session === 'Sprint' ? Math.round(gp.laps * 0.32) : session === 'Qualifying' ? 18 : gp.laps;
  const pitLapA1 = Math.round(totalLaps * 0.33);
  const pitLapA2 = Math.round(totalLaps * 0.68);
  const pitLapB1 = Math.round(totalLaps * 0.36);
  const pitLapB2 = Math.round(totalLaps * 0.71);

  const stintsA: TyreStint[] =
    session === 'Qualifying'
      ? [
          { compound: 'Soft', startLap: 1, endLap: 6, avgPaceSec: baseA + 0.4, degPerLap: 0.08 },
          { compound: 'Soft', startLap: 7, endLap: 12, avgPaceSec: baseA + 0.15, degPerLap: 0.07 },
          { compound: 'Soft', startLap: 13, endLap: totalLaps, avgPaceSec: baseA, degPerLap: 0.06 },
        ]
      : session === 'Sprint'
      ? [{ compound: 'Medium', startLap: 1, endLap: totalLaps, avgPaceSec: baseA + 0.5, degPerLap: 0.055 }]
      : [
          { compound: 'Medium', startLap: 1, endLap: pitLapA1, avgPaceSec: baseA + 1.8, degPerLap: 0.062 },
          { compound: 'Hard', startLap: pitLapA1 + 1, endLap: pitLapA2, avgPaceSec: baseA + 1.1, degPerLap: 0.038 },
          { compound: 'Soft', startLap: pitLapA2 + 1, endLap: totalLaps, avgPaceSec: baseA + 0.4, degPerLap: 0.085 },
        ];

  const stintsB: TyreStint[] =
    session === 'Qualifying'
      ? [
          { compound: 'Soft', startLap: 1, endLap: 6, avgPaceSec: baseB + 0.5, degPerLap: 0.085 },
          { compound: 'Soft', startLap: 7, endLap: 12, avgPaceSec: baseB + 0.25, degPerLap: 0.075 },
          { compound: 'Soft', startLap: 13, endLap: totalLaps, avgPaceSec: baseB + 0.1, degPerLap: 0.065 },
        ]
      : session === 'Sprint'
      ? [{ compound: 'Soft', startLap: 1, endLap: totalLaps, avgPaceSec: baseB + 0.4, degPerLap: 0.078 }]
      : [
          { compound: 'Soft', startLap: 1, endLap: pitLapB1, avgPaceSec: baseB + 1.6, degPerLap: 0.078 },
          { compound: 'Hard', startLap: pitLapB1 + 1, endLap: pitLapB2, avgPaceSec: baseB + 1.2, degPerLap: 0.041 },
          { compound: 'Medium', startLap: pitLapB2 + 1, endLap: totalLaps, avgPaceSec: baseB + 0.6, degPerLap: 0.056 },
        ];

  const getCompoundForLap = (stints: TyreStint[], lap: number): TyreStint => {
    return stints.find((s) => lap >= s.startLap && lap <= s.endLap) ?? stints[stints.length - 1];
  };

  const laps: LapProgressionPoint[] = [];
  let minLapA = Infinity;
  let minLapB = Infinity;

  for (let lap = 1; lap <= totalLaps; lap++) {
    const sA = getCompoundForLap(stintsA, lap);
    const sB = getCompoundForLap(stintsB, lap);
    const ageA = lap - sA.startLap;
    const ageB = lap - sB.startLap;

    const pitA = session === 'Race' && (lap === pitLapA1 || lap === pitLapA2);
    const pitB = session === 'Race' && (lap === pitLapB1 || lap === pitLapB2);

    const fuelPenalty = session === 'Race' ? (totalLaps - lap) * 0.032 : 0;

    const rawA =
      baseA +
      fuelPenalty +
      ageA * sA.degPerLap +
      (pitA ? 2.8 : 0) +
      (rand() - 0.5) * 0.35;
    const rawB =
      baseB +
      fuelPenalty +
      ageB * sB.degPerLap +
      (pitB ? 2.9 : 0) +
      (rand() - 0.5) * 0.35;

    if (!pitA && rawA < minLapA) minLapA = rawA;
    if (!pitB && rawB < minLapB) minLapB = rawB;

    laps.push({
      lap,
      timeA: Number(rawA.toFixed(3)),
      timeB: Number(rawB.toFixed(3)),
      fuelCorrectedA: Number((rawA - fuelPenalty).toFixed(3)),
      fuelCorrectedB: Number((rawB - fuelPenalty).toFixed(3)),
      compoundA: sA.compound,
      compoundB: sB.compound,
      pitA,
      pitB,
    });
  }

  const s1Ratio = gp.sectorSplit.s1EndRatio;
  const s2Ratio = gp.sectorSplit.s2EndRatio - gp.sectorSplit.s1EndRatio;
  const s3Ratio = 1 - gp.sectorSplit.s2EndRatio;

  const miniSectors: MiniSectorResult[] = [];
  for (let idx = 0; idx < 21; idx++) {
    const ratio = idx / 21;
    const sector: 1 | 2 | 3 =
      ratio < gp.sectorSplit.s1EndRatio ? 1 : ratio < gp.sectorSplit.s2EndRatio ? 2 : 3;
    const faster: 'A' | 'B' = rand() > 0.45 ? 'A' : 'B';
    const deltaMs = Math.round(8 + rand() * 42);
    miniSectors.push({ index: idx, sector, faster, deltaMs });
  }

  return {
    gp,
    session,
    driverA,
    driverB,
    fastestLapA: formatLapTime(minLapA),
    fastestLapB: formatLapTime(minLapB),
    bestS1A: formatSectorTime(minLapA * s1Ratio),
    bestS1B: formatSectorTime(minLapB * s1Ratio),
    bestS2A: formatSectorTime(minLapA * s2Ratio),
    bestS2B: formatSectorTime(minLapB * s2Ratio),
    bestS3A: formatSectorTime(minLapA * s3Ratio),
    bestS3B: formatSectorTime(minLapB * s3Ratio),
    topSpeedA: Math.max(...telemetry.map((t) => t.speedA)),
    topSpeedB: Math.max(...telemetry.map((t) => t.speedB)),
    pitStopsA: session === 'Race' ? 2 : session === 'Sprint' ? 0 : 3,
    pitStopsB: session === 'Race' ? 2 : session === 'Sprint' ? 0 : 3,
    telemetry,
    laps,
    stintsA,
    stintsB,
    miniSectors,
  };
}
