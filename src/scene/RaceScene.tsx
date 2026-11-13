import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'
import { CARS } from '../data/cars'
import { TRACKS, WEATHER, TOD } from '../data/environments'
import { PROJECTS } from '../data/projects'
import { useAppStore } from '../store/useAppStore'
import { SeriesCar } from './cars/SeriesCar'
import { TrackMesh, buildTrackCurve } from './environments/TrackMesh'
import { SkyDome } from './environments/SkyDome'
import { Lighting } from './Lighting'
import { WeatherFX } from './WeatherFX'
import { CameraDirector } from './CameraDirector'
import { raceClock } from './raceClock'
import { EngineerRoom } from '../rooms/EngineerRoom'
import { VisionRoom } from '../rooms/VisionRoom'
import { WindTunnelRoom } from '../rooms/WindTunnelRoom'
import { BriefingRoom } from '../rooms/BriefingRoom'
import { PaddockRoom } from '../rooms/PaddockRoom'

function FocusFollowLight({
  curve,
  offset,
}: {
  curve: THREE.CatmullRomCurve3
  offset: number
}) {
  const ref = useRef<THREE.PointLight>(null)
  useFrame(() => {
    if (!ref.current) return
    const t = ((offset + raceClock.t * raceClock.speed) % 1 + 1) % 1
    const p = curve.getPointAt(t)
    ref.current.position.set(p.x, p.y + 3.2, p.z)
  })
  return <pointLight ref={ref} intensity={2.2} color="#fff2d6" distance={14} decay={2} />
}

export function RaceScene() {
  const trackId = useAppStore((s) => s.trackId)
  const weatherId = useAppStore((s) => s.weatherId)
  const todId = useAppStore((s) => s.todId)
  const focusCarId = useAppStore((s) => s.focusCarId)
  const seriesFilter = useAppStore((s) => s.seriesFilter)
  const quality = useAppStore((s) => s.quality)
  const view = useAppStore((s) => s.view)
  const room = useAppStore((s) => s.room)
  const reducedMotion = useAppStore((s) => s.reducedMotion)
  const paused = useAppStore((s) => s.paused)
  const setFocusCar = useAppStore((s) => s.setFocusCar)
  const enterRoom = useAppStore((s) => s.enterRoom)

  const track = TRACKS[trackId]
  const weather = WEATHER[weatherId]
  const tod = TOD[todId]
  const curve = useMemo(() => buildTrackCurve(track), [track])

  useFrame((_, dt) => {
    if (paused || view === 'room') return
    raceClock.t += dt * (reducedMotion ? 0.35 : 1)
  })

  const visibleCars = useMemo(() => {
    let list =
      seriesFilter === 'all' ? CARS : CARS.filter((c) => c.series === seriesFilter)
    if (list.length === 0) list = CARS
    return list.slice(0, quality.maxCars)
  }, [seriesFilter, quality.maxCars])

  const focusDef = visibleCars.find((c) => c.id === focusCarId) ?? visibleCars[0]

  useEffect(() => {
    if (focusDef && focusDef.id !== focusCarId) {
      setFocusCar(focusDef.id)
    }
  }, [focusDef, focusCarId, setFocusCar])

  return (
    <>
      <Lighting
        tod={tod}
        weather={weather}
        shadows={quality.shadows}
        shadowMapSize={quality.shadowMapSize}
      />
      {view === 'race' && <SkyDome tod={tod} />}

      {view === 'race' && (
        <>
          <TrackMesh track={track} wetness={weather.wetness} curve={curve} />
          <WeatherFX weather={weather} enabled={quality.particles} />
          {visibleCars.map((car) => (
            <SeriesCar
              key={car.id}
              def={car}
              curve={curve}
              focused={car.id === focusDef?.id}
              wetness={weather.wetness}
              onSelect={() => {
                if (car.id === focusCarId && car.projectId) {
                  enterRoom(PROJECTS[car.projectId].room)
                } else {
                  setFocusCar(car.id)
                }
              }}
            />
          ))}
          {focusDef && (
            <CameraDirector
              curve={curve}
              focusOffset={focusDef.pathOffset}
              reducedMotion={reducedMotion}
            />
          )}
          {focusDef && (
            <FocusFollowLight curve={curve} offset={focusDef.pathOffset} />
          )}
        </>
      )}

      {view === 'room' && room === 'engineer' && <EngineerRoom />}
      {view === 'room' && room === 'vision' && <VisionRoom />}
      {view === 'room' && room === 'windtunnel' && <WindTunnelRoom />}
      {view === 'room' && room === 'briefing' && <BriefingRoom />}
      {view === 'room' && room === 'paddock' && <PaddockRoom />}
    </>
  )
}
