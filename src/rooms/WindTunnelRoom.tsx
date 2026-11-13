import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRoomEnvironment } from './useRoomEnvironment'

/** Wind tunnel / CFD garage with a car body and flow streaks. */
export function WindTunnelRoom() {
  useRoomEnvironment('#0c1018', 8, 30)
  const streaks = useRef<THREE.Group>(null)

  useFrame((_, dt) => {
    if (!streaks.current) return
    streaks.current.children.forEach((child, i) => {
      child.position.z += (2 + (i % 3)) * dt
      if (child.position.z > 6) child.position.z = -6
    })
  })

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 8, 2]} intensity={1.5} castShadow />
      <pointLight position={[-3, 3, 0]} color="#4cc9f0" intensity={1.3} />

      {/* Tunnel walls */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[8, 4, 14]} />
        <meshStandardMaterial
          color="#1a2230"
          side={THREE.BackSide}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>

      {/* Car body under test */}
      <group position={[0, 0.4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.35, 2.4]} />
          <meshStandardMaterial color="#1a3a6b" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.25, -0.2]} castShadow>
          <boxGeometry args={[0.7, 0.25, 0.9]} />
          <meshStandardMaterial color="#0d1b2a" metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.55, -1.0]} castShadow>
          <boxGeometry args={[1.1, 0.08, 0.3]} />
          <meshStandardMaterial color="#f0c040" metalness={0.4} roughness={0.4} />
        </mesh>
      </group>

      {/* Flow streaks */}
      <group ref={streaks}>
        {Array.from({ length: 24 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              ((i % 6) - 2.5) * 0.45,
              0.3 + (i % 4) * 0.25,
              -6 + (i % 8) * 1.4,
            ]}
          >
            <boxGeometry args={[0.04, 0.04, 0.8]} />
            <meshBasicMaterial color="#4cc9f0" transparent opacity={0.55} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
