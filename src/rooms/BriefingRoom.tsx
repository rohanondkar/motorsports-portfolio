import { useRoomEnvironment } from './useRoomEnvironment'

/** Night-race strategy briefing — table under floodlights. */
export function BriefingRoom() {
  useRoomEnvironment('#050508', 6, 22)
  return (
    <group>
      <ambientLight intensity={0.2} />
      <spotLight
        position={[0, 7, 0]}
        intensity={3.5}
        angle={0.55}
        penumbra={0.4}
        color="#ffe6b0"
        castShadow
      />
      <pointLight position={[-3, 2, 2]} color="#e10600" intensity={0.6} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#101014" />
      </mesh>

      {/* Strategy table */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.12, 1.8]} />
        <meshStandardMaterial color="#2a2118" metalness={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 0.7, 12]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Map / board on table */}
      <mesh position={[0, 0.83, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 1.2]} />
        <meshStandardMaterial color="#1b2838" emissive="#123" emissiveIntensity={0.3} />
      </mesh>

      {/* Chairs */}
      {[-1.2, 1.2].map((x) => (
        <mesh key={x} position={[x, 0.45, 1.1]} castShadow>
          <boxGeometry args={[0.5, 0.9, 0.5]} />
          <meshStandardMaterial color="#161616" />
        </mesh>
      ))}
    </group>
  )
}
