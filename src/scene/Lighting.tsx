import { useMemo } from 'react'
import type { TodPreset, WeatherPreset } from '../data/environments'

interface LightingProps {
  tod: TodPreset
  weather: WeatherPreset
  shadows: boolean
  shadowMapSize: number
}

export function Lighting({ tod, weather, shadows, shadowMapSize }: LightingProps) {
  const sunIntensity = tod.sunIntensity * weather.sunIntensityMul
  const sunPos = useMemo(() => {
    if (tod.id === 'dawn') return [-18, 10, -8] as const
    if (tod.id === 'dusk') return [16, 8, 10] as const
    if (tod.id === 'night') return [4, 22, -6] as const
    return [12, 22, 8] as const
  }, [tod.id])

  return (
    <>
      <color attach="background" args={[tod.skyBottom]} />
      <fog attach="fog" args={[weather.fogColor, 18, 18 + 1 / Math.max(weather.fogDensity, 0.004)]} />
      <ambientLight intensity={tod.ambientIntensity} color={tod.ambient} />
      <hemisphereLight
        intensity={0.55}
        color={tod.hemiSky}
        groundColor={tod.hemiGround}
      />
      <directionalLight
        castShadow={shadows}
        intensity={sunIntensity}
        color={tod.sunColor}
        position={sunPos}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-far={80}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0002}
      />
      {tod.id === 'night' && (
        <>
          <spotLight
            intensity={2.2}
            color="#ffe6b0"
            position={[0, 14, 0]}
            angle={0.7}
            penumbra={0.5}
            castShadow={shadows}
          />
          <pointLight intensity={1.2} color="#4cc9f0" position={[-8, 4, 6]} />
          <pointLight intensity={1.0} color="#f72585" position={[10, 3, -8]} />
        </>
      )}
    </>
  )
}
