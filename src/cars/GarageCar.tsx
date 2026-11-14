import type { CarDef } from './types'
import { F1Body } from './bodies/F1Body'
import { PrototypeBody } from './bodies/PrototypeBody'
import { GTBody } from './bodies/GTBody'
import { NascarBody } from './bodies/NascarBody'
import {
  RoadHyperBody,
  JdmBody,
  TouringBody,
  ClassicBody,
} from './bodies/RoadBodies'

interface GarageCarProps {
  def: CarDef
  position?: [number, number, number]
}

export function GarageCar({ def, position = [0, 0, 2.2] }: GarageCarProps) {
  const s = def.scale ?? 1

  return (
    <group position={position} scale={[s, s, s]}>
      <Body def={def} />
    </group>
  )
}

function Body({ def }: { def: CarDef }) {
  switch (def.archetype) {
    case 'f1':
      return <F1Body def={def} />
    case 'hypercar':
      return <PrototypeBody def={def} tall />
    case 'lmp':
      return <PrototypeBody def={def} />
    case 'gt3':
      return <GTBody def={def} />
    case 'gt1':
      return <GTBody def={def} longNose />
    case 'nascar':
      return <NascarBody def={def} />
    case 'dtm':
      return <TouringBody def={def} />
    case 'rally':
      return <TouringBody def={def} flared />
    case 'road':
      return <RoadHyperBody def={def} />
    case 'jdm':
      return <JdmBody def={def} />
    case 'classic':
      return <ClassicBody def={def} />
    default:
      return <GTBody def={def} />
  }
}
