import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { useAppStore } from '../store/useAppStore'
import { raceClock } from './raceClock'

interface CameraDirectorProps {
  curve: THREE.CatmullRomCurve3
  focusOffset: number
  reducedMotion: boolean
}

/**
 * Arkham-style money-shot framing: car fills the frame, slow drift orbit,
 * clamped so the hero car stays dominant.
 */
export function CameraDirector({
  curve,
  focusOffset,
  reducedMotion,
}: CameraDirectorProps) {
  const { camera, gl } = useThree()
  const view = useAppStore((s) => s.view)
  const drift = useRef(0)
  const target = useMemo(() => new THREE.Vector3(), [])
  const desired = useMemo(() => new THREE.Vector3(), [])
  const look = useMemo(() => new THREE.Vector3(), [])
  const normal = useMemo(() => new THREE.Vector3(), [])
  const worldUp = useMemo(() => new THREE.Vector3(0, 1, 0), [])
  const roomCam = useRef({ active: false })
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = gl.domElement
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [gl])

  useEffect(() => {
    if (view === 'room') {
      roomCam.current.active = true
      gsap.to(camera.position, {
        x: 0,
        y: 3.2,
        z: 6.5,
        duration: reducedMotion ? 0.2 : 1.1,
        ease: 'power2.inOut',
      })
    } else {
      roomCam.current.active = false
    }
  }, [view, camera, reducedMotion])

  useFrame((_, dt) => {
    if (roomCam.current.active && view === 'room') {
      camera.lookAt(0, 1.2, 0)
      return
    }

    const liveT = ((focusOffset + raceClock.t * raceClock.speed) % 1 + 1) % 1
    const pos = curve.getPointAt(liveT)
    const tangent = curve.getTangentAt(liveT).normalize()
    normal.crossVectors(tangent, worldUp).normalize()

    drift.current += dt * (reducedMotion ? 0.05 : 0.18)
    const sway = Math.sin(drift.current) * 0.55
    const elev = 1.35 + Math.sin(drift.current * 0.5) * 0.15

    desired
      .copy(pos)
      .addScaledVector(tangent, -3.4)
      .addScaledVector(normal, 1.6 + sway)
    desired.y += elev + 0.9

    desired.addScaledVector(normal, pointer.current.x * 0.35)
    desired.y += pointer.current.y * 0.2

    camera.position.lerp(desired, 1 - Math.exp(-2.2 * dt))
    look.copy(pos).addScaledVector(tangent, 1.2)
    look.y = pos.y + 0.55
    target.lerp(look, 1 - Math.exp(-3 * dt))
    camera.lookAt(target)

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov += (38 - camera.fov) * (1 - Math.exp(-2 * dt))
      camera.updateProjectionMatrix()
    }
  })

  return null
}
