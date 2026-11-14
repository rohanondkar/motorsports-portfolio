import { useMemo } from 'react'
import type { CarDef } from '../types'
import { useCarMaterials } from '../useCarMaterials'
import { Wheel } from '../Wheel'
import { SoftBox } from '../geom/CarMesh'
import { buildProfileGeometry } from '../geom/profile'

export function RoadHyperBody({ def }: { def: CarDef }) {
  const m = useCarMaterials(def.livery)

  const body = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          // Valkyrie-ish: ultra-low, long, canopy bubble
          s.moveTo(-2.2, 0.08)
          s.lineTo(2.1, 0.08)
          s.quadraticCurveTo(2.35, 0.15, 2.25, 0.32)
          s.quadraticCurveTo(1.6, 0.48, 0.9, 0.52)
          s.quadraticCurveTo(0.35, 0.85, 0.05, 0.95)
          s.quadraticCurveTo(-0.4, 1.0, -0.85, 0.88)
          s.quadraticCurveTo(-1.4, 0.65, -1.9, 0.48)
          s.quadraticCurveTo(-2.25, 0.3, -2.2, 0.08)
        },
        2.05,
        0.06,
      ),
    [],
  )

  const canopy = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          s.moveTo(-0.7, 0.45)
          s.quadraticCurveTo(-0.15, 0.95, 0.2, 0.98)
          s.quadraticCurveTo(0.55, 0.85, 0.7, 0.55)
          s.quadraticCurveTo(0.2, 0.45, -0.7, 0.45)
        },
        1.15,
        0.03,
      ),
    [],
  )

  return (
    <group>
      <mesh geometry={body} material={m.paint} castShadow receiveShadow />
      <mesh geometry={canopy} material={m.glass} castShadow />
      <SoftBox args={[1.9, 0.06, 0.35]} position={[0, 0.85, -2.0]} material={m.accent} radius={0.02} />
      <SoftBox args={[0.16, 0.04, 4.0]} position={[0, 0.4, 0]} material={m.tertiary} radius={0.015} />
      <SoftBox args={[0.38, 0.09, 0.08]} position={[-0.7, 0.35, 2.2]} material={m.light} radius={0.03} />
      <SoftBox args={[0.38, 0.09, 0.08]} position={[0.7, 0.35, 2.2]} material={m.light} radius={0.03} />
      <Wheel position={[-0.95, 0.32, 1.4]} radius={0.32} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.32, 1.4]} radius={0.32} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-0.95, 0.34, -1.45]} radius={0.34} width={0.38} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.34, -1.45]} radius={0.34} width={0.38} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}

