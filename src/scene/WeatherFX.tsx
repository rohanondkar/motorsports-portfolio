import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { WeatherPreset } from '../data/environments'

interface WeatherFXProps {
  weather: WeatherPreset
  enabled: boolean
}

export function WeatherFX({ weather, enabled }: WeatherFXProps) {
  const points = useRef<THREE.Points>(null)
  const count =
    weather.particles === 'heavy-rain' ? 1200 : weather.particles === 'rain' ? 600 : 400

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = Math.random() * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
      velocities[i] = 8 + Math.random() * 14
    }
    return { positions, velocities }
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  useFrame((_, dt) => {
    if (!enabled || !points.current || weather.particles === 'none') return
    const attr = points.current.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    const isDust = weather.particles === 'dust'
    for (let i = 0; i < count; i++) {
      if (isDust) {
        arr[i * 3] += dt * (2 + Math.sin(i) * 1.5)
        arr[i * 3 + 1] += dt * (Math.sin(i * 0.3) * 0.4)
        if (arr[i * 3] > 30) arr[i * 3] = -30
      } else {
        arr[i * 3 + 1] -= velocities[i] * dt
        arr[i * 3] += dt * 1.5
        if (arr[i * 3 + 1] < 0) {
          arr[i * 3 + 1] = 18 + Math.random() * 10
          arr[i * 3] = (Math.random() - 0.5) * 60
          arr[i * 3 + 2] = (Math.random() - 0.5) * 60
        }
      }
    }
    attr.needsUpdate = true
  })

  if (!enabled || weather.particles === 'none') return null

  const color = weather.particles === 'dust' ? '#d2b48c' : '#a8c0d8'
  const size = weather.particles === 'dust' ? 0.12 : 0.05

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={weather.particles === 'heavy-rain' ? 0.55 : 0.4}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
