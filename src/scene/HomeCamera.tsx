import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/** Slow Bruno-like drift — driveway car stays the money shot. */
export function HomeCamera() {
  const { camera } = useThree()
  const t = useRef(0)
  const look = useRef(new THREE.Vector3(0, 0.8, 2.2))
  const desired = useRef(new THREE.Vector3(5.2, 2.4, 8.0))

  useFrame((_, dt) => {
    t.current += dt * 0.1
    const sway = Math.sin(t.current) * 0.45
    const bob = Math.sin(t.current * 0.7) * 0.1
    desired.current.set(5.2 + sway, 2.35 + bob, 8.0)
    camera.position.lerp(desired.current, 1 - Math.exp(-1.8 * dt))
    look.current.set(0, 0.75 + bob * 0.2, 2.2)
    camera.lookAt(look.current)
  })

  return null
}
