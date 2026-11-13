import { useMemo } from 'react'
import * as THREE from 'three'
import type { TodPreset } from '../../data/environments'

interface SkyDomeProps {
  tod: TodPreset
}

/** Gradient sky without custom GLSL (WebGL2-safe). */
export function SkyDome({ tod }: SkyDomeProps) {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(80, 32, 16)
    const colors = new Float32Array(g.attributes.position.count * 3)
    const top = new THREE.Color(tod.skyTop)
    const bottom = new THREE.Color(tod.skyBottom)
    const pos = g.attributes.position
    const c = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)
      const t = THREE.MathUtils.clamp((y + 20) / 50, 0, 1)
      c.copy(bottom).lerp(top, Math.pow(t, 0.55))
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [tod.skyTop, tod.skyBottom])

  return (
    <mesh geometry={geo}>
      <meshBasicMaterial vertexColors side={THREE.BackSide} depthWrite={false} />
    </mesh>
  )
}
