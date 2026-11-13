import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import type { TodPreset } from '../../data/environments'

interface SkyDomeProps {
  tod: TodPreset
}

export function SkyDome({ tod }: SkyDomeProps) {
  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(tod.skyTop) },
        bottomColor: { value: new THREE.Color(tod.skyBottom) },
        offset: { value: 12 },
        exponent: { value: 0.55 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
          float t = max(pow(max(h, 0.0), exponent), 0.0);
          gl_FragColor = vec4(mix(bottomColor, topColor, t), 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    })
  }, [])

  useEffect(() => {
    mat.uniforms.topColor.value.set(tod.skyTop)
    mat.uniforms.bottomColor.value.set(tod.skyBottom)
  }, [mat, tod.skyTop, tod.skyBottom])

  return (
    <mesh material={mat}>
      <sphereGeometry args={[80, 32, 16]} />
    </mesh>
  )
}
