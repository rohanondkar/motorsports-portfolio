import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * Stylized-realistic GT silhouette — Bruno-readable volumes with car-like proportions.
 * Not a licensed livery; dark motorsport home-garage finish.
 */
export function SportsCar({ position = [0, 0, 0] as [number, number, number] }) {
  const paint = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#b01018',
        metalness: 0.75,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.2,
      }),
    [],
  )
  const glass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a2830',
        metalness: 0.6,
        roughness: 0.15,
        transparent: true,
        opacity: 0.72,
      }),
    [],
  )
  const dark = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#121212',
        metalness: 0.7,
        roughness: 0.4,
      }),
    [],
  )
  const brake = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c41200',
        metalness: 0.5,
        roughness: 0.35,
        emissive: '#400000',
        emissiveIntensity: 0.15,
      }),
    [],
  )
  const rubber = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a1a',
        metalness: 0.1,
        roughness: 0.85,
      }),
    [],
  )

  return (
    <group position={position}>
      {/* Lower body */}
      <mesh castShadow receiveShadow position={[0, 0.38, 0]} material={paint}>
        <boxGeometry args={[1.95, 0.42, 4.3]} />
      </mesh>
      {/* Sculpted hood / deck taper via stacked boxes */}
      <mesh castShadow position={[0, 0.62, 0.85]} material={paint}>
        <boxGeometry args={[1.85, 0.18, 1.6]} />
      </mesh>
      <mesh castShadow position={[0, 0.55, -1.15]} material={paint}>
        <boxGeometry args={[1.9, 0.22, 1.5]} />
      </mesh>
      {/* Cabin */}
      <mesh castShadow position={[0, 0.88, -0.15]} material={paint}>
        <boxGeometry args={[1.55, 0.45, 1.7]} />
      </mesh>
      {/* Glasshouse */}
      <mesh castShadow position={[0, 0.95, -0.05]} material={glass}>
        <boxGeometry args={[1.48, 0.38, 1.55]} />
      </mesh>
      {/* Nose */}
      <mesh castShadow position={[0, 0.32, 2.0]} material={paint}>
        <boxGeometry args={[1.7, 0.28, 0.55]} />
      </mesh>
      {/* Front splitter */}
      <mesh castShadow position={[0, 0.12, 2.15]} material={dark}>
        <boxGeometry args={[1.85, 0.06, 0.35]} />
      </mesh>
      {/* Rear diffuser */}
      <mesh castShadow position={[0, 0.14, -2.15]} material={dark}>
        <boxGeometry args={[1.8, 0.1, 0.4]} />
      </mesh>
      {/* Wing */}
      <mesh castShadow position={[0, 0.95, -1.95]} material={dark}>
        <boxGeometry args={[1.7, 0.06, 0.32]} />
      </mesh>
      <mesh castShadow position={[-0.55, 0.78, -1.95]} material={dark}>
        <boxGeometry args={[0.06, 0.32, 0.1]} />
      </mesh>
      <mesh castShadow position={[0.55, 0.78, -1.95]} material={dark}>
        <boxGeometry args={[0.06, 0.32, 0.1]} />
      </mesh>
      {/* Headlights */}
      <mesh position={[-0.62, 0.4, 2.2]}>
        <boxGeometry args={[0.35, 0.12, 0.08]} />
        <meshStandardMaterial color="#f5f0e0" emissive="#fff5d0" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.62, 0.4, 2.2]}>
        <boxGeometry args={[0.35, 0.12, 0.08]} />
        <meshStandardMaterial color="#f5f0e0" emissive="#fff5d0" emissiveIntensity={0.4} />
      </mesh>
      {/* Taillights */}
      <mesh position={[-0.55, 0.48, -2.18]} material={brake}>
        <boxGeometry args={[0.4, 0.1, 0.06]} />
      </mesh>
      <mesh position={[0.55, 0.48, -2.18]} material={brake}>
        <boxGeometry args={[0.4, 0.1, 0.06]} />
      </mesh>
      {/* Wheels */}
      <Wheel position={[-0.92, 0.32, 1.35]} rubber={rubber} dark={dark} />
      <Wheel position={[0.92, 0.32, 1.35]} rubber={rubber} dark={dark} />
      <Wheel position={[-0.92, 0.32, -1.4]} rubber={rubber} dark={dark} />
      <Wheel position={[0.92, 0.32, -1.4]} rubber={rubber} dark={dark} />
      {/* Side mirrors */}
      <mesh castShadow position={[-0.9, 0.85, 0.55]} material={paint}>
        <boxGeometry args={[0.18, 0.1, 0.22]} />
      </mesh>
      <mesh castShadow position={[0.9, 0.85, 0.55]} material={paint}>
        <boxGeometry args={[0.18, 0.1, 0.22]} />
      </mesh>
    </group>
  )
}

function Wheel({
  position,
  rubber,
  dark,
}: {
  position: [number, number, number]
  rubber: THREE.Material
  dark: THREE.Material
}) {
  return (
    <group position={position}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]} material={rubber}>
        <cylinderGeometry args={[0.34, 0.34, 0.28, 24]} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} material={dark}>
        <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
      </mesh>
    </group>
  )
}
