import { PROFILE } from '../data/projects'

export function BrandMark() {
  return (
    <div className="brand">
      <h1>{PROFILE.name.toUpperCase()}</h1>
      <p>{PROFILE.tagline}</p>
    </div>
  )
}
