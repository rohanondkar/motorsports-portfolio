export type TrackId =
  | 'spa'
  | 'lemans'
  | 'monaco'
  | 'indy'
  | 'nurburgring'
  | 'suzuka'
  | 'rally'
  | 'dakar'

export type WeatherId = 'clear' | 'light-rain' | 'heavy-wet' | 'fog' | 'dust'

export type TimeOfDayId = 'dawn' | 'day' | 'dusk' | 'night'

export interface TrackPreset {
  id: TrackId
  name: string
  /** Approximate closed path control points in XZ (y up). */
  path: [number, number][]
  bankHint: number
  groundTint: string
}

export interface WeatherPreset {
  id: WeatherId
  label: string
  fogDensity: number
  fogColor: string
  wetness: number
  particles: 'none' | 'rain' | 'heavy-rain' | 'dust'
  sunIntensityMul: number
}

export interface TodPreset {
  id: TimeOfDayId
  label: string
  skyTop: string
  skyBottom: string
  sunColor: string
  sunIntensity: number
  ambient: string
  ambientIntensity: number
  hemiSky: string
  hemiGround: string
}

export const TRACKS: Record<TrackId, TrackPreset> = {
  spa: {
    id: 'spa',
    name: 'Spa-Francorchamps',
    path: [
      [0, -18],
      [12, -14],
      [22, -4],
      [20, 8],
      [8, 16],
      [-6, 18],
      [-18, 10],
      [-22, -2],
      [-14, -14],
      [0, -18],
    ],
    bankHint: 0.08,
    groundTint: '#1a2e1a',
  },
  lemans: {
    id: 'lemans',
    name: 'Le Mans',
    path: [
      [0, -28],
      [8, -26],
      [10, 20],
      [6, 26],
      [-6, 26],
      [-10, 20],
      [-8, -26],
      [0, -28],
    ],
    bankHint: 0.04,
    groundTint: '#2a2a22',
  },
  monaco: {
    id: 'monaco',
    name: 'Monaco',
    path: [
      [0, -10],
      [8, -8],
      [12, 0],
      [8, 8],
      [0, 12],
      [-10, 6],
      [-12, -4],
      [-6, -10],
      [0, -10],
    ],
    bankHint: 0.02,
    groundTint: '#3a3a3a',
  },
  indy: {
    id: 'indy',
    name: 'Indianapolis',
    path: [
      [0, -22],
      [16, -20],
      [22, 0],
      [16, 20],
      [0, 22],
      [-16, 20],
      [-22, 0],
      [-16, -20],
      [0, -22],
    ],
    bankHint: 0.18,
    groundTint: '#3d2e1f',
  },
  nurburgring: {
    id: 'nurburgring',
    name: 'Nürburgring',
    path: [
      [0, -20],
      [14, -16],
      [20, -2],
      [14, 12],
      [4, 18],
      [-12, 16],
      [-20, 4],
      [-16, -12],
      [-4, -20],
      [0, -20],
    ],
    bankHint: 0.06,
    groundTint: '#1e2a1e',
  },
  suzuka: {
    id: 'suzuka',
    name: 'Suzuka',
    path: [
      [0, -16],
      [10, -14],
      [18, -4],
      [14, 8],
      [2, 14],
      [-8, 10],
      [-4, 0],
      [-14, -6],
      [-10, -14],
      [0, -16],
    ],
    bankHint: 0.05,
    groundTint: '#243024',
  },
  rally: {
    id: 'rally',
    name: 'Rally Stage',
    path: [
      [-16, -12],
      [-4, -18],
      [10, -14],
      [18, -2],
      [12, 12],
      [-2, 16],
      [-16, 8],
      [-20, -4],
      [-16, -12],
    ],
    bankHint: 0.1,
    groundTint: '#5c4030',
  },
  dakar: {
    id: 'dakar',
    name: 'Dakar Dunes',
    path: [
      [-20, 0],
      [-10, -14],
      [4, -18],
      [18, -8],
      [20, 6],
      [8, 16],
      [-8, 14],
      [-20, 0],
    ],
    bankHint: 0.12,
    groundTint: '#c4a574',
  },
}

export const WEATHER: Record<WeatherId, WeatherPreset> = {
  clear: {
    id: 'clear',
    label: 'Clear',
    fogDensity: 0.008,
    fogColor: '#87a0b8',
    wetness: 0,
    particles: 'none',
    sunIntensityMul: 1,
  },
  'light-rain': {
    id: 'light-rain',
    label: 'Light rain',
    fogDensity: 0.018,
    fogColor: '#6a7888',
    wetness: 0.45,
    particles: 'rain',
    sunIntensityMul: 0.55,
  },
  'heavy-wet': {
    id: 'heavy-wet',
    label: 'Heavy wet',
    fogDensity: 0.03,
    fogColor: '#4a5560',
    wetness: 0.9,
    particles: 'heavy-rain',
    sunIntensityMul: 0.35,
  },
  fog: {
    id: 'fog',
    label: 'Fog',
    fogDensity: 0.045,
    fogColor: '#9aa4ae',
    wetness: 0.2,
    particles: 'none',
    sunIntensityMul: 0.4,
  },
  dust: {
    id: 'dust',
    label: 'Dust / sand',
    fogDensity: 0.022,
    fogColor: '#c9a66b',
    wetness: 0,
    particles: 'dust',
    sunIntensityMul: 0.75,
  },
}

export const TOD: Record<TimeOfDayId, TodPreset> = {
  dawn: {
    id: 'dawn',
    label: 'Dawn',
    skyTop: '#1a2744',
    skyBottom: '#e8a87c',
    sunColor: '#ffb07a',
    sunIntensity: 1.2,
    ambient: '#6a5a70',
    ambientIntensity: 0.35,
    hemiSky: '#ffc9a0',
    hemiGround: '#3a2a20',
  },
  day: {
    id: 'day',
    label: 'Day',
    skyTop: '#2a5f9e',
    skyBottom: '#b8d4f0',
    sunColor: '#fff2d6',
    sunIntensity: 1.8,
    ambient: '#8899aa',
    ambientIntensity: 0.45,
    hemiSky: '#a8c8f0',
    hemiGround: '#3a4038',
  },
  dusk: {
    id: 'dusk',
    label: 'Dusk',
    skyTop: '#1b1333',
    skyBottom: '#c45c26',
    sunColor: '#ff7a3c',
    sunIntensity: 1.0,
    ambient: '#5a4060',
    ambientIntensity: 0.3,
    hemiSky: '#e07040',
    hemiGround: '#2a1810',
  },
  night: {
    id: 'night',
    label: 'Night',
    skyTop: '#050510',
    skyBottom: '#12182a',
    sunColor: '#a0b8ff',
    sunIntensity: 0.15,
    ambient: '#1a2030',
    ambientIntensity: 0.25,
    hemiSky: '#2a3550',
    hemiGround: '#0a0a10',
  },
}
