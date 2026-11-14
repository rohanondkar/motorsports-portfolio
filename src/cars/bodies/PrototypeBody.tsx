import type { CarDef } from '../types'
import { useCarMaterials } from '../useCarMaterials'
import { Wheel } from '../Wheel'

/** Closed LMP / Hypercar / Group C silhouette. */
export function PrototypeBody({ def, tall = false }: { def: CarDef; tall?: boolean }) {
  const m = useCarMaterials(def.livery)
  const h = tall ? 1.05 : 0.92

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.35, 0]} material={m.paint}>
        <boxGeometry args={[2.05, 0.45, 4.4]} />
      </mesh>
      <mesh castShadow position={[0, 0.55, 0.9]} material={m.paint}>
        <boxGeometry args={[1.95, 0.28, 1.8]} />
      </mesh>
      {/* Cabin bubble */}
      <mesh castShadow position={[0, h * 0.85, -0.2]} material={m.paint}>
        <boxGeometry args={[1.5, 0.55, 1.8]} />
      </mesh>
      <mesh castShadow position={[0, h * 0.92, -0.15]} material={m.glass}>
        <boxGeometry args={[1.4, 0.42, 1.55]} />
      </mesh>
      {/* Rear deck */}
      <mesh castShadow position={[0, 0.55, -1.4]} material={m.secondary}>
        <boxGeometry args={[2.0, 0.35, 1.5]} />
      </mesh>
      {/* Wing */}
      <mesh castShadow position={[0, 1.15, -2.0]} material={m.accent}>
        <boxGeometry args={[2.1, 0.08, 0.4]} />
      </mesh>
      <mesh castShadow position={[-0.7, 0.95, -2.0]} material={m.carbon}>
        <boxGeometry args={[0.08, 0.4, 0.15]} />
      </mesh>
      <mesh castShadow position={[0.7, 0.95, -2.0]} material={m.carbon}>
        <boxGeometry args={[0.08, 0.4, 0.15]} />
      </mesh>
      {/* Nose intake */}
      <mesh position={[0, 0.4, 2.15]} material={m.carbon}>
        <boxGeometry args={[0.9, 0.2, 0.25]} />
      </mesh>
      <mesh position={[-0.55, 0.42, 2.15]} material={m.light}>
        <boxGeometry args={[0.35, 0.1, 0.08]} />
      </mesh>
      <mesh position={[0.55, 0.42, 2.15]} material={m.light}>
        <boxGeometry args={[0.35, 0.1, 0.08]} />
      </mesh>
      <mesh position={[0, 0.5, -2.2]} material={m.tail}>
        <boxGeometry args={[1.2, 0.12, 0.08]} />
      </mesh>
      {/* Stripe */}
      <mesh position={[0, 0.58, 0]} material={m.tertiary}>
        <boxGeometry args={[0.2, 0.06, 4.0]} />
      </mesh>
      <Wheel position={[-0.95, 0.34, 1.35]} radius={0.34} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.34, 1.35]} radius={0.34} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-0.95, 0.34, -1.4]} radius={0.36} width={0.38} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.34, -1.4]} radius={0.36} width={0.38} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}
