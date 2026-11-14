export type CarArchetype =
  | 'f1'
  | 'hypercar'
  | 'lmp'
  | 'gt3'
  | 'gt1'
  | 'nascar'
  | 'dtm'
  | 'rally'
  | 'road'
  | 'jdm'
  | 'classic'

export type F1Era = 'v8' | 'hybrid' | 'ground-effect' | '2026'

export interface CarLivery {
  primary: string
  secondary: string
  accent: string
  /** Optional third stripe / detail */
  tertiary?: string
  carbon?: string
}

export interface CarDef {
  id: string
  name: string
  shortName: string
  series: string
  year: string
  archetype: CarArchetype
  livery: CarLivery
  /** F1-only shaping hints */
  f1Era?: F1Era
  /** Scale multiplier for driveway fit */
  scale?: number
  blurb: string
}
