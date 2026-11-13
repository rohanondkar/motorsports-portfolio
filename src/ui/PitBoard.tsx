import { CARS, SERIES_LABELS } from '../data/cars'
import { PROJECTS, PROFILE } from '../data/projects'
import { useAppStore } from '../store/useAppStore'

export function PitBoard() {
  const focusCarId = useAppStore((s) => s.focusCarId)
  const seriesFilter = useAppStore((s) => s.seriesFilter)
  const quality = useAppStore((s) => s.quality)
  const enterRoom = useAppStore((s) => s.enterRoom)
  const cycleFocus = useAppStore((s) => s.cycleFocus)
  const layoutMode = useAppStore((s) => s.layoutMode)
  const setPanel = useAppStore((s) => s.setPanel)

  let list =
    seriesFilter === 'all' ? CARS : CARS.filter((c) => c.series === seriesFilter)
  if (list.length === 0) list = CARS
  list = list.slice(0, quality.maxCars)

  const car = list.find((c) => c.id === focusCarId) ?? list[0]
  const project = car?.projectId ? PROJECTS[car.projectId] : null

  return (
    <div className="pit-board" role="region" aria-label="Focused car">
      <div className="series">{SERIES_LABELS[car.series]}</div>
      <h2>{project ? project.name : car.label}</h2>
      <p className="blurb">
        {project?.blurb ?? car.lore ?? 'Part of the multi-series field. Keep them in frame.'}
      </p>
      {(project?.radioCall || car.lore) && (
        <p className="radio">“{project?.radioCall ?? car.lore}”</p>
      )}
      <div className="pit-actions">
        {project && (
          <button type="button" className="primary" onClick={() => enterRoom(project.room)}>
            Enter
          </button>
        )}
        {project && (
          <a className="ghost" href={project.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
        <button type="button" className="ghost" onClick={() => cycleFocus(-1, list.map((c) => c.id))}>
          Prev
        </button>
        <button type="button" className="ghost" onClick={() => cycleFocus(1, list.map((c) => c.id))}>
          Next
        </button>
        {(layoutMode === 'tall-narrow' || layoutMode === 'portrait') && (
          <>
            <button type="button" className="ghost" onClick={() => setPanel('about')}>
              About
            </button>
            <a className="ghost" href={PROFILE.github} target="_blank" rel="noreferrer">
              Profile
            </a>
          </>
        )}
      </div>
    </div>
  )
}
