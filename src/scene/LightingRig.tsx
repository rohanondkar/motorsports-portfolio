import { useMemo } from 'react'
import type { EstAtmosphere } from '../time/estPeriod'

export function LightingRig({ atm }: { atm: EstAtmosphere }) {
  const sunPos = useMemo(() => {
    const elev = 2 + atm.sunElevation * 28
    const dist = 35
    const x = Math.cos(atm.sunAzimuth) * dist
    const z = Math.sin(atm.sunAzimuth) * dist
    return [x, elev, z] as const
  }, [atm.sunAzimuth, atm.sunElevation])

  return (
    <>
      <color attach="background" args={[atm.skyBottom]} />
      <fog attach="fog" args={[atm.fogColor, atm.fogNear, atm.fogFar]} />
      <ambientLight intensity={atm.ambientIntensity} color={atm.ambientColor} />
      <hemisphereLight
        intensity={atm.hemiIntensity}
        color={atm.hemiSky}
        groundColor={atm.hemiGround}
      />
      <directionalLight
        castShadow
        intensity={atm.sunIntensity}
        color={atm.sunColor}
        position={sunPos}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0003}
      />
      {/* Soft fill — Bruno-like readability */}
      <directionalLight
        intensity={atm.sunIntensity * 0.22}
        color="#d8e8ff"
        position={[-sunPos[0] * 0.4, 8, -sunPos[2] * 0.4]}
      />
      {atm.garageLights && (
        <>
          <spotLight
            intensity={4.2}
            color="#ffe8c0"
            position={[-3.2, 3.6, 1.5]}
            angle={0.65}
            penumbra={0.5}
            castShadow
            distance={22}
          />
          <spotLight
            intensity={2.8}
            color="#fff0d8"
            position={[1.5, 4.0, 4.5]}
            angle={0.7}
            penumbra={0.6}
            distance={20}
          />
          <pointLight intensity={1.8} color="#ffd9a0" position={[2.5, 2.8, -1.5]} distance={14} />
          <pointLight intensity={1.4} color="#ffe0b0" position={[0, 2.5, 3.5]} distance={10} />
        </>
      )}
    </>
  )
}
