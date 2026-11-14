import { useMemo } from 'react'
import type { CarDef } from '../types'
import { useCarMaterials } from '../useCarMaterials'
import { Wheel } from '../Wheel'
import { SoftBox } from '../geom/CarMesh'
import { buildProfileGeometry } from '../geom/profile'

/** Modern GT3 / GT1 silhouette with curved cabin and fenders. */
export function GTBody({ def, longNose = false }: { def: CarDef; longNose?: boolean }) {
  const m = useCarMaterials(def.livery)
  const nose = longNose ? 1.12 : 1

  const body = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          s.moveTo(-2.15, 0.12)
          s.lineTo(2.05 * nose, 0.12)
          s.quadraticCurveTo(2.25 * nose, 0.22, 2.15 * nose, 0.42)
          s.quadraticCurveTo(1.7 * nose, 0.62, 1.15 * nose, 0.7)
          s.quadraticCurveTo(0.55, 0.95, 0.2, 1.25)
          s.quadraticCurveTo(-0.15, 1.38, -0.55, 1.36)
          s.quadraticCurveTo(-1.15, 1.28, -1.45, 1.0)
          s.quadraticCurveTo(-1.85, 0.75, -2.1, 0.5)
          s.quadraticCurveTo(-2.2, 0.3, -2.15, 0.12)
        },
        1.9,
        0.08,
      ),
    [nose],
  )

  const glass = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          s.moveTo(-1.15, 0.85)
          s.quadraticCurveTo(-0.4, 1.32, 0.05, 1.34)
          s.quadraticCurveTo(0.45, 1.22, 0.65, 0.95)
          s.quadraticCurveTo(0.2, 0.85, -1.15, 0.85)
        },
        1.55,
        0.03,
      ),
    [],
  )

  return (
    <group>
      <mesh geometry={body} material={m.paint} castShadow receiveShadow />
      <mesh geometry={glass} material={m.glass} castShadow position={[0, 0.02, 0]} />

      {/* Fender blisters */}
      <SoftBox args={[0.22, 0.32, 0.85]} position={[-0.95, 0.5, 1.15]} material={m.paint} radius={0.08} />
      <SoftBox args={[0.22, 0.32, 0.85]} position={[0.95, 0.5, 1.15]} material={m.paint} radius={0.08} />
      <SoftBox args={[0.22, 0.32, 0.9]} position={[-0.95, 0.5, -1.2]} material={m.paint} radius={0.08} />
      <SoftBox args={[0.22, 0.32, 0.9]} position={[0.95, 0.5, -1.2]} material={m.paint} radius={0.08} />

      {/* Splitter + wing */}
      <SoftBox args={[1.95, 0.06, 0.35]} position={[0, 0.14, 2.15]} material={m.carbon} radius={0.02} />
      <SoftBox args={[1.85, 0.06, 0.32]} position={[0, 1.15, -2.0]} material={m.carbon} radius={0.02} />
      <SoftBox args={[0.05, 0.28, 0.12]} position={[-0.7, 1.0, -2.0]} material={m.carbon} radius={0.01} />
      <SoftBox args={[0.05, 0.28, 0.12]} position={[0.7, 1.0, -2.0]} material={m.carbon} radius={0.01} />

      <SoftBox args={[0.38, 0.1, 0.08]} position={[-0.65, 0.48, 2.15]} material={m.light} radius={0.03} />
      <SoftBox args={[0.38, 0.1, 0.08]} position={[0.65, 0.48, 2.15]} material={m.light} radius={0.03} />
      <SoftBox args={[0.4, 0.09, 0.06]} position={[-0.55, 0.55, -2.15]} material={m.tail} radius={0.02} />
      <SoftBox args={[0.4, 0.09, 0.06]} position={[0.55, 0.55, -2.15]} material={m.tail} radius={0.02} />

      <SoftBox args={[0.12, 0.04, 3.7]} position={[0, 0.72, 0]} material={m.accent} radius={0.015} />

      <Wheel position={[-0.95, 0.35, 1.35]} radius={0.35} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.35, 1.35]} radius={0.35} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-0.95, 0.35, -1.4]} radius={0.36} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.35, -1.4]} radius={0.36} width={0.34} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}
