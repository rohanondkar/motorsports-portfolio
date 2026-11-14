import type { Material, BufferGeometry } from 'three'
import { RoundedBox } from '@react-three/drei'

export function BodyFromGeo({
  geometry,
  material,
  castShadow = true,
  receiveShadow = true,
}: {
  geometry: BufferGeometry
  material: Material
  castShadow?: boolean
  receiveShadow?: boolean
}) {
  return (
    <mesh
      geometry={geometry}
      material={material}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    />
  )
}

export function SoftBox({
  args,
  position,
  rotation,
  material,
  radius = 0.08,
}: {
  args: [number, number, number]
  position?: [number, number, number]
  rotation?: [number, number, number]
  material: Material
  radius?: number
}) {
  const r = Math.min(radius, Math.min(args[0], args[1], args[2]) * 0.45)
  return (
    <RoundedBox
      args={args}
      radius={r}
      smoothness={4}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
      material={material}
    />
  )
}
