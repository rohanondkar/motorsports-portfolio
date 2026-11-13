import { TRACKS, WEATHER, TOD, type TrackId, type WeatherId, type TimeOfDayId } from '../data/environments'
import { SERIES_LABELS, type SeriesId } from '../data/cars'
import { useAppStore } from '../store/useAppStore'
import type { QualityTier } from '../quality/detectTier'

const SERIES_OPTIONS: Array<SeriesId | 'all'> = [
  'all',
  'f1',
  'wec-hypercar',
  'wec-lmp2',
  'wec-lmgt3',
  'garage56',
  'dtm',
  'indycar',
  'rally',
  'supergt',
  'dakar',
]

export function EnvControls() {
  const trackId = useAppStore((s) => s.trackId)
  const weatherId = useAppStore((s) => s.weatherId)
  const todId = useAppStore((s) => s.todId)
  const seriesFilter = useAppStore((s) => s.seriesFilter)
  const quality = useAppStore((s) => s.quality)
  const qualityOverride = useAppStore((s) => s.qualityOverride)
  const setTrack = useAppStore((s) => s.setTrack)
  const setWeather = useAppStore((s) => s.setWeather)
  const setTod = useAppStore((s) => s.setTod)
  const setSeriesFilter = useAppStore((s) => s.setSeriesFilter)
  const setQualityOverride = useAppStore((s) => s.setQualityOverride)
  const layoutMode = useAppStore((s) => s.layoutMode)

  return (
    <div className="edge-top" aria-label="Scene controls">
      <select
        aria-label="Series filter"
        value={seriesFilter}
        onChange={(e) => setSeriesFilter(e.target.value as SeriesId | 'all')}
      >
        {SERIES_OPTIONS.map((s) => (
          <option key={s} value={s}>
            {s === 'all' ? 'All series' : SERIES_LABELS[s]}
          </option>
        ))}
      </select>
      <select
        aria-label="Track"
        value={trackId}
        onChange={(e) => setTrack(e.target.value as TrackId)}
      >
        {Object.values(TRACKS).map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <select
        aria-label="Weather"
        value={weatherId}
        onChange={(e) => setWeather(e.target.value as WeatherId)}
      >
        {Object.values(WEATHER).map((w) => (
          <option key={w.id} value={w.id}>
            {w.label}
          </option>
        ))}
      </select>
      <select
        aria-label="Time of day"
        value={todId}
        onChange={(e) => setTod(e.target.value as TimeOfDayId)}
      >
        {Object.values(TOD).map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
      <select
        aria-label="Graphics quality"
        value={qualityOverride ?? quality.tier}
        onChange={(e) => {
          const v = e.target.value as QualityTier
          setQualityOverride(v)
        }}
        title={`Layout: ${layoutMode}`}
      >
        <option value="low">Quality: Low</option>
        <option value="medium">Quality: Medium</option>
        <option value="high">Quality: High</option>
      </select>
    </div>
  )
}
