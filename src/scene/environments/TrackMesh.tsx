import { useMemo } from 'react'
import * as THREE from 'three'
import type { TrackPreset } from '../../data/environments'

interface TrackMeshProps {
  track: TrackPreset
  wetness: number
  curve: THREE.CatmullRomCurve3
}

export function TrackMesh({ track, wetness, curve }: TrackMeshProps) {
  const { ribbon } = useMemo(() => {
    const frames = curve.computeFrenetFrames(200, true)
    const halfW = 3.2
    const positions: number[] = []
    const uvs: number[] = []
    const indices: number[] = []
    const pts = curve.getSpacedPoints(200)

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i]
      const n = frames.normals[i]
      const side = new THREE.Vector3().copy(n).multiplyScalar(halfW)
      const left = new THREE.Vector3().copy(p).add(side)
      const right = new THREE.Vector3().copy(p).sub(side)
      left.y = 0.02
      right.y = 0.02
      positions.push(left.x, left.y, left.z, right.x, right.y, right.z)
      const u = i / (pts.length - 1)
      uvs.push(0, u, 1, u)
      if (i < pts.length - 1) {
        const a = i * 2
        indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    geo.setIndex(indices)
    geo.computeVertexNormals()
    return { ribbon: geo }
  }, [curve])

  const asphalt = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1c1c1e',
        metalness: 0.15 + wetness * 0.45,
        roughness: 0.85 - wetness * 0.55,
      }),
    [wetness],
  )

  const ground = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: track.groundTint,
        metalness: 0.05,
        roughness: 0.95,
      }),
    [track.groundTint],
  )

  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, 0]}
        receiveShadow
        material={ground}
      >
        <circleGeometry args={[55, 64]} />
      </mesh>
      <mesh geometry={ribbon} receiveShadow castShadow material={asphalt} />
      {/* Kerbs hint */}
      <mesh>
        <tubeGeometry args={[curve, 180, 0.08, 6, true]} />
        <meshStandardMaterial color="#e10600" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh scale={[1.02, 1, 1.02]}>
        <tubeGeometry args={[curve, 180, 0.06, 6, true]} />
        <meshStandardMaterial color="#f4f4f0" roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  )
}

export function buildTrackCurve(track: TrackPreset): THREE.CatmullRomCurve3 {
  const pts = track.path.map(([x, z]) => new THREE.Vector3(x, 0, z))
  return new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.35)
}
