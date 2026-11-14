import { useMemo } from 'react'
import * as THREE from 'three'

/** Modern motorsport home — garage bay + living volume + driveway. */
export function HomeProperty() {
  const stucco = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#d8d0c4',
        roughness: 0.92,
        metalness: 0.02,
      }),
    [],
  )
  const charcoal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2a2a28',
        roughness: 0.7,
        metalness: 0.15,
      }),
    [],
  )
  const asphalt = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2e2e30',
        roughness: 0.88,
        metalness: 0.05,
      }),
    [],
  )
  const grass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3d5a3a',
        roughness: 0.95,
        metalness: 0,
      }),
    [],
  )
  const wood = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#5c4030',
        roughness: 0.75,
        metalness: 0.05,
      }),
    [],
  )

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow material={grass}>
        <circleGeometry args={[55, 64]} />
      </mesh>

      {/* Driveway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 4]} receiveShadow material={asphalt}>
        <planeGeometry args={[7.5, 16]} />
      </mesh>
      {/* Driveway edge lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.6, 0.02, 4]}>
        <planeGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#c8c4b8" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.6, 0.02, 4]}>
        <planeGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#c8c4b8" />
      </mesh>

      {/* Garage volume */}
      <mesh position={[-4.2, 2.2, -4.5]} castShadow receiveShadow material={stucco}>
        <boxGeometry args={[7, 4.4, 8]} />
      </mesh>
      {/* Garage opening (dark interior) */}
      <mesh position={[-2.8, 1.5, -0.45]}>
        <boxGeometry args={[4.2, 3.0, 0.2]} />
        <meshStandardMaterial color="#12110f" roughness={1} />
      </mesh>
      {/* Garage door tracks / frame */}
      <mesh position={[-2.8, 3.05, -0.35]} material={charcoal}>
        <boxGeometry args={[4.4, 0.15, 0.25]} />
      </mesh>

      {/* Living wing */}
      <mesh position={[3.5, 2.4, -5.2]} castShadow receiveShadow material={stucco}>
        <boxGeometry args={[6.5, 4.8, 7]} />
      </mesh>
      {/* Window band */}
      <mesh position={[3.5, 2.6, -1.65]}>
        <boxGeometry args={[4.8, 1.8, 0.12]} />
        <meshStandardMaterial
          color="#6a90a8"
          metalness={0.3}
          roughness={0.2}
          emissive="#1a3040"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh position={[3.5, 1.55, -1.7]} material={wood}>
        <boxGeometry args={[5.0, 0.2, 0.3]} />
      </mesh>

      {/* Flat roof overhang */}
      <mesh position={[-0.4, 4.45, -4.8]} castShadow material={charcoal}>
        <boxGeometry args={[15.5, 0.25, 9.5]} />
      </mesh>

      {/* Porch / entry pad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, 0.02, -1.0]} receiveShadow>
        <planeGeometry args={[4, 2.5]} />
        <meshStandardMaterial color="#b8b0a4" roughness={0.9} />
      </mesh>

      {/* Simple tree accents */}
      <Tree position={[-10, 0, 2]} />
      <Tree position={[9, 0, -2]} />
      <Tree position={[11, 0, 6]} />

      {/* Helmet pedestal — home motorsport detail */}
      <mesh position={[5.2, 0.45, 0.8]} castShadow material={charcoal}>
        <cylinderGeometry args={[0.35, 0.4, 0.9, 16]} />
      </mesh>
      <mesh position={[5.2, 1.15, 0.8]} castShadow>
        <sphereGeometry args={[0.32, 24, 16]} />
        <meshStandardMaterial color="#c41200" metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[5.2, 1.25, 0.95]}>
        <boxGeometry args={[0.28, 0.12, 0.18]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.18, 0.25, 2.4, 8]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 3.2, 0]}>
        <sphereGeometry args={[1.4, 12, 10]} />
        <meshStandardMaterial color="#2f4a2c" roughness={0.95} />
      </mesh>
    </group>
  )
}
