import { useMemo } from 'react'
import * as THREE from 'three'
import type { CarDef } from '../types'
import { useCarMaterials } from '../useCarMaterials'
import { Wheel } from '../Wheel'
import { SoftBox } from '../geom/CarMesh'
import { buildProfileGeometry } from '../geom/profile'

/** Closed prototype — curved cabin, pinched nose, rear wing. */
export function PrototypeBody({ def, tall = false }: { def: CarDef; tall?: boolean }) {
  const m = useCarMaterials(def.livery)
  const is787 = def.id === '787b'
  const h = (tall ? 1.1 : 1) * (is787 ? 1.08 : 1)

  const body = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          s.moveTo(-2.2, 0.1)
          s.lineTo(2.0, 0.1)
          s.bezierCurveTo(2.35, 0.12, 2.4, 0.35, 2.15, 0.48)
          s.bezierCurveTo(1.6, 0.62, 1.1, 0.7, 0.65, 0.85)
          s.bezierCurveTo(0.35, 1.15 * h, 0.05, 1.28 * h, -0.4, 1.3 * h)
          s.bezierCurveTo(-0.9, 1.25 * h, -1.3, 1.0 * h, -1.6, 0.78)
          s.bezierCurveTo(-1.95, 0.6, -2.25, 0.4, -2.2, 0.1)
        },
        1.9,
        0.055,
      ),
    [h],
  )

  const canopy = useMemo(() => {
    const g = new THREE.SphereGeometry(0.55, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55)
    g.scale(1.15, 0.85, 1.4)
    return g
  }, [])

  return (
    <group>
      <mesh geometry={body} material={m.paint} castShadow receiveShadow />
      <mesh
        geometry={canopy}
        material={m.glass}
        castShadow
        position={[0, 0.75 * h, -0.15]}
        rotation={[0.15, 0, 0]}
      />

      {/* Wheel-arch bulges */}
      <mesh castShadow position={[-0.85, 0.4, 1.2]} rotation={[0, 0, Math.PI / 2]} material={m.paint}>
        <cylinderGeometry args={[0.38, 0.38, 0.35, 16]} />
      </mesh>
      <mesh castShadow position={[0.85, 0.4, 1.2]} rotation={[0, 0, Math.PI / 2]} material={m.paint}>
        <cylinderGeometry args={[0.38, 0.38, 0.35, 16]} />
      </mesh>
      <mesh castShadow position={[-0.85, 0.4, -1.25]} rotation={[0, 0, Math.PI / 2]} material={m.paint}>
        <cylinderGeometry args={[0.4, 0.4, 0.35, 16]} />
      </mesh>
      <mesh castShadow position={[0.85, 0.4, -1.25]} rotation={[0, 0, Math.PI / 2]} material={m.paint}>
        <cylinderGeometry args={[0.4, 0.4, 0.35, 16]} />
      </mesh>

      <group position={[0, 1.15 * h, -2.05]}>
        <SoftBox args={[2.05, 0.06, 0.4]} material={m.accent} radius={0.02} />
        <SoftBox args={[0.06, 0.32, 0.16]} position={[-0.8, -0.12, 0]} material={m.carbon} radius={0.01} />
        <SoftBox args={[0.06, 0.32, 0.16]} position={[0.8, -0.12, 0]} material={m.carbon} radius={0.01} />
      </group>

      <SoftBox args={[0.8, 0.14, 0.28]} position={[0, 0.36, 2.15]} material={m.carbon} radius={0.04} />
      <SoftBox args={[0.3, 0.09, 0.08]} position={[-0.55, 0.42, 2.15]} material={m.light} radius={0.03} />
      <SoftBox args={[0.3, 0.09, 0.08]} position={[0.55, 0.42, 2.15]} material={m.light} radius={0.03} />
      <SoftBox args={[1.05, 0.1, 0.08]} position={[0, 0.48, -2.15]} material={m.tail} radius={0.03} />
      <SoftBox args={[0.16, 0.04, 3.8]} position={[0, 0.58, 0]} material={m.tertiary} radius={0.015} />

      {is787 && (
        <SoftBox args={[0.35, 0.12, 0.5]} position={[0, 1.05, 0.4]} material={m.secondary} radius={0.05} />
      )}

      <Wheel position={[-0.95, 0.34, 1.35]} radius={0.34} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.34, 1.35]} radius={0.34} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-0.95, 0.35, -1.4]} radius={0.35} width={0.38} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.35, -1.4]} radius={0.35} width={0.38} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}
