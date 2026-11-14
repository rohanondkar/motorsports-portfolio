import type { CarDef } from '../types'
import { useCarMaterials } from '../useCarMaterials'
import { Wheel } from '../Wheel'

/** Open-wheel F1 — era tweaks for nose, halo, and wing. */
export function F1Body({ def }: { def: CarDef }) {
  const m = useCarMaterials(def.livery)
  const era = def.f1Era ?? 'hybrid'
  const hasHalo = era !== 'v8'
  const wide = era === 'ground-effect' || era === '2026'
  const noseZ = era === 'v8' ? 2.15 : era === 'hybrid' ? 2.05 : 1.95
  const track = wide ? 1.05 : 0.95
  const wheelR = 0.33

  return (
    <group>
      {/* Floor / barge */}
      <mesh castShadow receiveShadow position={[0, 0.18, 0]} material={m.carbon}>
        <boxGeometry args={[wide ? 1.7 : 1.5, 0.06, 3.6]} />
      </mesh>
      {/* Sidepods */}
      <mesh castShadow position={[0, 0.42, -0.15]} material={m.paint}>
        <boxGeometry args={[wide ? 1.65 : 1.45, 0.38, 2.2]} />
      </mesh>
      <mesh castShadow position={[0, 0.52, -0.1]} material={m.secondary}>
        <boxGeometry args={[wide ? 1.35 : 1.2, 0.2, 1.6]} />
      </mesh>
      {/* Nose */}
      <mesh castShadow position={[0, 0.35, noseZ * 0.55]} material={m.paint}>
        <boxGeometry args={[0.45, 0.22, noseZ]} />
      </mesh>
      <mesh castShadow position={[0, 0.28, noseZ]} material={m.accent}>
        <boxGeometry args={[0.55, 0.12, 0.35]} />
      </mesh>
      {/* Front wing */}
      <mesh castShadow position={[0, 0.2, noseZ + 0.25]} material={m.secondary}>
        <boxGeometry args={[wide ? 1.9 : 1.7, 0.05, 0.35]} />
      </mesh>
      <mesh castShadow position={[-0.75, 0.28, noseZ + 0.2]} material={m.carbon}>
        <boxGeometry args={[0.06, 0.22, 0.28]} />
      </mesh>
      <mesh castShadow position={[0.75, 0.28, noseZ + 0.2]} material={m.carbon}>
        <boxGeometry args={[0.06, 0.22, 0.28]} />
      </mesh>
      {/* Cockpit */}
      <mesh castShadow position={[0, 0.62, 0.15]} material={m.carbon}>
        <boxGeometry args={[0.55, 0.35, 0.9]} />
      </mesh>
      {hasHalo && (
        <mesh castShadow position={[0, 0.85, 0.25]} material={m.carbon}>
          <torusGeometry args={[0.28, 0.035, 8, 16, Math.PI]} />
        </mesh>
      )}
      {/* Engine cover / shark fin */}
      <mesh castShadow position={[0, 0.72, -0.85]} material={m.paint}>
        <boxGeometry args={[0.5, 0.35, 1.3]} />
      </mesh>
      <mesh castShadow position={[0, 0.95, -1.1]} material={m.accent}>
        <boxGeometry args={[0.04, 0.45, 1.0]} />
      </mesh>
      {/* Rear wing */}
      <mesh castShadow position={[0, 1.05, -1.85]} material={m.secondary}>
        <boxGeometry args={[wide ? 1.15 : 1.0, 0.06, 0.28]} />
      </mesh>
      <mesh castShadow position={[-0.4, 0.85, -1.85]} material={m.carbon}>
        <boxGeometry args={[0.05, 0.4, 0.12]} />
      </mesh>
      <mesh castShadow position={[0.4, 0.85, -1.85]} material={m.carbon}>
        <boxGeometry args={[0.05, 0.4, 0.12]} />
      </mesh>
      {/* Accent stripe */}
      <mesh position={[0, 0.55, 0.2]} material={m.tertiary}>
        <boxGeometry args={[0.12, 0.08, 2.8]} />
      </mesh>
      <Wheel position={[-track, 0.33, 1.25]} radius={wheelR} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[track, 0.33, 1.25]} radius={wheelR} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-track, 0.33, -1.35]} radius={wheelR} width={0.36} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[track, 0.33, -1.35]} radius={wheelR} width={0.36} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}
