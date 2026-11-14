import { useMemo } from 'react'
import * as THREE from 'three'
import type { EstAtmosphere } from '../time/estPeriod'

export function SkyGradient({ atm }: { atm: EstAtmosphere }) {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(90, 48, 24)
    const colors = new Float32Array(g.attributes.position.count * 3)
    const top = new THREE.Color(atm.skyTop)
    const mid = new THREE.Color(atm.skyHorizon)
    const bot = new THREE.Color(atm.skyBottom)
    const pos = g.attributes.position
    const c = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)
      const t = THREE.MathUtils.clamp((y + 15) / 55, 0, 1)
      if (t < 0.45) {
        c.copy(bot).lerp(mid, t / 0.45)
      } else {
        c.copy(mid).lerp(top, (t - 0.45) / 0.55)
      }
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [atm.skyTop, atm.skyHorizon, atm.skyBottom])

  return (
    <mesh geometry={geo}>
      <meshBasicMaterial vertexColors side={THREE.BackSide} depthWrite={false} />
    </mesh>
  )
}
