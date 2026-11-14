import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * Draw a side silhouette in Shape space:
 *   shape.x = length (nose = +x)
 *   shape.y = height (ground = 0)
 * Extruded along Z for width, then rotated so nose faces +Z (Three.js forward).
 */
export function buildProfileGeometry(
  draw: (shape: THREE.Shape) => void,
  width: number,
  bevel = 0.04,
): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  draw(shape)
  shape.closePath()

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: width,
    bevelEnabled: true,
    bevelThickness: Math.min(bevel, width * 0.08),
    bevelSize: Math.min(bevel * 0.6, width * 0.06),
    bevelOffset: 0,
    bevelSegments: 2,
    curveSegments: 20,
  })

  // shape XY + extrude Z  →  width on X, height on Y, length on Z
  geo.rotateY(Math.PI / 2)

  geo.computeBoundingBox()
  const bb = geo.boundingBox!
  geo.translate(-(bb.min.x + bb.max.x) / 2, -bb.min.y, -(bb.min.z + bb.max.z) / 2)

  // Ensure outward normals after transforms
  geo.computeVertexNormals()
  return geo
}

export function useDrawnProfile(
  draw: (shape: THREE.Shape) => void,
  width: number,
  bevel = 0.04,
  deps: unknown[] = [],
) {
  return useMemo(() => buildProfileGeometry(draw, width, bevel), [width, bevel, ...deps])
}
