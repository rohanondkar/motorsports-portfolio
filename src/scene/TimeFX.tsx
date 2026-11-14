import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { EstAtmosphere } from '../time/estPeriod'

export function TimeFX({ atm }: { atm: EstAtmosphere }) {
  if (atm.fx === 'stars') return <Stars />
  if (atm.fx === 'mist') return <Mist />
  if (atm.fx === 'clouds') return <CloudDrift />
  if (atm.fx === 'heat') return <HeatShimmer />
  if (atm.fx === 'embers') return <Embers />
  return <Fireflies />
}

function makePoints(positions: Float32Array) {
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  return g
}

function Stars() {
  const ref = useRef<THREE.Points>(null)
  const geo = useMemo(() => {
    const n = 400
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 55 + Math.random() * 25
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = Math.abs(r * Math.cos(phi)) + 8
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return makePoints(arr)
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ;(ref.current.material as THREE.PointsMaterial).opacity =
      0.55 + Math.sin(clock.elapsedTime * 0.7) * 0.15
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#e8f0ff" size={0.18} transparent opacity={0.7} depthWrite={false} />
    </points>
  )
}

function Mist() {
  const ref = useRef<THREE.Points>(null)
  const speeds = useRef<Float32Array>(new Float32Array(0))
  const geo = useMemo(() => {
    const n = 180
    const positions = new Float32Array(n * 3)
    const s = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = 0.3 + Math.random() * 2.2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
      s[i] = 0.15 + Math.random() * 0.25
    }
    speeds.current = s
    return makePoints(positions)
  }, [])

  useFrame((_, dt) => {
    if (!ref.current) return
    const arr = (ref.current.geometry.getAttribute('position') as THREE.BufferAttribute)
      .array as Float32Array
    for (let i = 0; i < speeds.current.length; i++) {
      arr[i * 3] += speeds.current[i] * dt
      if (arr[i * 3] > 20) arr[i * 3] = -20
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#f0e8e0" size={0.55} transparent opacity={0.22} depthWrite={false} />
    </points>
  )
}

function CloudDrift() {
  const group = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.012
  })
  return (
    <group ref={group} position={[0, 22, 0]}>
      {[0, 1.2, 2.4, 3.8].map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 28, Math.sin(i) * 2, Math.sin(a) * 28]}>
          <sphereGeometry args={[3.5 + i * 0.4, 12, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function HeatShimmer() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = 0.8 + Math.sin(clock.elapsedTime * 1.4) * 0.05
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.04 + Math.sin(clock.elapsedTime * 2.2) * 0.02
  })
  return (
    <mesh ref={ref} position={[0, 0.8, 2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[6, 4]} />
      <meshBasicMaterial color="#fff8e0" transparent opacity={0.05} depthWrite={false} />
    </mesh>
  )
}

function Embers() {
  return <DriftParticles count={80} color="#ff9040" size={0.08} speed={0.35} yMin={0.5} yMax={6} />
}

function Fireflies() {
  return <DriftParticles count={50} color="#d4ff6a" size={0.1} speed={0.2} yMin={0.4} yMax={3.5} />
}

function DriftParticles({
  count,
  color,
  size,
  speed,
  yMin,
  yMax,
}: {
  count: number
  color: string
  size: number
  speed: number
  yMin: number
  yMax: number
}) {
  const ref = useRef<THREE.Points>(null)
  const phase = useRef<Float32Array>(new Float32Array(0))
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const p = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = yMin + Math.random() * (yMax - yMin)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24
      p[i] = Math.random() * Math.PI * 2
    }
    phase.current = p
    return makePoints(positions)
  }, [count, yMin, yMax])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const arr = (ref.current.geometry.getAttribute('position') as THREE.BufferAttribute)
      .array as Float32Array
    const t = clock.elapsedTime
    for (let i = 0; i < count; i++) {
      arr[i * 3] += Math.sin(t * speed + phase.current[i]) * 0.008
      arr[i * 3 + 1] += Math.cos(t * speed * 1.3 + phase.current[i]) * 0.006
      arr[i * 3 + 2] += Math.sin(t * speed * 0.8 + phase.current[i] * 1.2) * 0.008
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color={color} size={size} transparent opacity={0.75} depthWrite={false} />
    </points>
  )
}