export function JdmBody({ def }: { def: CarDef }) {
  const m = useCarMaterials(def.livery)
  const compact = def.id === 'ae86' || def.id === 'mx5-na'
  const popups = def.id === 'mx5-na' || def.id === 'rx7-fd'
  const panda = def.id === 'ae86'
  const len = compact ? 0.9 : 1

  const body = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          const L = 2.05 * len
          s.moveTo(-L, 0.12)
          s.lineTo(L * 0.95, 0.12)
          s.quadraticCurveTo(L * 1.08, 0.22, L, 0.4)
          s.quadraticCurveTo(L * 0.7, 0.58, L * 0.45, 0.65)
          // windshield
          s.quadraticCurveTo(L * 0.2, 0.95, L * 0.05, 1.15)
          s.quadraticCurveTo(-L * 0.15, 1.28, -L * 0.4, 1.26)
          s.quadraticCurveTo(-L * 0.7, 1.15, -L * 0.85, 0.9)
          s.quadraticCurveTo(-L * 0.95, 0.65, -L, 0.4)
          s.quadraticCurveTo(-L * 1.02, 0.22, -L, 0.12)
        },
        compact ? 1.7 : 1.85,
        0.07,
      ),
    [len, compact],
  )

  const glass = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          const L = 2.05 * len
          s.moveTo(-L * 0.7, 0.78)
          s.quadraticCurveTo(-L * 0.2, 1.22, L * 0.02, 1.2)
          s.quadraticCurveTo(L * 0.22, 1.05, L * 0.32, 0.82)
          s.quadraticCurveTo(-L * 0.05, 0.78, -L * 0.7, 0.78)
        },
        compact ? 1.4 : 1.5,
        0.025,
      ),
    [len, compact],
  )

  return (
    <group>
      <mesh geometry={body} material={m.paint} castShadow receiveShadow />
      <mesh geometry={glass} material={m.glass} castShadow />

      {/* AE86 black hood */}
      {panda && (
        <SoftBox
          args={[1.55, 0.06, 1.15]}
          position={[0, 0.68, 0.75]}
          material={m.secondary}
          radius={0.04}
        />
      )}

      {popups ? (
        <group position={[0, 0.72, 1.05]}>
          <SoftBox args={[0.32, 0.18, 0.28]} position={[-0.48, 0.08, 0]} material={m.paint} radius={0.04} />
          <SoftBox args={[0.32, 0.18, 0.28]} position={[0.48, 0.08, 0]} material={m.paint} radius={0.04} />
          <SoftBox args={[0.26, 0.1, 0.06]} position={[-0.48, 0.08, 0.14]} material={m.light} radius={0.02} />
          <SoftBox args={[0.26, 0.1, 0.06]} position={[0.48, 0.08, 0.14]} material={m.light} radius={0.02} />
        </group>
      ) : (
        <>
          <SoftBox
            args={[0.34, 0.11, 0.08]}
            position={[-0.55, 0.45, compact ? 1.85 : 2.0]}
            material={m.light}
            radius={0.03}
          />
          <SoftBox
            args={[0.34, 0.11, 0.08]}
            position={[0.55, 0.45, compact ? 1.85 : 2.0]}
            material={m.light}
            radius={0.03}
          />
        </>
      )}

      <SoftBox
        args={[0.32, 0.09, 0.06]}
        position={[-0.45, 0.5, compact ? -1.9 : -2.05]}
        material={m.tail}
        radius={0.02}
      />
      <SoftBox
        args={[0.32, 0.09, 0.06]}
        position={[0.45, 0.5, compact ? -1.9 : -2.05]}
        material={m.tail}
        radius={0.02}
      />

      {(def.id === 'r34' || def.id === 'a80' || def.id === 'rx7-fd') && (
        <SoftBox args={[1.45, 0.05, 0.28]} position={[0, 1.08, -1.85]} material={m.carbon} radius={0.02} />
      )}

      {/* NSX mid-engine deck cue */}
      {def.id === 'nsx-na' && (
        <SoftBox args={[1.4, 0.08, 0.9]} position={[0, 0.72, -0.9]} material={m.secondary} radius={0.04} />
      )}

      <Wheel
        position={[-0.85, 0.32, compact ? 1.15 : 1.25]}
        radius={compact ? 0.3 : 0.33}
        width={0.28}
        rubber={m.rubber}
        carbon={m.carbon}
      />
      <Wheel
        position={[0.85, 0.32, compact ? 1.15 : 1.25]}
        radius={compact ? 0.3 : 0.33}
        width={0.28}
        rubber={m.rubber}
        carbon={m.carbon}
      />
      <Wheel
        position={[-0.85, 0.32, compact ? -1.2 : -1.3]}
        radius={compact ? 0.3 : 0.33}
        width={0.28}
        rubber={m.rubber}
        carbon={m.carbon}
      />
      <Wheel
        position={[0.85, 0.32, compact ? -1.2 : -1.3]}
        radius={compact ? 0.3 : 0.33}
        width={0.28}
        rubber={m.rubber}
        carbon={m.carbon}
      />
    </group>
  )
}

export function TouringBody({ def, flared = true }: { def: CarDef; flared?: boolean }) {
  const m = useCarMaterials(def.livery)

  const body = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          s.moveTo(-2.15, 0.12)
          s.lineTo(2.05, 0.12)
          s.quadraticCurveTo(2.2, 0.25, 2.1, 0.45)
          s.quadraticCurveTo(1.6, 0.65, 1.1, 0.72)
          s.quadraticCurveTo(0.55, 1.15, 0.15, 1.35)
          s.quadraticCurveTo(-0.35, 1.42, -0.85, 1.38)
          s.quadraticCurveTo(-1.4, 1.25, -1.7, 0.95)
          s.quadraticCurveTo(-2.0, 0.7, -2.15, 0.4)
          s.quadraticCurveTo(-2.2, 0.22, -2.15, 0.12)
        },
        1.9,
        0.07,
      ),
    [],
  )

  const glass = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          s.moveTo(-1.35, 0.9)
          s.quadraticCurveTo(-0.4, 1.35, 0.05, 1.36)
          s.quadraticCurveTo(0.45, 1.2, 0.65, 0.95)
          s.quadraticCurveTo(0.05, 0.9, -1.35, 0.9)
        },
        1.55,
        0.03,
      ),
    [],
  )

  return (
    <group>
      <mesh geometry={body} material={m.paint} castShadow receiveShadow />
      <mesh geometry={glass} material={m.glass} castShadow />

      {flared && (
        <>
          <SoftBox args={[0.28, 0.38, 0.9]} position={[-1.0, 0.52, 1.2]} material={m.secondary} radius={0.08} />
          <SoftBox args={[0.28, 0.38, 0.9]} position={[1.0, 0.52, 1.2]} material={m.secondary} radius={0.08} />
          <SoftBox args={[0.28, 0.38, 0.95]} position={[-1.0, 0.52, -1.25]} material={m.secondary} radius={0.08} />
          <SoftBox args={[0.28, 0.38, 0.95]} position={[1.0, 0.52, -1.25]} material={m.secondary} radius={0.08} />
        </>
      )}

      <SoftBox args={[1.65, 0.06, 0.28]} position={[0, 1.25, -1.95]} material={m.carbon} radius={0.02} />
      <SoftBox args={[0.18, 0.04, 3.9]} position={[0, 0.7, 0]} material={m.accent} radius={0.015} />
      <SoftBox args={[0.38, 0.11, 0.08]} position={[-0.6, 0.48, 2.1]} material={m.light} radius={0.03} />
      <SoftBox args={[0.38, 0.11, 0.08]} position={[0.6, 0.48, 2.1]} material={m.light} radius={0.03} />
      <SoftBox args={[1.05, 0.11, 0.08]} position={[0, 0.55, -2.15]} material={m.tail} radius={0.03} />

      <Wheel position={[-0.95, 0.36, 1.35]} radius={0.36} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.36, 1.35]} radius={0.36} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-0.95, 0.36, -1.4]} radius={0.36} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.36, -1.4]} radius={0.36} width={0.32} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}

