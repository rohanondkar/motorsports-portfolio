import { useMemo } from 'react'
import * as THREE from 'three'

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
  // Tire as a thick short cylinder (reliable orientation) + rim face
  const tire = useMemo(() => {
    const g = new THREE.CylinderGeometry(radius, radius, width, 24)
    g.rotateZ(Math.PI / 2)
    return g
  }, [radius, width])

  const rim = useMemo(() => {
    const g = new THREE.CylinderGeometry(radius * 0.62, radius * 0.62, width * 0.55, 20)
    g.rotateZ(Math.PI / 2)
    return g
  }, [radius, width])

  const disc = useMemo(() => {
    const g = new THREE.CylinderGeometry(radius * 0.45, radius * 0.45, width * 0.7, 16)
    g.rotateZ(Math.PI / 2)
    return g
  }, [radius, width])

  return (
    <group position={position}>
      <mesh castShadow geometry={tire} material={rubber} />
      <mesh castShadow geometry={rim} material={carbon} />
      <mesh geometry={disc} material={carbon} />
    </group>
  )
}
