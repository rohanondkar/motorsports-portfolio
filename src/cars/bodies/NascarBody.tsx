import type { CarDef } from '../types'
import { useCarMaterials } from '../useCarMaterials'
import { Wheel } from '../Wheel'

export function NascarBody({ def }: { def: CarDef }) {
  const m = useCarMaterials(def.livery)

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.45, 0]} material={m.paint}>
        <boxGeometry args={[2.15, 0.55, 4.8]} />
      </mesh>
      <mesh castShadow position={[0, 0.85, -0.15]} material={m.paint}>
        <boxGeometry args={[1.95, 0.55, 2.4]} />
      </mesh>
      <mesh castShadow position={[0, 0.95, -0.1]} material={m.glass}>
        <boxGeometry args={[1.85, 0.4, 2.1]} />
      </mesh>
      <mesh castShadow position={[0, 0.55, 1.6]} material={m.secondary}>
        <boxGeometry args={[2.05, 0.25, 1.4]} />
      </mesh>
      <mesh castShadow position={[0, 0.55, -1.7]} material={m.secondary}>
        <boxGeometry args={[2.05, 0.25, 1.2]} />
      </mesh>
      {/* Roof rails / spoiler */}
      <mesh castShadow position={[0, 1.25, -2.15]} material={m.accent}>
        <boxGeometry args={[2.0, 0.12, 0.35]} />
      </mesh>
      <mesh position={[0, 0.72, 0]} material={m.tertiary}>
        <boxGeometry args={[0.25, 0.06, 4.5]} />
      </mesh>
      <mesh position={[-0.7, 0.5, 2.35]} material={m.light}>
        <boxGeometry args={[0.45, 0.12, 0.08]} />
      </mesh>
      <mesh position={[0.7, 0.5, 2.35]} material={m.light}>
        <boxGeometry args={[0.45, 0.12, 0.08]} />
      </mesh>
      <mesh position={[0, 0.55, -2.4]} material={m.tail}>
        <boxGeometry args={[1.4, 0.15, 0.08]} />
      </mesh>
      <Wheel position={[-1.0, 0.38, 1.5]} radius={0.38} width={0.3} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[1.0, 0.38, 1.5]} radius={0.38} width={0.3} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-1.0, 0.38, -1.5]} radius={0.38} width={0.3} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[1.0, 0.38, -1.5]} radius={0.38} width={0.3} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}
