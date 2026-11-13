import { PROFILE } from '../data/projects'
import { useAppStore } from '../store/useAppStore'
import { BrandMark } from './BrandMark'
import { EnvControls } from './EnvControls'
import { PitBoard } from './PitBoard'

export function EdgeChrome() {
  const view = useAppStore((s) => s.view)
  const panel = useAppStore((s) => s.panel)
  const setPanel = useAppStore((s) => s.setPanel)
  const layoutMode = useAppStore((s) => s.layoutMode)

  if (view !== 'race') return null

  return (
    <div className="ui-layer">
      <BrandMark />
      <EnvControls />
      <PitBoard />
      {layoutMode !== 'tall-narrow' && (
        <div className="edge-corners">
          <button type="button" onClick={() => setPanel(panel === 'about' ? null : 'about')}>
            About
          </button>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              background: 'var(--panel)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid var(--panel-border)',
              padding: '0.45rem 0.7rem',
            }}
          >
            GitHub
          </a>
        </div>
      )}
      {panel === 'about' && (
        <div className="panel" role="dialog" aria-label="About">
          <button type="button" className="close" onClick={() => setPanel(null)}>
            Close
          </button>
          <h2>{PROFILE.name}</h2>
          <p>{PROFILE.about}</p>
          <p>
            Tap a car for the money shot. Enter opens that project’s room — engineer radio, vision
            HUD, wind tunnel, briefing table, or paddock.
          </p>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">
            github.com/{PROFILE.handle}
          </a>
        </div>
      )}
    </div>
  )
}
