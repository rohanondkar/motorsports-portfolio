import type { ProjectId } from './projects'

export type SeriesId =
  | 'f1'
  | 'wec-hypercar'
  | 'wec-lmp2'
  | 'wec-lmgt3'
  | 'garage56'
  | 'dtm'
  | 'indycar'
  | 'rally'
  | 'supergt'
  | 'dakar'

export interface CarDef {
  id: string
  series: SeriesId
  label: string
  color: string
  accent: string
  scale: [number, number, number]
  pathOffset: number
  projectId?: ProjectId
  lore?: string
}

export const SERIES_LABELS: Record<SeriesId, string> = {
  f1: 'Formula 1',
  'wec-hypercar': 'WEC Hypercar',
  'wec-lmp2': 'WEC LMP2',
  'wec-lmgt3': 'WEC LMGT3',
  garage56: 'Garage 56',
  dtm: 'DTM',
  indycar: 'IndyCar',
  rally: 'Rally',
  supergt: 'Super GT',
  dakar: 'Dakar',
}

export const CARS: CarDef[] = [
  {
    id: 'f1-lead',
    series: 'f1',
    label: 'F1 — Lead',
    color: '#e10600',
    accent: '#ffffff',
    scale: [1.05, 0.95, 1.1],
    pathOffset: 0,
    projectId: 'f1-engineer-bot',
  },
  {
    id: 'wec-hyper',
    series: 'wec-hypercar',
    label: 'Hypercar',
    color: '#1a3a6b',
    accent: '#f0c040',
    scale: [1.15, 1.05, 1.2],
    pathOffset: 0.08,
    projectId: 'blender-sim',
  },
  {
    id: 'wec-lmp2',
    series: 'wec-lmp2',
    label: 'LMP2',
    color: '#c45c26',
    accent: '#111111',
    scale: [1.1, 1, 1.15],
    pathOffset: 0.16,
    lore: 'Prototype grit — middle class of endurance.',
  },
  {
    id: 'wec-gt3',
    series: 'wec-lmgt3',
    label: 'LMGT3',
    color: '#2d6a4f',
    accent: '#d8f3dc',
    scale: [1.2, 1.05, 1.15],
    pathOffset: 0.24,
    lore: 'GT silhouette under the floodlights.',
  },
  {
    id: 'g56',
    series: 'garage56',
    label: 'Garage 56',
    color: '#ff6b00',
    accent: '#1d3557',
    scale: [1.25, 1.15, 1.2],
    pathOffset: 0.32,
    lore: 'NASCAR at Le Mans — the experiment that rewrote the script.',
  },
  {
    id: 'dtm-1',
    series: 'dtm',
    label: 'DTM',
    color: '#111111',
    accent: '#00d2be',
    scale: [1.15, 1, 1.1],
    pathOffset: 0.4,
    lore: 'Touring car aggression, door-to-door.',
  },
  {
    id: 'indy-1',
    series: 'indycar',
    label: 'IndyCar',
    color: '#0057b8',
    accent: '#ffd100',
    scale: [1, 0.95, 1.15],
    pathOffset: 0.48,
    projectId: 'lane-vision',
  },
  {
    id: 'rally-1',
    series: 'rally',
    label: 'Rally',
    color: '#7b2cbf',
    accent: '#ffd60a',
    scale: [1.1, 1.2, 1.05],
    pathOffset: 0.56,
    lore: 'Gravel, stages, and zero margin.',
  },
  {
    id: 'sgt-1',
    series: 'supergt',
    label: 'Super GT',
    color: '#d90429',
    accent: '#ffffff',
    scale: [1.2, 1.05, 1.15],
    pathOffset: 0.64,
    projectId: 'tablewhisper',
  },
  {
    id: 'dakar-1',
    series: 'dakar',
    label: 'Dakar',
    color: '#bc6c25',
    accent: '#fefae0',
    scale: [1.35, 1.4, 1.25],
    pathOffset: 0.72,
    projectId: 'kitchen-link',
  },
  {
    id: 'f1-chase',
    series: 'f1',
    label: 'F1 — Chase',
    color: '#00a3e0',
    accent: '#ffffff',
    scale: [1.05, 0.95, 1.1],
    pathOffset: 0.88,
    projectId: 'ratville',
  },
]

export const DEFAULT_FOCUS_CAR_ID = 'f1-lead'