export function ClassicBody({ def }: { def: CarDef }) {
  const m = useCarMaterials(def.livery)
  const whale = def.id === '935k3'
  const gt40 = def.id === 'gt40-67'

  const body = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          // Long, low classic prototype / GT40 / 935
          s.moveTo(-2.2, 0.1)
          s.lineTo(2.15, 0.1)
          s.quadraticCurveTo(2.35, 0.18, 2.25, 0.38)
          s.quadraticCurveTo(1.7, 0.52, 1.1, 0.55)
          s.quadraticCurveTo(0.5, 0.85, 0.15, 1.0)
          s.quadraticCurveTo(-0.25, 1.08, -0.7, 1.0)
          if (whale) {
            s.quadraticCurveTo(-1.3, 0.95, -1.7, 1.05)
            s.quadraticCurveTo(-2.0, 0.85, -2.2, 0.5)
          } else {
            s.quadraticCurveTo(-1.4, 0.75, -1.9, 0.55)
            s.quadraticCurveTo(-2.2, 0.35, -2.2, 0.1)
          }
          if (whale) s.quadraticCurveTo(-2.25, 0.25, -2.2, 0.1)
        },
        gt40 ? 1.95 : 1.9,
        0.06,
      ),
    [whale, gt40],
  )

  const glass = useMemo(
    () =>
      buildProfileGeometry(
        (s) => {
          s.moveTo(-0.85, 0.65)
          s.quadraticCurveTo(-0.2, 1.02, 0.2, 1.02)
          s.quadraticCurveTo(0.55, 0.9, 0.7, 0.65)
          s.quadraticCurveTo(0.15, 0.6, -0.85, 0.65)
        },
        1.45,
        0.025,
      ),
    [],
  )

  return (
    <group>
      <mesh geometry={body} material={m.paint} castShadow receiveShadow />
      <mesh geometry={glass} material={m.glass} castShadow />

      {whale && (
        <SoftBox args={[1.7, 0.28, 0.7]} position={[0, 1.0, -1.95]} material={m.paint} radius={0.08} />
      )}

      <SoftBox args={[1.8, 0.06, 0.32]} position={[0, 0.9, -2.05]} material={m.accent} radius={0.02} />

      {/* Gulf / stripe */}
      <SoftBox args={[0.32, 0.05, 4.1]} position={[0, 0.48, 0]} material={m.tertiary} radius={0.02} />
      <SoftBox args={[0.12, 0.05, 4.1]} position={[-0.35, 0.48, 0]} material={m.secondary} radius={0.015} />
      <SoftBox args={[0.12, 0.05, 4.1]} position={[0.35, 0.48, 0]} material={m.secondary} radius={0.015} />

      <SoftBox args={[0.34, 0.1, 0.08]} position={[-0.6, 0.42, 2.2]} material={m.light} radius={0.03} />
      <SoftBox args={[0.34, 0.1, 0.08]} position={[0.6, 0.42, 2.2]} material={m.light} radius={0.03} />

      <Wheel position={[-0.95, 0.33, 1.35]} radius={0.33} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.33, 1.35]} radius={0.33} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-0.95, 0.33, -1.4]} radius={0.34} width={0.34} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[0.95, 0.33, -1.4]} radius={0.34} width={0.34} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}
