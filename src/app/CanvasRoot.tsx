import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { RaceScene } from '../scene/RaceScene'
import { useAppStore } from '../store/useAppStore'

export function CanvasRoot() {
  const quality = useAppStore((s) => s.quality)

  return (
    <div className="canvas-root">
      <Canvas
        shadows={quality.shadows}
        dpr={quality.dpr}
        gl={{
          antialias: quality.antialias,
          powerPreference: quality.tier === 'low' ? 'low-power' : 'high-performance',
          alpha: false,
          preserveDrawingBuffer: true,
        }}
        camera={{ position: [0, 3, 8], fov: 32, near: 0.1, far: 200 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#1a2a3a')
          gl.toneMappingExposure = 1.15
        }}
      >
        <Suspense fallback={null}>
          <RaceScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
