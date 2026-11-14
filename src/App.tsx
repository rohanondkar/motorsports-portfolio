import { CarProvider } from './cars/CarContext'
import { CanvasRoot } from './app/CanvasRoot'
import { AboutHome } from './ui/AboutHome'

export default function App() {
  return (
    <CarProvider>
      <div className="shell">
        <CanvasRoot />
        <AboutHome />
      </div>
    </CarProvider>
  )
}
