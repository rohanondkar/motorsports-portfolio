import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Pit wall / team radio — monitors, desk, subtle static flicker. */
export function EngineerRoom() {
  const flicker = useRef(1)
  const screenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a2a22',
        emissive: '#00d2be',
        emissiveIntensity: 0.6,
        metalness: 0.2,
        roughness: 0.4,
      }),
    [],
  )

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    flicker.current = 0.45 + Math.sin(t * 17) * 0.08 + (Math.random() > 0.97 ? 0.25 : 0)
    screenMat.emissiveIntensity = flicker.current
  })

  return (
    <group>
      <color attach="background" args={['#06080c']} />
      <fog attach="fog" args={['#06080c', 8, 28]} />
      <ambientLight intensity={0.25} />
      <spotLight position={[2, 6, 4]} intensity={2.5} angle={0.5} penumbra={0.6} castShadow />
      <pointLight position={[-2, 2, 1]} intensity={0.8} color="#00d2be" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#12151a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Pit desk */}
      <mesh position={[0, 0.7, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.12, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.35, 0.2]}>
        <boxGeometry args={[4.0, 0.7, 1.0]} />
        <meshStandardMaterial color="#0e0e10" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Monitor bank */}
      {[-1.4, 0, 1.4].map((x, i) => (
        <group key={i} position={[x, 1.35, -0.35]}>
          <mesh castShadow>
            <boxGeometry args={[1.1, 0.7, 0.08]} />
            <meshStandardMaterial color="#111" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.05]} material={screenMat}>
            <planeGeometry args={[0.95, 0.55]} />
          </mesh>
        </group>
      ))}

      {/* Radio mic */}
      <mesh position={[0.9, 0.95, 0.5]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.35, 12]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.9, 1.15, 0.5]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2, -2.2]}>
        <boxGeometry args={[10, 4, 0.2]} />
        <meshStandardMaterial color="#0a0c10" />
      </mesh>
    </group>
  )
}
