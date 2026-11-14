import { useEffect, useState } from 'react'
import { formatEstClock, getEstAtmosphere } from '../time/estPeriod'
import { useFeaturedCar } from '../cars/CarContext'

export function AboutHome() {
  const car = useFeaturedCar()
  const [clock, setClock] = useState(() => formatEstClock())
  const [label, setLabel] = useState(() => getEstAtmosphere().label)

  useEffect(() => {
    const tick = () => {
      setClock(formatEstClock())
      setLabel(getEstAtmosphere().label)
    }
    const id = window.setInterval(tick, 15_000)
    tick()
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="about-home">
      <header className="about-home__brand">
        <p className="about-home__kicker">{label}</p>
        <h1>Rohan Ondkar</h1>
        <p className="about-home__tag">Software engineer. Motorsport lifeline.</p>
      </header>

      <div className="about-home__copy">
        <p>
          I’m Rohan — a software engineer who builds systems the way a race weekend unfolds:
          telemetry, vision, simulation, and radio. By day I write code; the rest of the time I’m
          deep in F1 (2008–present), WEC across Hypercar / LMP2 / LMGT3, Garage 56, DTM, IndyCar,
          rally, Super GT, and Dakar.
        </p>
        <p>
          This driveway is the front of my house on the web. The sky follows Eastern time. Each
          visit parks a different car from the collection out front — today it’s the{' '}
          <strong>{car.name}</strong> ({car.year}).
        </p>
        <p className="about-home__carline">
          <span className="about-home__swatch" style={{ background: car.livery.primary }} />
          <span className="about-home__swatch" style={{ background: car.livery.secondary }} />
          <span className="about-home__swatch" style={{ background: car.livery.accent }} />
          <span>
            {car.series} · {car.shortName}
          </span>
        </p>
        <p className="about-home__muted">{car.blurb}</p>
        <div className="about-home__actions">
          <a
            className="about-home__cta"
            href="https://github.com/rohanondkar"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <span className="about-home__clock" aria-live="polite">
            {clock}
          </span>
        </div>
      </div>
    </div>
  )
}
