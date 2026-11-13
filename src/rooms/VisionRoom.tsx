import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Onboard vision HUD — lane lines over a track plane. */
export function VisionRoom() {
  const laneMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#00ff88',
        transparent: true,
        opacity: 0.85,
      }),
    [],
  )

  useFrame(({ clock }) => {
    laneMat.opacity = 0.55 + Math.sin(clock.elapsedTime * 2.5) * 0.25
  })

  return (
    <group>
      <color attach="background" args={['#020805']} />
      <fog attach="fog" args={['#020805', 6, 40]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 2]} intensity={0.8} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 60]} />
        <meshStandardMaterial color="#141414" />
      </mesh>

      {[-2.2, 2.2].map((x) => (
        <mesh key={x} position={[x, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} material={laneMat}>
          <planeGeometry args={[0.12, 50]} />
        </mesh>
      ))}

      {Array.from({ length: 16 }).map((_, i) => (
        <mesh key={i} position={[0, 0.06, -20 + i * 2.6]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 1.2]} />
          <meshBasicMaterial color="#f4f4f0" transparent opacity={0.7} />
        </mesh>
      ))}

      <mesh position={[0, 1.5, -4]}>
        <ringGeometry args={[1.6, 1.7, 64]} />
        <meshBasicMaterial color="#00d2be" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}
