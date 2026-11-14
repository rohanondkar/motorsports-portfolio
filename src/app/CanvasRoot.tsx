import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { HomeScene } from '../scene/HomeScene'
import { getEstAtmosphere } from '../time/estPeriod'

function ExposureSync({ exposure }: { exposure: number }) {
  const gl = useThree((s) => s.gl)
  useEffect(() => {
    gl.toneMappingExposure = exposure
  }, [gl, exposure])
  return null
}

export function CanvasRoot() {
  const [exposure, setExposure] = useState(() => getEstAtmosphere().exposure)

  useEffect(() => {
    const id = window.setInterval(() => {
      setExposure(getEstAtmosphere().exposure)
    }, 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="canvas-root">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
          preserveDrawingBuffer: true,
        }}
        camera={{ position: [5, 2.2, 7.5], fov: 38, near: 0.1, far: 200 }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = exposure
          gl.setClearColor('#2a2030')
        }}
      >
        <Suspense fallback={null}>
          <HomeScene />
        </Suspense>
        <ExposureSync exposure={exposure} />
      </Canvas>
    </div>
  )
}
