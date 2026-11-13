import { useRoomEnvironment } from './useRoomEnvironment'

/** Paddock hospitality / onboarding bay. */
export function PaddockRoom() {
  useRoomEnvironment('#1a140e', 10, 35)
  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 3]} intensity={1.3} castShadow />
      <hemisphereLight intensity={0.45} color="#f0e6d2" groundColor="#3a2a1a" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2a2218" />
      </mesh>

      {/* Hospitality tent frame */}
      <mesh position={[0, 2.2, -2]}>
        <boxGeometry args={[8, 0.15, 5]} />
        <meshStandardMaterial color="#f4f4f0" roughness={0.8} />
      </mesh>
      {[-3.5, 3.5].map((x) => (
        <mesh key={x} position={[x, 1.1, -2]}>
          <boxGeometry args={[0.12, 2.2, 0.12]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      ))}

      {/* Counter */}
      <mesh position={[0, 0.85, -0.5]} castShadow>
        <boxGeometry args={[3.5, 0.9, 0.8]} />
        <meshStandardMaterial color="#5c4030" metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Badge kiosk */}
      <mesh position={[2.2, 1.3, 1.2]} castShadow>
        <boxGeometry args={[0.8, 1.4, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[2.2, 1.6, 1.46]}>
        <planeGeometry args={[0.55, 0.4]} />
        <meshStandardMaterial
          color="#0a2a22"
          emissive="#00d2be"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}
