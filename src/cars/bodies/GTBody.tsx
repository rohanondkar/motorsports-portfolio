import type { CarDef } from '../types'
import { useCarMaterials } from '../useCarMaterials'
import { Wheel } from '../Wheel'

/** GT3 / GT1 / AMG / Mustang-style closed GT. */
export function GTBody({ def, longNose = false }: { def: CarDef; longNose?: boolean }) {
  const m = useCarMaterials(def.livery)
  const nose = longNose ? 1.1 : 0.85

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.4, 0]} material={m.paint}>
        <boxGeometry args={[2.0, 0.48, 4.35]} />
      </mesh>
      <mesh castShadow position={[0, 0.68, nose * 0.35]} material={m.paint}>
        <boxGeometry args={[1.9, 0.22, 1.7 * nose]} />
      </mesh>
      <mesh castShadow position={[0, 0.62, -1.1]} material={m.secondary}>
        <boxGeometry args={[1.95, 0.28, 1.55]} />
      </mesh>
      <mesh castShadow position={[0, 0.95, -0.2]} material={m.paint}>
        <boxGeometry args={[1.65, 0.48, 1.75]} />
      </mesh>
      <mesh castShadow position={[0, 1.02, -0.15]} material={m.glass}>
        <boxGeometry args={[1.55, 0.38, 1.55]} />
      </mesh>
      {/* Fenders hint */}
      <mesh castShadow position={[-0.95, 0.55, 1.2]} material={m.paint}>
        <boxGeometry args={[0.25, 0.35, 0.9]} />
      </mesh>
      <mesh castShadow position={[0.95, 0.55, 1.2]} material={m.paint}>
        <boxGeometry args={[0.25, 0.35, 0.9]} />
      </mesh>
      <mesh castShadow position={[-0.95, 0.55, -1.25]} material={m.paint}>
        <boxGeometry args={[0.25, 0.35, 0.95]} />
      </mesh>
      <mesh castShadow position={[0.95, 0.55, -1.25]} material={m.paint}>
        <boxGeometry args={[0.25, 0.35, 0.95]} />
      </mesh>
      <mesh castShadow position={[0, 1.15, -1.95]} material={m.carbon}>
        <boxGeometry args={[1.85, 0.07, 0.35]} />
      </mesh>
      <mesh castShadow position={[0, 0.15, 2.15]} material={m.carbon}>
        <boxGeometry args={[1.9, 0.08, 0.3]} />
      </mesh>
      <mesh position={[-0.65, 0.48, 2.15]} material={m.light}>
        <boxGeometry args={[0.4, 0.12, 0.08]} />
      </mesh>
      <mesh position={[0.65, 0.48, 2.15]} material={m.light}>
        <boxGeometry args={[0.4, 0.12, 0.08]} />
      </mesh>
      <mesh position={[-0.55, 0.55, -2.18]} material={m.tail}>
        <boxGeometry args={[0.45, 0.1, 0.06]} />
      </mesh>
      <mesh position={[0.55, 0.55, -2.18]} material={m.tail}>
        <boxGeometry args={[0.45, 0.1, 0.06]} />
      </mesh>
      <mesh position={[0, 0.72, 0]} material={m.accent}>
        <boxGeometry args={[0.15, 0.05, 3.8]} />
      </mesh>
      <Wheel position={[-0.95, 0.35, 1.35]} radius={0.35} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.35, 1.35]} radius={0.35} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-0.95, 0.35, -1.4]} radius={0.36} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.35, -1.4]} radius={0.36} width={0.34} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}
