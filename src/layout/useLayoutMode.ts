import { useEffect } from 'react'
import { useAppStore, type LayoutMode } from '../store/useAppStore'

function computeLayoutMode(): LayoutMode {
  const w = window.innerWidth
  const h = window.innerHeight
  const ratio = w / Math.max(h, 1)

  // Dual-pane / fold span / ultrawide
  if (ratio >= 1.85 && w >= 900) return 'wide'
  // Tall foldables / phones in portrait
  if (ratio <= 0.55 || (h > w && h / w >= 1.9)) return 'tall-narrow'
  if (h > w) return 'portrait'
  return 'landscape'
}

export function useLayoutMode() {
  const setLayoutMode = useAppStore((s) => s.setLayoutMode)
  const setReducedMotion = useAppStore((s) => s.setReducedMotion)
  const setPaused = useAppStore((s) => s.setPaused)

  useEffect(() => {
    const apply = () => setLayoutMode(computeLayoutMode())
    apply()
    window.addEventListener('resize', apply)
    window.addEventListener('orientationchange', apply)

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => setReducedMotion(mq.matches)
    onMotion()
    mq.addEventListener('change', onMotion)

    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)

    return () => {
      window.removeEventListener('resize', apply)
      window.removeEventListener('orientationchange', apply)
      mq.removeEventListener('change', onMotion)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [setLayoutMode, setReducedMotion, setPaused])
}
