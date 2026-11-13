import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { CarDef } from '../../data/cars'
import { raceClock } from '../raceClock'

interface SeriesCarProps {
  def: CarDef
  curve: THREE.CatmullRomCurve3
  focused: boolean
  onSelect: () => void
  wetness: number
}

/** Stylized low-poly race car — silhouette varies lightly by series scale. */
export function SeriesCar({ def, curve, focused, onSelect, wetness }: SeriesCarProps) {
  const group = useRef<THREE.Group>(null)
  const look = useMemo(() => new THREE.Vector3(), [])
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), [])

  useFrame(() => {
    if (!group.current) return
    const t = ((def.pathOffset + raceClock.t * raceClock.speed) % 1 + 1) % 1
    const pos = curve.getPointAt(t)
    const tangent = curve.getTangentAt(t).normalize()
    look.copy(pos).add(tangent)
    group.current.position.copy(pos)
    group.current.position.y += 0.12
    group.current.lookAt(look)
    group.current.up.copy(up)
    group.current.rotation.z = Math.sin(t * Math.PI * 8) * 0.02
  })

  const [sx, sy, sz] = def.scale
  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: def.color,
        metalness: 0.55 + wetness * 0.25,
        roughness: Math.max(0.1, 0.35 - wetness * 0.2),
        emissive: focused ? def.color : '#000000',
        emissiveIntensity: focused ? 0.18 : 0,
      }),
    [def.color, focused, wetness],
  )
  const accentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: def.accent,
        metalness: 0.4,
        roughness: 0.4,
      }),
    [def.accent],
  )
  const darkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#111111',
        metalness: 0.7,
        roughness: 0.4,
      }),
    [],
  )

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
      }}
    >
      <mesh castShadow receiveShadow position={[0, 0.22 * sy, 0]} material={bodyMat}>
        <boxGeometry args={[0.9 * sx, 0.28 * sy, 2.1 * sz]} />
      </mesh>
      <mesh castShadow position={[0, 0.42 * sy, -0.15]} material={darkMat}>
        <boxGeometry args={[0.55 * sx, 0.22 * sy, 0.7 * sz]} />
      </mesh>
      <mesh castShadow position={[0, 0.18 * sy, 1.05 * sz]} material={bodyMat}>
        <boxGeometry args={[0.55 * sx, 0.16 * sy, 0.45 * sz]} />
      </mesh>
      <mesh castShadow position={[0, 0.48 * sy, -1.0 * sz]} material={accentMat}>
        <boxGeometry args={[0.95 * sx, 0.06 * sy, 0.22 * sz]} />
      </mesh>
      <mesh castShadow position={[-0.35 * sx, 0.35 * sy, -1.0 * sz]} material={darkMat}>
        <boxGeometry args={[0.06, 0.28 * sy, 0.08]} />
      </mesh>
      <mesh castShadow position={[0.35 * sx, 0.35 * sy, -1.0 * sz]} material={darkMat}>
        <boxGeometry args={[0.06, 0.28 * sy, 0.08]} />
      </mesh>
      {(
        [
          [-0.45 * sx, 0.12, 0.7 * sz],
          [0.45 * sx, 0.12, 0.7 * sz],
          [-0.45 * sx, 0.12, -0.75 * sz],
          [0.45 * sx, 0.12, -0.75 * sz],
        ] as const
      ).map((p, i) => (
        <mesh key={i} castShadow position={p} rotation={[0, 0, Math.PI / 2]} material={darkMat}>
          <cylinderGeometry args={[0.18, 0.18, 0.22 * sx, 12]} />
        </mesh>
      ))}
      {focused && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[1.3, 1.45, 48]} />
          <meshBasicMaterial color={def.accent} transparent opacity={0.55} />
        </mesh>
      )}
    </group>
  )
}
