import { useEffect, useState } from 'react'
import { Environment } from '@react-three/drei'
import { getEstAtmosphere, type EstAtmosphere } from '../time/estPeriod'
import { useFeaturedCar } from '../cars/CarContext'
import { GarageCar } from '../cars/GarageCar'
import { SkyGradient } from './SkyGradient'
import { LightingRig } from './LightingRig'
import { TimeFX } from './TimeFX'
import { HomeProperty } from './HomeProperty'
import { HomeCamera } from './HomeCamera'

function envPreset(period: EstAtmosphere['period']) {
  if (period === 'night' || period === 'dusk') return 'night' as const
  if (period === 'golden' || period === 'dawn') return 'sunset' as const
  return 'city' as const
}

export function HomeScene() {
  const car = useFeaturedCar()
  const [atm, setAtm] = useState<EstAtmosphere>(() => getEstAtmosphere())

  useEffect(() => {
    const tick = () => setAtm(getEstAtmosphere())
    tick()
    const id = window.setInterval(tick, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <>
      <LightingRig atm={atm} />
      <SkyGradient atm={atm} />
      <Environment preset={envPreset(atm.period)} environmentIntensity={0.45} />
      <TimeFX atm={atm} />
      <HomeProperty />
      <GarageCar def={car} position={[0, 0, 2.2]} />
      <HomeCamera />
    </>
  )
}
