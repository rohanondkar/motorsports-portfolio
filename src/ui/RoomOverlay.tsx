import { PROJECTS, type ProjectId } from '../data/projects'
import { useAppStore } from '../store/useAppStore'

const ROOM_TO_PROJECT: Record<string, ProjectId> = {
  engineer: 'f1-engineer-bot',
  vision: 'lane-vision',
  windtunnel: 'blender-sim',
  briefing: 'tablewhisper',
  paddock: 'kitchen-link',
}

const RADIO_LINES: Record<string, string[]> = {
  engineer: [
    'Box this lap — box box.',
    'Gap behind 1.2. You’re free to push.',
    'Mode 7 confirmed. Tyre temps in window.',
    'Copy. Stay off the kerbs in 8.',
  ],
  vision: [
    'Lane confidence 0.94.',
    'Calibration RMSE within bounds.',
    'Track limits — right side flagged.',
  ],
  windtunnel: [
    'Yaw sweep complete.',
    'Downforce delta +2.1%.',
    'Cooling vs drag trade noted.',
  ],
  briefing: [
    'Stint plan locked.',
    'Safety car window: yellow contingency.',
    'Driver change at 03:40 local.',
  ],
  paddock: [
    'Guest list cleared.',
    'Badge printer online.',
    'Hospitality service window open.',
  ],
}

export function RoomOverlay() {
  const view = useAppStore((s) => s.view)
  const room = useAppStore((s) => s.room)
  const exitRoom = useAppStore((s) => s.exitRoom)
  const focusCarId = useAppStore((s) => s.focusCarId)

  if (view !== 'room' || !room) return null

  // Prefer project from focused car when paddock hosts multiple
  let projectId = ROOM_TO_PROJECT[room]
  if (room === 'paddock' && focusCarId === 'f1-chase') {
    projectId = 'ratville'
  }
  const project = PROJECTS[projectId]
  const lines = RADIO_LINES[room] ?? []

  return (
    <div className="room-overlay">
      <div className="room-chrome">
        <button type="button" onClick={exitRoom}>
          Back to race
        </button>
      </div>
      <div className="room-copy">
        <h2>{project.name}</h2>
        <p>{project.blurb}</p>
        {(room === 'engineer' || room === 'vision') && (
          <div className="telemetry">
            <div>
              Speed
              <strong>{room === 'engineer' ? '312' : '—'} kph</strong>
            </div>
            <div>
              {room === 'engineer' ? 'Tyre' : 'Conf'}
              <strong>{room === 'engineer' ? 'M 92°C' : '0.94'}</strong>
            </div>
            <div>
              {room === 'engineer' ? 'Fuel' : 'RMSE'}
              <strong>{room === 'engineer' ? '38.2 kg' : '0.21'}</strong>
            </div>
          </div>
        )}
        <div className="radio-log">
          {lines.map((l) => (
            <div key={l}>« {l}</div>
          ))}
        </div>
        <div className="pit-actions" style={{ marginTop: '0.75rem' }}>
          <a className="ghost" href={project.github} target="_blank" rel="noreferrer">
            Open on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
