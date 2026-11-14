import type { CarDef } from '../types'
import { useCarMaterials } from '../useCarMaterials'
import { Wheel } from '../Wheel'

/** Valkyrie / hypercar road silhouette — low and aggressive. */
export function RoadHyperBody({ def }: { def: CarDef }) {
  const m = useCarMaterials(def.livery)
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.28, 0]} material={m.paint}>
        <boxGeometry args={[2.15, 0.32, 4.5]} />
      </mesh>
      <mesh castShadow position={[0, 0.48, 0.6]} material={m.paint}>
        <boxGeometry args={[2.0, 0.2, 2.0]} />
      </mesh>
      <mesh castShadow position={[0, 0.7, -0.3]} material={m.paint}>
        <boxGeometry args={[1.5, 0.4, 1.6]} />
      </mesh>
      <mesh castShadow position={[0, 0.75, -0.25]} material={m.glass}>
        <boxGeometry args={[1.4, 0.32, 1.4]} />
      </mesh>
      <mesh castShadow position={[0, 0.55, -1.6]} material={m.secondary}>
        <boxGeometry args={[2.05, 0.3, 1.3]} />
      </mesh>
      <mesh castShadow position={[0, 0.85, -2.0]} material={m.accent}>
        <boxGeometry args={[1.9, 0.08, 0.4]} />
      </mesh>
      <mesh position={[0, 0.4, 0]} material={m.tertiary}>
        <boxGeometry args={[0.18, 0.05, 4.2]} />
      </mesh>
      <mesh position={[-0.7, 0.35, 2.2]} material={m.light}>
        <boxGeometry args={[0.4, 0.1, 0.08]} />
      </mesh>
      <mesh position={[0.7, 0.35, 2.2]} material={m.light}>
        <boxGeometry args={[0.4, 0.1, 0.08]} />
      </mesh>
      <Wheel position={[-0.95, 0.32, 1.4]} radius={0.32} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.32, 1.4]} radius={0.32} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-0.95, 0.34, -1.45]} radius={0.34} width={0.38} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.34, -1.45]} radius={0.34} width={0.38} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}

/** JDM icons — coupe proportions; AE86/MX-5 get shorter cabins. */
export function JdmBody({ def }: { def: CarDef }) {
  const m = useCarMaterials(def.livery)
  const compact = def.id === 'ae86' || def.id === 'mx5-na'
  const popups = def.id === 'mx5-na' || def.id === 'rx7-fd'
  const pandaHood = def.id === 'ae86'

  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.38, 0]} material={m.paint}>
        <boxGeometry args={[compact ? 1.75 : 1.9, 0.42, compact ? 3.9 : 4.2]} />
      </mesh>
      <mesh
        castShadow
        position={[0, 0.62, 0.7]}
        material={pandaHood ? m.secondary : m.paint}
      >
        <boxGeometry args={[compact ? 1.65 : 1.8, 0.18, 1.4]} />
      </mesh>
      <mesh castShadow position={[0, 0.55, -1.0]} material={m.paint}>
        <boxGeometry args={[compact ? 1.7 : 1.85, 0.22, 1.3]} />
      </mesh>
      <mesh castShadow position={[0, 0.88, -0.15]} material={m.paint}>
        <boxGeometry args={[compact ? 1.45 : 1.55, 0.45, compact ? 1.5 : 1.7]} />
      </mesh>
      <mesh castShadow position={[0, 0.95, -0.1]} material={m.glass}>
        <boxGeometry args={[compact ? 1.35 : 1.45, 0.35, compact ? 1.35 : 1.5]} />
      </mesh>
      {popups && (
        <>
          <mesh castShadow position={[-0.5, 0.78, 1.15]} material={m.paint}>
            <boxGeometry args={[0.35, 0.2, 0.3]} />
          </mesh>
          <mesh castShadow position={[0.5, 0.78, 1.15]} material={m.paint}>
            <boxGeometry args={[0.35, 0.2, 0.3]} />
          </mesh>
          <mesh position={[-0.5, 0.78, 1.3]} material={m.light}>
            <boxGeometry args={[0.28, 0.12, 0.06]} />
          </mesh>
          <mesh position={[0.5, 0.78, 1.3]} material={m.light}>
            <boxGeometry args={[0.28, 0.12, 0.06]} />
          </mesh>
        </>
      )}
      {!popups && (
        <>
          <mesh position={[-0.55, 0.45, compact ? 1.9 : 2.05]} material={m.light}>
            <boxGeometry args={[0.35, 0.12, 0.08]} />
          </mesh>
          <mesh position={[0.55, 0.45, compact ? 1.9 : 2.05]} material={m.light}>
            <boxGeometry args={[0.35, 0.12, 0.08]} />
          </mesh>
        </>
      )}
      <mesh position={[-0.45, 0.5, compact ? -1.95 : -2.1]} material={m.tail}>
        <boxGeometry args={[0.35, 0.1, 0.06]} />
      </mesh>
      <mesh position={[0.45, 0.5, compact ? -1.95 : -2.1]} material={m.tail}>
        <boxGeometry args={[0.35, 0.1, 0.06]} />
      </mesh>
      {/* Spoiler for GTR / Supra / RX7 */}
      {(def.id === 'r34' || def.id === 'a80' || def.id === 'rx7-fd') && (
        <mesh castShadow position={[0, 1.05, -1.85]} material={m.carbon}>
          <boxGeometry args={[1.5, 0.06, 0.28]} />
        </mesh>
      )}
      <mesh position={[0, 0.6, 0]} material={m.accent}>
        <boxGeometry args={[0.12, 0.04, compact ? 3.5 : 3.8]} />
      </mesh>
      <Wheel
        position={[-0.85, 0.32, compact ? 1.2 : 1.3]}
        radius={compact ? 0.3 : 0.33}
        width={0.28}
        rubber={m.rubber}
        carbon={m.carbon}
      />
      <Wheel
        position={[0.85, 0.32, compact ? 1.2 : 1.3]}
        radius={compact ? 0.3 : 0.33}
        width={0.28}
        rubber={m.rubber}
        carbon={m.carbon}
      />
      <Wheel
        position={[-0.85, 0.32, compact ? -1.25 : -1.35]}
        radius={compact ? 0.3 : 0.33}
        width={0.28}
        rubber={m.rubber}
        carbon={m.carbon}
      />
      <Wheel
        position={[0.85, 0.32, compact ? -1.25 : -1.35]}
        radius={compact ? 0.3 : 0.33}
        width={0.28}
        rubber={m.rubber}
        carbon={m.carbon}
      />
    </group>
  )
}

