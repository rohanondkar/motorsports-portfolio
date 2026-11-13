import { create } from 'zustand'
import { DEFAULT_FOCUS_CAR_ID } from '../data/cars'
import type { SeriesId } from '../data/cars'
import type { TrackId, WeatherId, TimeOfDayId } from '../data/environments'
import type { RoomId } from '../data/projects'
import {
  detectQualityTier,
  settingsForTier,
  type QualitySettings,
  type QualityTier,
} from '../quality/detectTier'

export type ViewMode = 'race' | 'room'
export type LayoutMode = 'portrait' | 'landscape' | 'wide' | 'tall-narrow'
export type PanelId = 'about' | null

interface AppState {
  view: ViewMode
  room: RoomId
  focusCarId: string
  seriesFilter: SeriesId | 'all'
  trackId: TrackId
  weatherId: WeatherId
  todId: TimeOfDayId
  quality: QualitySettings
  qualityOverride: QualityTier | null
  layoutMode: LayoutMode
  panel: PanelId
  reducedMotion: boolean
  paused: boolean
  setFocusCar: (id: string) => void
  setSeriesFilter: (s: SeriesId | 'all') => void
  setTrack: (id: TrackId) => void
  setWeather: (id: WeatherId) => void
  setTod: (id: TimeOfDayId) => void
  enterRoom: (room: Exclude<RoomId, null>) => void
  exitRoom: () => void
  setQualityOverride: (tier: QualityTier | null) => void
  setLayoutMode: (mode: LayoutMode) => void
  setPanel: (panel: PanelId) => void
  setReducedMotion: (v: boolean) => void
  setPaused: (v: boolean) => void
  cycleFocus: (dir: 1 | -1, carIds: string[]) => void
}

function resolveQuality(override: QualityTier | null): QualitySettings {
  const tier = override ?? detectQualityTier()
  return settingsForTier(tier)
}

export const useAppStore = create<AppState>((set, get) => ({
  view: 'race',
  room: null,
  focusCarId: DEFAULT_FOCUS_CAR_ID,
  seriesFilter: 'all',
  trackId: 'spa',
  weatherId: 'clear',
  todId: 'dusk',
  quality: settingsForTier('medium'),
  qualityOverride: null,
  layoutMode: 'landscape',
  panel: null,
  reducedMotion: false,
  paused: false,
  setFocusCar: (id) => set({ focusCarId: id }),
  setSeriesFilter: (s) => set({ seriesFilter: s }),
  setTrack: (id) => set({ trackId: id }),
  setWeather: (id) => set({ weatherId: id }),
  setTod: (id) => set({ todId: id }),
  enterRoom: (room) => set({ view: 'room', room, panel: null }),
  exitRoom: () => set({ view: 'race', room: null }),
  setQualityOverride: (tier) =>
    set({ qualityOverride: tier, quality: resolveQuality(tier) }),
  setLayoutMode: (mode) => set({ layoutMode: mode }),
  setPanel: (panel) => set({ panel }),
  setReducedMotion: (v) => set({ reducedMotion: v }),
  setPaused: (v) => set({ paused: v }),
  cycleFocus: (dir, carIds) => {
    if (carIds.length === 0) return
    const { focusCarId } = get()
    const idx = Math.max(0, carIds.indexOf(focusCarId))
    const next = carIds[(idx + dir + carIds.length) % carIds.length]
    set({ focusCarId: next })
  },
}))

export function initQualityFromDevice() {
  const { qualityOverride } = useAppStore.getState()
  useAppStore.setState({ quality: resolveQuality(qualityOverride) })
}
