export type DayPeriod = 'night' | 'dawn' | 'morning' | 'day' | 'golden' | 'dusk'

export interface EstAtmosphere {
  period: DayPeriod
  /** 0–24 decimal hour in America/New_York */
  hour: number
  label: string
  skyTop: string
  skyHorizon: string
  skyBottom: string
  sunColor: string
  sunIntensity: number
  ambientColor: string
  ambientIntensity: number
  hemiSky: string
  hemiGround: string
  hemiIntensity: number
  fogColor: string
  fogNear: number
  fogFar: number
  /** Normalized sun direction-ish elevation 0–1 */
  sunElevation: number
  sunAzimuth: number
  exposure: number
  garageLights: boolean
  fx: 'stars' | 'mist' | 'clouds' | 'heat' | 'embers' | 'fireflies'
}

function hourInTimeZone(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date)
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  return h + m / 60
}

function periodForHour(hour: number): DayPeriod {
  if (hour >= 5 && hour < 6.5) return 'dawn'
  if (hour >= 6.5 && hour < 11) return 'morning'
  if (hour >= 11 && hour < 16) return 'day'
  if (hour >= 16 && hour < 18.5) return 'golden'
  if (hour >= 18.5 && hour < 20.5) return 'dusk'
  return 'night'
}

const PRESETS: Record<DayPeriod, Omit<EstAtmosphere, 'period' | 'hour' | 'sunElevation' | 'sunAzimuth'>> = {
  night: {
    label: 'Night · EST',
    skyTop: '#0a1020',
    skyHorizon: '#1e2a48',
    skyBottom: '#12182a',
    sunColor: '#b0c0ff',
    sunIntensity: 0.28,
    ambientColor: '#2a3450',
    ambientIntensity: 0.42,
    hemiSky: '#3a4a70',
    hemiGround: '#12141c',
    hemiIntensity: 0.55,
    fogColor: '#12182a',
    fogNear: 24,
    fogFar: 75,
    exposure: 1.2,
    garageLights: true,
    fx: 'stars',
  },
  dawn: {
    label: 'Dawn · EST',
    skyTop: '#1a2a4a',
    skyHorizon: '#e8a070',
    skyBottom: '#f0c8a0',
    sunColor: '#ffb088',
    sunIntensity: 0.85,
    ambientColor: '#6a5870',
    ambientIntensity: 0.32,
    hemiSky: '#ffc9a8',
    hemiGround: '#3a2a28',
    hemiIntensity: 0.5,
    fogColor: '#d8c0b0',
    fogNear: 22,
    fogFar: 70,
    exposure: 1.05,
    garageLights: true,
    fx: 'mist',
  },
  morning: {
    label: 'Morning · EST',
    skyTop: '#4a7ab8',
    skyHorizon: '#c8dff5',
    skyBottom: '#e8f0f8',
    sunColor: '#fff4e0',
    sunIntensity: 1.55,
    ambientColor: '#8899aa',
    ambientIntensity: 0.42,
    hemiSky: '#b0d0f0',
    hemiGround: '#4a5048',
    hemiIntensity: 0.55,
    fogColor: '#c8d8e8',
    fogNear: 30,
    fogFar: 85,
    exposure: 1.1,
    garageLights: false,
    fx: 'clouds',
  },
  day: {
    label: 'Day · EST',
    skyTop: '#2f6eb5',
    skyHorizon: '#9ec4e8',
    skyBottom: '#d4e6f5',
    sunColor: '#fff8e8',
    sunIntensity: 1.9,
    ambientColor: '#90a0b0',
    ambientIntensity: 0.48,
    hemiSky: '#a8c8f0',
    hemiGround: '#5a6058',
    hemiIntensity: 0.6,
    fogColor: '#b8cce0',
    fogNear: 35,
    fogFar: 95,
    exposure: 1.15,
    garageLights: false,
    fx: 'heat',
  },
  golden: {
    label: 'Golden hour · EST',
    skyTop: '#3a5080',
    skyHorizon: '#f0a050',
    skyBottom: '#f8c878',
    sunColor: '#ffc070',
    sunIntensity: 1.35,
    ambientColor: '#a08070',
    ambientIntensity: 0.38,
    hemiSky: '#f0b070',
    hemiGround: '#4a3830',
    hemiIntensity: 0.55,
    fogColor: '#e8c8a0',
    fogNear: 25,
    fogFar: 75,
    exposure: 1.12,
    garageLights: false,
    fx: 'embers',
  },
  dusk: {
    label: 'Dusk · EST',
    skyTop: '#2a2048',
    skyHorizon: '#e07040',
    skyBottom: '#f09058',
    sunColor: '#ff8350',
    sunIntensity: 1.2,
    ambientColor: '#7a6078',
    ambientIntensity: 0.58,
    hemiSky: '#f08860',
    hemiGround: '#3a2818',
    hemiIntensity: 0.75,
    fogColor: '#6a4050',
    fogNear: 30,
    fogFar: 85,
    exposure: 1.25,
    garageLights: true,
    fx: 'fireflies',
  },
}

/** Sun elevation 0 (horizon) → 1 (zenith), based on EST hour. */
function sunElevation(hour: number): number {
  // Peak ~13:00 EST
  const x = (hour - 13) / 7
  return Math.max(0, 1 - x * x)
}

function sunAzimuth(hour: number): number {
  // East morning → west evening, radians around Y
  return ((hour - 6) / 12) * Math.PI - Math.PI / 2
}

export function getEstAtmosphere(now = new Date()): EstAtmosphere {
  const hour = hourInTimeZone(now, 'America/New_York')
  const period = periodForHour(hour)
  return {
    ...PRESETS[period],
    period,
    hour,
    sunElevation: sunElevation(hour),
    sunAzimuth: sunAzimuth(hour),
  }
}

export function formatEstClock(now = new Date()): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(now)
}
