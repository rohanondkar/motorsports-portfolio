import { useMemo } from 'react'
import * as THREE from 'three'
import type { CarDef } from '../types'
import { useCarMaterials } from '../useCarMaterials'
import { Wheel } from '../Wheel'
import { SoftBox } from '../geom/CarMesh'

/** Multi-part open-wheel F1 — recognizably a formula car, not a brick. */
export function F1Body({ def }: { def: CarDef }) {
  const m = useCarMaterials(def.livery)
  const era = def.f1Era ?? 'hybrid'
  const hasHalo = era !== 'v8'
  const wide = era === 'ground-effect' || era === '2026'
  const track = wide ? 1.05 : 0.95
  const twinTusk = def.id === 'e22'

  const nose = useMemo(() => {
    // Lathe around Y, then tip toward +Z
    const pts = [
      new THREE.Vector2(0.01, 0),
      new THREE.Vector2(0.06, 0.15),
      new THREE.Vector2(0.1, 0.45),
      new THREE.Vector2(0.14, 0.9),
      new THREE.Vector2(0.18, 1.35),
      new THREE.Vector2(0.16, 1.5),
    ]
    const g = new THREE.LatheGeometry(pts, 20)
    g.rotateX(-Math.PI / 2)
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <group>
      {/* ===== Nose ===== */}
      <mesh
        geometry={nose}
        material={m.paint}
        castShadow
        position={[0, 0.3, 1.35]}
        scale={[1.05, 1.05, twinTusk ? 0.9 : 1.15]}
      />
      {twinTusk && (
        <>
          <mesh geometry={nose} material={m.paint} castShadow position={[-0.12, 0.28, 1.55]} scale={[0.55, 0.55, 0.75]} />
          <mesh geometry={nose} material={m.paint} castShadow position={[0.12, 0.28, 1.55]} scale={[0.55, 0.55, 0.75]} />
        </>
      )}

      {/* Nose tip accent */}
      <SoftBox args={[0.2, 0.09, 0.18]} position={[0, 0.26, 2.2]} material={m.accent} radius={0.04} />

      {/* ===== Front wing ===== */}
      <group position={[0, 0.15, 2.28]}>
        <SoftBox args={[wide ? 1.9 : 1.7, 0.035, 0.38]} material={m.secondary} radius={0.012} />
        <SoftBox args={[wide ? 1.75 : 1.55, 0.02, 0.14]} position={[0, 0.05, 0.14]} material={m.tertiary} radius={0.008} />
        <SoftBox args={[0.045, 0.22, 0.32]} position={[-(wide ? 0.88 : 0.78), 0.1, 0]} material={m.carbon} radius={0.01} />
        <SoftBox args={[0.045, 0.22, 0.32]} position={[wide ? 0.88 : 0.78, 0.1, 0]} material={m.carbon} radius={0.01} />
        {/* Wing pylons */}
        <SoftBox args={[0.04, 0.14, 0.2]} position={[-0.15, 0.08, -0.05]} material={m.carbon} radius={0.01} />
        <SoftBox args={[0.04, 0.14, 0.2]} position={[0.15, 0.08, -0.05]} material={m.carbon} radius={0.01} />
      </group>

      {/* ===== Chassis / keel ===== */}
      <SoftBox args={[0.55, 0.22, 2.1]} position={[0, 0.28, 0.2]} material={m.carbon} radius={0.06} />

      {/* ===== Sidepods ===== */}
      <mesh castShadow position={[-0.55, 0.42, -0.15]} rotation={[Math.PI / 2, 0, 0]} material={m.paint}>
        <capsuleGeometry args={[0.28, 1.05, 6, 16]} />
      </mesh>
      <mesh castShadow position={[0.55, 0.42, -0.15]} rotation={[Math.PI / 2, 0, 0]} material={m.paint}>
        <capsuleGeometry args={[0.28, 1.05, 6, 16]} />
      </mesh>
      <SoftBox args={[0.48, 0.18, 1.25]} position={[-0.55, 0.64, -0.2]} material={m.secondary} radius={0.07} />
      <SoftBox args={[0.48, 0.18, 1.25]} position={[0.55, 0.64, -0.2]} material={m.secondary} radius={0.07} />

      {/* ===== Cockpit ===== */}
      <SoftBox args={[0.5, 0.32, 0.85]} position={[0, 0.58, 0.25]} material={m.carbon} radius={0.08} />
      {/* Seat / helmet cue */}
      <mesh position={[0, 0.72, 0.2]} castShadow material={m.secondary}>
        <sphereGeometry args={[0.16, 16, 12]} />
      </mesh>

      {hasHalo && (
        <group position={[0, 0.88, 0.3]}>
          <mesh rotation={[0, 0, 0]} material={m.carbon} castShadow>
            <torusGeometry args={[0.24, 0.025, 8, 24, Math.PI]} />
          </mesh>
          <SoftBox args={[0.04, 0.2, 0.04]} position={[0, 0.05, -0.22]} material={m.carbon} radius={0.01} />
        </group>
      )}

      {/* ===== Engine cover + airbox ===== */}
      <SoftBox args={[0.48, 0.36, 1.35]} position={[0, 0.62, -0.85]} material={m.paint} radius={0.1} />
      <SoftBox args={[0.28, 0.28, 0.45]} position={[0, 0.88, -0.55]} material={m.secondary} radius={0.08} />
      {/* Shark fin */}
      <SoftBox args={[0.03, 0.45, 1.0]} position={[0, 0.95, -1.0]} material={m.accent} radius={0.008} />

      {/* ===== Rear wing ===== */}
      <group position={[0, 1.05, -1.9]}>
        <SoftBox args={[wide ? 1.1 : 0.98, 0.04, 0.3]} material={m.secondary} radius={0.012} />
        <SoftBox args={[wide ? 1.05 : 0.92, 0.025, 0.12]} position={[0, 0.055, 0.08]} material={m.tertiary} radius={0.008} />
        <SoftBox args={[0.035, 0.42, 0.16]} position={[-0.4, -0.15, 0]} material={m.carbon} radius={0.01} />
        <SoftBox args={[0.035, 0.42, 0.16]} position={[0.4, -0.15, 0]} material={m.carbon} radius={0.01} />
        {/* Beam wing */}
        <SoftBox args={[0.7, 0.025, 0.12]} position={[0, -0.55, 0.05]} material={m.carbon} radius={0.008} />
      </group>

      {/* Diffuser */}
      <SoftBox args={[1.1, 0.12, 0.35]} position={[0, 0.14, -1.85]} material={m.carbon} radius={0.03} />

      {/* Floor */}
      <SoftBox args={[wide ? 1.5 : 1.3, 0.04, 3.2]} position={[0, 0.1, 0]} material={m.carbon} radius={0.02} />

      {/* Mirrors */}
      <SoftBox args={[0.22, 0.05, 0.1]} position={[-0.42, 0.75, 0.55]} material={m.carbon} radius={0.02} />
      <SoftBox args={[0.22, 0.05, 0.1]} position={[0.42, 0.75, 0.55]} material={m.carbon} radius={0.02} />

      {/* Livery stripe */}
      <SoftBox args={[0.08, 0.05, 2.4]} position={[0, 0.55, 0]} material={m.tertiary} radius={0.015} />

      <Wheel position={[-track, 0.32, 1.25]} radius={0.32} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[track, 0.32, 1.25]} radius={0.32} width={0.32} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[-track, 0.33, -1.35]} radius={0.33} width={0.36} rubber={m.rubber} carbon={m.carbon} />
      <Wheel position={[track, 0.33, -1.35]} radius={0.33} width={0.36} rubber={m.rubber} carbon={m.carbon} />
    </group>
  )
}
