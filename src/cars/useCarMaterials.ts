import { useMemo } from 'react'
import * as THREE from 'three'
import type { CarLivery } from './types'

export function useCarMaterials(livery: CarLivery) {
  return useMemo(() => {
    const paint = new THREE.MeshPhysicalMaterial({
      color: livery.primary,
      metalness: 0.72,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.15,
    })
    const secondary = new THREE.MeshPhysicalMaterial({
      color: livery.secondary,
      metalness: 0.65,
      roughness: 0.28,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      envMapIntensity: 1.0,
    })
    const accent = new THREE.MeshPhysicalMaterial({
      color: livery.accent,
      metalness: 0.55,
      roughness: 0.3,
      clearcoat: 0.6,
      envMapIntensity: 0.9,
    })
    const tertiary = new THREE.MeshPhysicalMaterial({
      color: livery.tertiary ?? livery.accent,
      metalness: 0.5,
      roughness: 0.35,
      clearcoat: 0.5,
    })
    const carbon = new THREE.MeshStandardMaterial({
      color: livery.carbon ?? '#141414',
      metalness: 0.75,
      roughness: 0.4,
    })
    const glass = new THREE.MeshStandardMaterial({
      color: '#152028',
      metalness: 0.55,
      roughness: 0.12,
      transparent: true,
      opacity: 0.7,
    })
    const rubber = new THREE.MeshStandardMaterial({
      color: '#1a1a1a',
      metalness: 0.08,
      roughness: 0.88,
    })
    const light = new THREE.MeshStandardMaterial({
      color: '#f5f0e0',
      emissive: '#fff2c8',
      emissiveIntensity: 0.45,
      metalness: 0.2,
      roughness: 0.3,
    })
    const tail = new THREE.MeshStandardMaterial({
      color: '#e10600',
      emissive: '#600000',
      emissiveIntensity: 0.35,
      metalness: 0.4,
      roughness: 0.35,
    })
    return { paint, secondary, accent, tertiary, carbon, glass, rubber, light, tail }
  }, [livery])
}

export type CarMaterials = ReturnType<typeof useCarMaterials>