/** Rally / DTM touring — taller cabin, flared arches. */
export function TouringBody({ def, flared = true }: { def: CarDef; flared?: boolean }) {
  const m = useCarMaterials(def.livery)
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.42, 0]} material={m.paint}>
        <boxGeometry args={[1.95, 0.48, 4.3]} />
      </mesh>
      <mesh castShadow position={[0, 0.7, 0.6]} material={m.paint}>
        <boxGeometry args={[1.85, 0.2, 1.5]} />
      </mesh>
      <mesh castShadow position={[0, 1.0, -0.2]} material={m.paint}>
        <boxGeometry args={[1.7, 0.55, 1.9]} />
      </mesh>
      <mesh castShadow position={[0, 1.08, -0.15]} material={m.glass}>
        <boxGeometry args={[1.6, 0.4, 1.7]} />
      </mesh>
      {flared && (
        <>
          <mesh castShadow position={[-1.0, 0.55, 1.25]} material={m.secondary}>
            <boxGeometry args={[0.3, 0.4, 0.95]} />
          </mesh>
          <mesh castShadow position={[1.0, 0.55, 1.25]} material={m.secondary}>
            <boxGeometry args={[0.3, 0.4, 0.95]} />
          </mesh>
          <mesh castShadow position={[-1.0, 0.55, -1.3]} material={m.secondary}>
            <boxGeometry args={[0.3, 0.4, 1.0]} />
          </mesh>
          <mesh castShadow position={[1.0, 0.55, -1.3]} material={m.secondary}>
            <boxGeometry args={[0.3, 0.4, 1.0]} />
          </mesh>
        </>
      )}
      <mesh castShadow position={[0, 1.25, -1.95]} material={m.carbon}>
        <boxGeometry args={[1.7, 0.08, 0.3]} />
      </mesh>
      <mesh position={[0, 0.7, 0]} material={m.accent}>
        <boxGeometry args={[0.2, 0.05, 4.0]} />
      </mesh>
      <mesh position={[-0.6, 0.5, 2.1]} material={m.light}>
        <boxGeometry args={[0.4, 0.12, 0.08]} />
      </mesh>
      <mesh position={[0.6, 0.5, 2.1]} material={m.light}>
        <boxGeometry args={[0.4, 0.12, 0.08]} />
      </mesh>
      <mesh position={[0, 0.55, -2.15]} material={m.tail}>
        <boxGeometry args={[1.1, 0.12, 0.08]} />
      </mesh>
      <Wheel position={[-0.95, 0.36, 1.35]} radius={0.36} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.36, 1.35]} radius={0.36} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-0.95, 0.36, -1.4]} radius={0.36} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.36, -1.4]} radius={0.36} width={0.32} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}

/** Classic GT40 / 935 whale — long low coupe. */
export function ClassicBody({ def }: { def: CarDef }) {
  const m = useCarMaterials(def.livery)
  const whale = def.id === '935k3'
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.35, 0]} material={m.paint}>
        <boxGeometry args={[2.0, 0.4, 4.5]} />
      </mesh>
      <mesh castShadow position={[0, 0.55, 0.8]} material={m.paint}>
        <boxGeometry args={[1.9, 0.25, 1.8]} />
      </mesh>
      <mesh castShadow position={[0, 0.75, -0.2]} material={m.paint}>
        <boxGeometry args={[1.55, 0.4, 1.7]} />
      </mesh>
      <mesh castShadow position={[0, 0.82, -0.15]} material={m.glass}>
        <boxGeometry args={[1.45, 0.3, 1.5]} />
      </mesh>
      <mesh castShadow position={[0, 0.55, -1.5]} material={m.secondary}>
        <boxGeometry args={[1.95, 0.35, 1.4]} />
      </mesh>
      {whale && (
        <mesh castShadow position={[0, 0.95, -2.0]} material={m.paint}>
          <boxGeometry args={[1.8, 0.35, 0.8]} />
        </mesh>
      )}
      <mesh castShadow position={[0, 0.9, -2.05]} material={m.accent}>
        <boxGeometry args={[1.85, 0.08, 0.35]} />
      </mesh>
      {/* Gulf / stripe */}
      <mesh position={[0, 0.5, 0]} material={m.tertiary}>
        <boxGeometry args={[0.35, 0.06, 4.2]} />
      </mesh>
      <mesh position={[-0.6, 0.42, 2.2]} material={m.light}>
        <boxGeometry args={[0.35, 0.1, 0.08]} />
      </mesh>
      <mesh position={[0.6, 0.42, 2.2]} material={m.light}>
        <boxGeometry args={[0.35, 0.1, 0.08]} />
      </mesh>
      <Wheel position={[-0.95, 0.33, 1.35]} radius={0.33} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.33, 1.35]} radius={0.33} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-0.95, 0.33, -1.4]} radius={0.34} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.33, -1.4]} radius={0.34} width={0.34} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}
