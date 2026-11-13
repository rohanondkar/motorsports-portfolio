import { useLayoutEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

/** Clears race sky/fog leftovers and applies room atmosphere. */
export function useRoomEnvironment(bg: string, fogNear = 8, fogFar = 28) {
  const scene = useThree((s) => s.scene)

  useLayoutEffect(() => {
    const prevBg = scene.background
    const prevFog = scene.fog
    scene.background = new THREE.Color(bg)
    scene.fog = new THREE.Fog(bg, fogNear, fogFar)
    return () => {
      scene.background = prevBg
      scene.fog = prevFog
    }
  }, [scene, bg, fogNear, fogFar])
}
