import { useEffect } from 'react'
import { CanvasRoot } from './CanvasRoot'
import { EdgeChrome } from '../ui/EdgeChrome'
import { RoomOverlay } from '../ui/RoomOverlay'
import { useLayoutMode } from '../layout/useLayoutMode'
import { initQualityFromDevice, useAppStore } from '../store/useAppStore'

export function Shell() {
  useLayoutMode()
  const layoutMode = useAppStore((s) => s.layoutMode)

  useEffect(() => {
    initQualityFromDevice()
  }, [])

  return (
    <div className="shell" data-layout={layoutMode}>
      <CanvasRoot />
      <EdgeChrome />
      <RoomOverlay />
    </div>
  )
}
