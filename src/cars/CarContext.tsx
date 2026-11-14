import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { getCarById, pickRandomCar } from './catalog'
import type { CarDef } from './types'

const CarContext = createContext<CarDef | null>(null)

function initialCar(): CarDef {
  if (typeof window !== 'undefined') {
    const id = new URLSearchParams(window.location.search).get('car')
    if (id) {
      const found = getCarById(id)
      if (found) return found
    }
  }
  return pickRandomCar()
}

export function CarProvider({ children }: { children: ReactNode }) {
  const car = useMemo(() => initialCar(), [])
  return <CarContext.Provider value={car}>{children}</CarContext.Provider>
}

export function useFeaturedCar(): CarDef {
  const car = useContext(CarContext)
  if (!car) throw new Error('useFeaturedCar requires CarProvider')
  return car
}
