export type QualityTier = 'low' | 'medium' | 'high'

export interface QualitySettings {
  tier: QualityTier
  dpr: [number, number]
  shadows: boolean
  shadowMapSize: number
  maxCars: number
  particles: boolean
  reflections: boolean
  antialias: boolean
}

const TIER_SETTINGS: Record<QualityTier, Omit<QualitySettings, 'tier'>> = {
  low: {
    dpr: [0.75, 1],
    shadows: false,
    shadowMapSize: 512,
    maxCars: 5,
    particles: false,
    reflections: false,
    antialias: false,
  },
  medium: {
    dpr: [1, 1.5],
    shadows: true,
    shadowMapSize: 1024,
    maxCars: 8,
    particles: true,
    reflections: false,
    antialias: true,
  },
  high: {
    dpr: [1, 2],
    shadows: true,
    shadowMapSize: 2048,
    maxCars: 11,
    particles: true,
    reflections: true,
    antialias: true,
  },
}

export function detectQualityTier(): QualityTier {
  if (typeof navigator === 'undefined') return 'medium'

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return 'low'

  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const cores = navigator.hardwareConcurrency ?? 4
  const isMobile =
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)

  let score = 0
  if (mem !== undefined) {
    if (mem <= 2) score -= 2
    else if (mem <= 4) score -= 1
    else if (mem >= 8) score += 1
  }
  if (cores <= 4) score -= 1
  else if (cores >= 8) score += 1
  if (isMobile) score -= 1

  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    if (!gl) return 'low'
    const dbg = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info')
    if (dbg) {
      const renderer = (gl as WebGLRenderingContext).getParameter(
        dbg.UNMASKED_RENDERER_WEBGL,
      ) as string
      if (/SwiftShader|llvmpipe|Software/i.test(renderer)) return 'low'
      if (/Apple GPU|M1|M2|M3|M4|RTX|GeForce|Radeon RX/i.test(renderer)) score += 1
      if (/Intel HD|Intel UHD|Adreno 5|Mali-G5/i.test(renderer)) score -= 1
    }
  } catch {
    score -= 1
  }

  if (score <= -2) return 'low'
  if (score >= 1) return 'high'
  return 'medium'
}

export function settingsForTier(tier: QualityTier): QualitySettings {
  return { tier, ...TIER_SETTINGS[tier] }
}
