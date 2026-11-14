import { useMemo } from 'react'
import type { CarDef } from '../types'
import { useCarMaterials } from '../useCarMaterials'
import { Wheel } from '../Wheel'
import { SoftBox } from '../geom/CarMesh'
import { buildProfileGeometry } from '../geom/profile'

export function NascarBody({ def }: { def: CarDef }) {
  const m = useCarMaterials(def.livery)

  const body = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          // Stock-car: long roof, blunt nose, high deck
          s.moveTo(-2.35, 0.14)
          s.lineTo(2.25, 0.14)
          s.quadraticCurveTo(2.4, 0.28, 2.3, 0.5)
          s.quadraticCurveTo(1.9, 0.7, 1.3, 0.78)
          s.quadraticCurveTo(0.7, 1.15, 0.25, 1.4)
          s.quadraticCurveTo(-0.3, 1.48, -0.9, 1.45)
          s.quadraticCurveTo(-1.5, 1.35, -1.85, 1.05)
          s.quadraticCurveTo(-2.2, 0.75, -2.35, 0.45)
          s.quadraticCurveTo(-2.4, 0.25, -2.35, 0.14)
        },
        2.05,
        0.09,
      ),
    [],
  )

  const glass = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          s.moveTo(-1.5, 0.95)
          s.quadraticCurveTo(-0.5, 1.42, 0.1, 1.42)
          s.quadraticCurveTo(0.55, 1.3, 0.75, 1.0)
          s.quadraticCurveTo(0.1, 0.95, -1.5, 0.95)
        },
        1.75,
        0.03,
      ),
    [],
  )

  return (
    <group>
      <mesh geometry={body} material={m.paint} castShadow receiveShadow />
      <mesh geometry={glass} material={m.glass} castShadow />

      <SoftBox args={[2.0, 0.1, 0.35]} position={[0, 1.28, -2.2]} material={m.accent} radius={0.03} />
      <SoftBox args={[0.22, 0.05, 4.4]} position={[0, 0.75, 0]} material={m.tertiary} radius={0.02} />

      <SoftBox args={[0.42, 0.11, 0.08]} position={[-0.7, 0.5, 2.3]} material={m.light} radius={0.03} />
      <SoftBox args={[0.42, 0.11, 0.08]} position={[0.7, 0.5, 2.3]} material={m.light} radius={0.03} />
      <SoftBox args={[1.35, 0.14, 0.08]} position={[0, 0.55, -2.35]} material={m.tail} radius={0.03} />

      <Wheel position={[-1.0, 0.38, 1.5]} radius={0.38} width={0.3} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[1.0, 0.38, 1.5]} radius={0.38} width={0.3} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-1.0, 0.38, -1.5]} radius={0.38} width={0.3} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[1.0, 0.38, -1.5]} radius={0.38} width={0.3} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}
