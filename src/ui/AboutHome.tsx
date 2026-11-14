import { useEffect, useState } from 'react'
import { formatEstClock, getEstAtmosphere } from '../time/estPeriod'

export function AboutHome() {
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
        <p className="about-home__tag">At home in motorsport.</p>
      </header>

      <div className="about-home__copy">
        <p>
          Software engineer. Builder. The garage light is on because the work never really leaves
          the paddock — F1 from 2008 on, WEC across the classes, Garage 56, DTM, IndyCar, rally,
          Super GT, Dakar.
        </p>
        <p>
          This is the front of the house: a driveway, a car, and the sky matching Eastern time.
          Stay awhile.
        </p>
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
