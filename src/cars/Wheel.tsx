import type * as THREE from 'three'

export function Wheel({
  position,
  width = 0.28,
  radius = 0.34,
  rubber,
  carbon,
}: {
  position: [number, number, number]
  width?: number
  radius?: number
  rubber: THREE.Material
  carbon: THREE.Material
}) {
  return (
    <group position={position}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]} material={rubber}>
        <cylinderGeometry args={[radius, radius, width, 22]} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} material={carbon}>
        <cylinderGeometry args={[radius * 0.55, radius * 0.55, width + 0.02, 14]} />
      </mesh>
    </group>
  )
}
